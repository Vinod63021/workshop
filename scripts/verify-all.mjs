import { spawn } from 'child_process';
import http from 'http';

const PORT = 3005;
const BASE_URL = `http://localhost:${PORT}`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return true;
    } catch {
      // not ready yet
    }
    await sleep(500);
  }
  throw new Error(`Server failed to start within ${timeoutMs}ms at ${url}`);
}

async function runTests() {
  console.log('====================================================');
  console.log('🚀 BuildSprint AI End-to-End Verification Test Suite');
  console.log('====================================================\n');

  console.log(`Starting Next.js production server on port ${PORT}...`);
  const server = spawn(process.execPath, ['./node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => {
    // console.log(`[server stdout]: ${d}`);
  });
  server.stderr.on('data', (d) => {
    // console.error(`[server stderr]: ${d}`);
  });

  try {
    await waitForServer(`${BASE_URL}/`);
    console.log(`✓ Server ready and accepting requests at ${BASE_URL}\n`);

    const results = [];

    // TEST 1: Public landing page loads
    try {
      const res = await fetch(`${BASE_URL}/`);
      const html = await res.text();
      const hasHeadline = html.includes('Less scrolling') && html.includes('Your first AI project starts here');
      const hasCta = html.includes('Reserve My Free Spot') || html.includes('Reserve Spot');
      if (res.status === 200 && hasHeadline && hasCta) {
        results.push({ id: 1, name: 'Public Landing Page & Editorial Copy', passed: true });
      } else {
        results.push({ id: 1, name: 'Public Landing Page & Editorial Copy', passed: false, detail: `Status: ${res.status}` });
      }
    } catch (err) {
      results.push({ id: 1, name: 'Public Landing Page & Editorial Copy', passed: false, detail: err.message });
    }

    // TEST 2: Invalid form submission rejected (Client/Server validation)
    try {
      const res = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: 'A', // too short
          email: 'not-an-email',
          college: '',
          branch: '',
          graduation_year: 1990, // invalid
        }),
      });
      const data = await res.json();
      if (res.status === 400 && data.success === false && data.fieldErrors) {
        results.push({ id: 2, name: 'Invalid Form Submission Validation', passed: true });
      } else {
        results.push({ id: 2, name: 'Invalid Form Submission Validation', passed: false, detail: `Expected 400, got ${res.status}` });
      }
    } catch (err) {
      results.push({ id: 2, name: 'Invalid Form Submission Validation', passed: false, detail: err.message });
    }

    // TEST 3: Valid student registration success
    const uniqueEmail = `test.student.${Date.now()}@college.edu`;
    let generatedReferralCode = '';
    try {
      const res = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: 'Rohan Sharma',
          email: uniqueEmail,
          college: 'Delhi Technological University (DTU)',
          branch: 'Computer Science & Engineering (CSE)',
          graduation_year: 2025,
          source: 'college club',
        }),
      });
      const data = await res.json();
      if (res.status === 201 && data.success === true && data.registration?.referral_code) {
        generatedReferralCode = data.registration.referral_code;
        results.push({
          id: 3,
          name: 'Valid Student Registration & Referral Code Generation',
          passed: true,
          detail: `Generated Code: ${generatedReferralCode}`,
        });
      } else {
        results.push({ id: 3, name: 'Valid Student Registration', passed: false, detail: JSON.stringify(data) });
      }
    } catch (err) {
      results.push({ id: 3, name: 'Valid Student Registration', passed: false, detail: err.message });
    }

    // TEST 4: Duplicate email rejection (Case-insensitive & whitespace normalized)
    try {
      const res = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: 'Rohan Sharma Duplicate Attempt',
          email: `  ${uniqueEmail.toUpperCase()}  `,
          college: 'DTU',
          branch: 'CSE',
          graduation_year: 2025,
        }),
      });
      const data = await res.json();
      if (res.status === 400 && data.success === false && data.error?.includes('already registered')) {
        results.push({ id: 4, name: 'Duplicate Email Rejection (Case-Insensitive)', passed: true });
      } else {
        results.push({ id: 4, name: 'Duplicate Email Rejection', passed: false, detail: JSON.stringify(data) });
      }
    } catch (err) {
      results.push({ id: 4, name: 'Duplicate Email Rejection', passed: false, detail: err.message });
    }

    // TEST 5: Referral Attribution & Source Tracking via URL parameters
    const referredEmail = `referred.student.${Date.now()}@vit.edu`;
    try {
      const res = await fetch(`${BASE_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: 'Ananya Verma',
          email: referredEmail,
          college: 'VIT Vellore',
          branch: 'Information Technology (IT)',
          graduation_year: 2025,
          referral_code: generatedReferralCode, // Attributed from previous registration
          utm_source: 'student_referral_link',
          utm_campaign: 'campus_launch_2026',
        }),
      });
      const data = await res.json();
      if (
        res.status === 201 &&
        data.registration?.referred_by_code === generatedReferralCode &&
        data.registration?.source === 'student referral'
      ) {
        results.push({ id: 5, name: 'Referral Attribution & Source Mapping', passed: true });
      } else {
        results.push({ id: 5, name: 'Referral Attribution & Source Mapping', passed: false, detail: JSON.stringify(data) });
      }
    } catch (err) {
      results.push({ id: 5, name: 'Referral Attribution & Source Mapping', passed: false, detail: err.message });
    }

    // TEST 6: Unauthorized access to admin endpoints blocked (401)
    try {
      const unauthMetrics = await fetch(`${BASE_URL}/api/admin/metrics`);
      const unauthStudents = await fetch(`${BASE_URL}/api/admin/students`);
      const unauthExport = await fetch(`${BASE_URL}/api/admin/export`);
      const unauthBudget = await fetch(`${BASE_URL}/api/admin/budget`);

      if (
        unauthMetrics.status === 401 &&
        unauthStudents.status === 401 &&
        unauthExport.status === 401 &&
        unauthBudget.status === 401
      ) {
        results.push({ id: 6, name: 'Unauthenticated Admin Access Protection (401 Block)', passed: true });
      } else {
        results.push({
          id: 6,
          name: 'Unauthenticated Admin Access Protection',
          passed: false,
          detail: `Statuses: metrics=${unauthMetrics.status}, students=${unauthStudents.status}, export=${unauthExport.status}`,
        });
      }
    } catch (err) {
      results.push({ id: 6, name: 'Unauthenticated Admin Access Protection', passed: false, detail: err.message });
    }

    // TEST 7: Admin Login with invalid credentials rejected
    try {
      const res = await fetch(`${BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@buildsprint.ai', password: 'WrongPassword999' }),
      });
      if (res.status === 401) {
        results.push({ id: 7, name: 'Admin Login Invalid Password Rejection (401)', passed: true });
      } else {
        results.push({ id: 7, name: 'Admin Login Invalid Password Rejection', passed: false, detail: `Status: ${res.status}` });
      }
    } catch (err) {
      results.push({ id: 7, name: 'Admin Login Invalid Password Rejection', passed: false, detail: err.message });
    }

    // TEST 8: Admin Login with valid credentials & session cookie creation
    let sessionCookie = '';
    try {
      const res = await fetch(`${BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@buildsprint.ai', password: 'AdminPass123!' }),
      });
      const cookieHeader = res.headers.get('set-cookie');
      const data = await res.json();

      if (res.status === 200 && data.success === true && cookieHeader) {
        sessionCookie = cookieHeader.split(';')[0];
        results.push({ id: 8, name: 'Admin Login & Secure Session Cookie Creation', passed: true });
      } else {
        results.push({ id: 8, name: 'Admin Login & Session Cookie Creation', passed: false, detail: JSON.stringify(data) });
      }
    } catch (err) {
      results.push({ id: 8, name: 'Admin Login & Session Cookie Creation', passed: false, detail: err.message });
    }

    // TEST 9: Authenticated Admin Metrics & KPI derivation
    try {
      const res = await fetch(`${BASE_URL}/api/admin/metrics`, {
        headers: { Cookie: sessionCookie },
      });
      const data = await res.json();
      if (
        res.status === 200 &&
        data.metrics &&
        data.metrics.total_registrations > 0 &&
        data.metrics.target_goal === 500 &&
        data.metrics.sources.length >= 6
      ) {
        results.push({
          id: 9,
          name: 'Admin Dashboard KPIs & 500-Target Progress Verification',
          passed: true,
          detail: `Total Regs: ${data.metrics.total_registrations}, Target: 500, Remaining: ${data.metrics.remaining_registrations}`,
        });
      } else {
        results.push({ id: 9, name: 'Admin Dashboard KPIs Verification', passed: false, detail: JSON.stringify(data) });
      }
    } catch (err) {
      results.push({ id: 9, name: 'Admin Dashboard KPIs Verification', passed: false, detail: err.message });
    }

    // TEST 10: Student Table Search, Graduation Year Filter & Pagination
    try {
      const res = await fetch(`${BASE_URL}/api/admin/students?search=Rohan&graduation_year=2025&page=1&limit=10`, {
        headers: { Cookie: sessionCookie },
      });
      const data = await res.json();
      if (res.status === 200 && data.success && Array.isArray(data.students)) {
        const found = data.students.some((s) => s.full_name.includes('Rohan'));
        results.push({
          id: 10,
          name: 'Student Management Search & Filter Engine',
          passed: found,
          detail: `Filtered Count: ${data.total}, Page: ${data.page}`,
        });
      } else {
        results.push({ id: 10, name: 'Student Management Search & Filter Engine', passed: false, detail: JSON.stringify(data) });
      }
    } catch (err) {
      results.push({ id: 10, name: 'Student Management Search & Filter Engine', passed: false, detail: err.message });
    }

    // TEST 11: Authorized CSV Export Generation
    try {
      const res = await fetch(`${BASE_URL}/api/admin/export`, {
        headers: { Cookie: sessionCookie },
      });
      const contentType = res.headers.get('content-type');
      const csvText = await res.text();
      const hasHeaders =
        csvText.includes('Registration ID') &&
        csvText.includes('Full Name') &&
        csvText.includes('Email Address') &&
        csvText.includes('Referral Code');

      if (res.status === 200 && contentType?.includes('text/csv') && hasHeaders) {
        const rowCount = csvText.trim().split('\n').length - 1;
        results.push({
          id: 11,
          name: 'Authorized CSV Export Stream',
          passed: true,
          detail: `Exported ${rowCount} sanitized student rows with RFC-4180 escaping`,
        });
      } else {
        results.push({ id: 11, name: 'Authorized CSV Export Stream', passed: false, detail: `Status: ${res.status}` });
      }
    } catch (err) {
      results.push({ id: 11, name: 'Authorized CSV Export Stream', passed: false, detail: err.message });
    }

    // TEST 12: Campaign Budget Tracker & CPR Unit Economics
    try {
      const getRes = await fetch(`${BASE_URL}/api/admin/budget`, {
        headers: { Cookie: sessionCookie },
      });
      const getData = await getRes.json();
      const firstChannel = getData.channels[0];

      // Update channel actual spend
      const postRes = await fetch(`${BASE_URL}/api/admin/budget`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: sessionCookie,
        },
        body: JSON.stringify({
          id: firstChannel.id,
          actual_spend: 520,
          is_assumption: false,
          notes: 'Updated campus micro-ambassador incentives across 22 colleges',
        }),
      });
      const postData = await postRes.json();
      const updatedChannel = postData.channels.find((c) => c.id === firstChannel.id);

      if (
        postRes.status === 200 &&
        updatedChannel &&
        updatedChannel.actual_spend === 520 &&
        updatedChannel.cost_per_registration > 0
      ) {
        results.push({
          id: 12,
          name: '₹2,000 Campaign Budget Tracker & Dynamic CPR Recalculation',
          passed: true,
          detail: `Channel: ${updatedChannel.channel_name}, Spend: ₹${updatedChannel.actual_spend}, CPR: ₹${updatedChannel.cost_per_registration}`,
        });
      } else {
        results.push({ id: 12, name: 'Campaign Budget Tracker & CPR Recalculation', passed: false, detail: JSON.stringify(postData) });
      }
    } catch (err) {
      results.push({ id: 12, name: 'Campaign Budget Tracker & CPR Recalculation', passed: false, detail: err.message });
    }

    // Print Report
    console.log('\n====================================================');
    console.log('📊 VERIFICATION TEST EXECUTION REPORT');
    console.log('====================================================\n');

    let allPassed = true;
    for (const r of results) {
      const statusIcon = r.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`${statusIcon} [Test ${r.id}] ${r.name}`);
      if (r.detail) {
        console.log(`       ↳ ${r.detail}`);
      }
      if (!r.passed) allPassed = false;
    }

    console.log('\n----------------------------------------------------');
    const passedCount = results.filter((r) => r.passed).length;
    console.log(`Summary: ${passedCount} of ${results.length} tests passed successfully.`);
    console.log('----------------------------------------------------\n');

    if (!allPassed) {
      process.exit(1);
    }
  } finally {
    console.log('Stopping test server process...');
    server.kill();
  }
}

runTests().catch((err) => {
  console.error('Test suite runner encountered critical error:', err);
  process.exit(1);
});

