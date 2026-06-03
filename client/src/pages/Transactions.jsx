import { useState, useEffect, useCallback } from "react";
import api from "../lib/api";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({ type: "", categoryId: "", month: "", year: "" });

  const fetchTransactions = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter.type) params.set("type", filter.type);
      if (filter.categoryId) params.set("categoryId", filter.categoryId);
      if (filter.month) params.set("month", filter.month);
      if (filter.year) params.set("year", filter.year);
      const res = await api.get(`/transactions?${params}`);
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [filter]);

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleSubmit = async (form) => {
    try {
      await api.post("/transactions", form);
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      console.error(err);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-midnight-50 mb-6 animate-fade-in">Transactions</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="animate-slide-up">
          <TransactionForm categories={categories} onSubmit={handleSubmit} />
        </div>

        <div className="lg:col-span-2 space-y-4 animate-slide-up stagger-2">
          <div className="flex flex-wrap gap-2">
            <select value={filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value })} className="select-field w-auto">
              <option value="">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select value={filter.categoryId} onChange={(e) => setFilter({ ...filter, categoryId: e.target.value })} className="select-field w-auto">
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
              ))}
            </select>
            <select value={filter.month} onChange={(e) => setFilter({ ...filter, month: e.target.value })} className="select-field w-auto">
              <option value="">All months</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString("en", { month: "long" })}</option>
              ))}
            </select>
            <select value={filter.year} onChange={(e) => setFilter({ ...filter, year: e.target.value })} className="select-field w-auto">
              <option value="">All years</option>
              {Array.from({ length: 5 }, (_, i) => (
                <option key={currentYear - i} value={currentYear - i}>{currentYear - i}</option>
              ))}
            </select>
          </div>

          <div className="card">
            <TransactionList transactions={transactions} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
}
