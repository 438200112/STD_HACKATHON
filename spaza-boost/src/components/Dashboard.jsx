import { mockUser, mockInventoryTips, mockDeals } from '../mockData'

const statusColor = {
  low: 'bg-yellow-100 text-yellow-800',
  ok: 'bg-green-100 text-green-800',
  critical: 'bg-red-100 text-red-800',
}

export default function Dashboard() {
  const score = mockUser.trustScore

  return (
    <div className="space-y-6">
      {/* Trust Score + Profit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Trust Score */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium mb-1">Trust Score</p>
          <div className="flex items-end gap-3 mb-3">
            <span className="text-5xl font-bold text-gray-900">{score}</span>
            <span className="text-lg text-yellow-600 font-semibold mb-1">🥈 {mockUser.trustLevel}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-yellow-400 to-green-500 h-3 rounded-full transition-all duration-700"
              style={{ width: `${score}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-2">22 points to Gold — keep trading!</p>
        </div>

        {/* Daily Profit */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium mb-1">Today's Profit</p>
          <p className="text-5xl font-bold text-green-600">R{mockUser.dailyProfit}</p>
          <p className="text-sm text-gray-400 mt-2">This week: <span className="text-gray-700 font-semibold">R{mockUser.weeklyProfit}</span></p>
          <div className="mt-3 flex gap-2">
            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">↑ 12% vs last week</span>
          </div>
        </div>
      </div>

      {/* Inventory Tips */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">📦 Inventory Tips</h2>
        <div className="space-y-3">
          {mockInventoryTips.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-800">{item.item}</p>
                <p className="text-sm text-gray-500">{item.tip}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${statusColor[item.status]}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Deals */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">🔥 Hyper-Local Deals</h2>
        <div className="space-y-3">
          {mockDeals.map((deal, i) => (
            <div key={i} className="flex items-center justify-between p-3 border border-orange-100 bg-orange-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-800">{deal.item}</p>
                <p className="text-sm text-gray-500">{deal.supplier} · Expires in {deal.expires}</p>
              </div>
              <span className="text-lg font-bold text-orange-600">-{deal.saving}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
