"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { DUR, staggerDelay, tween } from "@/lib/motion";

type Props = HTMLMotionProps<"div"> & {
  /** Position in a staggered group (0-based). */
  index?: number;
};

/**
 * Reveal-on-scroll: fades up 12px once, the first time it enters the viewport.
 * Never re-triggers. Reduced motion is handled globally by <MotionConfig>.
 */
export default function Reveal({ index = 0, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={tween(DUR.slow, staggerDelay(index))}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
