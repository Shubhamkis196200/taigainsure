export interface ToolMeta {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  path: string;
}

export const toolCategories = [
  'Life & Health',
  'Property & Auto',
  'Specialty',
  'Business',
  'Planning & Review',
] as const;

export const tools: ToolMeta[] = [
  { id: 'life-insurance-calculator', title: 'Life Insurance Needs Calculator', description: 'Calculate your life insurance needs using the DIME method.', category: 'Life & Health', icon: 'Heart', path: '/tools/life-insurance-calculator' },
  { id: 'term-vs-whole-life', title: 'Term vs Whole Life Comparison', description: 'Compare term and whole life insurance policies side-by-side.', category: 'Life & Health', icon: 'Scale', path: '/tools/term-vs-whole-life' },
  { id: 'health-insurance-estimator', title: 'Health Insurance Premium Estimator', description: 'Estimate monthly health insurance premiums by age and plan tier.', category: 'Life & Health', icon: 'Stethoscope', path: '/tools/health-insurance-estimator' },
  { id: 'hsa-vs-fsa', title: 'HSA vs FSA Comparison Tool', description: 'Compare HSA and FSA to maximize your tax savings.', category: 'Life & Health', icon: 'Wallet', path: '/tools/hsa-vs-fsa' },
  { id: 'auto-insurance-estimator', title: 'Auto Insurance Premium Estimator', description: 'Estimate auto insurance based on age, record, and vehicle.', category: 'Property & Auto', icon: 'Car', path: '/tools/auto-insurance-estimator' },
  { id: 'home-insurance-calculator', title: 'Home Insurance Coverage Calculator', description: 'Calculate recommended homeowners insurance coverage.', category: 'Property & Auto', icon: 'Home', path: '/tools/home-insurance-calculator' },
  { id: 'renters-insurance-estimator', title: 'Renters Insurance Cost Estimator', description: 'Estimate renters insurance costs by location and coverage.', category: 'Property & Auto', icon: 'Building', path: '/tools/renters-insurance-estimator' },
  { id: 'umbrella-insurance-calculator', title: 'Umbrella Insurance Need Calculator', description: 'Determine if you need umbrella insurance and how much.', category: 'Property & Auto', icon: 'Umbrella', path: '/tools/umbrella-insurance-calculator' },
  { id: 'disability-insurance-calculator', title: 'Disability Insurance Calculator', description: 'Calculate disability insurance needs to protect your income.', category: 'Life & Health', icon: 'Shield', path: '/tools/disability-insurance-calculator' },
  { id: 'long-term-care-estimator', title: 'Long-Term Care Insurance Estimator', description: 'Estimate long-term care insurance costs by age and health.', category: 'Specialty', icon: 'Clock', path: '/tools/long-term-care-estimator' },
  { id: 'pet-insurance-calculator', title: 'Pet Insurance Cost Calculator', description: 'Calculate pet insurance costs by pet type, breed, and age.', category: 'Specialty', icon: 'PawPrint', path: '/tools/pet-insurance-calculator' },
  { id: 'travel-insurance-assessment', title: 'Travel Insurance Need Assessment', description: 'Assess travel insurance needs based on trip details.', category: 'Specialty', icon: 'Plane', path: '/tools/travel-insurance-assessment' },
  { id: 'medicare-comparison', title: 'Medicare Plan Comparison Guide', description: 'Compare Medicare Part A, B, C, and D plans.', category: 'Life & Health', icon: 'FileText', path: '/tools/medicare-comparison' },
  { id: 'deductible-optimizer', title: 'Deductible vs Premium Optimizer', description: 'Find the optimal deductible-premium balance.', category: 'Planning & Review', icon: 'Calculator', path: '/tools/deductible-optimizer' },
  { id: 'insurance-score-estimator', title: 'Insurance Score Estimator', description: 'Estimate your insurance score and premium impact.', category: 'Planning & Review', icon: 'BarChart', path: '/tools/insurance-score-estimator' },
  { id: 'flood-insurance-checker', title: 'Flood Insurance Zone Checker', description: 'Check flood risk and estimate flood insurance costs.', category: 'Specialty', icon: 'Droplets', path: '/tools/flood-insurance-checker' },
  { id: 'business-insurance-calculator', title: 'Business Insurance Cost Calculator', description: 'Estimate business insurance costs by industry and size.', category: 'Business', icon: 'Briefcase', path: '/tools/business-insurance-calculator' },
  { id: 'workers-comp-estimator', title: 'Workers Comp Premium Estimator', description: 'Estimate workers comp premiums by industry and payroll.', category: 'Business', icon: 'HardHat', path: '/tools/workers-comp-estimator' },
  { id: 'cyber-insurance-assessment', title: 'Cyber Insurance Need Assessment', description: 'Assess cyber insurance needs based on risk factors.', category: 'Business', icon: 'Lock', path: '/tools/cyber-insurance-assessment' },
  { id: 'insurance-gap-analyzer', title: 'Insurance Gap Analyzer', description: 'Identify gaps in your current insurance coverage.', category: 'Planning & Review', icon: 'Search', path: '/tools/insurance-gap-analyzer' },
  { id: 'beneficiary-planner', title: 'Beneficiary Planner', description: 'Organize beneficiary designations across all policies.', category: 'Planning & Review', icon: 'Users', path: '/tools/beneficiary-planner' },
  { id: 'policy-review-checklist', title: 'Insurance Policy Review Checklist', description: 'Comprehensive checklist to review your insurance policies.', category: 'Planning & Review', icon: 'ClipboardCheck', path: '/tools/policy-review-checklist' },
  { id: 'claim-documentation-generator', title: 'Claim Documentation Generator', description: 'Generate claim documentation checklists by claim type.', category: 'Planning & Review', icon: 'FileCheck', path: '/tools/claim-documentation-generator' },
  { id: 'coverage-overlap-finder', title: 'Coverage Overlap Finder', description: 'Find overlapping coverage across your policies.', category: 'Planning & Review', icon: 'Layers', path: '/tools/coverage-overlap-finder' },
  { id: 'annual-insurance-audit', title: 'Annual Insurance Audit Tool', description: 'Complete annual audit of all your insurance policies.', category: 'Planning & Review', icon: 'CheckCircle', path: '/tools/annual-insurance-audit' },
];

