"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function MobileCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = document.getElementById("hero-cta-sentinel");
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <div className="m-3">
            <button
              className={cn(
                "w-full flex items-center justify-center gap-2 h-12 rounded-xl",
                "bg-primary text-primary-foreground font-semibold text-sm",
                "shadow-soft-xl active:scale-[0.98] transition-transform"
              )}
            >
              Community beitreten
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
