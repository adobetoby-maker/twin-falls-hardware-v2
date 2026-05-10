export interface Product {
  id: string;
  category: string;
  name: string;
  price: number;
  description: string;
  image: string;
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  // Power Tools (3)
  {
    id: "milwaukee-m18-drill",
    category: "power-tools",
    name: "Milwaukee M18 Drill/Driver Kit",
    price: 149.0,
    description:
      "M18 18V Li-Ion brushless cordless drill/driver kit. Includes two batteries, charger, and hard case. Our best-seller for contractors.",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
    inStock: true,
    featured: true,
  },
  {
    id: "dewalt-circular-saw",
    category: "power-tools",
    name: "DeWalt 7-1/4\" Circular Saw",
    price: 99.0,
    description:
      "15-amp circular saw with 5,500 RPM motor. Lightweight magnesium shoe for durability on the job site.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "milwaukee-angle-grinder",
    category: "power-tools",
    name: "Milwaukee 4-1/2\" Angle Grinder",
    price: 79.0,
    description:
      "11-amp corded angle grinder. All-metal gear case and anti-vibration side handle for precision cutting.",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },

  // Lumber (3)
  {
    id: "2x4x8-stud",
    category: "lumber",
    name: "2x4x8 SPF Stud",
    price: 4.49,
    description:
      "Spruce-pine-fir construction stud, ideal for framing walls and general construction. Kiln-dried.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    inStock: true,
    featured: true,
  },
  {
    id: "cedar-decking-16ft",
    category: "lumber",
    name: "Cedar Decking Board 16ft",
    price: 22.0,
    description:
      "Western red cedar 5/4x6 decking, 16ft length. Naturally resistant to rot and insects for Magic Valley outdoor builds.",
    image:
      "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=800&auto=format&fit=crop&q=80",
    inStock: true,
    featured: true,
  },
  {
    id: "4x4x8-post",
    category: "lumber",
    name: "4x4x8 Pressure-Treated Post",
    price: 12.99,
    description:
      "Ground-contact rated pressure-treated pine post. Ideal for fence posts, deck supports, and outdoor structures.",
    image:
      "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },

  // Plumbing (3)
  {
    id: "ball-valve-half-inch",
    category: "plumbing",
    name: "Ball Valve 1/2\"",
    price: 6.99,
    description:
      "Full-port brass ball valve, 1/2\" NPT. Quarter-turn operation for quick water shutoff. Lead-free brass.",
    image:
      "https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=800&auto=format&fit=crop&q=80",
    inStock: true,
    featured: true,
  },
  {
    id: "pvc-pipe-half-inch-10ft",
    category: "plumbing",
    name: "PVC Pipe 1/2\" — 10ft",
    price: 3.49,
    description:
      "Schedule 40 PVC pressure pipe, 1/2\" diameter, 10ft length. NSF-61 certified for potable water.",
    image:
      "https://images.unsplash.com/photo-1607400201515-c2c41c07d307?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "copper-elbow-half-inch",
    category: "plumbing",
    name: "Copper 90° Elbow 1/2\"",
    price: 2.99,
    description:
      "Wrought copper 90-degree elbow, 1/2\" solder connection. For domestic water and hydronic systems.",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },

  // Electrical (3)
  {
    id: "outlet-15amp",
    category: "electrical",
    name: "15A Duplex Outlet (White)",
    price: 1.49,
    description:
      "15-amp, 125V tamper-resistant duplex receptacle. Listed for residential and commercial use.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
    inStock: true,
    featured: true,
  },
  {
    id: "wire-nuts-assortment",
    category: "electrical",
    name: "Wire Nuts Assortment Box",
    price: 4.99,
    description:
      "50-piece assortment of orange and yellow wire connectors. UL-listed, suitable for 18–10 AWG.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "breaker-15amp",
    category: "electrical",
    name: "15A Single-Pole Circuit Breaker",
    price: 8.49,
    description:
      "120V single-pole breaker with plug-in design. Compatible with Square D QO load centers.",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },

  // Paint (3)
  {
    id: "interior-latex-gallon",
    category: "paint",
    name: "Interior Latex Paint — Gallon",
    price: 38.0,
    description:
      "Premium washable interior latex wall paint, flat finish. Custom tinting available in-store. Low-VOC formula.",
    image:
      "https://images.unsplash.com/photo-1580893246395-52aead8960dc?w=800&auto=format&fit=crop&q=80",
    inStock: true,
    featured: true,
  },
  {
    id: "interior-primer-gallon",
    category: "paint",
    name: "Interior Primer — Gallon",
    price: 24.99,
    description:
      "High-hide drywall and repair primer-sealer. Covers stains, tannin bleed, and prepares new drywall.",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "paint-roller-kit-9in",
    category: "paint",
    name: "9\" Roller Kit with 3 Covers",
    price: 12.99,
    description:
      "9-inch paint roller frame with 3 polyester roller covers (3/8\" nap). Includes metal roller tray.",
    image:
      "https://images.unsplash.com/photo-1580893246395-52aead8960dc?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },

  // Fasteners (3)
  {
    id: "hex-bolt-assortment",
    category: "fasteners",
    name: "Hex Bolt Assortment Box",
    price: 7.99,
    description:
      "70-piece grade-5 hex bolt assortment with matching nuts and flat washers. Zinc-plated for corrosion resistance.",
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80",
    inStock: true,
    featured: true,
  },
  {
    id: "deck-screws-1lb",
    category: "fasteners",
    name: "Deck Screws 2-1/2\" — 1lb",
    price: 5.99,
    description:
      "Star-drive coated exterior deck screws, 2-1/2\" x #9. Corrosion-resistant for ACQ-treated lumber.",
    image:
      "https://images.unsplash.com/photo-1585059895524-72359e06133a?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "concrete-anchor-kit",
    category: "fasteners",
    name: "Concrete Anchor Kit",
    price: 9.99,
    description:
      "20-piece wedge anchor kit for concrete and masonry. Includes 3/8\" anchors with nuts and washers.",
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },

  // Safety (3)
  {
    id: "safety-glasses-clear",
    category: "safety",
    name: "Safety Glasses — Clear Lens",
    price: 8.99,
    description:
      "ANSI Z87.1+ rated clear-lens safety glasses. Wrap-around frame, anti-scratch coating, UV protection.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
    inStock: true,
    featured: true,
  },
  {
    id: "work-gloves-lg",
    category: "safety",
    name: "Work Gloves — Large",
    price: 12.99,
    description:
      "Synthetic leather palm work gloves with knit back. Cut-resistant lining, touchscreen-compatible fingertips.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "ear-plugs-10pair",
    category: "safety",
    name: "Foam Ear Plugs — 10 pair",
    price: 4.99,
    description:
      "NRR 33 foam ear plugs, individually wrapped. Meets OSHA 1910.95 hearing conservation requirements.",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },

  // Hand Tools (3)
  {
    id: "hammer-16oz",
    category: "hand-tools",
    name: "16oz Claw Hammer",
    price: 18.99,
    description:
      "16oz smooth-face claw hammer with fiberglass handle. Comfortable grip, magnetic nail starter slot.",
    image:
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&auto=format&fit=crop&q=80",
    inStock: true,
    featured: true,
  },
  {
    id: "screwdriver-set-10pc",
    category: "hand-tools",
    name: "10-Piece Screwdriver Set",
    price: 14.99,
    description:
      "10-piece set including Phillips #1/#2/#3 and slotted drivers. Cushion-grip handles, chrome-vanadium tips.",
    image:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "tape-measure-25ft",
    category: "hand-tools",
    name: "25ft Tape Measure",
    price: 11.99,
    description:
      "25-foot x 1\" blade tape measure with nylon coating and magnetic hook. Standout to 11 feet.",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80",
    inStock: true,
  },
];

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
