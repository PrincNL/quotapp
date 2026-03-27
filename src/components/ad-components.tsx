"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal" | "fluid";
  className?: string;
  layout?: string;
}

export function AdBanner({ slot, format = "auto", className = "", layout }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [showClose, setShowClose] = useState(false);

  useEffect(() => {
    // Delay ad loading for better LCP
    const timer = setTimeout(() => {
      try {
        if (typeof window !== "undefined" && (window as any).adsbygoogle) {
          (window as any).adsbygoogle.push({});
          setLoaded(true);
        }
      } catch {
        // Ad blocked or error
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Show close button after a delay (for non-intrusive ads)
  useEffect(() => {
    const timer = setTimeout(() => setShowClose(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`ad-container ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "90px" }}
        data-ad-client="ca-pub-4811749024166183"
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

  // Show close button after delay
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

// Desktop sidebar sticky ad - improved
export function StickyAd({ slot }: { slot: string }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="hidden xl:block sticky top-24 z-10">
      <div className="relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-2 -right-2 bg-background border border-border rounded-full p-1 hover:bg-muted z-20"
          aria-label="Advertentie sluiten"
        >
          <X className="w-3 h-3" />
        </button>
        <AdContainer className="w-[300px]">
          <AdBanner slot={slot} format="vertical" />
        </AdContainer>
      </div>
    </div>
  );
}

// Horizontal inline ad for content breaks - improved
export function InlineAd({ slot }: { slot: string }) {
  return (
    <AdContainer className="my-8 max-w-[728px] mx-auto" collapsible>
      <AdBanner slot={slot} format="horizontal" />
    </AdContainer>
  );
}

// Top banner ad (above fold) - optimized for LCP
export function TopBannerAd({ slot }: { slot: string }) {
  return (
    <div className="w-full my-4">
      <AdContainer className="max-w-[728px] mx-auto h-[90px]" label="">
        <AdBanner slot={slot} format="horizontal" className="h-[90px]" />
      </AdContainer>
    </div>
  );
}

// Mobile anchor ad (bottom sticky) - improved UX
export function AnchorAd({ slot }: { slot: string }) {
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  // Don't show if dismissed
  if (dismissed) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
        <div className="max-w-lg mx-auto p-2">
          <div className="flex items-center justify-between">
            <AdBanner slot={slot} format="horizontal" className="h-[60px] flex-1" />
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
    </div>
  );
}

// In-article ad for blog posts
export function InArticleAd({ slot }: { slot: string }) {
  return (
    <AdContainer className="my-8 max-w-[720px] mx-auto" label="Advertentie - Lees verder" collapsible>
      <AdBanner slot={slot} format="fluid" layout="in-article" />
    </AdContainer>
  );
}

// Native ad that looks like content
export function NativeAd({ slot }: { slot: string }) {
  return (
    <AdContainer className="my-6" label="Aanbevolen" collapsible>
      <AdBanner slot={slot} format="fluid" layout="image-top" />
    </AdContainer>
  );
}

// Multi-format ad component that chooses best format based on container
export function ResponsiveAd({ slots }: { slots: { mobile: string; desktop: string } }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <AdBanner 
      slot={isMobile ? slots.mobile : slots.desktop} 
      format={isMobile ? "horizontal" : "rectangle"}
    />
  );
}

// Interstitial ad (for premium experience)
export function InterstitialAd({ slot, onClose }: { slot: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl max-w-md w-full p-4 relative">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-background border border-border rounded-full p-2 hover:bg-muted"
        >
          <X className="w-4 h-4" />
        </button>
        <AdBanner slot={slot} format="rectangle" />
      </div>
    </div>
  );
}

// Reward ad component (watch video to unlock feature)
export function RewardAdPlaceholder({ onUnlock }: { onUnlock: () => void }) {
  return (
    <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 rounded-xl p-6 text-center">
      <p className="text-sm text-muted-foreground mb-3">
        ⚡ Ontgrendel alle functies door een korte video te bekijken
      </p>
      <button
        onClick={onUnlock}
        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Bekijk Video
      </button>
    </div>
  );
}
