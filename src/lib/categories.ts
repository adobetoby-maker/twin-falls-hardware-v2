export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  icon: string;
}

export const categories: Category[] = [
  {
    slug: "power-tools",
    name: "Power Tools",
    description: "Drills, saws, grinders, and more from trusted brands.",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
    icon: "⚡",
  },
  {
    slug: "lumber",
    name: "Lumber & Building",
    description: "Studs, boards, posts, and pressure-treated lumber.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    icon: "🪵",
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    description: "Valves, pipes, fittings, and repair supplies.",
    image:
      "https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=800&auto=format&fit=crop&q=80",
    icon: "🔧",
  },
  {
    slug: "electrical",
    name: "Electrical",
    description: "Outlets, breakers, wire nuts, and lighting supplies.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
    icon: "💡",
  },
  {
    slug: "paint",
    name: "Paint & Finishes",
    description: "Interior and exterior paints, primers, and applicators.",
    image:
      "https://images.unsplash.com/photo-1580893246395-52aead8960dc?w=800&auto=format&fit=crop&q=80",
    icon: "🎨",
  },
  {
    slug: "fasteners",
    name: "Fasteners",
    description: "Bolts, screws, anchors, and hardware assortments.",
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80",
    icon: "🔩",
  },
  {
    slug: "safety",
    name: "Safety",
    description: "Glasses, gloves, ear protection, and job-site safety gear.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
    icon: "🦺",
  },
  {
    slug: "hand-tools",
    name: "Hand Tools",
    description: "Hammers, screwdrivers, tape measures, and more.",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&auto=format&fit=crop&q=80",
    icon: "🔨",
  },
];
