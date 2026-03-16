"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function FadeUp({
  children,
  delay = 0,
  className,
  triggerOnLoad = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  triggerOnLoad?: boolean;
}) {
  const initial = { opacity: 0, y: 28 };
  const target = { opacity: 1, y: 0 };
  const transition = { duration: 0.85, delay, ease };

  if (triggerOnLoad) {
    return (
      <motion.div
        className={className}
        initial={initial}
        animate={target}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={target}
      viewport={{ once: true, amount: 0.25 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
