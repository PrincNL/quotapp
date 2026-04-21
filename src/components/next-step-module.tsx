"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics-client";

export interface NextStepLink {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

interface NextStepModuleProps {
  context: string;
  eyebrow?: string;
  title: string;
  description: string;
  primary: NextStepLink;
  secondary?: NextStepLink;
  comparisons?: NextStepLink[];
  trustPoints?: string[];
  theme?: "green" | "blue" | "purple" | "indigo";
}

const themeClasses = {
  green: {
    shell: "border-green-500/20 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-transparent",
    badge: "bg-green-500/10 text-green-700 dark:text-green-300",
    primary: "bg-green-600 hover:bg-green-700 text-white",
    secondary: "border-green-500/20 hover:border-green-500/40 hover:bg-green-500/5",
    icon: "text-green-600 dark:text-green-400",
  },
  blue: {
    shell: "border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent",
    badge: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/5",
    icon: "text-blue-600 dark:text-blue-400",
  },
  purple: {
    shell: "border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent",
    badge: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
    primary: "bg-purple-600 hover:bg-purple-700 text-white",
    secondary: "border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/5",
    icon: "text-purple-600 dark:text-purple-400",
  },
  indigo: {
    shell: "border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-transparent",
    badge: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    secondary: "border-indigo-500/20 hover:border-indigo-500/40 hover:bg-indigo-500/5",
    icon: "text-indigo-600 dark:text-indigo-400",
  },
};

export function NextStepModule({
  context,
  eyebrow = "Slimme vervolgstap",
  title,
  description,
  primary,
  secondary,
  comparisons = [],
  trustPoints = [],
  theme = "green",
}: NextStepModuleProps) {
  const styles = themeClasses[theme];

  const handleClick = (slot: string, href: string) => {
    void trackEvent("next_step_click", {
      context,
      slot,
      href,
    });
  };

  return (
    <section className="mt-8 space-y-4" aria-labelledby={`${context}-next-step`}>
      <div className={`card border ${styles.shell}`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${styles.badge}`}>
              <Sparkles className="h-3.5 w-3.5" />
              <span>{eyebrow}</span>
            </div>

            <h2 id={`${context}-next-step`} className="mt-4 text-2xl font-bold leading-tight">
              {title}
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {description}
            </p>

            {trustPoints.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {trustPoints.map((point) => (
                  <span
                    key={point}
                    className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    <ShieldCheck className={`h-3.5 w-3.5 ${styles.icon}`} />
                    <span>{point}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex w-full flex-col gap-3 lg:max-w-xs">
            <Link
              href={primary.href}
              onClick={() => handleClick("primary", primary.href)}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors ${styles.primary}`}
            >
              <span>{primary.label}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            {secondary && (
              <Link
                href={secondary.href}
                onClick={() => handleClick("secondary", secondary.href)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition-colors ${styles.secondary}`}
              >
                <span>{secondary.label}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            <p className="text-xs text-muted-foreground">
              Gratis tools, zonder account, met directe vervolgstappen voor je volgende keuze.
            </p>
          </div>
        </div>
      </div>

      {comparisons.length > 0 && (
        <div className="grid gap-3 md:grid-cols-3">
          {comparisons.map((item, index) => (
            <Link
              key={`${item.href}-${index}`}
              href={item.href}
              onClick={() => handleClick(`comparison_${index + 1}`, item.href)}
              className="card group border border-border/70 transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  {item.badge && (
                    <span className={`mb-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles.badge}`}>
                      {item.badge}
                    </span>
                  )}
                  <h3 className="font-semibold leading-snug">{item.label}</h3>
                  {item.description && (
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
                <CheckCircle2 className={`mt-0.5 h-5 w-5 flex-shrink-0 ${styles.icon}`} />
              </div>
              <div className={`mt-4 inline-flex items-center gap-2 text-sm font-medium ${styles.icon}`}>
                <span>Open tool</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
