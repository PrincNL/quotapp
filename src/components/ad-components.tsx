"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X } from "lucide-react";

// AdSense publisher ID
const ADSENSE_PUB_ID = "ca-pub-4811749024166183";

// Ad slot IDs
export const AD_SLOTS = {
  homepageTop: "7775684944",
  homepageInline: "1653129720",
  homepageSidebar: "6115118919",
  homepageSidebar2: "4612345678", // Second sidebar for desktop
  toolInline: "3644868249",
  toolSidebar: "4802037246",
  toolTop: "8912345678", // NEW: Top banner for tool pages
  toolBottom: "7123456789", // NEW: Bottom ad for tool pages
  blogInfeed: "6761986178",
  mobileAnchor: "4135822833",
};

// Ad Performance Tracking (console logs for testing)
export const adTracker = {
  impressions: new Set<string>(),
  views: new Map<string, number>(),
  clicks: new Map<string, number>(),
  
  logImpression(slot: string, position: string) {
    const key = `${slot}-${position}`;
    if (!this.impressions.has(key)) {
      this.impressions.add(key);
      console.log(`📊 [AdTracker] Impression logged: ${position} (${slot})`);
    }
    const current = this.views.get(key) || 0;
    this.views.set(key, current + 1);
  },
  
  logView(slot: string, position: string, percentage: number) {
    const key = `${slot}-${position}`;
    console.log(`👁️ [AdTracker] View: ${position} - ${percentage}% visible (${slot})`);
  },
  
  logClick(slot: string, position: string) {
    const key = `${slot}-${position}`;
    const current = this.clicks.get(key) || 0;
    this.clicks.set(key, current + 1);
    console.log(`🖱️ [AdTracker] Click: ${position} (${slot}) - Total: ${current + 1}`);
  },
  
  getStats() {
    const stats: Record<string, any> = {};
    this.views.forEach((views, key) => {
      const clicks = this.clicks.get(key) || 0;
      stats[key] = { views, clicks, CTR: clicks > 0 ? ((clicks / views) * 100).toFixed(2) + '%' : '0%' };
    });
    return stats;
  }
};

// Intersection Observer for lazy loading and view tracking
function useAdVisibility(slot: string, position: string, threshold = 0.5) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          
          if (entry.isIntersecting && !hasTrackedRef.current) {
            hasTrackedRef.current = true;
            adTracker.logImpression(slot, position);
          }
          
          if (entry.isIntersecting) {
            const visibilityPercentage = Math.round(entry.intersectionRatio * 100);
            adTracker.logView(slot, position, visibilityPercentage);
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [slot, position]);

  return { ref, isVisible };
}

interface AdBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "vertical" | "horizontal" | "fluid";
  className?: string;
  layout?: string;
  style?: React.CSSProperties;
  lazyLoad?: boolean;
  refreshKey?: string;
}

export function AdBanner({ slot, format = "auto", className = "", layout, style, lazyLoad = false, refreshKey }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);
  const { ref: visibilityRef, isVisible } = useAdVisibility(slot, 'unknown');

  useEffect(() => {
    // Lazy load logic - only load when visible
    if (lazyLoad && !isVisible) return;
    
    if (loadedRef.current) return;
    
    const timer = setTimeout(() => {
      try {
        if (typeof window !== "undefined" && (window as any).adsbygoogle) {
          loadedRef.current = true;
          (window as any).adsbygoogle.push({});
          console.log(`📢 [AdBanner] Loaded: ${slot} (${format})`);
        }
      } catch {
        console.log(`❌ [AdBanner] Blocked/error: ${slot}`);
      }
    }, lazyLoad ? 100 : 200);
    
    return () => clearTimeout(timer);
  }, [slot, format, lazyLoad, isVisible]);

  // Scroll-based ad refresh (max 1x per page load)
  const hasRefreshedRef = useRef(false);
  
  useEffect(() => {
    if (hasRefreshedRef.current || !isVisible || !lazyLoad) return;
    
    const handleScroll = () => {
      if (hasRefreshedRef.current || !isVisible) return;
      
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      // Refresh at 50% scroll depth
      if (scrollPercent >= 50 && !hasRefreshedRef.current) {
        hasRefreshedRef.current = true;
        console.log(`🔄 [AdBanner] Scroll refresh triggered at ${Math.round(scrollPercent)}%`);
        
        // Reset and reload the ad
        if (adRef.current && (window as any).adsbygoogle) {
          const ins = adRef.current.querySelector('ins');
          if (ins) {
            ins.removeAttribute('data-adsbygoogle-status');
            (window as any).adsbygoogle.push({});
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, lazyLoad]);

  return (
    <div className={`ad-container ${className}`} ref={visibilityRef}>
      <div ref={adRef}>
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

// NEW: Top banner for tool pages - more prominent
export function ToolTopBannerAd({ slot }: { slot: string }) {
  return (
    <div className="w-full mb-6">
      <AdContainer className="max-w-[970px] mx-auto" label="">
        <AdBanner slot={slot} format="auto" style={{ minHeight: "100px" }} />
      </AdContainer>
    </div>
  );
}

// Inline ad - responsive with lazy loading
export function InlineAd({ slot, lazyLoad = false }: { slot: string; lazyLoad?: boolean }) {
  return (
    <AdContainer className="my-8 max-w-[728px] mx-auto" collapsible>
      <AdBanner slot={slot} format="auto" lazyLoad={lazyLoad} />
    </AdContainer>
  );
}

// NEW: Smart inline ad - only shows when user has scrolled past content
export function SmartInlineAd({ slot, afterContent = true }: { slot: string; afterContent?: boolean }) {
  const { ref, isVisible } = useAdVisibility(slot, 'smart-inline');
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (afterContent && isVisible) {
      setShouldShow(true);
    }
  }, [isVisible, afterContent]);

  if (!shouldShow && afterContent) return null;

  return (
    <div ref={ref}>
      <AdContainer className="my-6 max-w-[728px] mx-auto" collapsible>
        <AdBanner slot={slot} format="auto" lazyLoad={true} />
      </AdContainer>
    </div>
  );
}

// Sidebar ad - 300x250 rectangle - sticky
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

// NEW: Second sticky sidebar ad - appears lower on page
export function StickyAdLower({ slot }: { slot: string }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="hidden xl:block sticky top-[420px] z-10">
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

// NEW: Responsive rectangle ad
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

// NEW: Horizontal banner ad for tool pages
export function HorizontalBannerAd({ slot, className = "" }: { slot: string; className?: string }) {
  return (
    <AdBanner 
      slot={slot} 
      format="horizontal" 
      className={className}
      style={{ width: "728px", height: "90px", minHeight: "90px" }} 
    />
  );
}

// NEW: Bottom ad for tool pages
export function BottomAd({ slot }: { slot: string }) {
  return (
    <div className="w-full mt-8 mb-4">
      <AdContainer className="max-w-[970px] mx-auto" label="">
        <AdBanner slot={slot} format="auto" style={{ minHeight: "90px" }} />
      </AdContainer>
    </div>
  );
}


