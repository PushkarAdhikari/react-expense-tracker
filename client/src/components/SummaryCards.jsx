const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

export default function SummaryCards({ transactions }) {
  const income = transactions.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
  const expense = transactions.filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);
  const balance = income - expense;

  const cards = [
    { label: "Total Income", value: income, border: "border-teal-500/30", accent: "text-teal-400", icon: "📈" },
    { label: "Total Expenses", value: expense, border: "border-rose-400/30", accent: "text-rose-400", icon: "📉" },
    { label: "Balance", value: balance, border: balance >= 0 ? "border-gold-500/30" : "border-rose-400/30", accent: balance >= 0 ? "text-gold-300" : "text-rose-400", icon: balance >= 0 ? "💰" : "⚠️" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {cards.map((c, i) => (
        <div
          key={c.label}
          className={`card-hover animate-slide-up stagger-${i + 1} border-l-2 ${c.border}`}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-midnight-300 uppercase tracking-wider">{c.label}</p>
            <span className="text-lg opacity-70">{c.icon}</span>
          </div>
          <p className={`text-2xl font-bold font-display ${c.accent}`}>{formatINR(c.value)}</p>
        </div>
      ))}
    </div>
  );
}
