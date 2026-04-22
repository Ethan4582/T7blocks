

export const ANALYTICS_EVENTS = {
  // Core Engagement
  COMPONENT_VIEWED: "component_viewed",
  CODE_COPIED_MANUAL: "code_copied_manual",
  CLI_COPY_CLICKED: "cli_copy_clicked",
  DEMO_OPENED: "demo_opened",
  
  // Conversions/Monetization
  UPGRADE_CLICKED: "upgrade_clicked",
  WAITLIST_JOINED: "waitlist_joined",
  
  // Brand/Discovery
  SOCIAL_CLICKED: "social_clicked",
  SEARCH_USED: "search_used",
  
  // Navigation/Demand Analysis
  SIDEBAR_NAVIGATED: "sidebar_navigated",
  CATEGORY_CLICKED: "category_clicked",
} as const;

type AnalyticsEvent = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS];

// Simple in-memory de-duplication for current session to avoid over-triggering
const sessionEventCache = new Set<string>();

/**
 * Tracks a custom event in Umami with optional deduplication
 */
export function trackEvent(event: AnalyticsEvent, data?: Record<string, any>, dedupe = false) {
  if (typeof window === "undefined" || !(window as any).umami) return;

  if (dedupe) {
    const key = `${event}_${JSON.stringify(data || {})}`;
    if (sessionEventCache.has(key)) return;
    sessionEventCache.add(key);
  }

  try {
    (window as any).umami.track(event, data);
  } catch (error) {
    console.warn("Umami tracking failed:", error);
  }
}

/**
 * Specifically track component discovery
 */
export function trackComponentView(componentId: string, category: string) {
  trackEvent(ANALYTICS_EVENTS.COMPONENT_VIEWED, {
    id: componentId,
    category,
  }, true); // Dedupe component views in same session
}

/**
 * Track copy operations (Manual vs CLI)
 */
export function trackCopy(type: "manual" | "cli", componentId: string) {
  const event = type === "manual" 
    ? ANALYTICS_EVENTS.CODE_COPIED_MANUAL 
    : ANALYTICS_EVENTS.CLI_COPY_CLICKED;
    
  trackEvent(event, { id: componentId });
}

/**
 * Track navigation intent (Sidebar/Tags)
 */
export function trackNavIntent(type: "sidebar" | "tag", value: string, parent?: string) {
  if (type === "sidebar") {
    trackEvent(ANALYTICS_EVENTS.SIDEBAR_NAVIGATED, { item: value, parent: parent || "root" }, true);
  } else {
    trackEvent(ANALYTICS_EVENTS.CATEGORY_CLICKED, { category: value, source: "tag" }, true);
  }
}
