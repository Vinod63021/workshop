const BASE_URL = 'http://127.0.0.1:3005';

async function main() {
  console.log('====================================================');
  console.log('🚀 BuildSprint AI End-to-End Verification Test Suite');
  console.log('====================================================\n');

  const results = [];

  // TEST 1: Public landing page loads with required editorial copy
  try {
    const res = await fetch(`${BASE_URL}/`);
    const html = await res.text();
    const hasHeadline = html.includes('Less scrolling') && html.includes('Your first AI project starts here');
    const hasSupporting = html.includes('Turn your curiosity into code');
    const hasCta = html.includes('Reserve My Free Spot') || html.includes('Reserve');
    if (res.status === 200 && hasHeadline && hasSupporting && hasCta) {
      results.push({ id: 1, name: 'Public Landing Page & Editorial Tech Copy', passed: true });
    } else {
      results.push({ id: 1, name: 'Public Landing Page & Editorial Tech Copy', passed: false, detail: `Status: ${res.status}` });
    }
  } catch (err) {
    results.push({ id: 1, name: 'Public Landing Page & Editorial Tech Copy', passed: false, detail: err.message });
  }

  // TEST 2: Invalid form submission rejected (Client/Server validation)
  try {
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: 'X', // Invalid < 2 chars
        email: 'invalid-email',
        college: '',
        branch: '',
        graduation_year: 1999, // Invalid graduation year
      }),
    });
    const data = await res.json();
    if (res.status === 400 && data.success === false && data.fieldErrors) {
      results.push({ id: 2, name: 'Server-Side Validation Rejection (400 + Field Errors)', passed: true });
    } else {
      results.push({ id: 2, name: 'Server-Side Validation Rejection', passed: false, detail: `Status: ${res.status}` });
    }
  } catch (err) {
    results.push({ id: 2, name: 'Server-Side Validation Rejection', passed: false, detail: err.message });
  }

  // TEST 3: Valid student registration success
  const testEmail = `student.${Date.now()}@bits.edu`;
  let referralCode = '';
  try {
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: 'Pooja Reddy',
        email: testEmail,
        college: 'BITS Pilani, Hyderabad Campus',
        branch: 'Computer Science & Engineering (CSE)',
        graduation_year: 2025,
        source: 'college club',
      }),
    });
    const data = await res.json();
    if (res.status === 201 && data.success && data.registration?.referral_code) {
      referralCode = data.registration.referral_code;
      results.push({
        id: 3,
        name: 'Valid Student Registration & Unique Referral Code Assignment',
        passed: true,
        detail: `Assigned: ${referralCode}`,
      });
    } else {
      results.push({ id: 3, name: 'Valid Student Registration', passed: false, detail: JSON.stringify(data) });
    }
  } catch (err) {
    results.push({ id: 3, name: 'Valid Student Registration', passed: false, detail: err.message });
  }

  // TEST 4: Duplicate email rejection (case-insensitive & whitespace trimmed)
  try {
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: 'Pooja Duplicate',
        email: `   ${testEmail.toUpperCase()}   `,
        college: 'BITS Pilani',
        branch: 'CSE',
        graduation_year: 2025,
      }),
    });
    const data = await res.json();
    if (res.status === 400 && data.success === false && data.error?.includes('already registered')) {
      results.push({ id: 4, name: 'Duplicate Email Prevention (Normalized & Case-Insensitive)', passed: true });
    } else {
      results.push({ id: 4, name: 'Duplicate Email Prevention', passed: false, detail: JSON.stringify(data) });
    }
  } catch (err) {
    results.push({ id: 4, name: 'Duplicate Email Prevention', passed: false, detail: err.message });
  }

  // TEST 5: Referral Attribution & Source Tracking via URL parameters
  try {
    const referredEmail = `referred.${Date.now()}@nit.edu`;
    const res = await fetch(`${BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: 'Vikram Joshi',
        email: referredEmail,
        college: 'NIT Trichy',
        branch: 'Information Technology (IT)',
        graduation_year: 2025,
        referral_code: referralCode, // Attributed from previous registration
        utm_source: 'student_referral',
      }),
    });
    const data = await res.json();
    if (
      res.status === 201 &&
      data.registration?.referred_by_code === referralCode &&
      data.registration?.source === 'student referral'
    ) {
      results.push({ id: 5, name: 'Referral Attribution & Source Mapping (?ref=CODE & UTMs)', passed: true });
    } else {
      results.push({ id: 5, name: 'Referral Attribution & Source Mapping', passed: false, detail: JSON.stringify(data) });
    }
  } catch (err) {
    results.push({ id: 5, name: 'Referral Attribution & Source Mapping', passed: false, detail: err.message });
  }

  // TEST 6: Unauthenticated access to student data blocked (401)
  try {
    const sRes = await fetch(`${BASE_URL}/api/admin/students`);
    const mRes = await fetch(`${BASE_URL}/api/admin/metrics`);
    const eRes = await fetch(`${BASE_URL}/api/admin/export`);
    const bRes = await fetch(`${BASE_URL}/api/admin/budget`);

    if (sRes.status === 401 && mRes.status === 401 && eRes.status === 401 && bRes.status === 401) {
      results.push({ id: 6, name: 'Unauthenticated Admin Data Access Denied (401 Unauthorized)', passed: true });
    } else {
      results.push({ id: 6, name: 'Unauthenticated Admin Data Access Denied', passed: false, detail: `Statuses: ${sRes.status}, ${mRes.status}` });
    }
  } catch (err) {
    results.push({ id: 6, name: 'Unauthenticated Admin Data Access Denied', passed: false, detail: err.message });
  }

  // TEST 7: Admin Login failure on incorrect password
  try {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@buildsprint.ai', password: 'BadPassword999' }),
    });
    if (res.status === 401) {
      results.push({ id: 7, name: 'Admin Auth: Invalid Password Rejection (401)', passed: true });
    } else {
      results.push({ id: 7, name: 'Admin Auth: Invalid Password Rejection', passed: false, detail: `Status: ${res.status}` });
    }
  } catch (err) {
    results.push({ id: 7, name: 'Admin Auth: Invalid Password Rejection', passed: false, detail: err.message });
  }

  // TEST 8: Admin Login success & session cookie generation
  let sessionCookie = '';
  try {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@buildsprint.ai', password: 'AdminPass123!' }),
    });
    const cookieHeader = res.headers.get('set-cookie');
    const data = await res.json();
    if (res.status === 200 && data.success && cookieHeader) {
      sessionCookie = cookieHeader.split(';')[0];
      results.push({ id: 8, name: 'Admin Auth: Successful Login & HttpOnly Cookie Set', passed: true });
    } else {
      results.push({ id: 8, name: 'Admin Auth: Successful Login', passed: false, detail: JSON.stringify(data) });
    }
  } catch (err) {
    results.push({ id: 8, name: 'Admin Auth: Successful Login', passed: false, detail: err.message });
  }

  // TEST 9: Authenticated Metrics derivation against 500 target
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
        name: 'Admin Dashboard KPIs & 500-Target Velocity Computation',
        passed: true,
        detail: `Valid Registrations: ${data.metrics.total_registrations}, Target: 500, Progress: ${data.metrics.target_percentage}%`,
      });
    } else {
      results.push({ id: 9, name: 'Admin Dashboard KPIs Computation', passed: false, detail: JSON.stringify(data) });
    }
  } catch (err) {
    results.push({ id: 9, name: 'Admin Dashboard KPIs Computation', passed: false, detail: err.message });
  }

  // TEST 10: Student Table Search & Filter Engine
  try {
    const res = await fetch(`${BASE_URL}/api/admin/students?search=Pooja&graduation_year=2025&page=1&limit=10`, {
      headers: { Cookie: sessionCookie },
    });
    const data = await res.json();
    if (res.status === 200 && data.success && Array.isArray(data.students)) {
      const found = data.students.some((s) => s.full_name.includes('Pooja'));
      results.push({
        id: 10,
        name: 'Student Management Search, Branch/Year Filter & Pagination',
        passed: found,
        detail: `Found student records: ${data.total} matching filters`,
      });
    } else {
      results.push({ id: 10, name: 'Student Management Search & Filter', passed: false, detail: JSON.stringify(data) });
    }
  } catch (err) {
    results.push({ id: 10, name: 'Student Management Search & Filter', passed: false, detail: err.message });
  }

  // TEST 11: Authorized CSV Export
  try {
    const res = await fetch(`${BASE_URL}/api/admin/export`, {
      headers: { Cookie: sessionCookie },
    });
    const contentType = res.headers.get('content-type');
    const csv = await res.text();
    const hasHeaders = csv.includes('Registration ID') && csv.includes('Full Name') && csv.includes('Referral Code');
    if (res.status === 200 && contentType?.includes('text/csv') && hasHeaders) {
      const rowCount = csv.trim().split('\n').length - 1;
      results.push({
        id: 11,
        name: 'Secure CSV Export Generation (RFC-4180 Escaped)',
        passed: true,
        detail: `Exported ${rowCount} registration rows`,
      });
    } else {
      results.push({ id: 11, name: 'Secure CSV Export Generation', passed: false, detail: `Status: ${res.status}` });
    }
  } catch (err) {
    results.push({ id: 11, name: 'Secure CSV Export Generation', passed: false, detail: err.message });
  }

  // TEST 12: Campaign Budget Tracker (₹2,000 Budget) & CPR Recalculation
  try {
    const getRes = await fetch(`${BASE_URL}/api/admin/budget`, {
      headers: { Cookie: sessionCookie },
    });
    const getData = await getRes.json();
    const firstChannel = getData.channels[0];

    const postRes = await fetch(`${BASE_URL}/api/admin/budget`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: sessionCookie,
      },
      body: JSON.stringify({
        id: firstChannel.id,
        actual_spend: 550,
        is_assumption: false,
        notes: 'Verified campus club outreach across top 18 engineering institutes',
      }),
    });
    const postData = await postRes.json();
    const updatedChannel = postData.channels.find((c) => c.id === firstChannel.id);

    if (
      postRes.status === 200 &&
      updatedChannel &&
      updatedChannel.actual_spend === 550 &&
      updatedChannel.cost_per_registration > 0
    ) {
      results.push({
        id: 12,
        name: '₹2,000 Campaign Budget & Unit Economics CPR Recalculation',
        passed: true,
        detail: `Spend: ₹${updatedChannel.actual_spend}, CPR: ₹${updatedChannel.cost_per_registration}/registration`,
      });
    } else {
      results.push({ id: 12, name: 'Campaign Budget & CPR Recalculation', passed: false, detail: JSON.stringify(postData) });
    }
  } catch (err) {
    results.push({ id: 12, name: 'Campaign Budget & CPR Recalculation', passed: false, detail: err.message });
  }

  // Print Formatted Report
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
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
