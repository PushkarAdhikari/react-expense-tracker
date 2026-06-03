import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCategories(req, res) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        OR: [
          { isCustom: false, userId: null },
          { userId: req.userId },
        ],
      },
      orderBy: { name: "asc" },
    });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createCategory(req, res) {
  try {
    const { name, icon, type } = req.body;
    if (!name || !type) {
      return res.status(400).json({ error: "Name and type are required" });
    }
    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ error: "Type must be income or expense" });
    }
    const category = await prisma.category.create({
      data: {
        id: `${req.userId}_${name.toLowerCase().replace(/\s+/g, "_")}`,
        name,
        icon: icon || "📁",
        type,
        isCustom: true,
        userId: req.userId,
      },
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
