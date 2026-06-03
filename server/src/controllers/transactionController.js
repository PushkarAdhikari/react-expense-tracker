import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTransactions(req, res) {
  try {
    const { type, categoryId, month, year } = req.query;
    const where = { userId: req.userId };
    if (type) where.type = type;
    if (categoryId) where.categoryId = categoryId;
    if (month && year) {
      const m = parseInt(month);
      const y = parseInt(year);
      where.date = {
        gte: new Date(y, m - 1, 1),
        lt: new Date(y, m, 1),
      };
    } else if (year) {
      const y = parseInt(year);
      where.date = {
        gte: new Date(y, 0, 1),
        lt: new Date(y + 1, 0, 1),
      };
    }
    const transactions = await prisma.transaction.findMany({
      where,
      include: { category: true },
      orderBy: { date: "desc" },
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createTransaction(req, res) {
  try {
    const { type, amount, description, date, categoryId } = req.body;
    if (!type || !amount || !categoryId) {
      return res.status(400).json({ error: "Type, amount, and category are required" });
    }
    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ error: "Type must be income or expense" });
    }
    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    const transaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        description: description || null,
        date: date ? new Date(date) : new Date(),
        userId: req.userId,
        categoryId,
      },
      include: { category: true },
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;
    const tx = await prisma.transaction.findUnique({ where: { id } });
    if (!tx) return res.status(404).json({ error: "Transaction not found" });
    if (tx.userId !== req.userId) return res.status(403).json({ error: "Not authorized" });
    await prisma.transaction.delete({ where: { id } });
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
