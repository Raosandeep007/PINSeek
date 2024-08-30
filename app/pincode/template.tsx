"use client";
import { AnimatePresence, motion } from "framer-motion";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  return (
    <AnimatePresence>
      <motion.div transition={{ duration: 0.75, ease: "easeOut" }}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
