type StudioAnalyticsEvent = "service_view" | "service_click";

type StudioAnalyticsPayload = {
  readonly service: string;
  readonly action?: "primary" | "gallery";
};

type DataLayerRecord = Record<string, unknown>;

function getDataLayer(): DataLayerRecord[] {
  const win = window as Window & { dataLayer?: DataLayerRecord[] };
  if (!win.dataLayer) {
    win.dataLayer = [];
  }
  return win.dataLayer;
}

/** Pushes a studio event into GTM `dataLayer` when the browser is available. */
export function trackStudioEvent(
  event: StudioAnalyticsEvent,
  payload: StudioAnalyticsPayload,
): void {
  if (typeof window === "undefined") {
    return;
  }
  getDataLayer().push({ event, ...payload });
}
