import { useState } from "react";

export default function TransactionForm({ categories, onSubmit }) {
  const [form, setForm] = useState({ type: "expense", amount: "", description: "", categoryId: "", date: new Date().toISOString().split("T")[0] });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.categoryId) return;
    onSubmit({ ...form, amount: parseFloat(form.amount) });
    setForm((prev) => ({ ...prev, amount: "", description: "", categoryId: "" }));
  };

  const filtered = categories.filter((c) => c.type === form.type);

  return (
    <form onSubmit={handleSubmit} className="card-hover space-y-4 animate-slide-up">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
        <h3 className="font-display text-base font-semibold text-midnight-100">Add Transaction</h3>
      </div>

      <div className="flex gap-2">
        {["expense", "income"].map((t) => (
          <button type="button" key={t} onClick={() => setForm({ ...form, type: t, categoryId: "" })}
            className={`flex-1 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200 ${
              form.type === t
                ? t === "expense" ? "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30" : "bg-teal-500/15 text-teal-300 ring-1 ring-teal-500/30"
                : "bg-midnight-700/50 text-midnight-400 hover:text-midnight-200"
            }`}>
            {t}
          </button>
        ))}
      </div>

      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-midnight-400 text-sm font-medium">₹</span>
        <input type="number" step="0.01" min="0" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="input-field pl-8" required />
      </div>

      <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="select-field" required>
        <option value="">Select category</option>
        {filtered.map((c) => (
          <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
        ))}
      </select>

      <input type="text" placeholder="Description (optional)" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" />

      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="input-field" />

      <button type="submit" className="btn-primary">
        + Add {form.type === "expense" ? "Expense" : "Income"}
      </button>
    </form>
  );
}
