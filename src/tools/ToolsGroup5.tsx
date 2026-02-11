import { useState } from 'react';
import { ToolLayout, InputField, SelectField, ResultCard, CheckboxField } from '@/components/ToolComponents';
import { formatCurrency } from '@/lib/utils';

export function InsuranceGapAnalyzer() {
  const [hasLife, setHasLife] = useState(true);
  const [hasHealth, setHasHealth] = useState(true);
  const [hasAuto, setHasAuto] = useState(true);
  const [hasHome, setHasHome] = useState(false);
  const [hasRenters, setHasRenters] = useState(false);
  const [hasUmbrella, setHasUmbrella] = useState(false);
  const [hasDisability, setHasDisability] = useState(false);
  const [hasLTC, setHasLTC] = useState(false);
  const [hasPet, setHasPet] = useState(false);
  const [hasIdentity, setHasIdentity] = useState(false);

  const [isHomeowner, setIsHomeowner] = useState('yes');
  const [hasDependents, setHasDependents] = useState('yes');
  const [age, setAge] = useState('35');
  const [income, setIncome] = useState('75000');
  const [hasPets, setHasPets] = useState('yes');

  const a = parseInt(age) || 35;
  const inc = parseFloat(income) || 75000;

  const gaps: { policy: string; priority: string; reason: string }[] = [];
  if (!hasLife && hasDependents === 'yes') gaps.push({ policy: 'Life Insurance', priority: '🔴 Critical', reason: 'You have dependents who rely on your income.' });
  if (!hasDisability) gaps.push({ policy: 'Disability Insurance', priority: '🔴 Critical', reason: 'Your income is your biggest asset. 1 in 4 workers become disabled before retirement.' });
  if (!hasHome && isHomeowner === 'yes') gaps.push({ policy: 'Homeowners Insurance', priority: '🔴 Critical', reason: 'Your home is likely your largest asset and needs protection.' });
  if (!hasRenters && isHomeowner === 'no') gaps.push({ policy: 'Renters Insurance', priority: '🟡 Important', reason: 'Protects your belongings and provides liability coverage.' });
  if (!hasUmbrella && inc > 100000) gaps.push({ policy: 'Umbrella Insurance', priority: '🟡 Important', reason: 'Your income/assets may exceed standard liability limits.' });
  if (!hasLTC && a > 50) gaps.push({ policy: 'Long-Term Care Insurance', priority: '🟡 Important', reason: 'Best to purchase before age 60 for lower premiums.' });
  if (!hasPet && hasPets === 'yes') gaps.push({ policy: 'Pet Insurance', priority: '🟢 Nice to Have', reason: 'Veterinary costs can be significant for unexpected emergencies.' });
  if (!hasIdentity) gaps.push({ policy: 'Identity Theft Protection', priority: '🟢 Nice to Have', reason: 'Data breaches are increasingly common.' });

  const score = [hasLife, hasHealth, hasAuto, hasHome || hasRenters, hasUmbrella, hasDisability, hasLTC].filter(Boolean).length;
  const maxScore = 7;

  return (
    <ToolLayout title="Insurance Gap Analyzer" description="Identify gaps in your current insurance coverage and get personalized recommendations." breadcrumb="Insurance Gap Analyzer">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-heading font-semibold mb-3">Your Current Coverage</h3>
          <CheckboxField label="Life Insurance" checked={hasLife} onChange={setHasLife} />
          <CheckboxField label="Health Insurance" checked={hasHealth} onChange={setHasHealth} />
          <CheckboxField label="Auto Insurance" checked={hasAuto} onChange={setHasAuto} />
          <CheckboxField label="Homeowners Insurance" checked={hasHome} onChange={setHasHome} />
          <CheckboxField label="Renters Insurance" checked={hasRenters} onChange={setHasRenters} />
          <CheckboxField label="Umbrella Insurance" checked={hasUmbrella} onChange={setHasUmbrella} />
          <CheckboxField label="Disability Insurance" checked={hasDisability} onChange={setHasDisability} />
          <CheckboxField label="Long-Term Care Insurance" checked={hasLTC} onChange={setHasLTC} />
          <CheckboxField label="Pet Insurance" checked={hasPet} onChange={setHasPet} />
          <CheckboxField label="Identity Theft Protection" checked={hasIdentity} onChange={setHasIdentity} />

          <h3 className="font-heading font-semibold mt-6 mb-3">About You</h3>
          <InputField label="Age" value={age} onChange={setAge} />
          <InputField label="Annual Income" value={income} onChange={setIncome} prefix="$" />
          <SelectField label="Homeowner?" value={isHomeowner} onChange={setIsHomeowner} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'Renter' }]} />
          <SelectField label="Dependents?" value={hasDependents} onChange={setHasDependents} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
          <SelectField label="Pets?" value={hasPets} onChange={setHasPets} options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]} />
        </div>
        <div>
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue to-green text-white mb-4">
            <p className="text-sm opacity-80">Coverage Score</p>
            <p className="text-5xl font-bold font-heading">{score}/{maxScore}</p>
            <p>{score >= 6 ? 'Well Protected' : score >= 4 ? 'Moderate Coverage' : 'Significant Gaps'}</p>
          </div>
          {gaps.length > 0 ? (
            <div className="space-y-3">
              <h3 className="font-heading font-semibold">Coverage Gaps Found:</h3>
              {gaps.map(g => (
                <div key={g.policy} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <p className="font-semibold">{g.policy}</p>
                    <span className="text-sm">{g.priority}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{g.reason}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 bg-green/10 rounded-xl text-center">
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-heading font-bold text-green">Great job!</p>
              <p className="text-sm text-gray-600">No significant coverage gaps identified.</p>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}

export function BeneficiaryPlanner() {
  const [policies, setPolicies] = useState([
    { type: 'Life Insurance', company: '', beneficiary: '', contingent: '', percentage: '100' },
    { type: '401(k)', company: '', beneficiary: '', contingent: '', percentage: '100' },
    { type: 'IRA', company: '', beneficiary: '', contingent: '', percentage: '100' },
  ]);

  const addPolicy = () => setPolicies([...policies, { type: '', company: '', beneficiary: '', contingent: '', percentage: '100' }]);
  const updatePolicy = (i: number, field: string, value: string) => {
    const updated = [...policies];
    (updated[i] as any)[field] = value;
    setPolicies(updated);
  };

  const issues: string[] = [];
  policies.forEach((p, i) => {
    if (p.beneficiary && !p.contingent) issues.push(`${p.type || `Policy ${i+1}`}: Missing contingent beneficiary`);
    if (parseInt(p.percentage) !== 100 && parseInt(p.percentage) > 0) issues.push(`${p.type || `Policy ${i+1}`}: Percentages should total 100%`);
  });

  return (
    <ToolLayout title="Beneficiary Planner" description="Organize and review beneficiary designations across all your policies and accounts." breadcrumb="Beneficiary Planner">
      <div className="space-y-4">
        {policies.map((p, i) => (
          <div key={i} className="border rounded-xl p-4">
            <div className="grid md:grid-cols-5 gap-3">
              <div>
                <label className="text-xs text-gray-500">Account Type</label>
                <input value={p.type} onChange={e => updatePolicy(i, 'type', e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm" placeholder="Life Insurance" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Company</label>
                <input value={p.company} onChange={e => updatePolicy(i, 'company', e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm" placeholder="Company name" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Primary Beneficiary</label>
                <input value={p.beneficiary} onChange={e => updatePolicy(i, 'beneficiary', e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm" placeholder="Name" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Contingent Beneficiary</label>
                <input value={p.contingent} onChange={e => updatePolicy(i, 'contingent', e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm" placeholder="Name" />
              </div>
              <div>
                <label className="text-xs text-gray-500">%</label>
                <input type="number" value={p.percentage} onChange={e => updatePolicy(i, 'percentage', e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm" />
              </div>
            </div>
          </div>
        ))}
        <button onClick={addPolicy} className="px-4 py-2 bg-blue text-white rounded-lg text-sm font-medium hover:bg-blue-dark transition">+ Add Account</button>

        {issues.length > 0 && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="font-semibold text-yellow-800 mb-2">⚠️ Issues Found:</p>
            {issues.map((issue, i) => <p key={i} className="text-sm text-yellow-700">• {issue}</p>)}
          </div>
        )}

        <div className="p-4 bg-blue/5 rounded-lg text-sm space-y-1">
          <p className="font-semibold">Best Practices:</p>
          <p>• Review beneficiaries after major life events (marriage, divorce, birth, death)</p>
          <p>• Always name contingent beneficiaries</p>
          <p>• Keep beneficiary forms updated — they override your will</p>
          <p>• Consider per stirpes vs per capita distribution</p>
          <p>• Consult an estate attorney for complex situations</p>
        </div>
      </div>
    </ToolLayout>
  );
}

export function PolicyReviewChecklist() {
  const [items, setItems] = useState([
    { category: 'General', text: 'Review all policy declarations pages', checked: false },
    { category: 'General', text: 'Verify all named insureds are correct', checked: false },
    { category: 'General', text: 'Confirm policy effective and expiration dates', checked: false },
    { category: 'General', text: 'Review premium payment schedule', checked: false },
    { category: 'Coverage', text: 'Verify dwelling coverage matches rebuild cost', checked: false },
    { category: 'Coverage', text: 'Check liability limits across all policies', checked: false },
    { category: 'Coverage', text: 'Review deductible amounts', checked: false },
    { category: 'Coverage', text: 'Confirm auto coverage matches vehicle values', checked: false },
    { category: 'Coverage', text: 'Check life insurance coverage vs income needs', checked: false },
    { category: 'Coverage', text: 'Verify health insurance meets family needs', checked: false },
    { category: 'Discounts', text: 'Ask about multi-policy bundling discounts', checked: false },
    { category: 'Discounts', text: 'Check for good driver discounts', checked: false },
    { category: 'Discounts', text: 'Verify home security/safety discounts', checked: false },
    { category: 'Discounts', text: 'Ask about loyalty/longevity discounts', checked: false },
    { category: 'Updates', text: 'Report home improvements/renovations', checked: false },
    { category: 'Updates', text: 'Update vehicle information', checked: false },
    { category: 'Updates', text: 'Review beneficiary designations', checked: false },
    { category: 'Updates', text: 'Update personal property inventory', checked: false },
    { category: 'Savings', text: 'Get competitive quotes from 3+ insurers', checked: false },
    { category: 'Savings', text: 'Consider raising deductibles', checked: false },
    { category: 'Savings', text: 'Remove unnecessary coverage on old vehicles', checked: false },
    { category: 'Savings', text: 'Review umbrella insurance need', checked: false },
  ]);

  const toggle = (i: number) => {
    const updated = [...items];
    updated[i].checked = !updated[i].checked;
    setItems(updated);
  };

  const completed = items.filter(i => i.checked).length;
  const total = items.length;
  const categories = [...new Set(items.map(i => i.category))];

  return (
    <ToolLayout title="Insurance Policy Review Checklist" description="Comprehensive checklist to review all your insurance policies for adequacy and savings." breadcrumb="Policy Review Checklist">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div className="bg-green h-3 rounded-full transition-all" style={{ width: `${(completed / total) * 100}%` }}></div>
          </div>
          <span className="font-heading font-bold text-lg">{completed}/{total}</span>
        </div>
      </div>
      {categories.map(cat => (
        <div key={cat} className="mb-6">
          <h3 className="font-heading font-semibold text-lg mb-3 text-blue">{cat}</h3>
          <div className="space-y-2">
            {items.map((item, i) => item.category === cat && (
              <label key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                <input type="checkbox" checked={item.checked} onChange={() => toggle(i)} className="w-5 h-5 accent-green" />
                <span className={item.checked ? 'line-through text-gray-400' : 'text-gray-700'}>{item.text}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </ToolLayout>
  );
}

export function ClaimDocumentationGenerator() {
  const [claimType, setClaimType] = useState('auto');
  const claimDocs: Record<string, { title: string; docs: string[] }> = {
    auto: { title: 'Auto Insurance Claim', docs: ['Police report number', 'Photos of all vehicle damage (all angles)', 'Photos of the accident scene', 'Other driver\'s insurance info', 'Other driver\'s license info', 'Witness names and contact info', 'Medical records if injuries', 'Repair estimates (2-3 shops)', 'Rental car receipts', 'Dashcam footage if available', 'Copy of your insurance card', 'Your driver\'s license copy'] },
    home: { title: 'Homeowners Insurance Claim', docs: ['Photos/video of all damage before cleanup', 'Emergency repair receipts', 'Inventory of damaged/destroyed items with values', 'Original purchase receipts if available', 'Contractor repair estimates (2-3)', 'Police report (if theft/vandalism)', 'Weather reports (if storm damage)', 'Previous home inspection reports', 'Proof of ownership for high-value items', 'Temporary living expense receipts', 'Communication log with insurance company'] },
    health: { title: 'Health Insurance Claim', docs: ['Itemized medical bills', 'Explanation of Benefits (EOB)', 'Referral/prior authorization letters', 'Medical records and doctor notes', 'Prescription records', 'Lab/test results', 'Ambulance/transport receipts', 'Out-of-network provider justification', 'Appeal letter template', 'Timeline of treatment', 'Insurance card copies (front and back)'] },
    life: { title: 'Life Insurance Claim', docs: ['Certified death certificate (multiple copies)', 'Policy document/number', 'Claimant identification', 'Beneficiary verification documents', 'Completed claim form', 'Medical records (if requested)', 'Autopsy report (if applicable)', 'Employer verification (if group policy)', 'Bank details for payment'] },
    disability: { title: 'Disability Insurance Claim', docs: ['Attending physician statement', 'Medical records supporting disability', 'Employer statement of duties', 'Tax returns (2 years)', 'Pay stubs (6 months)', 'Completed claim forms', 'Functional capacity evaluation', 'Treatment plan and prognosis', 'Social Security disability decision (if applicable)', 'Timeline of disability onset'] },
  };

  const current = claimDocs[claimType] || claimDocs.auto;

  return (
    <ToolLayout title="Claim Documentation Generator" description="Generate a comprehensive documentation checklist for any insurance claim type." breadcrumb="Claim Documentation">
      <div className="mb-6">
        <SelectField label="Claim Type" value={claimType} onChange={setClaimType} options={[
          { value: 'auto', label: 'Auto Insurance' }, { value: 'home', label: 'Homeowners Insurance' },
          { value: 'health', label: 'Health Insurance' }, { value: 'life', label: 'Life Insurance' },
          { value: 'disability', label: 'Disability Insurance' },
        ]} />
      </div>
      <div className="border-2 border-blue rounded-xl p-6">
        <h3 className="font-heading font-bold text-xl text-blue mb-4">📋 {current.title} — Required Documents</h3>
        <div className="space-y-2">
          {current.docs.map((doc, i) => (
            <label key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-green" />
              <span className="text-gray-700">{doc}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mt-4 p-4 bg-green/10 rounded-lg text-sm">
        <p className="font-semibold text-green mb-2">📝 Claim Filing Tips:</p>
        <ul className="space-y-1">
          <li>• File your claim as soon as possible</li>
          <li>• Document everything with photos and written records</li>
          <li>• Keep copies of all correspondence</li>
          <li>• Get multiple repair/replacement estimates</li>
          <li>• Don't accept the first settlement offer without review</li>
          <li>• Consider a public adjuster for large claims</li>
        </ul>
      </div>
    </ToolLayout>
  );
}

export function CoverageOverlapFinder() {
  const [policies, setPolicies] = useState({
    auto: true, home: true, umbrella: false, health: true, dental: true, vision: true,
    life: true, disability: false, travel: false, pet: false, identity: false, roadside: true,
  });

  const overlaps: { area: string; policies: string[]; tip: string }[] = [];
  if (policies.auto && policies.home) overlaps.push({ area: 'Liability Coverage', policies: ['Auto', 'Home'], tip: 'Check if liability limits are coordinated. An umbrella policy may be more cost-effective than raising both.' });
  if (policies.auto && policies.roadside) overlaps.push({ area: 'Roadside Assistance', policies: ['Auto Insurance', 'Separate Roadside'], tip: 'You may be paying for roadside assistance twice. Check if your auto policy already includes it.' });
  if (policies.health && policies.auto) overlaps.push({ area: 'Medical Payments', policies: ['Health Insurance', 'Auto Med-Pay'], tip: 'If you have good health insurance, you may be able to reduce auto medical payment coverage.' });
  if (policies.home && policies.identity) overlaps.push({ area: 'Identity Theft', policies: ['Home Insurance', 'Identity Theft Policy'], tip: 'Many homeowners policies include identity theft coverage. Check before paying for a separate policy.' });
  if (policies.travel && policies.health) overlaps.push({ area: 'Travel Medical', policies: ['Travel Insurance', 'Health Insurance'], tip: 'Check if your health plan covers international emergencies before buying separate travel medical.' });
  if (policies.dental && policies.health) overlaps.push({ area: 'Dental Coverage', policies: ['Health Plan', 'Separate Dental'], tip: 'Some health plans include basic dental. Verify no overlap in preventive dental coverage.' });

  const potentialSavings = overlaps.length * 150;

  return (
    <ToolLayout title="Coverage Overlap Finder" description="Identify overlapping coverage across your policies to eliminate waste and save money." breadcrumb="Coverage Overlap Finder">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-heading font-semibold mb-3">Your Active Policies</h3>
          {Object.entries(policies).map(([key, val]) => (
            <CheckboxField key={key} label={key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())} checked={val} onChange={v => setPolicies({ ...policies, [key]: v })} />
          ))}
        </div>
        <div>
          {overlaps.length > 0 && (
            <ResultCard label="Potential Annual Savings" value={`Up to ${formatCurrency(potentialSavings)}`} color="green" />
          )}
          <div className="mt-4 space-y-3">
            <h3 className="font-heading font-semibold">{overlaps.length > 0 ? `${overlaps.length} Potential Overlaps Found:` : 'No significant overlaps detected'}</h3>
            {overlaps.map((o, i) => (
              <div key={i} className="p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg">
                <p className="font-semibold text-gray-800">{o.area}</p>
                <p className="text-sm text-gray-500">Overlapping: {o.policies.join(' + ')}</p>
                <p className="text-sm text-gray-600 mt-1">{o.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function AnnualInsuranceAudit() {
  const [policies, setPolicies] = useState([
    { type: 'Auto Insurance', provider: '', premium: '', lastReviewed: '', rating: 'good' },
    { type: 'Home/Renters Insurance', provider: '', premium: '', lastReviewed: '', rating: 'good' },
    { type: 'Health Insurance', provider: '', premium: '', lastReviewed: '', rating: 'good' },
    { type: 'Life Insurance', provider: '', premium: '', lastReviewed: '', rating: 'good' },
  ]);

  const addPolicy = () => setPolicies([...policies, { type: '', provider: '', premium: '', lastReviewed: '', rating: 'good' }]);
  const updatePolicy = (i: number, field: string, value: string) => {
    const updated = [...policies];
    (updated[i] as any)[field] = value;
    setPolicies(updated);
  };

  const totalPremium = policies.reduce((sum, p) => sum + (parseFloat(p.premium) || 0), 0);
  const ratingColors: Record<string, string> = { excellent: 'text-green', good: 'text-blue', fair: 'text-yellow-600', poor: 'text-red-600' };

  return (
    <ToolLayout title="Annual Insurance Audit Tool" description="Complete an annual audit of all your insurance policies with actionable insights." breadcrumb="Annual Insurance Audit">
      <div className="mb-6">
        <ResultCard label="Total Annual Premium Spend" value={formatCurrency(totalPremium)} color="blue" />
      </div>
      <div className="space-y-4">
        {policies.map((p, i) => (
          <div key={i} className="border rounded-xl p-4">
            <div className="grid md:grid-cols-5 gap-3">
              <div>
                <label className="text-xs text-gray-500">Policy Type</label>
                <input value={p.type} onChange={e => updatePolicy(i, 'type', e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Provider</label>
                <input value={p.provider} onChange={e => updatePolicy(i, 'provider', e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm" placeholder="Company" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Annual Premium</label>
                <input type="number" value={p.premium} onChange={e => updatePolicy(i, 'premium', e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm" placeholder="$" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Last Reviewed</label>
                <input type="date" value={p.lastReviewed} onChange={e => updatePolicy(i, 'lastReviewed', e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-500">Satisfaction</label>
                <select value={p.rating} onChange={e => updatePolicy(i, 'rating', e.target.value)} className="w-full border rounded px-2 py-1.5 text-sm">
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        <button onClick={addPolicy} className="px-4 py-2 bg-blue text-white rounded-lg text-sm font-medium hover:bg-blue-dark transition">+ Add Policy</button>
      </div>
      <div className="mt-6 p-4 bg-blue/5 rounded-lg text-sm">
        <h3 className="font-heading font-semibold mb-2">Annual Audit Action Items:</h3>
        <ul className="space-y-1">
          <li>☐ Compare current premiums with 3+ competitors</li>
          <li>☐ Review coverage amounts against current asset values</li>
          <li>☐ Update beneficiaries on all policies</li>
          <li>☐ Check for new available discounts</li>
          <li>☐ Review deductible levels for optimization</li>
          <li>☐ Update home inventory/personal property list</li>
          <li>☐ Verify all drivers/vehicles are listed on auto policy</li>
          <li>☐ Consider bundling policies for discounts</li>
          <li>☐ Review umbrella insurance need based on current assets</li>
          <li>☐ Schedule next annual review date</li>
        </ul>
      </div>
    </ToolLayout>
  );
}
