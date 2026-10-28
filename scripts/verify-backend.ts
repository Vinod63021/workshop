import {
  createRegistration,
  getRegistrations,
  getAdminMetrics,
  getBudgetChannels,
  updateBudgetChannel,
  getAllRegistrationsForExport,
  resetDemoStore,
  getStorageMode,
} from '../src/lib/storage';
import { normalizeEmail, isValidEmail, generateReferralCode, mapSourceCategory, sanitizeCsvField } from '../src/lib/utils';
import { DEMO_ADMIN_CREDENTIALS, createSessionCookieValue } from '../src/lib/auth';

async function runVerification() {
  console.log('====================================================');
  console.log('🚀 BuildSprint AI Core System & Backend Verification');
  console.log('====================================================\n');

  const results: { id: number; name: string; passed: boolean; detail?: string }[] = [];

  // Reset demo store before starting
  await resetDemoStore();

  // CHECKPOINT 1: Storage Mode Detection
  const mode = getStorageMode();
  results.push({
    id: 1,
    name: 'Storage Engine Mode Detection',
    passed: mode === 'demo' || mode === 'supabase',
    detail: `Current Mode: ${mode.toUpperCase()} (Honest indicator active)`,
  });

  // CHECKPOINT 2: Email Normalization & Validation Utility
  const rawEmail = '   Karthik.Reddy+Sprint@DTU.ac.in   ';
  const normEmail = normalizeEmail(rawEmail);
  const isValid = isValidEmail(normEmail);
  results.push({
    id: 2,
    name: 'Email Normalization & Validation Engine',
    passed: normEmail === 'karthik.reddy+sprint@dtu.ac.in' && isValid,
    detail: `Normalized to: ${normEmail}`,
  });

  // CHECKPOINT 3: Invalid Form Submission Rejection
  const invalidRes = await createRegistration({
    full_name: 'A', // too short (< 2 chars)
    email: 'not-an-email',
    college: '',
    branch: '',
    graduation_year: 1999, // invalid grad year
  });
  results.push({
    id: 3,
    name: 'Server-Side Input Validation (Rejects Invalid Submissions)',
    passed: invalidRes.success === false && Boolean(invalidRes.fieldErrors?.full_name),
    detail: `Rejected with errors: ${Object.keys(invalidRes.fieldErrors || {}).join(', ')}`,
  });

  // CHECKPOINT 4: Valid Student Registration & Referral Generation
  const uniqueStudentEmail = `vikram.mehta.${Date.now()}@bits-hyderabad.ac.in`;
  const validRes = await createRegistration({
    full_name: 'Vikram Mehta',
    email: uniqueStudentEmail,
    college: 'BITS Pilani, Hyderabad Campus',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    source: 'college club',
  });
  const generatedCode = validRes.registration?.referral_code || '';
  results.push({
    id: 4,
    name: 'Valid Student Registration & Unique Referral Code Assignment',
    passed: validRes.success === true && Boolean(generatedCode.startsWith('BS-')),
    detail: `Created Student ID: ${validRes.registration?.id}, Assigned Referral Code: ${generatedCode}`,
  });

  // CHECKPOINT 5: Duplicate Email Rejection (Case-Insensitive & Trimmed)
  const duplicateRes = await createRegistration({
    full_name: 'Vikram Duplicate Attempt',
    email: `   ${uniqueStudentEmail.toUpperCase()}   `,
    college: 'BITS Pilani',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
  });
  results.push({
    id: 5,
    name: 'Duplicate Email Prevention (Normalized & Case-Insensitive)',
    passed: duplicateRes.success === false && Boolean(duplicateRes.error?.includes('already registered')),
    detail: `Duplicate detected: "${duplicateRes.error}"`,
  });

  // CHECKPOINT 6: Referral Attribution Loop & Source Auto-Mapping
  const referredStudentEmail = `ananya.sharma.${Date.now()}@dtu.ac.in`;
  const referredRes = await createRegistration({
    full_name: 'Ananya Sharma',
    email: referredStudentEmail,
    college: 'Delhi Technological University (DTU)',
    branch: 'Information Technology (IT)',
    graduation_year: 2025,
    referral_code: generatedCode, // Recommender's referral code
    utm_source: 'peer_whatsapp_invite',
    utm_campaign: 'buildsprint_launch_7d',
  });
  results.push({
    id: 6,
    name: 'Referral Attribution Loop & Source Classification',
    passed:
      referredRes.success === true &&
      referredRes.registration?.referred_by_code === generatedCode &&
      referredRes.registration?.source === 'student referral',
    detail: `Attributed to Recommender: ${referredRes.registration?.referred_by_code}, Category: ${referredRes.registration?.source}`,
  });

  // CHECKPOINT 7: Source Mapping Rule Hierarchy
  const source1 = mapSourceCategory('IEEE Student Branch', null, false);
  const source2 = mapSourceCategory(null, 'meta_instagram_ads', false);
  const source3 = mapSourceCategory(null, null, true); // has referral code
  results.push({
    id: 7,
    name: 'Acquisition Source Taxonomy Mapping (6 Allowed Channels)',
    passed: source1 === 'college club' && source2 === 'paid promotion' && source3 === 'student referral',
    detail: `Mapped categories: "${source1}", "${source2}", "${source3}"`,
  });

  // CHECKPOINT 8: Student Search & Filter Engine
  const searchResult = await getRegistrations({
    search: 'Vikram',
    graduation_year: '2025',
    page: 1,
    limit: 10,
  });
  const foundStudent = searchResult.students.some((s) => s.full_name.includes('Vikram'));
  results.push({
    id: 8,
    name: 'Student Table Search & Filter Engine',
    passed: searchResult.total >= 1 && foundStudent,
    detail: `Returned ${searchResult.total} matching student records across search query`,
  });

  // CHECKPOINT 9: Admin Metrics & 500-Target Velocity Computation
  const metrics = await getAdminMetrics();
  const has500Target = metrics.target_goal === 500;
  const hasValidSources = metrics.sources.length === 6;
  const hasTimeline = metrics.timeline.length === 7;
  results.push({
    id: 9,
    name: 'Admin Dashboard 500-Target KPIs & Velocity Computation',
    passed: has500Target && hasValidSources && hasTimeline && metrics.total_registrations > 0,
    detail: `Total Regs: ${metrics.total_registrations}, Goal: 500, Completed: ${metrics.target_percentage}%, Daily Run-Rate Needed: +${metrics.daily_run_rate_needed}/day`,
  });

  // CHECKPOINT 10: Top Ambassador Leaderboard
  const topAmb = metrics.top_ambassadors;
  const hasAmbassadors = topAmb.length > 0;
  results.push({
    id: 10,
    name: 'Top Student Ambassador & Viral Leaderboard',
    passed: hasAmbassadors,
    detail: `Leader: ${topAmb[0]?.student_name} (${topAmb[0]?.referral_code}) with ${topAmb[0]?.referrals_count} referrals`,
  });

  // CHECKPOINT 11: Campaign Budget Tracker & Dynamic CPR Recalculation (₹2,000 Budget)
  const channels = await getBudgetChannels();
  const firstChannel = channels[0];
  const updatedChannel = await updateBudgetChannel(firstChannel.id, {
    actual_spend: 480,
    is_assumption: false,
    notes: 'Micro-incentives across top 18 engineering campus clubs',
  });
  results.push({
    id: 11,
    name: '₹2,000 Campaign Budget & Unit Economics CPR Recalculation',
    passed: Boolean(
      updatedChannel &&
      updatedChannel.actual_spend === 480 &&
      updatedChannel.cost_per_registration !== null &&
      updatedChannel.cost_per_registration > 0
    ),
    detail: `Channel: ${updatedChannel?.channel_name}, Spend: ₹${updatedChannel?.actual_spend}, CPR: ₹${updatedChannel?.cost_per_registration}/lead`,
  });

  // CHECKPOINT 12: CSV Export Sanitization
  const exportStudents = await getAllRegistrationsForExport();
  const sampleRow = exportStudents[0];
  const escapedName = sanitizeCsvField(sampleRow.full_name);
  results.push({
    id: 12,
    name: 'CSV Export Formatting & Injection Sanitization',
    passed: exportStudents.length > 0 && escapedName.startsWith('"') && escapedName.endsWith('"'),
    detail: `Sanitized export record count: ${exportStudents.length} students ready for download`,
  });

  // PRINT SUMMARY REPORT
  console.log('\n====================================================');
  console.log('📊 VERIFICATION TEST EXECUTION REPORT');
  console.log('====================================================\n');

  let allPassed = true;
  for (const r of results) {
    const statusIcon = r.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${statusIcon} [Checkpoint ${r.id}] ${r.name}`);
    if (r.detail) {
      console.log(`       ↳ ${r.detail}`);
    }
    if (!r.passed) allPassed = false;
  }

  console.log('\n----------------------------------------------------');
  const passedCount = results.filter((r) => r.passed).length;
  console.log(`Summary: ${passedCount} of ${results.length} checkpoints passed successfully.`);
  console.log('----------------------------------------------------\n');

  if (!allPassed) {
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});

