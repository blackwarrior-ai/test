export interface Product {
  id: number;
  slug: string;
  title: string;
  category: string;
  tag: string;
  status: string;
  discount: string;
  oldPrice: number;
  newPrice: number;
  image: string;
  bgColor: string;
  description: string;
  features: string[];
  badge?: string;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "chatgpt-private",
    title: "ChatGPT Plus Private",
    category: "AI Assistants",
    tag: "BEST SELLER",
    status: "Now on sale",
    discount: "-50%",
    oldPrice: 20.0,
    newPrice: 9.99,
    image: "/hero/chatgpt-logo-dl.jpg",
    bgColor: "#c87676",
    badge: "Hot",
    description:
      "Get your own private ChatGPT Plus account with full GPT-4o access. Enjoy unlimited conversations, image generation with DALL·E, advanced data analysis, and priority access during peak times.",
    features: [
      "Full GPT-4o access",
      "DALL·E image generation",
      "Advanced data analysis",
      "Priority access 24/7",
      "Private account — not shared",
      "Instant delivery via email",
    ],
  },
  {
    id: 2,
    slug: "gemini-pro",
    title: "Gemini Pro",
    category: "AI Assistants",
    tag: "POPULAR",
    status: "Now on sale",
    discount: "-45%",
    oldPrice: 20.0,
    newPrice: 10.9,
    image: "/hero/gemini-pro.png",
    bgColor: "#6384a3",
    description:
      "Access Google Gemini Pro with advanced reasoning, multi-modal capabilities, and seamless Google Workspace integration. Perfect for research, coding, and content creation.",
    features: [
      "Gemini 1.5 Pro model",
      "Multi-modal input (text, image, audio)",
      "Google Workspace integration",
      "1M token context window",
      "Private account credentials",
      "Instant delivery",
    ],
  },
  {
    id: 3,
    slug: "supergrok",
    title: "SuperGrok",
    category: "AI Assistants",
    tag: "NEW ARRIVAL",
    status: "Now on sale",
    discount: "-57%",
    oldPrice: 30.0,
    newPrice: 12.99,
    image: "/hero/grok.jpg",
    bgColor: "#c49a6c",
    badge: "New",
    description:
      "Unlock SuperGrok by xAI with real-time X (Twitter) data access, unfiltered responses, and cutting-edge reasoning. The AI that tells it like it is.",
    features: [
      "Real-time X/Twitter data access",
      "Unfiltered AI responses",
      "Image understanding & generation",
      "DeepSearch capability",
      "Private account",
      "Instant delivery",
    ],
  },
  {
    id: 4,
    slug: "canva-pro",
    title: "Canva Pro",
    category: "Design Tools",
    tag: "BEST VALUE",
    status: "Now on sale",
    discount: "-67%",
    oldPrice: 15.0,
    newPrice: 5.0,
    image: "/hero/canva-pro.jpg",
    bgColor: "#9d83b0",
    badge: "Deal",
    description:
      "Canva Pro unlocks premium templates, Brand Kit, Magic Resize, background remover, and 100+ million stock photos. Design anything from social media posts to presentations.",
    features: [
      "100M+ premium stock photos & videos",
      "Brand Kit & custom fonts",
      "Magic Resize for any platform",
      "Background Remover",
      "Content Planner & scheduler",
      "100GB cloud storage",
    ],
  },
  {
    id: 5,
    slug: "perplexity-pro",
    title: "Perplexity Pro",
    category: "AI Assistants",
    tag: "TRENDING",
    status: "Now on sale",
    discount: "-40%",
    oldPrice: 20.0,
    newPrice: 11.99,
    image: "/hero/perplexity-pro.jpg",
    bgColor: "#7a9e86",
    description:
      "Perplexity Pro gives you unlimited Pro searches with GPT-4, Claude, and Gemini. Get cited answers with real-time web search — the ultimate research assistant.",
    features: [
      "Unlimited Pro searches",
      "GPT-4, Claude & Gemini access",
      "Real-time cited web answers",
      "File upload & analysis",
      "API credits included",
      "Instant delivery",
    ],
  },
  {
    id: 6,
    slug: "midjourney-pro",
    title: "Midjourney Pro",
    category: "Design Tools",
    tag: "CREATIVE",
    status: "Now on sale",
    discount: "-35%",
    oldPrice: 30.0,
    newPrice: 19.5,
    image: "/hero/chatgpt-logo-dl.jpg",
    bgColor: "#5a7a9e",
    description:
      "Create stunning AI-generated artwork with Midjourney Pro. Get fast GPU access, concurrent jobs, and stealth mode for private image generation.",
    features: [
      "30 GPU hours/month (Fast mode)",
      "Unlimited Relax mode",
      "Stealth mode for privacy",
      "Concurrent job generation",
      "Commercial usage rights",
      "Instant delivery",
    ],
  },
  {
    id: 7,
    slug: "notion-ai",
    title: "Notion AI Pro",
    category: "Productivity",
    tag: "WORKSPACE",
    status: "Now on sale",
    discount: "-30%",
    oldPrice: 10.0,
    newPrice: 7.0,
    image: "/hero/gemini-pro.png",
    bgColor: "#8B7355",
    description:
      "Supercharge your Notion workspace with AI. Auto-generate content, summarize pages, translate text, and build databases intelligently.",
    features: [
      "AI writing assistant in every page",
      "Auto-summarize documents",
      "Translate to 10+ languages",
      "AI-powered database autofill",
      "Custom AI blocks",
      "Instant delivery",
    ],
  },
  {
    id: 8,
    slug: "copilot-pro",
    title: "GitHub Copilot Pro",
    category: "Coding",
    tag: "DEVELOPER",
    status: "Now on sale",
    discount: "-55%",
    oldPrice: 19.0,
    newPrice: 8.55,
    image: "/hero/grok.jpg",
    bgColor: "#4a6741",
    badge: "Dev",
    description:
      "Code faster with GitHub Copilot Pro. AI-powered code completions, chat assistance, and multi-file editing across all major IDEs.",
    features: [
      "GPT-4o powered completions",
      "Multi-file editing",
      "Chat in IDE",
      "Works in VS Code, JetBrains, Neovim",
      "Private account",
      "Instant delivery",
    ],
  },
  {
    id: 9,
    slug: "nordvpn-premium",
    title: "NordVPN Premium",
    category: "Privacy",
    tag: "SECURITY",
    status: "Now on sale",
    discount: "-70%",
    oldPrice: 12.0,
    newPrice: 3.6,
    image: "/hero/canva-pro.jpg",
    bgColor: "#3D5A80",
    description:
      "Browse securely with NordVPN Premium. Get access to 5000+ servers in 60 countries, Threat Protection, Meshnet, and ultra-fast NordLynx protocol.",
    features: [
      "5000+ servers in 60 countries",
      "NordLynx protocol (WireGuard)",
      "Threat Protection",
      "6 simultaneous connections",
      "No-logs policy",
      "Instant delivery",
    ],
  },
  {
    id: 10,
    slug: "spotify-premium",
    title: "Spotify Premium",
    category: "Entertainment",
    tag: "MUSIC",
    status: "Now on sale",
    discount: "-60%",
    oldPrice: 10.0,
    newPrice: 4.0,
    image: "/hero/perplexity-pro.jpg",
    bgColor: "#1DB954",
    description:
      "Enjoy ad-free music streaming with Spotify Premium. Download songs offline, get higher audio quality, and skip unlimited tracks.",
    features: [
      "Ad-free listening",
      "Offline downloads",
      "High quality audio (320kbps)",
      "Unlimited skips",
      "Spotify Connect on all devices",
      "Instant delivery",
    ],
  },
  {
    id: 11,
    slug: "elevenlabs-pro",
    title: "ElevenLabs Pro",
    category: "Voices",
    tag: "AI VOICE",
    status: "Now on sale",
    discount: "-42%",
    oldPrice: 22.0,
    newPrice: 12.76,
    image: "/hero/chatgpt-logo-dl.jpg",
    bgColor: "#7B68AE",
    description:
      "Generate ultra-realistic AI voices with ElevenLabs Pro. Clone voices, create audiobooks, and produce voiceovers in 30+ languages.",
    features: [
      "500K characters/month",
      "Voice cloning",
      "30+ languages",
      "Commercial license",
      "API access",
      "Instant delivery",
    ],
  },
  {
    id: 12,
    slug: "adobe-creative-cloud",
    title: "Adobe Creative Cloud",
    category: "Design Tools",
    tag: "CREATIVE SUITE",
    status: "Now on sale",
    discount: "-65%",
    oldPrice: 55.0,
    newPrice: 19.25,
    image: "/hero/gemini-pro.png",
    bgColor: "#CF3633",
    badge: "Pro",
    description:
      "Get full Adobe Creative Cloud — Photoshop, Illustrator, Premiere Pro, After Effects, and 20+ more apps. Everything for design, video, and photography.",
    features: [
      "20+ Adobe apps included",
      "100GB cloud storage",
      "Adobe Fonts library",
      "Adobe Portfolio",
      "Regular updates",
      "Instant delivery",
    ],
  },
];

export const categories = [
  { slug: "ai-assistants", label: "AI Assistants", icon: "🤖", color: "#1D349A" },
  { slug: "design-tools", label: "Design Tools", icon: "🎨", color: "#CF3633" },
  { slug: "coding", label: "Coding", icon: "💻", color: "#4a6741" },
  { slug: "productivity", label: "Productivity", icon: "📋", color: "#8B7355" },
  { slug: "privacy", label: "Privacy", icon: "🔒", color: "#3D5A80" },
  { slug: "entertainment", label: "Entertainment", icon: "🎵", color: "#1DB954" },
  { slug: "voices", label: "Voices", icon: "🎙️", color: "#7B68AE" },
  { slug: "graphics", label: "Graphics", icon: "✨", color: "#9d83b0" },
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter(
    (p) => p.category.toLowerCase().replace(/\s+/g, "-") === category
  );
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
