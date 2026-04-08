import { useState } from 'react'
import { mockBuyingCircle } from '../mockData'

export default function BuyingCircle() {
  const [pledged, setPledged] = useState(mockBuyingCircle.pledged)
  const [pledgeAmount, setPledgeAmount] = useState('')
  const [pledged_, setPledged_] = useState(false)

  const pct = Math.min(Math.round((pledged / mockBuyingCircle.goal) * 100), 100)
  const remaining = mockBuyingCircle.goal - pledged

  function handlePledge() {
    const amount = parseFloat(pledgeAmount)
    if (!amount || amount <= 0) return
    setPledged(prev => Math.min(prev + amount, mockBuyingCircle.goal))
    setPledged_(true)
    setPledgeAmount('')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🤝</span>
          <h2 className="text-xl font-bold text-gray-900">{mockBuyingCircle.name}</h2>
        </div>
        <p className="text-gray-500 text-sm mb-4">Pooling together to buy: <span className="font-semibold text-gray-700">{mockBuyingCircle.targetItem}</span></p>

        {/* Progress */}
        <div className="mb-2 flex justify-between text-sm font-medium">
          <span className="text-gray-700">R{pledged.toLocaleString()} raised</span>
          <span className="text-gray-400">Goal: R{mockBuyingCircle.goal.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-5 mb-1">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-5 rounded-full transition-all duration-700 flex items-center justify-end pr-2"
            style={{ width: `${pct}%` }}
          >
            {pct > 15 && <span className="text-white text-xs font-bold">{pct}%</span>}
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-6">
          {remaining > 0
            ? `R${remaining.toLocaleString()} still needed · ${mockBuyingCircle.members} members · Closes ${mockBuyingCircle.deadline}`
            : '🎉 Goal reached! Order being placed.'}
        </p>

        {/* Savings badge */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <span className="bg-green-50 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">💰 Save {mockBuyingCircle.savings}</span>
          <span className="bg-blue-50 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">🏪 {mockBuyingCircle.supplier}</span>
        </div>

        {/* Pledge input */}
        {!pledged_ ? (
          <div className="flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">R</span>
              <input
                type="number"
                value={pledgeAmount}
                onChange={e => setPledgeAmount(e.target.value)}
                placeholder="Enter your pledge"
                className="w-full pl-8 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              onClick={handlePledge}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-6 py-4 rounded-xl transition-colors"
            >
              Pledge
            </button>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-green-700 font-bold text-lg">✅ Pledge added!</p>
            <p className="text-green-600 text-sm">You'll be notified when the order is placed.</p>
            <button
              onClick={() => setPledged_(false)}
              className="mt-3 text-sm text-blue-600 underline"
            >
              Add another pledge
            </button>
          </div>
        )}
      </div>

      {/* How it works */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="font-bold text-blue-900 mb-3">How Buying Circles Work</h3>
        <ol className="space-y-2 text-sm text-blue-800">
          <li>1. Members pledge their share of the bulk order</li>
          <li>2. Once the goal is reached, Sakhumnotho places the order</li>
          <li>3. Goods are delivered to a central pickup point</li>
          <li>4. Everyone saves vs buying retail individually</li>
        </ol>
      </div>
    </div>
  )
}
