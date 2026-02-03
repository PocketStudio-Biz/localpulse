'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Building2,
  Bell,
  MapPin,
  TrendingUp,
  TrendingDown,
  Plus,
  Search,
  Filter,
  RefreshCw,
} from 'lucide-react'

interface TrackedArea {
  id: string
  name: string
  location: string
  last_scan: string | null
}

interface Business {
  id: string
  name: string
  address: string
  category: string
  status: string
  rating: number
  review_count: number
}

interface Alert {
  id: string
  alert_type: string
  title: string
  description: string
  created_at: string
  business_name: string
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [trackedAreas, setTrackedAreas] = useState<TrackedArea[]>([])
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  // Demo data for showcase
  useEffect(() => {
    // In production, this would fetch from API
    setTrackedAreas([
      { id: '1', name: 'Downtown Austin', location: 'Austin, TX', last_scan: new Date().toISOString() },
      { id: '2', name: 'South Congress', location: 'Austin, TX', last_scan: new Date().toISOString() },
      { id: '3', name: 'The Domain', location: 'Austin, TX', last_scan: null },
    ])

    setBusinesses([
      { id: '1', name: 'Blue Bottle Coffee', address: '123 Main St', category: 'Coffee Shop', status: 'active', rating: 4.5, review_count: 234 },
      { id: '2', name: 'Ramen Tatsu-ya', address: '456 S Congress Ave', category: 'Restaurant', status: 'active', rating: 4.8, review_count: 1205 },
      { id: '3', name: "Joe's Pizza", address: '789 6th St', category: 'Restaurant', status: 'closed', rating: 4.2, review_count: 89 },
      { id: '4', name: 'Fitness First Gym', address: '321 Domain Dr', category: 'Fitness', status: 'active', rating: 4.0, review_count: 156 },
      { id: '5', name: 'Tech Hub Coworking', address: '555 Congress Ave', category: 'Office Space', status: 'active', rating: 4.6, review_count: 78 },
    ])

    setAlerts([
      { id: '1', alert_type: 'new_business', title: 'New Coffee Shop', description: 'Blue Bottle Coffee opened at 123 Main St', created_at: new Date().toISOString(), business_name: 'Blue Bottle Coffee' },
      { id: '2', alert_type: 'closure', title: 'Restaurant Closed', description: "Joe's Pizza permanently closed", created_at: new Date(Date.now() - 86400000).toISOString(), business_name: "Joe's Pizza" },
      { id: '3', alert_type: 'rating_change', title: 'Rating Drop', description: 'Fitness First Gym dropped from 4.5 to 4.0 stars', created_at: new Date(Date.now() - 172800000).toISOString(), business_name: 'Fitness First Gym' },
    ])

    setLoading(false)
  }, [])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'new_business':
        return <Plus className="h-5 w-5 text-emerald-400" />
      case 'closure':
        return <Building2 className="h-5 w-5 text-red-400" />
      case 'rating_change':
        return <TrendingDown className="h-5 w-5 text-yellow-400" />
      default:
        return <Bell className="h-5 w-5 text-blue-400" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <RefreshCw className="h-8 w-8 text-emerald-400 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-7 w-7 text-emerald-500" />
            <span className="text-xl font-bold text-white">LocalPulse</span>
          </Link>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full">
            Demo Mode
          </span>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-6 rounded-xl bg-slate-800 border border-slate-700">
            <p className="text-slate-400 text-sm">Tracked Areas</p>
            <p className="text-3xl font-bold text-white">{trackedAreas.length}</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-800 border border-slate-700">
            <p className="text-slate-400 text-sm">Businesses Monitored</p>
            <p className="text-3xl font-bold text-white">{businesses.length}</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-800 border border-slate-700">
            <p className="text-slate-400 text-sm">Alerts This Week</p>
            <p className="text-3xl font-bold text-emerald-400">{alerts.length}</p>
          </div>
          <div className="p-6 rounded-xl bg-slate-800 border border-slate-700">
            <p className="text-slate-400 text-sm">New Openings</p>
            <p className="text-3xl font-bold text-blue-400">
              {alerts.filter((a) => a.alert_type === 'new_business').length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-slate-700">
          {['overview', 'alerts', 'businesses', 'areas'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-medium transition capitalize ${
                activeTab === tab
                  ? 'text-emerald-400 border-b-2 border-emerald-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Alerts */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-emerald-400" />
                Recent Alerts
              </h3>
              <div className="space-y-4">
                {alerts.slice(0, 5).map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/50">
                    {getAlertIcon(alert.alert_type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">{alert.title}</p>
                      <p className="text-slate-400 text-sm truncate">{alert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracked Areas */}
            <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-400" />
                Tracked Areas
              </h3>
              <div className="space-y-3">
                {trackedAreas.map((area) => (
                  <div key={area.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                    <div>
                      <p className="text-white font-medium">{area.name}</p>
                      <p className="text-slate-400 text-sm">{area.location}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      area.last_scan ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-600 text-slate-400'
                    }`}>
                      {area.last_scan ? 'Active' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">All Alerts</h3>
              <div className="flex gap-2">
                <button className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm flex items-center gap-2">
                  <Filter className="h-4 w-4" /> Filter
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition">
                  {getAlertIcon(alert.alert_type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-medium">{alert.title}</p>
                      <span className="text-xs text-slate-500">
                        {new Date(alert.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'businesses' && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Monitored Businesses</h3>
              <div className="relative">
                <Search className="h-4 w-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search businesses..."
                  className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                    <th className="pb-3 font-medium">Business</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Rating</th>
                    <th className="pb-3 font-medium">Reviews</th>
                  </tr>
                </thead>
                <tbody>
                  {businesses.map((biz) => (
                    <tr key={biz.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="py-4">
                        <p className="text-white font-medium">{biz.name}</p>
                        <p className="text-slate-500 text-sm">{biz.address}</p>
                      </td>
                      <td className="py-4 text-slate-300">{biz.category}</td>
                      <td className="py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          biz.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {biz.status}
                        </span>
                      </td>
                      <td className="py-4 text-white">{biz.rating} ⭐</td>
                      <td className="py-4 text-slate-300">{biz.review_count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'areas' && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Tracked Areas</h3>
              <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm flex items-center gap-2 transition">
                <Plus className="h-4 w-4" /> Add Area
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trackedAreas.map((area) => (
                <div key={area.id} className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium">{area.name}</h4>
                      <p className="text-slate-400 text-sm flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {area.location}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      area.last_scan ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-600 text-slate-400'
                    }`}>
                      {area.last_scan ? 'Active' : 'Pending'}
                    </span>
                  </div>
                  {area.last_scan && (
                    <p className="text-slate-500 text-xs">
                      Last scan: {new Date(area.last_scan).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
