import { useHustle } from '../../store/hustleStore'

export default function Inventory() {
  const { inventory } = useHustle()

  const totalValue = inventory.reduce((s, i) => s + i.qty * i.unitCost, 0)

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-400 text-xs mb-1">Stock Items</p>
          <p className="text-3xl font-bold text-gray-900">{inventory.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-400 text-xs mb-1">Stock Value</p>
          <p className="text-3xl font-bold text-green-600">R{totalValue.toFixed(0)}</p>
        </div>
      </div>

      {/* Stock List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900">📦 Current Stock</h2>
        </div>
        {inventory.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p className="text-4xl mb-2">📭</p>
            <p>No stock yet — scan a receipt to add items</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {inventory.map(item => {
              const low = item.qty <= 3
              return (
                <div key={item.id} className="flex items-center justify-between px-5 py-4">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      Cost: R{item.unitCost} · Sell: R{item.sellPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`font-bold text-lg ${low ? 'text-red-500' : 'text-gray-800'}`}>
                      {item.qty}
                    </span>
                    {low && (
                      <p className="text-xs text-red-400">Low stock</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
