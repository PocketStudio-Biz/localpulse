'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building2, TrendingUp, Bell, MapPin, Search, Shield } from 'lucide-react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [market, setMarket] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, market_interest: market }),
      })

      if (res.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Error:', error)
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-emerald-500" />
            <span className="text-2xl font-bold text-white">LocalPulse</span>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
          >
            Dashboard Demo
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Know When Local Markets
            <span className="text-emerald-400"> Change</span>
          </h1>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            LocalPulse monitors your target markets 24/7, detecting new business openings,
            closures, permit filings, and ownership changes—delivered as actionable alerts.
          </p>

          {/* Signup Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <input
                type="text"
                placeholder="Market you want to track (e.g., Austin, TX)"
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="w-full px-6 py-4 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition disabled:opacity-50"
              >
                {loading ? 'Joining...' : 'Get Early Access'}
              </button>
            </form>
          ) : (
            <div className="max-w-md mx-auto p-6 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
              <p className="text-emerald-400 font-semibold">
                You're on the list! We'll be in touch soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Use Cases */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Perfect For
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <TrendingUp className="h-10 w-10 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Real Estate Investors</h3>
            <p className="text-slate-400">
              Spot emerging commercial corridors before prices spike. Track vacancy patterns and new permit filings.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <Search className="h-10 w-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Marketing Agencies</h3>
            <p className="text-slate-400">
              Find new businesses that need websites, branding, and marketing within days of opening.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
            <Building2 className="h-10 w-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Franchise Consultants</h3>
            <p className="text-slate-400">
              Monitor competitor movements and identify prime locations with turnkey infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          What We Track
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">New Openings</h3>
            <p className="text-sm text-slate-400">Businesses appearing on Google Maps</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <Bell className="h-6 w-6 text-red-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Closures</h3>
            <p className="text-sm text-slate-400">Permanently or temporarily closed</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Relocations</h3>
            <p className="text-sm text-slate-400">Address and contact changes</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-800/30 border border-slate-700/50 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-1">Rating Changes</h3>
            <p className="text-sm text-slate-400">Significant review fluctuations</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-slate-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-emerald-500" />
            <span className="text-lg font-semibold text-white">LocalPulse</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 LocalPulse. Local business intelligence for growth-focused professionals.
          </p>
        </div>
      </footer>
    </main>
  )
}
