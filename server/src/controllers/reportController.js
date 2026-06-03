import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getMonthlyReport(req, res) {
  try {
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.userId,
        date: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
      },
    });
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      income: 0,
      expense: 0,
    }));
    for (const tx of transactions) {
      const m = new Date(tx.date).getMonth();
      if (tx.type === "income") {
        months[m].income += Number(tx.amount);
      } else {
        months[m].expense += Number(tx.amount);
      }
    }
    res.json(months);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getCategoryReport(req, res) {
  try {
    const month = parseInt(req.query.month) || new Date().getMonth() + 1;
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.userId,
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
      include: { category: true },
    });
    const breakdown = {};
    for (const tx of transactions) {
      const key = tx.categoryId;
      if (!breakdown[key]) {
        breakdown[key] = { category: tx.category, total: 0, count: 0 };
      }
      breakdown[key].total += Number(tx.amount);
      breakdown[key].count++;
    }
    res.json(Object.values(breakdown));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
