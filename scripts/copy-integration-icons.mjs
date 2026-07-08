import { mkdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import * as icons from 'simple-icons';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../public/integrations');
mkdirSync(outDir, { recursive: true });

/** id local → clave export de simple-icons */
const MAP = {
  whatsapp: 'siWhatsapp',
  gmail: 'siGmail',
  hubspot: 'siHubspot',
  odoo: 'siOdoo',
  sap: 'siSap',
  excel: 'siMicrosoftexcel',
  shopify: 'siShopify',
  slack: 'siSlack',
  notion: 'siNotion',
  salesforce: 'siSalesforce',
  sheets: 'siGooglesheets',
  calendly: 'siCalendly',
  zendesk: 'siZendesk',
  airtable: 'siAirtable',
  stripe: 'siStripe',
  microsoft: 'siMicrosoft',
  twilio: 'siTwilio',
  meta: 'siMeta',
  woocommerce: 'siWoo',
  google: 'siGoogle',
};

let ok = 0;
for (const [id, key] of Object.entries(MAP)) {
  const icon = icons[key];
  if (!icon?.svg) {
    console.warn(`  ⚠ sin icono: ${id} (${key})`);
    continue;
  }
  const colored = icon.svg.replace('<svg ', `<svg fill="#${icon.hex}" `);
  writeFileSync(join(outDir, `${id}.svg`), colored);
  ok++;
}
console.log(`✓ ${ok} logos de integraciones → public/integrations/`);
