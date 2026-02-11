import { Link } from 'react-router-dom';
import { tools, toolCategories, blogPosts } from '@/data/tools';

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-dark via-blue to-blue-light text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">Insurance Made Simple</h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto">25 free insurance calculators and comparison tools to help you make smarter coverage decisions.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/tools" className="bg-white text-blue px-8 py-4 rounded-xl font-heading font-bold text-lg hover:bg-gray-100 transition">Explore All Tools</Link>
            <Link to="/blog" className="border-2 border-white text-white px-8 py-4 rounded-xl font-heading font-bold text-lg hover:bg-white/10 transition">Read Our Guides</Link>
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold font-heading text-center mb-12">Popular Insurance Tools</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tools.slice(0, 6).map(tool => (
            <Link key={tool.id} to={tool.path} className="group border-2 border-gray-200 rounded-xl p-6 hover:border-blue hover:shadow-lg transition">
              <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-blue transition">{tool.title}</h3>
              <p className="text-gray-600 text-sm">{tool.description}</p>
              <p className="text-blue font-medium text-sm mt-3">Use Tool →</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/tools" className="inline-block bg-blue text-white px-8 py-3 rounded-lg font-heading font-medium hover:bg-blue-dark transition">View All 25 Tools</Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">Browse by Category</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {toolCategories.map(cat => (
              <Link key={cat} to={`/tools?category=${encodeURIComponent(cat)}`} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition border border-gray-100">
                <h3 className="font-heading font-semibold">{cat}</h3>
                <p className="text-sm text-gray-500 mt-1">{tools.filter(t => t.category === cat).length} tools</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold font-heading text-center mb-12">Insurance Guides</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map(post => (
            <Link key={post.id} to={post.path} className="group border rounded-xl overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-br from-blue to-green h-40 flex items-center justify-center text-white text-4xl">📖</div>
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-2">{post.date} · {post.readTime}</p>
                <h3 className="font-heading font-bold text-lg group-hover:text-blue transition">{post.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-blue-dark text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-heading mb-6">Why Trust TaigaInsure?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl mb-3">🔒</p>
              <h3 className="font-heading font-semibold text-lg mb-2">No Data Collected</h3>
              <p className="text-sm opacity-80">All calculations run in your browser. We never store your personal information.</p>
            </div>
            <div>
              <p className="text-4xl mb-3">🎯</p>
              <h3 className="font-heading font-semibold text-lg mb-2">Unbiased Tools</h3>
              <p className="text-sm opacity-80">We don't sell insurance. Our tools provide objective estimates for educational purposes.</p>
            </div>
            <div>
              <p className="text-4xl mb-3">📊</p>
              <h3 className="font-heading font-semibold text-lg mb-2">Real Calculations</h3>
              <p className="text-sm opacity-80">Based on industry data and standard actuarial methods for accurate estimates.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ToolsPage() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? tools : tools.filter(t => t.category === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">Insurance Tools & Calculators</h1>
      <p className="text-lg text-gray-600 mb-8">25 free insurance calculators to help you make informed decisions.</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {['All', ...toolCategories].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === cat ? 'bg-blue text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{cat}</button>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {filtered.map(tool => (
          <Link key={tool.id} to={tool.path} className="group border-2 border-gray-200 rounded-xl p-6 hover:border-blue hover:shadow-lg transition">
            <span className="text-xs font-medium text-blue bg-blue/10 px-2 py-1 rounded">{tool.category}</span>
            <h3 className="font-heading font-bold text-lg mt-3 mb-2 group-hover:text-blue transition">{tool.title}</h3>
            <p className="text-gray-600 text-sm">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold font-heading mb-3">Insurance Guides & Articles</h1>
      <p className="text-lg text-gray-600 mb-8">Expert guides to help you navigate the world of insurance.</p>
      <div className="space-y-6">
        {blogPosts.map(post => (
          <Link key={post.id} to={post.path} className="group block border rounded-xl p-6 hover:shadow-lg transition">
            <p className="text-sm text-gray-500 mb-2">{post.date} · {post.readTime}</p>
            <h2 className="font-heading font-bold text-xl group-hover:text-blue transition">{post.title}</h2>
            <p className="text-gray-600 mt-2">{post.description}</p>
            <p className="text-blue font-medium text-sm mt-3">Read More →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';
