import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Footer } from '@/components/Layout';
import { HomePage, ToolsPage, BlogPage } from '@/pages/Pages';
import { LifeInsuranceCalculator, TermVsWholeLife, HealthInsuranceEstimator, HsaVsFsa, AutoInsuranceEstimator } from '@/tools/ToolsGroup1';
import { HomeInsuranceCalculator, RentersInsuranceEstimator, UmbrellaInsuranceCalculator, DisabilityInsuranceCalculator, LongTermCareEstimator } from '@/tools/ToolsGroup2';
import { PetInsuranceCalculator, TravelInsuranceAssessment, MedicareComparison, DeductibleOptimizer, InsuranceScoreEstimator } from '@/tools/ToolsGroup3';
import { FloodInsuranceChecker, BusinessInsuranceCalculator, WorkersCompEstimator, CyberInsuranceAssessment } from '@/tools/ToolsGroup4';
import { InsuranceGapAnalyzer, BeneficiaryPlanner, PolicyReviewChecklist, ClaimDocumentationGenerator, CoverageOverlapFinder, AnnualInsuranceAudit } from '@/tools/ToolsGroup5';
import { InsuranceBasics, CoverageGaps, SavingOnPremiums, InsuranceForFreelancers, UnderstandingDeductibles } from '@/blog/BlogPosts';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            {/* 25 Tools */}
            <Route path="/tools/life-insurance-calculator" element={<LifeInsuranceCalculator />} />
            <Route path="/tools/term-vs-whole-life" element={<TermVsWholeLife />} />
            <Route path="/tools/health-insurance-estimator" element={<HealthInsuranceEstimator />} />
            <Route path="/tools/hsa-vs-fsa" element={<HsaVsFsa />} />
            <Route path="/tools/auto-insurance-estimator" element={<AutoInsuranceEstimator />} />
            <Route path="/tools/home-insurance-calculator" element={<HomeInsuranceCalculator />} />
            <Route path="/tools/renters-insurance-estimator" element={<RentersInsuranceEstimator />} />
            <Route path="/tools/umbrella-insurance-calculator" element={<UmbrellaInsuranceCalculator />} />
            <Route path="/tools/disability-insurance-calculator" element={<DisabilityInsuranceCalculator />} />
            <Route path="/tools/long-term-care-estimator" element={<LongTermCareEstimator />} />
            <Route path="/tools/pet-insurance-calculator" element={<PetInsuranceCalculator />} />
            <Route path="/tools/travel-insurance-assessment" element={<TravelInsuranceAssessment />} />
            <Route path="/tools/medicare-comparison" element={<MedicareComparison />} />
            <Route path="/tools/deductible-optimizer" element={<DeductibleOptimizer />} />
            <Route path="/tools/insurance-score-estimator" element={<InsuranceScoreEstimator />} />
            <Route path="/tools/flood-insurance-checker" element={<FloodInsuranceChecker />} />
            <Route path="/tools/business-insurance-calculator" element={<BusinessInsuranceCalculator />} />
            <Route path="/tools/workers-comp-estimator" element={<WorkersCompEstimator />} />
            <Route path="/tools/cyber-insurance-assessment" element={<CyberInsuranceAssessment />} />
            <Route path="/tools/insurance-gap-analyzer" element={<InsuranceGapAnalyzer />} />
            <Route path="/tools/beneficiary-planner" element={<BeneficiaryPlanner />} />
            <Route path="/tools/policy-review-checklist" element={<PolicyReviewChecklist />} />
            <Route path="/tools/claim-documentation-generator" element={<ClaimDocumentationGenerator />} />
            <Route path="/tools/coverage-overlap-finder" element={<CoverageOverlapFinder />} />
            <Route path="/tools/annual-insurance-audit" element={<AnnualInsuranceAudit />} />
            {/* 5 Blog Posts */}
            <Route path="/blog/insurance-basics" element={<InsuranceBasics />} />
            <Route path="/blog/coverage-gaps" element={<CoverageGaps />} />
            <Route path="/blog/saving-on-premiums" element={<SavingOnPremiums />} />
            <Route path="/blog/insurance-for-freelancers" element={<InsuranceForFreelancers />} />
            <Route path="/blog/understanding-deductibles" element={<UnderstandingDeductibles />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
