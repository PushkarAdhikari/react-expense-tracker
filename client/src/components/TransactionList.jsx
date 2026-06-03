const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function TransactionList({ transactions, onDelete }) {
  if (!transactions.length) {
    return (
      <div className="flex flex-col items-center py-12 text-midnight-400">
        <span className="text-3xl mb-2 opacity-50">📭</span>
        <p className="text-sm">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((tx, i) => (
        <div key={tx.id} className={`flex items-center justify-between bg-midnight-700/40 border border-midnight-600/30 rounded-xl px-4 py-3 hover:border-midnight-500/50 transition-all duration-200 group animate-slide-up stagger-${Math.min(i + 1, 5)}`}>
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-midnight-700 text-lg">{tx.category.icon}</span>
            <div>
              <p className="text-sm font-medium text-midnight-100">{tx.category.name}</p>
              <p className="text-xs text-midnight-400">
                {formatDate(tx.date)}
                {tx.description && <span className="text-midnight-500"> · {tx.description}</span>}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm font-semibold ${tx.type === "income" ? "text-teal-400" : "text-rose-400"}`}>
              {tx.type === "income" ? "+" : "-"}{formatINR(tx.amount)}
            </span>
            <button onClick={() => onDelete(tx.id)} className="opacity-0 group-hover:opacity-100 text-midnight-500 hover:text-rose-400 transition-all duration-200 text-xs">
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
