/** Imágenes generadas para consola ops — todos los sectores (WebP optimizado) */
const w = (name: string) => `/images/${name}.webp`;
const p = (name: string) => `/images/${name}.png`;

export const OPS_IMAGES = {
  logistics: {
    cabin: w('ops-logistics-cabin'),
    highway: w('ops-logistics-highway'),
    yard: w('ops-logistics-yard'),
    cargo: w('ops-logistics-cargo'),
  },
  mfg: {
    cnc: w('ops-mfg-cnc'),
    press: w('ops-mfg-press'),
    furnace: w('ops-mfg-furnace'),
    robot: w('ops-mfg-robot'),
    assembly: w('ops-mfg-assembly'),
    lathe: w('ops-mfg-lathe'),
    lineFinal: w('ops-mfg-line-final'),
    plantWide: w('ops-mfg-plant-wide'),
    smartFactory: w('ops-mfg-smart-factory'),
    smartFactoryFb: p('ops-mfg-smart-factory'),
  },
  health: {
    or: w('ops-health-or'),
    icu: w('ops-health-icu'),
    lab: w('ops-health-lab'),
    triage: w('ops-health-triage'),
    hospital3d: w('ops-health-3d-hospital'),
    orFb: p('ops-health-or'),
    icuFb: p('ops-health-icu'),
    labFb: p('ops-health-lab'),
    triageFb: p('ops-health-triage'),
    hospital3dFb: p('ops-health-3d-hospital'),
  },
  finance: {
    fraud: w('ops-finance-fraud'),
    collections: w('ops-finance-collections'),
    legalAi: w('ops-finance-legal-ai'),
    risk: w('ops-finance-risk'),
    fraudFb: p('ops-finance-fraud'),
    collectionsFb: p('ops-finance-collections'),
    legalAiFb: p('ops-finance-legal-ai'),
    soc: w('ops-finance-soc'),
    socFb: p('ops-finance-soc'),
    riskFb: p('ops-finance-risk'),
  },
  inmobiliaria: {
    render3d: w('ops-realestate-3d-render'),
    interiorLuxury: w('ops-realestate-interior-luxury'),
    towerLuxury: w('ops-realestate-tower-luxury'),
    warehouse: w('ops-realestate-warehouse'),
    commercial: w('ops-realestate-commercial'),
    land: w('ops-realestate-land'),
    agency: w('ops-realestate-agency'),
    render3dFb: p('ops-realestate-3d-render'),
    interiorLuxuryFb: p('ops-realestate-interior-luxury'),
    towerLuxuryFb: p('ops-realestate-tower-luxury'),
    warehouseFb: p('ops-realestate-warehouse'),
    commercialFb: p('ops-realestate-commercial'),
    landFb: p('ops-realestate-land'),
    agencyFb: p('ops-realestate-agency'),
  },
  construccion: {
    aerial1: w('ops-construction-aerial1'),
    aerial2: w('ops-construction-aerial2'),
    aiWorker: w('ops-construction-ai-worker'),
    materials: w('ops-construction-materials'),
    quality: w('ops-construction-quality'),
    aerial1Fb: p('ops-construction-aerial1'),
    aerial2Fb: p('ops-construction-aerial2'),
    aiWorkerFb: p('ops-construction-ai-worker'),
    materialsFb: p('ops-construction-materials'),
    qualityFb: p('ops-construction-quality'),
  },
} as const;

export const OPS_FALLBACK = {
  logistics: {
    cabin: p('ops-logistics-cabin'),
    highway: p('ops-logistics-highway'),
    yard: p('ops-logistics-yard'),
    cargo: p('ops-logistics-cargo'),
  },
  mfg: {
    cnc: p('ops-mfg-cnc'),
    press: p('ops-mfg-press'),
    furnace: p('ops-mfg-furnace'),
    robot: p('ops-mfg-robot'),
    assembly: p('ops-mfg-assembly'),
    lathe: p('ops-mfg-lathe'),
    lineFinal: p('ops-mfg-line-final'),
    plantWide: p('ops-mfg-plant-wide'),
  },
} as const;

