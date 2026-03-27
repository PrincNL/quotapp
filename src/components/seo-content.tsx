import { ReactNode } from "react";

interface SEOContentProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function SEOContent({ children, title, className = "" }: SEOContentProps) {
  return (
    <section className={`prose prose-sm max-w-none text-muted-foreground ${className}`}>
      {title && <h2 className="text-xl font-bold text-foreground mb-4">{title}</h2>}
      {children}
    </section>
  );
}
