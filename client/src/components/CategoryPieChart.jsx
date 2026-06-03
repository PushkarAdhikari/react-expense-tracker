import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#d48a1a", "#4db6ac", "#f06292", "#7e57c2", "#ef5350", "#26c6da", "#ffa726", "#5c6bc0", "#66bb6a", "#ec407a"];

export default function CategoryPieChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-midnight-400 text-sm py-8 text-center">No data for this month.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="total" nameKey="category.name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3}>
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: "#1e2338", border: "1px solid #2a2f45", borderRadius: "12px", fontSize: "13px" }}
          labelStyle={{ color: "#f1eee9" }}
          formatter={(value) =>
            new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(value)
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
