import type { ReactNode } from 'react';

export function Disclaimer() {
  return (
    <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-gray-600">
      <p className="font-semibold text-gray-700 mb-1">⚠️ Disclaimer</p>
      <p>This calculator provides estimates for educational purposes only. Actual insurance premiums and coverage needs vary based on many factors. Consult with a licensed insurance professional before making insurance decisions. TaigaInsure does not sell insurance products.</p>
    </div>
  );
}

export function ToolLayout({ title, description, children, breadcrumb }: { title: string; description: string; children: ReactNode; breadcrumb: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-4 font-body">
        <a href="/" className="hover:text-blue">Home</a> / <a href="/tools" className="hover:text-blue">Tools</a> / <span className="text-gray-700">{breadcrumb}</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold font-heading text-blue-dark mb-3">{title}</h1>
      <p className="text-lg text-gray-600 mb-8">{description}</p>
      {children}
      <Disclaimer />
    </div>
  );
}

export function InputField({ label, value, onChange, type = 'number', placeholder, prefix, suffix, min, max, step }: {
  label: string; value: string | number; onChange: (v: string) => void; type?: string; placeholder?: string; prefix?: string; suffix?: string; min?: number; max?: number; step?: number;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1 font-heading">{label}</label>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{prefix}</span>}
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={`w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue focus:border-blue outline-none transition ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{suffix}</span>}
      </div>
    </div>
  );
}

export function SelectField({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1 font-heading">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:ring-2 focus:ring-blue focus:border-blue outline-none transition bg-white">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export function ResultCard({ label, value, color = 'blue' }: { label: string; value: string; color?: string }) {
  const colors: Record<string, string> = {
    blue: 'bg-blue text-white',
    green: 'bg-green text-white',
    gray: 'bg-gray-100 text-gray-900',
  };
  return (
    <div className={`rounded-xl p-5 ${colors[color] || colors.blue}`}>
      <p className="text-sm opacity-80 mb-1">{label}</p>
      <p className="text-2xl font-bold font-heading">{value}</p>
    </div>
  );
}

export function Button({ children, onClick, variant = 'primary' }: { children: ReactNode; onClick: () => void; variant?: 'primary' | 'secondary' }) {
  const cls = variant === 'primary'
    ? 'bg-blue text-white hover:bg-blue-dark'
    : 'bg-gray-200 text-gray-700 hover:bg-gray-300';
  return (
    <button onClick={onClick} className={`px-6 py-3 rounded-lg font-medium font-heading transition ${cls}`}>
      {children}
    </button>
  );
}

export function CheckboxField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 mb-2 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="w-4 h-4 accent-blue" />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}
