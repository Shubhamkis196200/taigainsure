import { useState } from 'react';
import { ToolLayout, InputField, SelectField, ResultCard } from '@/components/ToolComponents';
import { formatCurrency } from '@/lib/utils';

export function PetInsuranceCalculator() {
  const [petType, setPetType] = useState('dog');
  const [petAge, setPetAge] = useState('3');

  const a = parseInt(petAge) || 3;
  const typeMult: Record<string, number> = { dog: 1.0, cat: 0.7 };
  const ageFactor = a <= 5 ? 1.0 : a <= 8 ? 1.3 : 1.6;
  const base = petType === 'cat' ? 30 : 45;
  const monthly = base * (typeMult[petType] || 1) * ageFactor;
  const annual = monthly * 12;

  return (
    <ToolLayout title="Pet Insurance Cost Calculator" description="Estimate pet insurance costs based on your pet's type and age." breadcrumb="Pet Insurance Calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <SelectField label="Pet Type" value={petType} onChange={setPetType} options={[
            { value: 'dog', label: 'Dog' }, { value: 'cat', label: 'Cat' },
          ]} />
          <InputField label="Pet Age" value={petAge} onChange={setPetAge} suffix="years" />
        </div>
        <div className="space-y-3">
          <ResultCard label="Estimated Monthly Premium" value={formatCurrency(monthly)} color="blue" />
          <ResultCard label="Estimated Annual Premium" value={formatCurrency(annual)} color="green" />
        </div>
      </div>
    </ToolLayout>
  );
}

export function TravelInsuranceAssessment() {
  const [tripCost, setTripCost] = useState('5000');
  const [destination, setDestination] = useState('international');

  const tc = parseFloat(tripCost) || 0;
  const destMult: Record<string, number> = { domestic: 0.7, international: 1.0, developing: 1.4 };
  const perPerson = tc * 0.06 * (destMult[destination] || 1);

  return (
    <ToolLayout title="Travel Insurance Need Assessment" description="Assess your travel insurance needs based on trip details." breadcrumb="Travel Insurance Assessment">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField label="Total Trip Cost" value={tripCost} onChange={setTripCost} prefix="$" />
          <SelectField label="Destination Type" value={destination} onChange={setDestination} options={[
            { value: 'domestic', label: 'Domestic' }, { value: 'international', label: 'International' },
            { value: 'developing', label: 'Developing Country' },
          ]} />
        </div>
        <div className="space-y-3">
          <ResultCard label="Est. Premium" value={formatCurrency(perPerson)} color="blue" />
        </div>
      </div>
    </ToolLayout>
  );
}

export function MedicareComparison() {
  const [income, setIncome] = useState('50000');
  const inc = parseFloat(income) || 50000;
  const irmaaExtra = inc > 97000 ? 70 : 0;

  return (
    <ToolLayout title="Medicare Plan Comparison Guide" description="Compare Medicare plan options to find the best fit for your needs." breadcrumb="Medicare Comparison">
      <div className="mb-6">
        <InputField label="Annual Income (IRMAA)" value={income} onChange={setIncome} prefix="$" />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="border-2 border-gray-200 rounded-xl p-5">
          <h3 className="font-heading font-bold text-lg mb-3">Original Medicare</h3>
          <p className="font-bold text-lg">{formatCurrency(174.7 + irmaaExtra)}/mo</p>
          <p className="text-sm text-gray-600 mt-2">Most provider flexibility</p>
        </div>
        <div className="border-2 border-gray-200 rounded-xl p-5">
          <h3 className="font-heading font-bold text-lg mb-3">Medicare + Medigap</h3>
          <p className="font-bold text-lg">{formatCurrency(174.7 + 150 + irmaaExtra)}/mo</p>
          <p className="text-sm text-gray-600 mt-2">Best coverage</p>
        </div>
        <div className="border-2 border-gray-200 rounded-xl p-5">
          <h3 className="font-heading font-bold text-lg mb-3">Medicare Advantage</h3>
          <p className="font-bold text-lg">{formatCurrency(174.7 + irmaaExtra)}/mo</p>
          <p className="text-sm text-gray-600 mt-2">All-in-one plan</p>
        </div>
      </div>
    </ToolLayout>
  );
}

export function DeductibleOptimizer() {
  const [currentPremium, setCurrentPremium] = useState('200');
  const [currentDeductible, setCurrentDeductible] = useState('500');

  const cp = parseFloat(currentPremium) || 200;
  const cd = parseFloat(currentDeductible) || 500;

  const scenarios = [
    { deductible: 500, mult: 1.0 },
    { deductible: 1000, mult: 0.85 },
    { deductible: 2500, mult: 0.7 },
  ];

  const results = scenarios.map(s => {
    const premium = cp * (cd / s.deductible) * 0.3 + cp * 0.7 * s.mult;
    const annualPremium = premium * 12;
    return { ...s, monthlyPremium: premium, annualPremium };
  });

  return (
    <ToolLayout title="Deductible vs Premium Optimizer" description="Find the optimal deductible-premium balance." breadcrumb="Deductible Optimizer">
      <div className="mb-6 grid md:grid-cols-2 gap-4">
        <InputField label="Current Monthly Premium" value={currentPremium} onChange={setCurrentPremium} prefix="$" />
        <InputField label="Current Deductible" value={currentDeductible} onChange={setCurrentDeductible} prefix="$" />
      </div>
      <div className="space-y-3">
        {results.map(r => (
          <div key={r.deductible} className="flex justify-between items-center p-4 border rounded-lg">
            <span className="font-semibold">{formatCurrency(r.deductible)} deductible</span>
            <span>{formatCurrency(r.monthlyPremium)}/mo</span>
            <span className="text-gray-600">{formatCurrency(r.annualPremium)}/yr</span>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}

export function InsuranceScoreEstimator() {
  const [creditScore, setCreditScore] = useState('720');
  const [claimsHistory, setClaimsHistory] = useState('0');

  const cs = parseInt(creditScore) || 720;
  const claims = parseInt(claimsHistory) || 0;

  let score = 0;
  score += Math.min(40, (cs - 300) / 550 * 40);
  score += Math.max(0, 20 - claims * 7);
  score += 40;
  score = Math.round(Math.min(100, Math.max(0, score)));

  const rating = score >= 80 ? 'Excellent' : score >= 65 ? 'Good' : score >= 50 ? 'Average' : 'Below Average';

  return (
    <ToolLayout title="Insurance Score Estimator" description="Estimate your insurance score and understand how it affects premiums." breadcrumb="Insurance Score Estimator">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InputField label="Credit Score" value={creditScore} onChange={setCreditScore} min={300} max={850} />
          <InputField label="Claims in Past 5 Years" value={claimsHistory} onChange={setClaimsHistory} />
        </div>
        <div>
          <div className="text-center p-8 rounded-xl bg-gradient-to-br from-blue to-blue-dark text-white mb-4">
            <p className="text-sm opacity-80 mb-2">Estimated Insurance Score</p>
            <p className="text-6xl font-bold font-heading">{score}</p>
            <p className="text-lg mt-2">{rating}</p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
