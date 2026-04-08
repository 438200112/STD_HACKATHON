import { useState } from 'react'
import Dashboard from './components/Dashboard'
import BuyingCircle from './components/BuyingCircle'
import BankProfile from './components/BankProfile'
import HustleHub from './components/HustleHub'
import { mockUser } from './mockData'
import './index.css'

const tabs = [
  { id: 'dashboard', label: '🏠 Home' },
  { id: 'hustle', label: '💰 Hustle' },
  { id: 'circle', label: '🤝 Circle' },
  { id: 'profile', label: '🏦 Profile' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="bg-blue-700 text-white px-5 pt-10 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Sakhumnotho</h1>
            <p className="text-blue-200 text-sm">Grow your spaza, grow your future</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-blue-200">Sawubona 👋</p>
            <p className="font-bold">{mockUser.name.split(' ')[0]}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-5 overflow-y-auto pb-24">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'hustle' && <HustleHub />}
        {activeTab === 'circle' && <BuyingCircle />}
        {activeTab === 'profile' && <BankProfile />}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? 'text-blue-700 border-t-2 border-blue-700 bg-blue-50'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
