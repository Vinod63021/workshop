import { BudgetChannel, Registration, SourceCategory } from './types';

export const INITIAL_BUDGET_CHANNELS: BudgetChannel[] = [
  {
    id: 'b-1',
    channel_name: 'WhatsApp Campus Ambassadors & College Outreach',
    category: 'college club',
    planned_spend: 600,
    actual_spend: 450,
    registrations: 68,
    cost_per_registration: 6.62,
    notes: 'Micro-incentives for campus tech club presidents & CRs across 18 colleges',
    is_assumption: false,
  },
  {
    id: 'b-2',
    channel_name: 'Student Referral Loop (Peer-to-Peer)',
    category: 'student referral',
    planned_spend: 400,
    actual_spend: 250,
    registrations: 52,
    cost_per_registration: 4.81,
    notes: 'Access perks & priority code review for top student ambassadors',
    is_assumption: false,
  },
  {
    id: 'b-3',
    channel_name: 'Targeted Meta / Instagram Story Micro-Ads',
    category: 'paid promotion',
    planned_spend: 600,
    actual_spend: 450,
    registrations: 38,
    cost_per_registration: 11.84,
    notes: 'Geo-targeted around tier-1 & tier-2 engineering campuses (Age 20-23)',
    is_assumption: false,
  },
  {
    id: 'b-4',
    channel_name: 'College Tech Club Discord & Telegram Broadcasts',
    category: 'WhatsApp/community',
    planned_spend: 200,
    actual_spend: 0,
    registrations: 22,
    cost_per_registration: 0,
    notes: 'Organic partner broadcasts; zero actual spend incurred',
    is_assumption: false,
  },
  {
    id: 'b-5',
    channel_name: 'Direct Email & Alumni Network Outreach',
    category: 'email',
    planned_spend: 100,
    actual_spend: 0,
    registrations: 14,
    cost_per_registration: 0,
    notes: 'Organized through departmental placement & coding club listservs',
    is_assumption: true,
  },
  {
    id: 'b-6',
    channel_name: 'Direct & Unattributed Word-of-Mouth',
    category: 'other',
    planned_spend: 100,
    actual_spend: 0,
    registrations: 11,
    cost_per_registration: null,
    notes: 'Organic campus direct traffic; no spend assigned',
    is_assumption: true,
  },
];

const COLLEGES = [
  'Vellore Institute of Technology (VIT), Vellore',
  'National Institute of Technology (NIT), Trichy',
  'BITS Pilani, Hyderabad Campus',
  'Delhi Technological University (DTU)',
  'SRM Institute of Science and Technology, Chennai',
  'PSG College of Technology, Coimbatore',
  'College of Engineering, Guindy (CEG Anna University)',
  'Thapar Institute of Engineering and Technology, Patiala',
  'Jawaharlal Nehru Technological University (JNTU), Hyderabad',
  'Manipal Institute of Technology (MIT), Manipal',
  'Ramaiah Institute of Technology, Bengaluru',
  'Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad',
  'Indian Institute of Information Technology (IIIT), Allahabad',
  'Coimbatore Institute of Technology (CIT)',
  'Vasavi College of Engineering, Hyderabad',
];

const BRANCHES = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Artificial Intelligence & Data Science (AI/DS)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Mechanical Engineering (ME)',
];

const FIRST_NAMES = [
  'Aarav', 'Ananya', 'Rohan', 'Sneha', 'Vikram', 'Pooja', 'Aditya', 'Divya',
  'Karthik', 'Meera', 'Siddharth', 'Ishita', 'Arjun', 'Priya', 'Nikhil', 'Tanvi',
  'Varun', 'Rhea', 'Gautam', 'Kavya', 'Rahul', 'Shreya', 'Abhishek', 'Swati',
  'Manoj', 'Anushka', 'Harsh', 'Neha', 'Pranav', 'Bhavna', 'Akash', 'Deepika',
  'Rishabh', 'Aditi', 'Tejas', 'Sanjana', 'Sai', 'Keerthi', 'Tarun', 'Anjali',
];

