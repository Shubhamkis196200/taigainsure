import { useState } from 'react';
import { ToolLayout, InputField, SelectField, ResultCard } from '@/components/ToolComponents';
import { formatCurrency } from '@/lib/utils';

export function HomeInsuranceCalculator() {
  const [homeValue, setHomeValue] = useState('350000');
  const [region, setRegion] = useState('average');

  const hv = parseFloat(homeValue) || 0;
  const regionMult: Record<string, number> = { low: 0.7, average: 1.0, high: 1.4 };
  const basePremium = (hv / 1000) * 3.5;
  const annual = basePremium * (regionMult[region] || 1);
  const monthly = annual / 12;

  return (
    <ToolLayout title="Home Insurance Coverage Calculator" description="Calculate your recommended homeowners insurance coverage and estimated premium." breadcrumb="Home Insurance Calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField label="Home Value / Rebuild Cost" value={homeValue} onChange={setHomeValue} prefix="$" />
          <SelectField label="Region" value={region} onChange={setRegion} options={[
            { value: 'low', label: 'Low Risk' }, { value: 'average', label: 'Average' }, { value: 'high', label: 'High Risk' },
          ]} />
        </div>
        <div className="space-y-3">
          <ResultCard label="Dwelling Coverage" value={formatCurrency(hv)} color="blue" />
          <ResultCard label="Estimated Monthly Premium" value={formatCurrency(monthly)} color="green" />
          <ResultCard label="Estimated Annual Premium" value={formatCurrency(annual)} color="gray" />
        </div>
      </div>
    </ToolLayout>
  );
}

export function RentersInsuranceEstimator() {
  const [propertyValue, setPropertyValue] = useState('20000');
  const [region, setRegion] = useState('average');

  const pv = parseFloat(propertyValue) || 20000;
  const regionMult: Record<string, number> = { low: 0.8, average: 1.0, high: 1.3 };
  const annual = ((pv / 1000) * 4 + 30) * (regionMult[region] || 1);
  const monthly = annual / 12;

  return (
    <ToolLayout title="Renters Insurance Cost Estimator" description="Estimate your renters insurance costs based on your belongings and location." breadcrumb="Renters Insurance Estimator">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField label="Total Personal Property Value" value={propertyValue} onChange={setPropertyValue} prefix="$" />
          <SelectField label="Region Cost Level" value={region} onChange={setRegion} options={[
            { value: 'low', label: 'Low Cost' }, { value: 'average', label: 'Average' }, { value: 'high', label: 'High Cost' },
          ]} />
        </div>
        <div className="space-y-3">
          <ResultCard label="Estimated Monthly Cost" value={formatCurrency(monthly)} color="blue" />
          <ResultCard label="Estimated Annual Cost" value={formatCurrency(annual)} color="green" />
        </div>
      </div>
    </ToolLayout>
  );
}

export function UmbrellaInsuranceCalculator() {
  const [netWorth, setNetWorth] = useState('500000');
  const [annualIncome, setAnnualIncome] = useState('100000');
  const [autoLiability, setAutoLiability] = useState('300000');

  const nw = parseFloat(netWorth) || 0;
  const ai = parseFloat(annualIncome) || 0;
  const al = parseFloat(autoLiability) || 0;
  const exposure = nw + ai * 5;
  const existingCoverage = al * 2;
  const gap = Math.max(0, exposure - existingCoverage);
  const recommended = Math.ceil(gap / 1000000) * 1000000;
  const annualPremium = Math.max(200, (recommended / 1000000) * 200);

  return (
    <ToolLayout title="Umbrella Insurance Need Calculator" description="Determine if you need umbrella insurance and how much coverage is right for you." breadcrumb="Umbrella Insurance Calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField label="Net Worth" value={netWorth} onChange={setNetWorth} prefix="$" />
          <InputField label="Annual Income" value={annualIncome} onChange={setAnnualIncome} prefix="$" />
          <InputField label="Auto Liability Limit" value={autoLiability} onChange={setAutoLiability} prefix="$" />
        </div>
        <div className="space-y-3">
          <ResultCard label="Total Exposure" value={formatCurrency(exposure)} color="gray" />
          <ResultCard label="Recommended Coverage" value={formatCurrency(recommended)} color="blue" />
          <ResultCard label="Estimated Annual Premium" value={formatCurrency(annualPremium)} color="green" />
        </div>
      </div>
    </ToolLayout>
  );
}

export function DisabilityInsuranceCalculator() {
  const [income, setIncome] = useState('75000');
  const [age, setAge] = useState('35');

  const inc = parseFloat(income) || 0;
  const a = parseInt(age) || 35;
  const monthlyBenefit = (inc / 12) * 0.6;
  const ageFactor = a < 30 ? 0.8 : a < 40 ? 1.0 : 1.3;
  const annualPremium = inc * 0.02 * ageFactor;
  const monthlyPremium = annualPremium / 12;

  return (
    <ToolLayout title="Disability Insurance Calculator" description="Calculate how much disability insurance you need to protect your income." breadcrumb="Disability Insurance">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField label="Annual Income" value={income} onChange={setIncome} prefix="$" />
          <InputField label="Age" value={age} onChange={setAge} />
        </div>
        <div className="space-y-3">
          <ResultCard label="60% Income Replacement (Monthly)" value={formatCurrency(monthlyBenefit)} color="blue" />
          <ResultCard label="Estimated Monthly Premium" value={formatCurrency(monthlyPremium)} color="green" />
          <ResultCard label="Estimated Annual Premium" value={formatCurrency(annualPremium)} color="gray" />
        </div>
      </div>
    </ToolLayout>
  );
}

export function LongTermCareEstimator() {
  const [age, setAge] = useState('55');
  const [dailyBenefit, setDailyBenefit] = useState('200');

  const a = parseInt(age) || 55;
  const db = parseFloat(dailyBenefit) || 200;
  const ageFactor = a < 50 ? 0.5 : a < 55 ? 0.7 : a < 60 ? 1.0 : 1.4;
  const annualPremium = db * 365 / 1000 * 3 * ageFactor * 1.4;
  const monthlyPremium = annualPremium / 12;

  return (
    <ToolLayout title="Long-Term Care Insurance Estimator" description="Estimate long-term care insurance costs based on your age and preferences." breadcrumb="Long-Term Care Estimator">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField label="Current Age" value={age} onChange={setAge} />
          <InputField label="Daily Benefit Amount" value={dailyBenefit} onChange={setDailyBenefit} prefix="$" />
        </div>
        <div className="space-y-3">
          <ResultCard label="Est. Monthly Premium" value={formatCurrency(monthlyPremium)} color="blue" />
          <ResultCard label="Est. Annual Premium" value={formatCurrency(annualPremium)} color="green" />
        </div>
      </div>
    </ToolLayout>
  );
}
