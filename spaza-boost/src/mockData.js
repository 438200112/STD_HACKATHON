// Mock AWS data — swap these with real API calls later
export const mockUser = {
  name: "Nomsa Dlamini",
  business: "Nomsa's Spaza Shop",
  location: "Soweto, Gauteng",
  trustScore: 78,
  trustLevel: "Silver",
  dailyProfit: 420,
  weeklyProfit: 2940,
  verified: true,
  memberSince: "Jan 2024",
};

export const mockBuyingCircle = {
  name: "Soweto Spaza Collective",
  goal: 5000,
  pledged: 3750,
  members: 8,
  targetItem: "Bulk Maize Meal (50kg x 20 bags)",
  supplier: "Makro Wholesale",
  deadline: "2026-04-15",
  savings: "22% vs retail",
};

export const mockInventoryTips = [
  { item: "Sunlight Soap", status: "low", tip: "Reorder — selling fast this week" },
  { item: "Coca-Cola 2L", status: "ok", tip: "Stock levels good" },
  { item: "Bread (Albany)", status: "critical", tip: "Out of stock — losing R180/day" },
  { item: "Airtime (Vodacom)", status: "ok", tip: "High demand on weekends" },
];

export const mockDeals = [
  { supplier: "Makro", item: "Cooking Oil 5L x 6", saving: "18%", expires: "2 days" },
  { supplier: "Jumbo Cash & Carry", item: "Sugar 10kg x 4", saving: "12%", expires: "5 days" },
  { supplier: "Metro", item: "Washing Powder 3kg", saving: "25%", expires: "1 day" },
];
