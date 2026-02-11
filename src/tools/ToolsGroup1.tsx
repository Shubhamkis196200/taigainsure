import { useState } from 'react';
import { ToolLayout, InputField, SelectField, ResultCard } from '@/components/ToolComponents';
import { formatCurrency } from '@/lib/utils';

export function LifeInsuranceCalculator() {
  const [debt, setDebt] = useState('25000');
  const [income, setIncome] = useState('75000');
  const [years, setYears] = useState('10');
  const [mortgage, setMortgage] = useState('200000');
  const [education, setEducation] = useState('100000');
  const [existingCoverage, setExistingCoverage] = useState('0');

  const d = parseFloat(debt) || 0;
  const i = (parseFloat(income) || 0) * (parseInt(years) || 0);
  const m = parseFloat(mortgage) || 0;
  const e = parseFloat(education) || 0;
  const existing = parseFloat(existingCoverage) || 0;
  const total = Math.max(0, d + i + m + e - existing);

  return (
    <ToolLayout title="Life Insurance Needs Calculator" description="Use the DIME method to determine how much life insurance you need." breadcrumb="Life Insurance Calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-1">
          <h3 className="font-heading font-semibold text-lg mb-4">Your Information</h3>
          <InputField label="Total Debt (credit cards, loans, etc.)" value={debt} onChange={setDebt} prefix="$" />
          <InputField label="Annual Income" value={income} onChange={setIncome} prefix="$" />
          <InputField label="Years of Income to Replace" value={years} onChange={setYears} suffix="years" />
          <InputField label="Remaining Mortgage Balance" value={mortgage} onChange={setMortgage} prefix="$" />
          <InputField label="Education Costs for Children" value={education} onChange={setEducation} prefix="$" />
          <InputField label="Existing Life Insurance Coverage" value={existingCoverage} onChange={setExistingCoverage} prefix="$" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg mb-4">DIME Breakdown</h3>
          <div className="space-y-3">
            <ResultCard label="D — Debt" value={formatCurrency(d)} color="gray" />
            <ResultCard label="I — Income Replacement" value={formatCurrency(i)} color="gray" />
            <ResultCard label="M — Mortgage" value={formatCurrency(m)} color="gray" />
            <ResultCard label="E — Education" value={formatCurrency(e)} color="gray" />
            <ResultCard label="Less: Existing Coverage" value={`-${formatCurrency(existing)}`} color="gray" />
            <ResultCard label="Recommended Coverage" value={formatCurrency(total)} color="blue" />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function TermVsWholeLife() {
  const [age, setAge] = useState('30');
  const [coverage, setCoverage] = useState('500000');
  const [termLength, setTermLength] = useState('20');

  const a = parseInt(age) || 30;
  const c = parseFloat(coverage) || 500000;
  const tl = parseInt(termLength) || 20;

  const termMonthly = (c / 1000) * (0.15 + (a - 25) * 0.02 + (tl - 10) * 0.03);
  const wholeMonthly = (c / 1000) * (0.8 + (a - 25) * 0.05);
  const termTotal = termMonthly * 12 * tl;
  const wholeTotal = wholeMonthly * 12 * 30;
  const wholeCashValue30 = c * 0.03 * 30 * 0.4;

  return (
    <ToolLayout title="Term vs Whole Life Comparison" description="Compare term and whole life insurance costs and benefits side by side." breadcrumb="Term vs Whole Life">
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <InputField label="Your Age" value={age} onChange={setAge} />
          <InputField label="Coverage Amount" value={coverage} onChange={setCoverage} prefix="$" />
          <SelectField label="Term Length" value={termLength} onChange={setTermLength} options={[
            { value: '10', label: '10 years' }, { value: '15', label: '15 years' },
            { value: '20', label: '20 years' }, { value: '30', label: '30 years' },
          ]} />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border-2 border-blue rounded-xl p-6">
            <h3 className="font-heading font-bold text-xl text-blue mb-4">Term Life Insurance</h3>
            <div className="space-y-3">
              <ResultCard label="Estimated Monthly Premium" value={formatCurrency(termMonthly)} color="blue" />
              <ResultCard label={`Total Cost Over ${tl} Years`} value={formatCurrency(termTotal)} color="gray" />
              <ResultCard label="Cash Value at End" value="$0" color="gray" />
            </div>
          </div>
          <div className="border-2 border-green rounded-xl p-6">
            <h3 className="font-heading font-bold text-xl text-green mb-4">Whole Life Insurance</h3>
            <div className="space-y-3">
              <ResultCard label="Estimated Monthly Premium" value={formatCurrency(wholeMonthly)} color="green" />
              <ResultCard label="Total Cost Over 30 Years" value={formatCurrency(wholeTotal)} color="gray" />
              <ResultCard label="Est. Cash Value (30 yrs)" value={formatCurrency(wholeCashValue30)} color="gray" />
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function HealthInsuranceEstimator() {
  const [age, setAge] = useState('35');
  const [household, setHousehold] = useState('1');
  const [tier, setTier] = useState('silver');

  const a = parseInt(age) || 35;
  const h = parseInt(household) || 1;
  const tierMult: Record<string, number> = { bronze: 0.8, silver: 1.0, gold: 1.3, platinum: 1.6 };
  const base = 250 + (a - 21) * 8;
  const monthly = base * (tierMult[tier] || 1) * (h === 1 ? 1 : h === 2 ? 1.8 : h <= 4 ? 2.5 : 3.2);
  const annual = monthly * 12;

  return (
    <ToolLayout title="Health Insurance Premium Estimator" description="Estimate monthly health insurance premiums by age, household size, and plan tier." breadcrumb="Health Insurance Estimator">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField label="Age" value={age} onChange={setAge} />
          <InputField label="Household Size" value={household} onChange={setHousehold} min={1} max={8} />
          <SelectField label="Plan Tier" value={tier} onChange={setTier} options={[
            { value: 'bronze', label: 'Bronze' }, { value: 'silver', label: 'Silver' },
            { value: 'gold', label: 'Gold' }, { value: 'platinum', label: 'Platinum' },
          ]} />
        </div>
        <div className="space-y-3">
          <ResultCard label="Estimated Monthly Premium" value={formatCurrency(monthly)} color="blue" />
          <ResultCard label="Estimated Annual Premium" value={formatCurrency(annual)} color="green" />
        </div>
      </div>
    </ToolLayout>
  );
}

export function HsaVsFsa() {
  const [medExpenses, setMedExpenses] = useState('3000');
  const [taxRate, setTaxRate] = useState('22');

  const med = parseFloat(medExpenses) || 0;
  const tax = (parseFloat(taxRate) || 22) / 100;
  const hsaLimit = 4150;
  const fsaLimit = 3200;
  const hsaContrib = Math.min(med, hsaLimit);
  const fsaContrib = Math.min(med, fsaLimit);
  const hsaSavings = hsaContrib * (tax + 0.0765);
  const fsaSavings = fsaContrib * (tax + 0.0765);

  return (
    <ToolLayout title="HSA vs FSA Comparison Tool" description="Compare Health Savings Accounts and Flexible Spending Accounts to maximize tax savings." breadcrumb="HSA vs FSA">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField label="Expected Annual Medical Expenses" value={medExpenses} onChange={setMedExpenses} prefix="$" />
          <InputField label="Federal Tax Bracket (%)" value={taxRate} onChange={setTaxRate} suffix="%" />
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-blue rounded-xl p-4">
              <h3 className="font-heading font-bold text-blue mb-3">HSA</h3>
              <p className="text-sm text-gray-600">Contribution Limit</p>
              <p className="font-bold text-lg mb-2">{formatCurrency(hsaLimit)}</p>
              <p className="text-sm text-gray-600">Tax Savings</p>
              <p className="font-bold text-lg text-green">{formatCurrency(hsaSavings)}</p>
            </div>
            <div className="border-2 border-green rounded-xl p-4">
              <h3 className="font-heading font-bold text-green mb-3">FSA</h3>
              <p className="text-sm text-gray-600">Contribution Limit</p>
              <p className="font-bold text-lg mb-2">{formatCurrency(fsaLimit)}</p>
              <p className="text-sm text-gray-600">Tax Savings</p>
              <p className="font-bold text-lg text-green">{formatCurrency(fsaSavings)}</p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}

export function AutoInsuranceEstimator() {
  const [age, setAge] = useState('30');
  const [vehicleType, setVehicleType] = useState('sedan');
  const [record, setRecord] = useState('clean');

  const a = parseInt(age) || 30;
  const vehicleMult: Record<string, number> = { sedan: 1.0, suv: 1.15, sports: 1.5, luxury: 1.6 };
  const recordMult: Record<string, number> = { clean: 1.0, minor: 1.25, major: 1.6 };
  const ageFactor = a < 25 ? 1.5 : a < 30 ? 1.15 : 1.0;
  const base = 1200;
  const annual = base * ageFactor * (vehicleMult[vehicleType] || 1) * (recordMult[record] || 1);
  const monthly = annual / 12;

  return (
    <ToolLayout title="Auto Insurance Premium Estimator" description="Estimate your auto insurance premium based on your profile and vehicle." breadcrumb="Auto Insurance Estimator">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField label="Your Age" value={age} onChange={setAge} />
          <SelectField label="Vehicle Type" value={vehicleType} onChange={setVehicleType} options={[
            { value: 'sedan', label: 'Sedan' }, { value: 'suv', label: 'SUV' },
            { value: 'sports', label: 'Sports Car' }, { value: 'luxury', label: 'Luxury' },
          ]} />
          <SelectField label="Driving Record" value={record} onChange={setRecord} options={[
            { value: 'clean', label: 'Clean' }, { value: 'minor', label: 'Minor violations' },
            { value: 'major', label: 'Major violations' },
          ]} />
        </div>
        <div className="space-y-3">
          <ResultCard label="Estimated Monthly Premium" value={formatCurrency(monthly)} color="blue" />
          <ResultCard label="Annual Premium" value={formatCurrency(annual)} color="green" />
        </div>
      </div>
    </ToolLayout>
  );
}
