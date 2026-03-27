"use client";

import { motion } from "framer-motion";

export function LoadingSkeleton({ type = "card" }: { type?: "card" | "input" | "result" }) {
  if (type === "input") {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-3/4" />
        <div className="skeleton h-12 w-full" />
        <div className="skeleton h-12 w-full" />
        <div className="flex gap-2">
          <div className="skeleton h-10 w-full" />
          <div className="skeleton h-10 w-full" />
        </div>
      </div>
    );
  }

  if (type === "result") {
    return (
      <div className="space-y-3">
        <div className="skeleton h-6 w-1/3" />
        <div className="skeleton h-20 w-full" />
        <div className="skeleton h-16 w-full" />
        <div className="skeleton h-20 w-full" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="card space-y-4"
    >
      <div className="flex items-center gap-4">
        <div className="skeleton h-12 w-12 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-6 w-1/3" />
          <div className="skeleton h-4 w-1/2" />
        </div>
      </div>
      <div className="skeleton h-32 w-full" />
    </motion.div>
  );
}

export function ToolCardSkeleton() {
  return (
    <div className="card tool-card">
      <div className="flex items-start justify-between mb-4">
        <div className="skeleton h-12 w-12 rounded-lg" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
      <div className="skeleton h-6 w-3/4 mb-2" />
      <div className="skeleton h-4 w-full" />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="skeleton h-10 w-64 mx-auto mb-3" />
        <div className="skeleton h-5 w-96 mx-auto" />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <LoadingSkeleton type="input" />
        <LoadingSkeleton type="result" />
      </div>
    </div>
  );
}

export function AdSkeleton() {
  return (
    <div className="ad-container animate-pulse">
      <div className="text-center">
        <div className="skeleton h-4 w-20 mx-auto mb-2" />
        <div className="skeleton h-16 w-64 mx-auto" />
      </div>
    </div>
  );
}
