import { useState } from 'react';
import { ToolLayout, InputField, SelectField, ResultCard } from '@/components/ToolComponents';
import { formatCurrency } from '@/lib/utils';

export function FloodInsuranceChecker() {
  const [zone, setZone] = useState('X');
  const [homeValue, setHomeValue] = useState('300000');

  const hv = parseFloat(homeValue) || 300000;
  const zoneMult: Record<string, number> = { A: 2.5, V: 4.0, X: 0.8 };
  const buildingPremium = Math.min(hv, 250000) / 1000 * 2.5 * (zoneMult[zone] || 1);
  const total = buildingPremium;

  return (
    <ToolLayout title="Flood Insurance Zone Checker" description="Check flood risk and estimate flood insurance costs." breadcrumb="Flood Insurance Checker">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <SelectField label="FEMA Flood Zone" value={zone} onChange={setZone} options={[
            { value: 'V', label: 'Zone V — Coastal High Risk' }, { value: 'A', label: 'Zone A — High Risk' },
            { value: 'X', label: 'Zone X — Minimal Risk' },
          ]} />
          <InputField label="Home Value" value={homeValue} onChange={setHomeValue} prefix="$" />
        </div>
        <div className="space-y-3">
          <ResultCard label="Annual Premium" value={formatCurrency(total)} color="blue" />
          <ResultCard label="Monthly Cost" value={formatCurrency(total / 12)} color="green" />
        </div>
      </div>
    </ToolLayout>
  );
}

export function BusinessInsuranceCalculator() {
  const [industry, setIndustry] = useState('technology');
  const [revenue, setRevenue] = useState('500000');
  const [employees, setEmployees] = useState('10');

  const rev = parseFloat(revenue) || 500000;
  const emp = parseInt(employees) || 10;
  const industryMult: Record<string, number> = { technology: 0.8, retail: 1.0, construction: 2.0 };
  const gl = (rev / 1000) * 1.5 * (industryMult[industry] || 1);
  const wc = emp * 800 * (industryMult[industry] || 1);
  const total = gl + wc * 0.3;

  return (
    <ToolLayout title="Business Insurance Cost Calculator" description="Estimate business insurance costs based on industry and size." breadcrumb="Business Insurance Calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <SelectField label="Industry" value={industry} onChange={setIndustry} options={[
            { value: 'technology', label: 'Technology' }, { value: 'retail', label: 'Retail' },
            { value: 'construction', label: 'Construction' },
          ]} />
          <InputField label="Annual Revenue" value={revenue} onChange={setRevenue} prefix="$" />
          <InputField label="Number of Employees" value={employees} onChange={setEmployees} />
        </div>
        <div className="space-y-3">
          <ResultCard label="General Liability" value={formatCurrency(gl)} color="blue" />
          <ResultCard label="Est. Workers Comp" value={formatCurrency(wc)} color="gray" />
          <ResultCard label="Total Annual Premium" value={formatCurrency(total)} color="green" />
        </div>
      </div>
    </ToolLayout>
  );
}

export function WorkersCompEstimator() {
  const [industry, setIndustry] = useState('office');
  const [payroll, setPayroll] = useState('500000');

  const pr = parseFloat(payroll) || 500000;
  const classRates: Record<string, number> = { office: 0.3, retail: 0.8, construction: 5.0 };
  const premium = (pr / 100) * (classRates[industry] || 1);
  const monthly = premium / 12;

  return (
    <ToolLayout title="Workers Comp Premium Estimator" description="Estimate workers' compensation insurance premiums." breadcrumb="Workers Comp Estimator">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <SelectField label="Industry" value={industry} onChange={setIndustry} options={[
            { value: 'office', label: 'Office/Clerical' }, { value: 'retail', label: 'Retail' },
            { value: 'construction', label: 'Construction' },
          ]} />
          <InputField label="Annual Payroll" value={payroll} onChange={setPayroll} prefix="$" />
        </div>
        <div className="space-y-3">
          <ResultCard label="Estimated Annual Premium" value={formatCurrency(premium)} color="blue" />
          <ResultCard label="Monthly Premium" value={formatCurrency(monthly)} color="green" />
        </div>
      </div>
    </ToolLayout>
  );
}

export function CyberInsuranceAssessment() {
  const [revenue, setRevenue] = useState('1000000');
  const [records, setRecords] = useState('10000');

  const rev = parseFloat(revenue) || 1000000;
  const rec = parseInt(records) || 10000;
  const recordsFactor = rec > 10000 ? 1.3 : 1.0;
  const basePremium = (rev / 1000000) * 2000;
  const annual = basePremium * recordsFactor;
  const recommendedLimit = Math.max(1000000, rev * 0.1);

  return (
    <ToolLayout title="Cyber Insurance Need Assessment" description="Assess your cyber insurance needs and estimate costs." breadcrumb="Cyber Insurance Assessment">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField label="Annual Revenue" value={revenue} onChange={setRevenue} prefix="$" />
          <InputField label="Customer/Patient Records" value={records} onChange={setRecords} />
        </div>
        <div className="space-y-3">
          <ResultCard label="Recommended Coverage Limit" value={formatCurrency(recommendedLimit)} color="blue" />
          <ResultCard label="Estimated Annual Premium" value={formatCurrency(annual)} color="green" />
        </div>
      </div>
    </ToolLayout>
  );
}
