import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Scroll reveal that can never leave content stuck at opacity 0.
 *
 * Sections used to animate from `initial={{ opacity: 0 }}` and only resolve
 * once an IntersectionObserver fired, so reduced-motion users and any missed
 * observer left the page blank. This keeps the animation as an enhancement:
 * reduced motion skips it entirely, and a timeout reveals everything anyway.
 */
export function useReveal(margin = "-100px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: margin as `${number}px` });
  const reduced = useReducedMotion();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const shown = Boolean(reduced) || timedOut || inView;

  const reveal = (delay = 0, y = 20) => ({
    initial: reduced ? (false as const) : { opacity: 0, y },
    animate: shown ? { opacity: 1, y: 0 } : { opacity: 0, y },
    transition: { duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay },
  });

  return { ref, shown, reduced, reveal };
}
