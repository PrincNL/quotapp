"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

// AdSense publisher ID
const ADSENSE_PUB_ID = "ca-pub-4811749024166183";

// Ad slot IDs
export const AD_SLOTS = {
  homepageTop: "7775684944",
  homepageInline: "1653129720",
  homepageSidebar: "6115118919",
  toolInline: "3644868249",
  toolSidebar: "4802037246",
  blogInfeed: "6761986178",
  mobileAnchor: "4135822833",
};

interface AdBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal" | "fluid";
  className?: string;
  layout?: string;
  style?: React.CSSProperties;
}

export function AdBanner({ slot, format = "auto", className = "", layout, style }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        if (typeof window !== "undefined" && (window as any).adsbygoogle) {
          (window as any).adsbygoogle.push({});
        }
      } catch {
        // Ad blocked or error
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [slot]);

  return (
    <div className={`ad-container ${className}`} ref={adRef} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "90px", ...style }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
        {...(layout ? { "data-ad-layout": layout } : {})}
      />
    </div>
  );
}

interface AdContainerProps {
  children: React.ReactNode;
  className?: string;
  label?: string;
  collapsible?: boolean;
}

export function AdContainer({ children, className = "", label = "Advertentie", collapsible = false }: AdContainerProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    if (collapsible) {
      const timer = setTimeout(() => setCanClose(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [collapsible]);

  if (collapsed) {
    return (
      <button
        onClick={() => setCollapsed(false)}
        className="w-full bg-muted/50 border border-border/50 rounded-xl p-3 text-sm text-muted-foreground hover:bg-muted transition-colors"
      >
        {label} tonen
      </button>
    );
  }

  return (
    <div className={`bg-muted/30 border border-dashed border-border/50 rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-muted-foreground">{label}</p>
        {collapsible && canClose && (
          <button
            onClick={() => setCollapsed(true)}
            className="text-muted-foreground hover:text-foreground p-1"
            aria-label="Advertentie verbergen"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

// Top banner ad - 728x90 leaderboard
export function TopBannerAd({ slot }: { slot: string }) {
  return (
    <div className="w-full my-4">
      <AdContainer className="max-w-[970px] mx-auto" label="">
        <AdBanner slot={slot} format="auto" style={{ minHeight: "90px" }} />
      </AdContainer>
    </div>
  );
}

// Inline ad - responsive
export function InlineAd({ slot }: { slot: string }) {
  return (
    <AdContainer className="my-8 max-w-[728px] mx-auto" collapsible>
      <AdBanner slot={slot} format="auto" />
    </AdContainer>
  );
}

// Sidebar ad - 300x250 rectangle
export function StickyAd({ slot }: { slot: string }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="hidden xl:block sticky top-24 z-10">
      <div className="relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-2 -right-2 bg-background border border-border rounded-full p-1 hover:bg-muted z-20 opacity-0 hover:opacity-100 transition-opacity"
          aria-label="Advertentie sluiten"
        >
          <X className="w-3 h-3" />
        </button>
        <AdContainer className="w-[300px]">
          <AdBanner 
            slot={slot} 
            format="rectangle" 
            style={{ width: "300px", height: "250px", minHeight: "250px" }} 
          />
        </AdContainer>
      </div>
    </div>
  );
}

// In-feed ad for blog
export function InFeedAd({ slot }: { slot: string }) {
  return (
    <AdContainer className="my-6" label="Aanbevolen" collapsible>
      <AdBanner 
        slot={slot} 
        format="fluid" 
        layout="in-article"
      />
    </AdContainer>
  );
}

// Mobile anchor ad - fixed at bottom
export function AnchorAd({ slot }: { slot: string }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="max-w-lg mx-auto p-2">
        <div className="flex items-center justify-between">
          <AdBanner 
            slot={slot} 
            format="horizontal" 
            style={{ width: "320px", height: "100px", minHeight: "100px" }} 
          />
          <button
            onClick={() => setDismissed(true)}
            className="ml-2 p-2 hover:bg-muted rounded-lg"
            aria-label="Advertentie sluiten"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Rectangle ad component
export function RectangleAd({ slot, className = "" }: { slot: string; className?: string }) {
  return (
    <AdBanner 
      slot={slot} 
      format="rectangle" 
      className={className}
      style={{ width: "300px", height: "250px", minHeight: "250px" }} 
    />
  );
}