/** Grids — LIVE solo bodegas/rentas; RENDER 3D preventa; sin badge en fotos estáticas */
export const OPS_PHOTO_SETS = {
  health: [
    { id: 'QX-01', label: 'Quirófano · listo', sub: 'Monitoreo IA · estéril', image: OPS_IMAGES.health.or, fallback: OPS_IMAGES.health.orFb, status: 'alert' as const },
    { id: '3D-HSP', label: 'Hospital · preventa 3D', sub: 'Recorrido virtual · 68%', image: OPS_IMAGES.health.hospital3d, fallback: OPS_IMAGES.health.hospital3dFb, status: 'render3d' as const },
    { id: 'LAB-03', label: 'Laboratorio clínico', sub: '67 muestras en proceso', image: OPS_IMAGES.health.lab, fallback: OPS_IMAGES.health.labFb },
    { id: 'URG-02', label: 'Urgencias · triage', sub: 'Agente Vitales activo', image: OPS_IMAGES.health.triage, fallback: OPS_IMAGES.health.triageFb },
  ],
  finance: [
    { id: 'LEGAL-01', label: 'Sistema legal IA', sub: 'Agentes recuperación deuda', image: OPS_IMAGES.finance.legalAi, fallback: OPS_IMAGES.finance.legalAiFb, status: 'alert' as const },
    { id: 'AML-01', label: 'Centro antifraude', sub: 'TX bloqueada · ML activo', image: OPS_IMAGES.finance.fraud, fallback: OPS_IMAGES.finance.fraudFb },
    { id: 'COB-02', label: 'Cobranza automatizada', sub: 'WhatsApp + llamada IA', image: OPS_IMAGES.finance.collections, fallback: OPS_IMAGES.finance.collectionsFb },
    { id: 'RSK-04', label: 'Análisis de riesgo', sub: 'Scoring cartera en vivo', image: OPS_IMAGES.finance.risk, fallback: OPS_IMAGES.finance.riskFb },
  ],
  inmobiliaria: [
    { id: '3D-TORRE', label: 'Torre Polanco · preventa', sub: 'Render 3D · unidades 42%', image: OPS_IMAGES.inmobiliaria.render3d, fallback: OPS_IMAGES.inmobiliaria.render3dFb, status: 'render3d' as const },
    { id: 'INT-LUX', label: 'Interior · lujo atardecer', sub: 'Cristal · sala · comedor · cocina · horizonte', image: OPS_IMAGES.inmobiliaria.interiorLuxury, fallback: OPS_IMAGES.inmobiliaria.interiorLuxuryFb, status: 'render3d' as const },
    { id: 'BOD-01', label: 'Bodega industrial · renta', sub: '2,400 m² · disponible', image: OPS_IMAGES.inmobiliaria.warehouse, fallback: OPS_IMAGES.inmobiliaria.warehouseFb, status: 'live' as const },
    { id: 'LOC-02', label: 'Local comercial · renta', sub: 'Coyoacán · 220 m²', image: OPS_IMAGES.inmobiliaria.commercial, fallback: OPS_IMAGES.inmobiliaria.commercialFb, status: 'live' as const },
    { id: 'TER-03', label: 'Terreno · análisis GIS', sub: 'Score IA 91 · Querétaro', image: OPS_IMAGES.inmobiliaria.land, fallback: OPS_IMAGES.inmobiliaria.landFb },
  ],
  construccion: [
    { id: 'AER-01', label: 'Torre · vista aérea A', sub: 'Piso 18 · estructura 78%', image: OPS_IMAGES.construccion.aerial1, fallback: OPS_IMAGES.construccion.aerial1Fb },
    { id: 'AER-02', label: 'Torre · vista aérea B', sub: 'Ángulo norte · dron IA', image: OPS_IMAGES.construccion.aerial2, fallback: OPS_IMAGES.construccion.aerial2Fb },
    { id: 'AI-03', label: 'Casco IA · tablet obra', sub: 'Supervisor digital en sitio', image: OPS_IMAGES.construccion.aiWorker, fallback: OPS_IMAGES.construccion.aiWorkerFb, status: 'alert' as const },
    { id: 'INV-04', label: 'Inventario materiales', sub: 'Acero · concreto · piso', image: OPS_IMAGES.construccion.materials, fallback: OPS_IMAGES.construccion.materialsFb },
  ],
} as const;

export const RENDER_3D_SETS = {
  inmobiliaria: [
    { id: 'TORRE-A', title: 'Residencial Polanco · Torre A', sub: '24 pisos · amenidades · desde preventa', image: OPS_IMAGES.inmobiliaria.render3d, fallback: OPS_IMAGES.inmobiliaria.render3dFb, progress: 42 },
    { id: 'INT-LUX', title: 'Penthouse · sala, comedor y cocina', sub: 'Paredes de cristal · vista al horizonte · atardecer', image: OPS_IMAGES.inmobiliaria.interiorLuxury, fallback: OPS_IMAGES.inmobiliaria.interiorLuxuryFb, progress: 100 },
    { id: 'TORRE-B', title: 'Torre Santa Fe · departamentos de lujo', sub: 'Render preventa · 38 pisos · amenidades premium', image: OPS_IMAGES.inmobiliaria.towerLuxury, fallback: OPS_IMAGES.inmobiliaria.towerLuxuryFb, progress: 28 },
  ],
  salud: [
    { id: 'HSP-3D', title: 'Hospital privado · ampliación', sub: '120 camas · UCI · quirófanos · preventa médica', image: OPS_IMAGES.health.hospital3d, fallback: OPS_IMAGES.health.hospital3dFb, progress: 68 },
    { id: 'CLN-3D', title: 'Centro quirúrgico · nuevo bloque', sub: '6 quirófanos · robótica · 2026', image: OPS_IMAGES.health.or, fallback: OPS_IMAGES.health.orFb, progress: 55 },
  ],
} as const;
