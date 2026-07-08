export type NexusEvent =
  | 'whatsapp_click'
  | 'demo_hero_send'
  | 'demo_dashboard_toggle'
  | 'hero_dashboard_click'
  | 'hero_voice_tab'
  | 'hero_sector_click'
  | 'sector_view'
  | 'lead_form_submit'
  | 'calendly_click'
  | 'listen_voice'
  | 'auth_nav_click'
  | 'auth_login_attempt'
  | 'auth_signup_attempt';

declare global {
  interface Window {
    __aiNexusEvents?: Array<{ event: string; props?: Record<string, unknown>; t: number }>;
    dataLayer?: unknown[];
  }
}

export function track(event: NexusEvent, props?: Record<string, unknown>) {
  const payload = { event, props, t: Date.now() };
  if (typeof window !== 'undefined') {
    window.__aiNexusEvents = window.__aiNexusEvents || [];
    window.__aiNexusEvents.push(payload);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: `nx_${event}`, ...props });
  }
  if (import.meta.env.DEV) {
    console.info('%c[analytics·demo]', 'color:#3B6EA5;font-weight:600', event, props ?? '');
  }
}
