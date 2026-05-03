import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
};

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1,    transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
};

export const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
};

export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export const float = {
  initial:  { y: 0 },
  animate:  { y: [-0, -14, 0] },
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
};

export const viewport = { once: true, margin: "-80px" } as const;
