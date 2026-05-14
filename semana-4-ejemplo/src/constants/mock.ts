export interface BrewRecipe {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
}

export const MOCK_BREW_RECIPES: BrewRecipe[] = [
  {
    id: "1",
    title: "Flat-Bottom Sweetness (15g)",
    author: "Andrés C.",
    description:
      "Perfect for bringing out stone fruit notes in light roasts. 15g coffee to 240g water at 93°C. Medium-coarse grind. 3 equal pours of 80g every 45 seconds.",
    // Crisp photo of a pour-over setup
    imageUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Classic V60 Fruity Bomb",
    author: "Elena R.",
    description:
      "A fast-draining recipe designed for washed Ethiopians. 20g in, 300g out. 96°C boiling water. Aggressive circular bloom, followed by a steady center pour.",
    // Moody, high-quality filter coffee dripping
    imageUrl:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Silky Modern Espresso",
    author: "Mateo V.",
    description:
      "18g dose in a precision basket, yielding 36g in exactly 28 seconds. WDT tool highly recommended. Expect a heavy, syrupy body with bright malic acidity.",
    // Beautiful close-up of a bottomless portafilter extraction
    imageUrl:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Japanese Flash Iced Filter",
    author: "Sofía M.",
    description:
      "Locks in aromatics instantly. 20g coffee ground slightly finer. 180g hot water (95°C) brewed directly over 120g of large, clear ice cubes. Swirl to melt completely.",
    // Minimalist glass server with iced filter coffee
    imageUrl:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    title: "Aeropress Ultimate Bypass",
    author: "Carlos T.",
    description:
      "Inverted method. 18g fine grind, add 100g water at 88°C. Stir vigorously for 20 seconds, press gently into server, then bypass with 100g of pure hot water for absolute clarity.",
    // Clean, top-down aesthetic coffee shot
    imageUrl:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
  },
];
