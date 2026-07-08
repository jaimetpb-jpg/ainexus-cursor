import type { Sector } from '@/components/home/ops/types';

const VALID: Sector[] = ['logistica', 'manufactura', 'finanzas', 'salud', 'inmobiliaria', 'construccion'];

export function isSector(v: string): v is Sector {
  return (VALID as string[]).includes(v);
}

export function scrollToDashboardSector(sector: Sector) {
  window.location.hash = `dashboard-${sector}`;
  document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.dispatchEvent(new CustomEvent('nexus-dashboard-sector', { detail: sector }));
}

export function parseDashboardHash(): Sector | null {
  const m = window.location.hash.match(/^#dashboard-(\w+)$/);
  if (m && isSector(m[1])) return m[1];
  return null;
}
