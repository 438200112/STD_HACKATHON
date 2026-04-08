import { mockUser } from '../mockData'

const profileItems = [
  { label: "Business Name", value: mockUser.business, verified: true },
  { label: "Owner", value: mockUser.name, verified: true },
  { label: "Location", value: mockUser.location, verified: true },
  { label: "Member Since", value: mockUser.memberSince, verified: true },
  { label: "Business Type", value: "Spaza Shop / Informal Retail", verified: true },
  { label: "SARS Tax Number", value: "••••••••••", verified: false },
  { label: "Bank Account", value: "Standard Bank ••••4521", verified: true },
]

const achievements = [
  { icon: "🏆", label: "30-Day Streak", desc: "Traded every day for a month" },
  { icon: "🤝", label: "Circle Member", desc: "Joined a buying circle" },
  { icon: "📊", label: "Profit Tracker", desc: "Logged 90 days of sales" },
]

export default function BankProfile() {
  return (
    <div className="space-y-6">
      {/* Standard Bank Verified Badge */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-200 text-sm">Sakhumnotho Profile</p>
            <h2 className="text-2xl font-bold">{mockUser.name}</h2>
            <p className="text-blue-200">{mockUser.business}</p>
          </div>
          <div className="text-right">
            <div className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 border border-white/20">
              <p className="text-xs text-blue-200 mb-1">Trust Score</p>
              <p className="text-3xl font-bold">{mockUser.trustScore}</p>
            </div>
          </div>
        </div>

        {/* Standard Bank Verified */}
        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 border border-white/20">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-blue-700 font-black text-sm">SB</span>
          </div>
          <div>
            <p className="font-bold text-sm">Standard Bank Verified ✓</p>
            <p className="text-blue-200 text-xs">Bank-ready profile · Eligible for SME products</p>
          </div>
          <span className="ml-auto text-green-400 text-xl">✅</span>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">Business Details</h3>
        <div className="space-y-3">
          {profileItems.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="font-semibold text-gray-800">{item.value}</p>
              </div>
              {item.verified
                ? <span className="text-green-500 text-lg">✓</span>
                : <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">Pending</span>
              }
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-900 mb-4">🏅 Achievements</h3>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((a, i) => (
            <div key={i} className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-3xl mb-1">{a.icon}</div>
              <p className="text-xs font-bold text-gray-800">{a.label}</p>
              <p className="text-xs text-gray-400 mt-1">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-2xl transition-colors shadow-md">
        Apply for SME Business Loan →
      </button>
    </div>
  )
}
