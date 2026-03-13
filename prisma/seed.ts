import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivation" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs", category: "wisdom" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", category: "success" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "motivation" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "wisdom" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "success" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "motivation" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "life" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", category: "happiness" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West", category: "life" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker", category: "success" },
  { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama", category: "happiness" },
  { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle", category: "love" },
  { text: "The mind is everything. What you think you become.", author: "Buddha", category: "wisdom" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "motivation" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair", category: "motivation" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan", category: "motivation" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "wisdom" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "wisdom" },
  { text: "Where there is love there is life.", author: "Mahatma Gandhi", category: "love" },
  { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott", category: "love" },
  { text: "I never said most of the things I said.", author: "Yogi Berra", category: "humor" },
  { text: "Common sense is like deodorant. The people who need it most never use it.", author: "Anonymous", category: "humor" },
  { text: "People say nothing is impossible, but I do nothing every day.", author: "A.A. Milne", category: "humor" },
  { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi", category: "wisdom" },
  { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", category: "wisdom" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein", category: "success" },
  { text: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt", category: "wisdom" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt", category: "motivation" },
  { text: "Happiness depends upon ourselves.", author: "Aristotle", category: "happiness" },
];

async function main() {
  console.log("Seeding database...");
  
  const count = await prisma.quote.count();
  if (count > 0) {
    console.log("Database already has quotes, skipping seed.");
    return;
  }

  for (const quote of quotes) {
    await prisma.quote.create({
      data: {
        ...quote,
        tags: [quote.category],
      },
    });
  }

  console.log(`Seeded ${quotes.length} quotes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
