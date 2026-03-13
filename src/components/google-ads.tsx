"use client";

import Script from "next/script";

export function GoogleAds() {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4811749024166183"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
