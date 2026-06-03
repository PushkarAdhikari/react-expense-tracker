import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(n);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function MonthlyBarChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-midnight-400 text-sm py-8 text-center">No data available.</p>;
  }

  const chartData = data.map((d) => ({ name: MONTHS[d.month - 1], Income: d.income, Expenses: d.expense }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2f45" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#8b87a0" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#8b87a0" }} axisLine={false} tickLine={false} tickFormatter={formatINR} />
        <Tooltip
          contentStyle={{ background: "#1e2338", border: "1px solid #2a2f45", borderRadius: "12px", fontSize: "13px" }}
          labelStyle={{ color: "#f1eee9" }}
          formatter={(value) => formatINR(value)}
        />
        <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", color: "#8b87a0" }} />
        <Bar dataKey="Income" fill="#4db6ac" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Expenses" fill="#d48a1a" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
