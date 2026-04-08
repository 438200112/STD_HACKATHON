import { useState } from 'react'
import { scanReceipt } from '../../services/bedrock'
import { useHustle } from '../../store/hustleStore'

const STATES = { idle: 'idle', scanning: 'scanning', done: 'done' }

export default function ReceiptScanner() {
  const { addStockFromScan } = useHustle()
  const [state, setState] = useState(STATES.idle)
  const [result, setResult] = useState(null)

  async function handleScan() {
    setState(STATES.scanning)
    const data = await scanReceipt('mock-base64')
    setResult(data)
    setState(STATES.done)
  }

  function handleConfirm() {
    addStockFromScan(result.items)
    setResult(null)
    setState(STATES.idle)
  }

  return (
    <div className="space-y-5">
      {/* Scanner Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">📷</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Scan Receipt</h2>
        <p className="text-gray-500 text-sm mb-6">
          Take a photo of any receipt or handwritten invoice.<br />
          Amazon Bedrock AI will read it for you.
        </p>

        {state === STATES.idle && (
          <button
            onClick={handleScan}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl transition-colors"
          >
            📸 Scan Receipt
          </button>
        )}

        {state === STATES.scanning && (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3 text-blue-600">
              <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              <span className="font-semibold">Amazon Bedrock AI reading your receipt...</span>
            </div>
            <p className="text-xs text-gray-400">Extracting items, quantities and prices</p>
          </div>
        )}
      </div>

      {/* Results */}
      {state === STATES.done && result && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-green-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-green-500 text-xl">✅</span>
            <h3 className="font-bold text-gray-900">Bedrock found {result.items.length} items</h3>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            {result.supplier} · {result.date} · Total: R{result.total}
          </p>

          <div className="space-y-2 mb-5">
            {result.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-400">R{item.unitCost} each</p>
                </div>
                <span className="bg-blue-100 text-blue-700 font-bold text-sm px-3 py-1 rounded-full">
                  x{item.qty}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setState(STATES.idle)}
              className="flex-1 border-2 border-gray-200 text-gray-600 font-bold py-3 rounded-xl"
            >
              Discard
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Add to Stock ✓
            </button>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
        <p className="text-sm text-amber-800">
          <span className="font-bold">Powered by Amazon Bedrock</span> — every scan creates a verified digital record of your restocking, building your business history for loan applications.
        </p>
      </div>
    </div>
  )
}
