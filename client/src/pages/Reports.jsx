import { useState, useEffect } from "react";
import api from "../lib/api";
import MonthlyBarChart from "../components/MonthlyBarChart";
import CategoryPieChart from "../components/CategoryPieChart";

export default function Reports() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    api.get(`/reports/monthly?year=${year}`).then((res) => setMonthlyData(res.data)).catch(console.error);
  }, [year]);

  useEffect(() => {
    api.get(`/reports/category?month=${month}&year=${year}`).then((res) => setCategoryData(res.data)).catch(console.error);
  }, [month, year]);

  const formatINR = (n) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(n);

  const currentYear = new Date().getFullYear();

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-midnight-50 mb-6 animate-fade-in">Reports</h2>

      <div className="flex gap-2 mb-6 animate-slide-up">
        <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))} className="select-field w-auto">
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString("en", { month: "long" })}</option>
          ))}
        </select>
        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="select-field w-auto">
          {Array.from({ length: 5 }, (_, i) => (
            <option key={currentYear - i} value={currentYear - i}>{currentYear - i}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-hover animate-slide-up stagger-1">
          <h3 className="font-display text-base font-semibold text-midnight-100 mb-4">
            Yearly Overview ({year})
          </h3>
          <MonthlyBarChart data={monthlyData} />
        </div>

        <div className="card-hover animate-slide-up stagger-2">
          <h3 className="font-display text-base font-semibold text-midnight-100 mb-4">
            Category Breakdown — {new Date(0, month - 1).toLocaleString("en", { month: "long" })} {year}
          </h3>
          <CategoryPieChart data={categoryData} />
          {categoryData.length > 0 && (
            <div className="mt-4 space-y-2 border-t border-midnight-600/30 pt-4">
              {categoryData.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-midnight-200">{d.category.icon} {d.category.name}</span>
                  <span className="font-medium text-midnight-100">{formatINR(d.total)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
