/**
 * Eigen bezoekers- en conversie-tracking. Geen GA4, geen externe scripts.
 *
 * Cookieloos en zonder PII: een visitor-id en een sessie-id, beide random en
 * niet herleidbaar naar een persoon. Geen IP, geen user-agent, geen cookies --
 * dus ook geen cookiebanner nodig. Events gaan naar /api/track op ons eigen
 * domein (same-origin), wat twee dingen oplost: geen CORS-preflight, en
 * adblockers die cross-domain analytics-beacons tegenhouden hebben hier niets
 * te blokkeren.
 */

const VISITOR_KEY = "an.vid";
const SESSION_KEY = "an.sid";
const SESSION_SEEN_KEY = "an.sseen";

// Standaard sessie-definitie: 30 minuten inactiviteit sluit de sessie af.
// Bewust in localStorage en niet sessionStorage, anders telt elk tweede tabblad
// als een nieuwe sessie en lopen de sessiecijfers structureel te hoog op.
const SESSION_IDLE_MS = 30 * 60 * 1000;

function randomId(): string {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {}
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function readStore(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStore(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function getVisitorId(): string {
  let v = readStore(VISITOR_KEY);
  if (!v) {
    v = randomId();
    writeStore(VISITOR_KEY, v);
  }
  return v;
}

function getSessionId(): string {
  const now = Date.now();
  const seen = Number(readStore(SESSION_SEEN_KEY) || 0);
  let s = readStore(SESSION_KEY);
  if (!s || !seen || now - seen > SESSION_IDLE_MS) {
    s = randomId();
    writeStore(SESSION_KEY, s);
  }
  writeStore(SESSION_SEEN_KEY, String(now));
  return s;
}

/** Alleen de hostnaam van de referrer -- nooit de volledige URL met query. */
function referrerHost(): string | null {
  try {
    if (!document.referrer) return null;
    const u = new URL(document.referrer);
    if (u.hostname === location.hostname) return null; // interne navigatie
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function utm() {
  try {
    const p = new URLSearchParams(location.search);
    return {
      utm_source: p.get("utm_source") || undefined,
      utm_medium: p.get("utm_medium") || undefined,
      utm_campaign: p.get("utm_campaign") || undefined,
    };
  } catch {
    return {};
  }
}

function device(): "mobile" | "tablet" | "desktop" {
  try {
    const w = window.innerWidth;
    if (w < 640) return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  } catch {
    return "desktop";
  }
}

export type TrackProps = Record<string, string | number | boolean | null | undefined>;

/**
 * Verstuurt een event. Faalt altijd stil: tracking mag nooit een bestelling of
 * een navigatie in de weg zitten.
 */
export function track(eventName: string, props: TrackProps = {}) {
  if (typeof window === "undefined") return;
  try {
    const body = JSON.stringify({
      event_name: eventName,
      path: location.pathname,
      referrer_host: referrerHost(),
      ...utm(),
      device: device(),
      session_id: getSessionId(),
      visitor_id: getVisitorId(),
      props,
    });

    // sendBeacon overleeft het wegnavigeren van de pagina -- belangrijk voor
    // events die vlak voor een redirect vuren, zoals payment_redirect.
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon("/api/track", blob)) return;
    }
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