const LAST_NAMES = [
  'Sharma', 'Verma', 'Patel', 'Reddy', 'Iyer', 'Nair', 'Rao', 'Kumar',
  'Gupta', 'Singh', 'Choudhury', 'Joshi', 'Menon', 'Bhat', 'Deshmukh',
  'Agarwal', 'Chatterjee', 'Kulkarni', 'Pillai', 'Saxena', 'Mehta', 'Das',
];

export function generateSeedRegistrations(): Registration[] {
  const registrations: Registration[] = [];
  const baseTime = new Date('2026-10-24T09:00:00Z').getTime();

  // Primary ambassadors who share their code
  const ambassadors = [
    { name: 'Karthik Reddy', college: 'BITS Pilani, Hyderabad Campus', code: 'BS-KAR-4921' },
    { name: 'Sneha Iyer', college: 'Vellore Institute of Technology (VIT), Vellore', code: 'BS-SNE-8812' },
    { name: 'Rohan Sharma', college: 'Delhi Technological University (DTU)', code: 'BS-ROH-3190' },
    { name: 'Divya Nair', college: 'PSG College of Technology, Coimbatore', code: 'BS-DIV-7743' },
    { name: 'Aditya Rao', college: 'Chaitanya Bharathi Institute of Technology (CBIT), Hyderabad', code: 'BS-ADI-6205' },
  ];

  // Distribution of sources matching the 205 total seed registrations
  const sourceDistribution: { source: SourceCategory; count: number }[] = [
    { source: 'college club', count: 68 },
    { source: 'student referral', count: 52 },
    { source: 'paid promotion', count: 38 },
    { source: 'WhatsApp/community', count: 22 },
    { source: 'email', count: 14 },
    { source: 'other', count: 11 },
  ];

  let idCounter = 1;
  const usedEmails = new Set<string>();

  for (const group of sourceDistribution) {
    for (let i = 0; i < group.count; i++) {
      const fName = FIRST_NAMES[(idCounter * 7 + i) % FIRST_NAMES.length];
      const lName = LAST_NAMES[(idCounter * 5 + i) % LAST_NAMES.length];
      const fullName = `${fName} ${lName}`;
      let email = `${fName.toLowerCase()}.${lName.toLowerCase()}${idCounter}@gmail.com`;
      if (usedEmails.has(email)) {
        email = `${fName.toLowerCase()}${idCounter}_${lName.toLowerCase()}@outlook.com`;
      }
      usedEmails.add(email);

      const college = COLLEGES[(idCounter + i * 3) % COLLEGES.length];
      const branch = BRANCHES[(idCounter + i) % BRANCHES.length];
      // Final-year bias: mostly 2025 (or 2026), some 2027
      const gradYear = (idCounter % 5 === 0) ? 2026 : (idCounter % 15 === 0 ? 2027 : 2025);

      // Distribute creation time across Day 1 to Day 4
      const dayOffset = Math.min(3.8, (idCounter / 205) * 4);
      const randomMinutes = ((idCounter * 37) % 1440) * 60 * 1000;
      const createdAt = new Date(baseTime + dayOffset * 86400000 + randomMinutes).toISOString();

      let referredBy: string | null = null;
      if (group.source === 'student referral') {
        const amb = ambassadors[i % ambassadors.length];
        referredBy = amb.code;
      }

      registrations.push({
        id: `demo-reg-${idCounter}`,
        full_name: fullName,
        email,
        college,
        branch,
        graduation_year: gradYear,
        referral_code: `BS-${fName.substring(0, 3).toUpperCase()}-${1000 + (idCounter * 43) % 8999}`,
        referred_by_code: referredBy,
        source: group.source,
        utm_source: group.source === 'paid promotion' ? 'instagram_meta' : (group.source === 'college club' ? 'ieee_bits' : null),
        utm_medium: group.source === 'paid promotion' ? 'cpc' : 'community_broadcast',
        utm_campaign: 'buildsprint_launch_7d',
        created_at: createdAt,
        is_demo: true,
      });

      idCounter++;
    }
  }

  return registrations;
}
