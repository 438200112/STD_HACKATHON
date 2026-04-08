// Mock Amazon Bedrock receipt scanner
// Swap scanReceipt() with real BedrockRuntimeClient call when ready

export async function scanReceipt(_imageBase64) {
  // Simulate Bedrock latency
  await new Promise(r => setTimeout(r, 2000))

  // Mock Claude response — replace with real InvokeModelCommand
  return {
    supplier: "Makro Wholesale",
    date: new Date().toISOString().split('T')[0],
    total: 821.88,
    items: [
      { name: "Sunlight Soap 400g", qty: 24, unitCost: 12.50 },
      { name: "Coca-Cola 2L", qty: 12, unitCost: 22.00 },
      { name: "Albany Bread 700g", qty: 10, unitCost: 18.99 },
      { name: "Cremora 500g", qty: 6, unitCost: 32.00 },
    ],
  }
}
