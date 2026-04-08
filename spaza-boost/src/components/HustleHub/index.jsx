import { useState } from 'react'
import { HustleProvider } from '../../store/hustleStore'
import ReceiptScanner from './ReceiptScanner'
import Inventory from './Inventory'
import POS from './POS'
import SalesHistory from './SalesHistory'

const tabs = [
  { id: 'pos', label: '🛒 POS' },
  { id: 'scan', label: '📷 Scan' },
  { id: 'stock', label: '📦 Stock' },
  { id: 'history', label: '📋 History' },
]

export default function HustleHub() {
  const [tab, setTab] = useState('pos')

  return (
    <HustleProvider>
      <div className="space-y-4">
        {/* Sub-nav */}
        <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-gray-100">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-colors ${
                tab === t.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'pos' && <POS />}
        {tab === 'scan' && <ReceiptScanner />}
        {tab === 'stock' && <Inventory />}
        {tab === 'history' && <SalesHistory />}
      </div>
    </HustleProvider>
  )
}
