export const WHATSAPP_NUMBER = '525525787385';
export const WHATSAPP_MSG = 'Hola, quiero automatizar un proceso de mi empresa';
export const CALENDLY_URL = 'https://calendly.com/ainexus';
export const SITE_URL = 'https://ainexus.com.mx';
export const GUARANTEE =
  'Consultoría y diagnóstico sin costo · 30 días de garantía de satisfacción.';

export const waLink = (msg: string = WHATSAPP_MSG) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const NAV = [
  { label: 'Inicio', href: '/' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Sectores', href: '/sectores' },
  { label: 'Contacto', href: '/#contacto' },
] as const;

export const FOOTER_PRODUCTS = [
  { label: 'NexusChat', href: '/servicios#nexuschat' },
  { label: 'NexusVox', href: '/servicios#nexusvox' },
  { label: 'NexusFlow', href: '/servicios#nexusflow' },
  { label: 'NexusData', href: '/servicios#nexusdata' },
  { label: 'NexusMine', href: '/sectores#mineria' },
  { label: 'NexusAgro', href: '/sectores#agropecuario' },
  { label: 'NexusAuto', href: '/sectores#automotriz' },
] as const;

export const FOOTER_INDUSTRIES = [
  { label: 'Minería', href: '/sectores' },
  { label: 'Automotriz', href: '/sectores' },
  { label: 'Agropecuario', href: '/sectores' },
  { label: 'Logística', href: '/#dashboard-logistica' },
  { label: 'Manufactura', href: '/#dashboard-manufactura' },
  { label: 'Finanzas', href: '/#dashboard-finanzas' },
  { label: 'Salud', href: '/#dashboard-salud' },
  { label: 'Inmobiliaria', href: '/#dashboard-inmobiliaria' },
  { label: 'Construcción', href: '/#dashboard-construccion' },
] as const;

export const FOOTER_COMPANY = [
  { label: 'Sobre AI Nexus', href: '/#contacto' },
  { label: 'Contrataciones', href: 'mailto:contrataciones@ainexus.com.mx' },
  { label: 'Blog', href: 'https://ainexus.com.mx/blog', external: true },
] as const;

export const FOOTER_LEGAL = [
  { label: 'Privacidad', href: 'https://ainexus.com.mx/privacidad', external: true },
  { label: 'Términos', href: 'https://ainexus.com.mx/terminos', external: true },
  { label: 'Aviso legal', href: 'https://ainexus.com.mx/aviso-legal', external: true },
  { label: 'Facturación', href: 'mailto:facturacion@ainexus.com.mx' },
] as const;

export const FOOTER_EMAILS = [
  'contacto@ainexus.com.mx',
  'contrataciones@ainexus.com.mx',
  'facturacion@ainexus.com.mx',
  'instalaciones@ainexus.com.mx',
  'vinculacion@ainexus.com.mx',
  'proyectos@ainexus.com.mx',
] as const;

export const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/ainexus' },
  { label: 'X', href: 'https://x.com/ainexus' },
  { label: 'Instagram', href: 'https://www.instagram.com/ainexus' },
] as const;
