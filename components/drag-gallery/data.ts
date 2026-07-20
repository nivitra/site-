export type GalleryItem = {
  id: string;
  title: string;
  meta: string;
  src: string;
  /** Position in the large canvas (px) */
  x: number;
  y: number;
  /** Display width */
  w: number;
};

/**
 * Freeform layout — positions span a large virtual canvas (~3200×2200)
 * so panning reveals different clusters (like the recording).
 */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "white-peace",
    title: "White Peace",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof\n2024",
    src: "/lab/gallery/white-peace.jpg",
    x: 420,
    y: 80,
    w: 260,
  },
  {
    id: "flower-power",
    title: "Flower Power",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof\n2024",
    src: "/lab/gallery/flower-power-y.jpg",
    x: 980,
    y: 40,
    w: 300,
  },
  {
    id: "pirelli",
    title: "Pneumatici Pirelli",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus\n2024",
    src: "/lab/gallery/pirelli.jpg",
    x: 2100,
    y: 120,
    w: 220,
  },
  {
    id: "pink-bloom",
    title: "Bloom",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof\n2024",
    src: "/lab/gallery/pink-bloom.jpg",
    x: 2480,
    y: 200,
    w: 240,
  },
  {
    id: "house",
    title: "House Fun fact",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof\n2024",
    src: "/lab/gallery/house.jpg",
    x: 1200,
    y: 420,
    w: 340,
  },
  {
    id: "love-crazy",
    title: "Love Makes Your Crazy",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof\n2024",
    src: "/lab/gallery/love-crazy.jpg",
    x: 1620,
    y: 480,
    w: 380,
  },
  {
    id: "blue-motion",
    title: "Blue Is The Sky Color",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof\n2024",
    src: "/lab/gallery/blue-motion.jpg",
    x: 2080,
    y: 520,
    w: 300,
  },
  {
    id: "lotus",
    title: "Flower Bow",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof",
    src: "/lab/gallery/lotus.jpg",
    x: 720,
    y: 700,
    w: 200,
  },
  {
    id: "orange",
    title: "Orange Is The New Black",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof\n2024",
    src: "/lab/gallery/orange-silhouette.jpg",
    x: 380,
    y: 900,
    w: 300,
  },
  {
    id: "yellow",
    title: "Flower Power",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof\n2024",
    src: "/lab/gallery/yellow-flower.jpg",
    x: 1100,
    y: 980,
    w: 320,
  },
  {
    id: "house-2",
    title: "House Fun fact",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof\n2024",
    src: "/lab/gallery/house-2.jpg",
    x: 2600,
    y: 700,
    w: 320,
  },
  {
    id: "lotus-2",
    title: "Flower Bow",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof",
    src: "/lab/gallery/lotus-2.jpg",
    x: 2300,
    y: 1100,
    w: 200,
  },
  {
    id: "yellow-2",
    title: "Flower Power",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof\n2024",
    src: "/lab/gallery/yellow-2.jpg",
    x: 1680,
    y: 1200,
    w: 280,
  },
  {
    id: "pink-2",
    title: "Bloom",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof\n2024",
    src: "/lab/gallery/pink-bloom.jpg",
    x: 200,
    y: 200,
    w: 220,
  },
  {
    id: "orange-2",
    title: "Orange Is The New Black",
    meta: "12 x 8 inch C-type hand print\nEdition of 1 Plus and additional artist Proof\n2024",
    src: "/lab/gallery/orange-silhouette.jpg",
    x: 2800,
    y: 140,
    w: 260,
  },
];

export const CANVAS = { width: 3400, height: 1800 };
