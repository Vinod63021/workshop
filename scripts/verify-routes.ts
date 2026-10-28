import { POST as registerHandler } from '../src/app/api/register/route';
import { POST as loginHandler } from '../src/app/api/admin/login/route';
import { GET as metricsHandler } from '../src/app/api/admin/metrics/route';
import { GET as studentsHandler } from '../src/app/api/admin/students/route';
import { GET as budgetGetHandler, POST as budgetPostHandler } from '../src/app/api/admin/budget/route';
import { GET as exportHandler } from '../src/app/api/admin/export/route';
import { resetDemoStore } from '../src/lib/storage';

async function testRoutes() {
  console.log('====================================================');
  console.log('🌐 BuildSprint AI API Route Handler Verification');
  console.log('====================================================\n');

  await resetDemoStore();
  const results: { id: number; name: string; passed: boolean; detail?: string }[] = [];

  // 1. POST /api/register with invalid data
  try {
    const req = new Request('http://localhost/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: 'J', email: 'bad' }),
    });
    const res = await registerHandler(req);
    const data = await res.json();
    results.push({
      id: 1,
      name: 'API Route: POST /api/register Invalid Payload (400 Bad Request)',
      passed: res.status === 400 && data.success === false,
      detail: `Status: ${res.status}, Error: ${data.error}`,
    });
  } catch (err: any) {
    results.push({ id: 1, name: 'API Route: POST /api/register Invalid Payload', passed: false, detail: err.message });
  }

  // 2. POST /api/register with valid student
  const testEmail = `student.route.${Date.now()}@srm.edu.in`;
  let assignedReferral = '';
  try {
    const req = new Request('http://localhost/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: 'Sneha Sundaram',
        email: testEmail,
        college: 'SRM Institute of Science and Technology, Chennai',
        branch: 'Artificial Intelligence & Data Science (AI/DS)',
        graduation_year: 2025,
        source: 'college club',
      }),
    });
    const res = await registerHandler(req);
    const data = await res.json();
    assignedReferral = data.registration?.referral_code || '';
    results.push({
      id: 2,
      name: 'API Route: POST /api/register Valid Submission (201 Created)',
      passed: res.status === 201 && data.success === true && Boolean(assignedReferral),
      detail: `Status: ${res.status}, Assigned Referral: ${assignedReferral}`,
    });
  } catch (err: any) {
    results.push({ id: 2, name: 'API Route: POST /api/register Valid Submission', passed: false, detail: err.message });
  }

  // 3. POST /api/register duplicate rejection
  try {
    const req = new Request('http://localhost/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: 'Sneha Duplicate',
        email: `  ${testEmail.toUpperCase()}  `,
        college: 'SRM',
        branch: 'AI/DS',
        graduation_year: 2025,
      }),
    });
    const res = await registerHandler(req);
    const data = await res.json();
    results.push({
      id: 3,
      name: 'API Route: POST /api/register Duplicate Email Prevention (400)',
      passed: res.status === 400 && data.success === false && data.error?.includes('already registered'),
      detail: `Status: ${res.status}, Message: "${data.error}"`,
    });
  } catch (err: any) {
    results.push({ id: 3, name: 'API Route: POST /api/register Duplicate Prevention', passed: false, detail: err.message });
  }

  // 4. POST /api/admin/login invalid password
  try {
    const req = new Request('http://localhost/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@buildsprint.ai', password: 'WrongPassword' }),
    });
    const res = await loginHandler(req);
    results.push({
      id: 4,
      name: 'API Route: POST /api/admin/login Invalid Password Rejection (401)',
      passed: res.status === 401,
      detail: `Status: ${res.status}`,
    });
  } catch (err: any) {
    results.push({ id: 4, name: 'API Route: POST /api/admin/login Invalid Password', passed: false, detail: err.message });
  }

  // 5. Unauthenticated GET /api/admin/metrics blocked with 401
  try {
    const req = new Request('http://localhost/api/admin/metrics', { method: 'GET' });
    const res = await metricsHandler(req);
    results.push({
      id: 5,
      name: 'API Route: GET /api/admin/metrics Blocked Without Admin Auth (401)',
      passed: res.status === 401,
      detail: `Status: ${res.status}`,
    });
  } catch (err: any) {
    results.push({ id: 5, name: 'API Route: GET /api/admin/metrics Unauthenticated Block', passed: false, detail: err.message });
  }

  // 6. Authorized GET /api/admin/metrics with Bearer auth token
  try {
    const req = new Request('http://localhost/api/admin/metrics', {
      method: 'GET',
      headers: { Authorization: 'Bearer demo-admin-token-valid' },
    });
    const res = await metricsHandler(req);
    const data = await res.json();
    results.push({
      id: 6,
      name: 'API Route: GET /api/admin/metrics Authorized Response (200 OK)',
      passed: res.status === 200 && data.success === true && data.metrics?.target_goal === 500,
      detail: `Target Goal: ${data.metrics?.target_goal}, Total Registrations: ${data.metrics?.total_registrations}`,
    });
  } catch (err: any) {
    results.push({ id: 6, name: 'API Route: GET /api/admin/metrics Authorized Response', passed: false, detail: err.message });
  }

  // 7. Authorized GET /api/admin/students with pagination & search
  try {
    const req: any = new Request('http://localhost/api/admin/students?search=Sneha&graduation_year=2025', {
      method: 'GET',
      headers: { Authorization: 'Bearer demo-admin-token-valid' },
    });
    req.nextUrl = new URL('http://localhost/api/admin/students?search=Sneha&graduation_year=2025');
    const res = await studentsHandler(req);
    const data = await res.json();
    results.push({
      id: 7,
      name: 'API Route: GET /api/admin/students Filtered Paginated Data (200 OK)',
      passed: res.status === 200 && data.success === true && Array.isArray(data.students),
      detail: `Found ${data.total} students matching query "Sneha"`,
    });
  } catch (err: any) {
    results.push({ id: 7, name: 'API Route: GET /api/admin/students Filtered Data', passed: false, detail: err.message });
  }

  // 8. Authorized GET /api/admin/export CSV generation
  try {
    const req: any = new Request('http://localhost/api/admin/export', {
      method: 'GET',
      headers: { Authorization: 'Bearer demo-admin-token-valid' },
    });
    req.nextUrl = new URL('http://localhost/api/admin/export');
    const res = await exportHandler(req);
    const contentType = res.headers.get('content-type');
    const csv = await res.text();
    results.push({
      id: 8,
      name: 'API Route: GET /api/admin/export CSV Stream (200 OK, text/csv)',
      passed: res.status === 200 && contentType?.includes('text/csv') && csv.includes('Registration ID'),
      detail: `Generated CSV size: ${csv.length} bytes, Header: ${csv.split('\r\n')[0]}`,
    });
  } catch (err: any) {
    results.push({ id: 8, name: 'API Route: GET /api/admin/export CSV Stream', passed: false, detail: err.message });
  }

  // 9. Authorized POST /api/admin/budget update
  try {
    const req = new Request('http://localhost/api/admin/budget', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer demo-admin-token-valid',
      },
      body: JSON.stringify({
        id: 'b-1',
        actual_spend: 490,
        notes: 'Verified campus micro-incentives',
      }),
    });
    const res = await budgetPostHandler(req);
    const data = await res.json();
    results.push({
      id: 9,
      name: 'API Route: POST /api/admin/budget Spend Update & CPR Recalculation (200 OK)',
      passed: res.status === 200 && data.success === true && data.channel?.actual_spend === 490,
      detail: `Channel spend updated to ₹${data.channel?.actual_spend}, CPR: ₹${data.channel?.cost_per_registration}/lead`,
    });
  } catch (err: any) {
    results.push({ id: 9, name: 'API Route: POST /api/admin/budget Spend Update', passed: false, detail: err.message });
  }

  // PRINT SUMMARY REPORT
  console.log('\n====================================================');
  console.log('📊 API ROUTE VERIFICATION REPORT');
  console.log('====================================================\n');

  let allPassed = true;
  for (const r of results) {
    const statusIcon = r.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${statusIcon} [Route Test ${r.id}] ${r.name}`);
    if (r.detail) {
      console.log(`       ↳ ${r.detail}`);
    }
    if (!r.passed) allPassed = false;
  }

  console.log('\n----------------------------------------------------');
  const passedCount = results.filter((r) => r.passed).length;
  console.log(`Summary: ${passedCount} of ${results.length} API route tests passed successfully.`);
  console.log('----------------------------------------------------\n');

  if (!allPassed) process.exit(1);
}

testRoutes().catch((e) => {
  console.error(e);
  process.exit(1);
});

