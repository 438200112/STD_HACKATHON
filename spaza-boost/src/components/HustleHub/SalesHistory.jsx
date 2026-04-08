import { useHustle } from '../../store/hustleStore'

export default function SalesHistory() {
  const { sales } = useHustle()

  const totalRevenue = sales.reduce((s, sale) => s + sale.total, 0)
  const totalProfit = sales.reduce((s, sale) => s + sale.profit, 0)

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-400 text-xs mb-1">Total Sales</p>
          <p className="text-3xl font-bold text-gray-900">{sales.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-400 text-xs mb-1">Total Profit</p>
          <p className="text-3xl font-bold text-green-600">R{totalProfit.toFixed(0)}</p>
        </div>
      </div>

      {/* Digital Record Banner */}
      <div className="bg-blue-700 rounded-2xl p-4 text-white">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏦</span>
          <div>
            <p className="font-bold">Digital Business Record</p>
            <p className="text-blue-200 text-xs">
              R{totalRevenue.toFixed(2)} verified turnover · {sales.length} transactions · Standard Bank ready
            </p>
          </div>
        </div>
      </div>

      {/* Sales List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900">📋 Transaction History</h2>
        </div>
        {sales.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p className="text-4xl mb-2">📭</p>
            <p>No sales yet — complete a sale on the POS tab</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {sales.map(sale => (
              <div key={sale.id} className="px-5 py-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">Sale #{sale.id}</p>
                    <p className="text-xs text-gray-400">{sale.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">R{sale.total}</p>
                    <p className="text-xs text-green-600">+R{sale.profit} profit</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {sale.items.map((item, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {item.name} x{item.qty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
