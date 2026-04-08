import { useState } from 'react'
import { useHustle } from '../../store/hustleStore'

export default function POS() {
  const { inventory, recordSale } = useHustle()
  const [cart, setCart] = useState([])
  const [done, setDone] = useState(false)

  function addToCart(item) {
    if (item.qty <= 0) return
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) {
        const inStock = item.qty
        if (existing.qty >= inStock) return prev
        return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(c => c.id !== id))
  }

  function completeSale() {
    if (cart.length === 0) return
    recordSale(cart)
    setCart([])
    setDone(true)
    setTimeout(() => setDone(false), 2500)
  }

  const total = cart.reduce((s, i) => s + i.sellPrice * i.qty, 0)
  const profit = cart.reduce((s, i) => s + (i.sellPrice - i.unitCost) * i.qty, 0)

  return (
    <div className="space-y-5">
      {/* Success flash */}
      {done && (
        <div className="bg-green-500 text-white rounded-2xl p-4 text-center font-bold text-lg animate-pulse">
          ✅ Sale recorded! Digital record saved.
        </div>
      )}

      {/* Product Grid */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-3">🛒 Tap to Add</h2>
        <div className="grid grid-cols-2 gap-3">
          {inventory.map(item => (
            <button
              key={item.id}
              onClick={() => addToCart(item)}
              disabled={item.qty === 0}
              className={`p-3 rounded-xl text-left border-2 transition-all ${
                item.qty === 0
                  ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                  : 'border-blue-100 bg-blue-50 hover:border-blue-400 active:scale-95'
              }`}
            >
              <p className="font-semibold text-gray-800 text-sm leading-tight">{item.name}</p>
              <p className="text-blue-600 font-bold mt-1">R{item.sellPrice}</p>
              <p className="text-xs text-gray-400">{item.qty} in stock</p>
            </button>
          ))}
        </div>
      </div>

      {/* Cart */}
      {cart.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-3">🧾 Current Sale</h2>
          <div className="space-y-2 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">x{item.qty} @ R{item.sellPrice}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-800">R{(item.sellPrice * item.qty).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-3 mb-4 space-y-1">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>R{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-green-600">
              <span>Your profit</span>
              <span>R{profit.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={completeSale}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4 rounded-xl transition-colors"
          >
            ✅ Complete Sale
          </button>
        </div>
      )}

      {cart.length === 0 && !done && (
        <p className="text-center text-gray-400 text-sm py-4">Tap products above to start a sale</p>
      )}
    </div>
  )
}
