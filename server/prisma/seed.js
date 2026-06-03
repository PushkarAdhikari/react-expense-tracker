import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultCategories = [
  { name: "Salary", icon: "💼", type: "income" },
  { name: "Freelance", icon: "💻", type: "income" },
  { name: "Investment", icon: "📈", type: "income" },
  { name: "Other Income", icon: "💰", type: "income" },
  { name: "Food & Drinks", icon: "🍕", type: "expense" },
  { name: "Transport", icon: "🚗", type: "expense" },
  { name: "Shopping", icon: "🛍️", type: "expense" },
  { name: "Rent", icon: "🏠", type: "expense" },
  { name: "Utilities", icon: "💡", type: "expense" },
  { name: "Entertainment", icon: "🎬", type: "expense" },
  { name: "Healthcare", icon: "🏥", type: "expense" },
  { name: "Other Expense", icon: "❓", type: "expense" },
];

async function main() {
  for (const cat of defaultCategories) {
    const slug = cat.name.toLowerCase().replace(/\s+/g, "_");
    const existing = await prisma.category.findFirst({ where: { name: cat.name, isCustom: false, userId: null } });
    if (!existing) {
      await prisma.category.create({
        data: { id: slug, name: cat.name, icon: cat.icon, type: cat.type },
      });
    }
  }
  console.log("Default categories seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
