import { useState, createContext, useContext } from 'react'

const HustleContext = createContext(null)

const initialStock = [
  { id: 1, name: "Sunlight Soap 400g", qty: 18, unitCost: 12.50, sellPrice: 18.00 },
  { id: 2, name: "Coca-Cola 2L", qty: 8, unitCost: 22.00, sellPrice: 32.00 },
  { id: 3, name: "Albany Bread 700g", qty: 5, unitCost: 18.99, sellPrice: 26.00 },
  { id: 4, name: "Cremora 500g", qty: 4, unitCost: 32.00, sellPrice: 45.00 },
]

export function HustleProvider({ children }) {
  const [inventory, setInventory] = useState(initialStock)
  const [sales, setSales] = useState([])
  const [nextId, setNextId] = useState(initialStock.length + 1)

  function addStockFromScan(scannedItems) {
    setInventory(prev => {
      const updated = [...prev]
      scannedItems.forEach(scanned => {
        const existing = updated.find(i => i.name === scanned.name)
        if (existing) {
          existing.qty += scanned.qty
        } else {
          updated.push({
            id: nextId,
            name: scanned.name,
            qty: scanned.qty,
            unitCost: scanned.unitCost,
            sellPrice: +(scanned.unitCost * 1.4).toFixed(2),
          })
          setNextId(n => n + 1)
        }
      })
      return updated
    })
  }

  function recordSale(cartItems) {
    const total = cartItems.reduce((sum, i) => sum + i.sellPrice * i.qty, 0)
    const profit = cartItems.reduce((sum, i) => sum + (i.sellPrice - i.unitCost) * i.qty, 0)
    setSales(prev => [{
      id: prev.length + 1,
      date: new Date().toLocaleString('en-ZA'),
      items: cartItems,
      total: +total.toFixed(2),
      profit: +profit.toFixed(2),
    }, ...prev])
    setInventory(prev =>
      prev.map(item => {
        const sold = cartItems.find(c => c.id === item.id)
        return sold ? { ...item, qty: item.qty - sold.qty } : item
      })
    )
  }

  return (
    <HustleContext.Provider value={{ inventory, sales, addStockFromScan, recordSale }}>
      {children}
    </HustleContext.Provider>
  )
}

export function useHustle() {
  return useContext(HustleContext)
}
