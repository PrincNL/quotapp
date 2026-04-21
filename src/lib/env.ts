const normalize = (value?: string | null) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const isPlaceholder = (value?: string) => {
  if (!value) return true;
  const normalized = value.toLowerCase();
  return normalized.includes("measurement_id") || normalized.includes("verification-code") || normalized.includes("your-");
};

export const env = {
  analytics: {
    gaMeasurementId: normalize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  },
  site: {
    googleVerification: normalize(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
  },
  app: {
    env: normalize(process.env.NODE_ENV) ?? "development",
  },
};

export const hasGaMeasurementId = Boolean(env.analytics.gaMeasurementId && !isPlaceholder(env.analytics.gaMeasurementId));
export const hasGoogleVerification = Boolean(env.site.googleVerification && !isPlaceholder(env.site.googleVerification));
