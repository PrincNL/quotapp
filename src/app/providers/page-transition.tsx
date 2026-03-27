"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

// Dynamische import voor Framer Motion - vermindert initial bundle size
// Dit laadt framer-motion pas wanneer nodig, niet bij eerste page load
import dynamic from "next/dynamic";

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => {
    const { motion } = mod;
    return {
      default: ({ children, ...props }: { children: ReactNode }) => (
        <motion.div {...props}>{children}</motion.div>
      )
    };
  }),
  { 
    ssr: false,
    loading: () => <div>{children => children}</div>
  }
);

// Fallback component zonder animatie voor snellere initial load
function NoTransition({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -8,
  },
};

// Check of we animaties mogen tonen (prefers-reduced-motion)
const shouldAnimate = typeof window !== 'undefined' 
  ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : true;

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  // Render zonder animatie voor betere performance en accessibility
  if (!shouldAnimate) {
    return <>{children}</>;
  }

  return (
    <div key={pathname} className="page-transition-wrapper">
      {children}
    </div>
  );
}
