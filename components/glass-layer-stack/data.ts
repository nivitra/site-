export type AudienceLayer = {
  id: string;
  title: string;
  body: string;
  /** Active plate face color (exact from recording) */
  color: string;
  /** Edge / rim highlight */
  rim: string;
  /** Soft under-glow */
  glow: string;
};

/**
 * Exact 4 segments from the screen recording (top → bottom of stack).
 */
export const LAYERS: AudienceLayer[] = [
  {
    id: "end-customers",
    title: "End Customers",
    body: "Get access to embedded insurance and prevention products when your need for them is realized. A simple one-click purchase integrated into the journey of your trusted partner.",
    color: "#2ad4d0",
    rim: "#5aefea",
    glow: "rgba(42, 212, 208, 0.35)",
  },
  {
    id: "telecoms",
    title: "Telecoms,\nConnectivity and IT\nSolution Providers",
    body: "Increase your clients' loyalty and satisfaction by providing them with additional benefits of innovative, easy-to-get insurance products and secure extra revenue streams with our embedded cyber retail and cyber corporate protection products.",
    color: "#0d8fd9",
    rim: "#3ab4f0",
    glow: "rgba(13, 143, 217, 0.32)",
  },
  {
    id: "hospitality",
    title: "Hospitality, Events and\nFarming industry",
    body: "Provide new and innovative parametric weather and agriculture insurance and prevention to your customers and stakeholders based on measurable weather effects – a simple, honest, and affordable insurance.",
    color: "#1563e8",
    rim: "#4a8cf5",
    glow: "rgba(21, 99, 232, 0.32)",
  },
  {
    id: "insurance",
    title: "Insurance and\nPrevention Providers",
    body: "Create new revenue streams by accessing new customer segments through our ecosystem linked to protection, leveraging trusted brands with a large customer base.",
    color: "#0b3fd4",
    rim: "#3d6ef0",
    glow: "rgba(11, 63, 212, 0.34)",
  },
];

/** How tall the sticky scroll track is (per step). */
export const SCROLL_STEP_VH = 90;
