import { useState, useEffect } from "react";
import api from "../lib/api";
import SummaryCards from "../components/SummaryCards";
import MonthlyBarChart from "../components/MonthlyBarChart";
import TransactionList from "../components/TransactionList";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [txRes, reportRes] = await Promise.all([
        api.get("/transactions?limit=5"),
        api.get("/reports/monthly"),
      ]);
      setTransactions(txRes.data);
      setMonthlyData(reportRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-2 border-gold-500/30 border-t-gold-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-midnight-50 mb-6 animate-fade-in">Dashboard</h2>
      <SummaryCards transactions={transactions} />
      <div className="card-hover mb-8 animate-slide-up stagger-3">
        <h3 className="font-display text-base font-semibold text-midnight-100 mb-4">Monthly Overview</h3>
        <MonthlyBarChart data={monthlyData} />
      </div>
      <div className="card-hover animate-slide-up stagger-4">
        <h3 className="font-display text-base font-semibold text-midnight-100 mb-4">Recent Transactions</h3>
        <TransactionList transactions={transactions} onDelete={() => fetchData()} />
      </div>
    </div>
  );
}