export interface BlogMeta {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  path: string;
}

export const blogPosts: BlogMeta[] = [
  { id: 'insurance-basics', title: 'Insurance Basics: A Complete Guide for Beginners', description: 'Everything you need to know about insurance — types, terms, and why you need it.', date: '2026-01-15', readTime: '12 min read', path: '/blog/insurance-basics' },
  { id: 'coverage-gaps', title: 'Hidden Coverage Gaps That Could Cost You Thousands', description: 'Discover the most common insurance coverage gaps and how to protect yourself.', date: '2026-01-22', readTime: '10 min read', path: '/blog/coverage-gaps' },
  { id: 'saving-on-premiums', title: '15 Proven Ways to Save on Insurance Premiums', description: 'Practical strategies to reduce your insurance costs without sacrificing coverage.', date: '2026-01-29', readTime: '11 min read', path: '/blog/saving-on-premiums' },
  { id: 'insurance-for-freelancers', title: 'The Complete Insurance Guide for Freelancers', description: 'Navigate insurance as a freelancer — health, liability, disability, and more.', date: '2026-02-05', readTime: '13 min read', path: '/blog/insurance-for-freelancers' },
  { id: 'understanding-deductibles', title: 'Understanding Deductibles: How to Choose the Right Amount', description: 'Learn how deductibles work and how to optimize your total insurance costs.', date: '2026-02-10', readTime: '10 min read', path: '/blog/understanding-deductibles' },
];
