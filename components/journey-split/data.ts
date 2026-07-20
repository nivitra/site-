export type JourneyCard = {
  id: string;
  title: string;
  body: string;
  /** Card face color */
  tone: "silver" | "blue" | "charcoal";
  /** Icon: trend | nodes | spark */
  icon: "trend" | "nodes" | "spark";
  /** Base rotateY for fan (deg) */
  rotateY: number;
  /** Horizontal offset when fanned */
  x: number;
};

export const JOURNEY_CARDS: JourneyCard[] = [
  {
    id: "zero-to-one",
    title: "Going\nZero to One",
    body: "If you've navigating a new business unit, or a new venture entirely, or breaking into a new market",
    tone: "silver",
    icon: "trend",
    rotateY: 18,
    x: -40,
  },
  {
    id: "one-to-n",
    title: "Scaling from\nOne to N",
    body: "If you've achieved Product/ Service Market Fit, and are looking to scale your business to new heights",
    tone: "blue",
    icon: "nodes",
    rotateY: 0,
    x: 0,
  },
  {
    id: "quick",
    title: "Need Quick\nSolutions",
    body: "If you know exactly what you want and need a team that can step in and quickly help you with it",
    tone: "charcoal",
    icon: "spark",
    rotateY: -18,
    x: 40,
  },
];

export type Phase = "unified" | "split" | "cards" | "exit" | "caption";
