import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue to-green rounded-lg flex items-center justify-center text-white font-bold text-sm">T</div>
          <span className="font-heading font-bold text-xl text-gray-900">TaigaInsure</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/tools" className={`font-medium text-sm hover:text-blue transition ${location.pathname.startsWith('/tools') ? 'text-blue' : 'text-gray-700'}`}>Insurance Tools</Link>
          <Link to="/blog" className={`font-medium text-sm hover:text-blue transition ${location.pathname.startsWith('/blog') ? 'text-blue' : 'text-gray-700'}`}>Guides</Link>
          <Link to="/tools" className="bg-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-dark transition">Get Started</Link>
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t px-4 py-3 space-y-2 bg-white">
          <Link to="/tools" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-700">Insurance Tools</Link>
          <Link to="/blog" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-700">Guides</Link>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-blue to-green rounded-lg flex items-center justify-center text-white font-bold text-xs">T</div>
              <span className="font-heading font-bold text-lg text-white">TaigaInsure</span>
            </div>
            <p className="text-sm">Free insurance calculators and guides to help you make smarter coverage decisions.</p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-3">Popular Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tools/life-insurance-calculator" className="hover:text-white transition">Life Insurance Calculator</Link></li>
              <li><Link to="/tools/auto-insurance-estimator" className="hover:text-white transition">Auto Insurance Estimator</Link></li>
              <li><Link to="/tools/home-insurance-calculator" className="hover:text-white transition">Home Insurance Calculator</Link></li>
              <li><Link to="/tools/health-insurance-estimator" className="hover:text-white transition">Health Insurance Estimator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-3">Guides</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog/insurance-basics" className="hover:text-white transition">Insurance Basics</Link></li>
              <li><Link to="/blog/coverage-gaps" className="hover:text-white transition">Coverage Gaps</Link></li>
              <li><Link to="/blog/saving-on-premiums" className="hover:text-white transition">Saving on Premiums</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-white mb-3">About</h4>
            <p className="text-sm">TaigaInsure provides free educational tools. We do not sell insurance products. Always consult a licensed professional.</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-sm text-center">
          <p>© 2026 TaigaInsure. All rights reserved. For educational purposes only.</p>
        </div>
      </div>
    </footer>
  );
}
