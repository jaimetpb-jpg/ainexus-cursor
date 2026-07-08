/** Logos locales (simple-icons) — sin dependencia de CDN externo */
export type Integration = {
  id: string;
  name: string;
  logo: string;
  fallbackLetter: string;
  brandColor: string;
};

const local = (id: string) => `/integrations/${id}.svg`;

export const INTEGRATIONS: Integration[] = [
  { id: 'whatsapp', name: 'WhatsApp', logo: local('whatsapp'), fallbackLetter: 'W', brandColor: '#25D366' },
  { id: 'gmail', name: 'Gmail', logo: local('gmail'), fallbackLetter: 'G', brandColor: '#EA4335' },
  { id: 'hubspot', name: 'HubSpot', logo: local('hubspot'), fallbackLetter: 'H', brandColor: '#FF7A59' },
  { id: 'odoo', name: 'Odoo', logo: local('odoo'), fallbackLetter: 'O', brandColor: '#714B67' },
  { id: 'sap', name: 'SAP', logo: local('sap'), fallbackLetter: 'S', brandColor: '#0FAAFF' },
  { id: 'excel', name: 'Excel', logo: local('excel'), fallbackLetter: 'E', brandColor: '#217346' },
  { id: 'shopify', name: 'Shopify', logo: local('shopify'), fallbackLetter: 'S', brandColor: '#7AB55C' },
  { id: 'slack', name: 'Slack', logo: local('slack'), fallbackLetter: 'S', brandColor: '#4A154B' },
  { id: 'notion', name: 'Notion', logo: local('notion'), fallbackLetter: 'N', brandColor: '#000000' },
  { id: 'salesforce', name: 'Salesforce', logo: local('salesforce'), fallbackLetter: 'S', brandColor: '#00A1E0' },
  { id: 'sheets', name: 'Google Sheets', logo: local('sheets'), fallbackLetter: 'G', brandColor: '#34A853' },
  { id: 'calendly', name: 'Calendly', logo: local('calendly'), fallbackLetter: 'C', brandColor: '#006BFF' },
  { id: 'zendesk', name: 'Zendesk', logo: local('zendesk'), fallbackLetter: 'Z', brandColor: '#03363D' },
  { id: 'airtable', name: 'Airtable', logo: local('airtable'), fallbackLetter: 'A', brandColor: '#18BFFF' },
  { id: 'stripe', name: 'Stripe', logo: local('stripe'), fallbackLetter: 'S', brandColor: '#635BFF' },
  { id: 'microsoft', name: 'Microsoft', logo: local('microsoft'), fallbackLetter: 'M', brandColor: '#5E5E5E' },
  { id: 'twilio', name: 'Twilio', logo: local('twilio'), fallbackLetter: 'T', brandColor: '#F22F46' },
  { id: 'meta', name: 'Meta Ads', logo: local('meta'), fallbackLetter: 'M', brandColor: '#0081FB' },
  { id: 'woocommerce', name: 'WooCommerce', logo: local('woocommerce'), fallbackLetter: 'W', brandColor: '#96588A' },
  { id: 'google', name: 'Google', logo: local('google'), fallbackLetter: 'G', brandColor: '#4285F4' },
];

export const INTEGRATIONS_MARQUEE = INTEGRATIONS.slice(0, 12);
