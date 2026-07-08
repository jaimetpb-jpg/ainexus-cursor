/** Datos de conversión por sector — claro, conciso, orientado a resultado */
export type SectorImpact = {
  reducir: string[];
  aumentar: string[];
  sistematizar: string[];
  agentes: string[];
  automatizaciones: string[];
  demoSector?: 'logistica' | 'manufactura' | 'finanzas' | 'salud' | 'inmobiliaria' | 'construccion';
};

export const SECTOR_IMPACT: Record<string, SectorImpact> = {
  mineria: {
    reducir: ['Tiempo en reportes de incidentes', 'Riesgo por alertas tardías', 'Papeleo de cumplimiento'],
    aumentar: ['Visibilidad de activos en campo', 'Velocidad de respuesta a incidentes', 'Trazabilidad auditable'],
    sistematizar: ['Documentación de seguridad', 'Escalamiento a responsables', 'Reportes regulatorios'],
    agentes: ['Agente Seguridad', 'Agente Incidentes', 'Agente Cumplimiento'],
    automatizaciones: ['Alertas en tiempo real', 'Formatos oficiales automáticos', 'Dashboard de activos'],
  },
  automotriz: {
    reducir: ['No-shows en taller', 'Leads sin seguimiento', 'Tiempo en confirmar citas'],
    aumentar: ['Citas confirmadas', 'Conversión de leads', 'Satisfacción post-servicio'],
    sistematizar: ['Agenda de servicio', 'Recordatorios', 'Seguimiento post-venta'],
    agentes: ['Agente WhatsApp', 'Agente Citas', 'Agente Postventa'],
    automatizaciones: ['Confirmación automática', 'Recordatorios T-24h', 'CRM actualizado'],
  },
  lecheria: {
    reducir: ['Pérdida por rutas ineficientes', 'Errores en captura de litros', 'Retrasos en reportes'],
    aumentar: ['Entregas por ruta', 'Precisión de inventario', 'Visibilidad de rutas'],
    sistematizar: ['Rutas de recolección', 'Reportes diarios', 'Alertas de desvío'],
    agentes: ['Agente Rutas', 'Agente Inventario', 'Agente Alertas'],
    automatizaciones: ['Optimización de rutas', 'Captura móvil', 'Notificación a planta'],
    demoSector: 'logistica',
  },
  agro: {
    reducir: ['Pérdida por datos tardíos', 'Errores en registros de campo', 'Tiempo en certificaciones'],
    aumentar: ['Rendimiento por parcela', 'Detección temprana de riesgos', 'Trazabilidad exportable'],
    sistematizar: ['Captura de campo', 'Alertas climáticas', 'Reportes de trazabilidad'],
    agentes: ['Agente Campo', 'Agente Alertas', 'Agente Reportes'],
    automatizaciones: ['Sensores + IA', 'Dashboard por zona', 'Certificaciones automáticas'],
  },
  logistica: {
    reducir: ['Llamadas “¿dónde está mi pedido?”', 'Desvíos no detectados', 'Combustible por rutas malas'],
    aumentar: ['Entregas a tiempo', 'Visibilidad de flota', 'SLA cumplido'],
    sistematizar: ['Rastreo GPS', 'ETA al cliente', 'Evidencia de entrega'],
    agentes: ['Agente Flota', 'Agente Rutas', 'Agente Seguridad Flotillas', 'Agente Cliente'],
    automatizaciones: ['Mapa en vivo', 'Geocercas', 'Notificaciones automáticas'],
    demoSector: 'logistica',
  },
  manufactura: {
    reducir: ['Paros no detectados', 'Defectos tardíos', 'Tiempo en reportes de planta'],
    aumentar: ['OEE y uptime', 'Vida útil de máquinas', 'Respuesta a alertas'],
    sistematizar: ['Monitoreo de sensores', 'Mantenimiento predictivo', 'Bitácora de incidentes'],
    agentes: ['Agente Vibración', 'Agente Térmico', 'Agente Predictivo', 'Agente Turnos'],
    automatizaciones: ['Dashboard de planta', 'Alertas por umbral', 'Clasificación IA de eventos'],
    demoSector: 'manufactura',
  },
  inmobiliario: {
    reducir: ['Leads perdidos fuera de horario', 'Visitas sin confirmar', 'Tiempo enviando fichas'],
    aumentar: ['Leads calificados', 'Visitas agendadas', 'Cierres por agente'],
    sistematizar: ['Atención 24/7', 'Calificación de presupuesto', 'Seguimiento post-visita'],
    agentes: ['Agente Prospección MCP', 'Agente Clientes', 'Agente Valuación', 'Agente Legal'],
    automatizaciones: ['WhatsApp + CRM', 'Agenda automática', 'Recorridos 3D preventa'],
    demoSector: 'inmobiliaria',
  },
  construccion: {
    reducir: ['Retrasos no detectados', 'Desperdicio de materiales', 'Incidentes en obra'],
    aumentar: ['Avance de obra visible', 'Calidad en sitio', 'Cumplimiento de cronograma'],
    sistematizar: ['Supervisión con cámaras IA', 'Inventario de materiales', 'Reportes BIM'],
    agentes: ['Agente Obra', 'Agente Calidad', 'Agente Inventario', 'Agente Seguridad'],
    automatizaciones: ['Vista aérea en vivo', 'Alertas de desviación', 'CMMS integrado'],
    demoSector: 'construccion',
  },
  'despachos-legales': {
    reducir: ['Citas sin confirmar', 'Vencimientos olvidados', 'Horas en admin repetitivo'],
    aumentar: ['Citas confirmadas', 'Satisfacción del cliente', 'Horas facturables'],
    sistematizar: ['Agenda y recordatorios', 'Seguimiento de expedientes', 'Solicitud de documentos'],
    agentes: ['Agente Citas', 'Agente Casos', 'Agente Documentos'],
    automatizaciones: ['Recordatorios T-24h', 'Dashboard de vencimientos', 'WhatsApp legal'],
  },
  'consultorios-medicos': {
    reducir: ['No-shows', 'Llamadas repetitivas', 'Saturación en recepción'],
    aumentar: ['Ocupación de agenda', 'Confirmaciones', 'Satisfacción del paciente'],
    sistematizar: ['Citas 24/7', 'Recordatorios', 'Instrucciones post-consulta'],
    agentes: ['Agente Citas', 'Agente Recordatorios', 'Agente Triage'],
    automatizaciones: ['WhatsApp clínico', 'Confirmación automática', 'Escalamiento a humano'],
    demoSector: 'salud',
  },
  educativo: {
    reducir: ['Consultas repetitivas', 'Inscripciones sin seguimiento', 'Tiempo en info básica'],
    aumentar: ['Inscripciones calificadas', 'Respuesta inmediata', 'Retención de prospectos'],
    sistematizar: ['Atención a padres/alumnos', 'Calificación de interés', 'Seguimiento de inscripción'],
    agentes: ['Agente Admisiones', 'Agente Info', 'Agente Seguimiento'],
    automatizaciones: ['Chat 24/7', 'CRM educativo', 'Recordatorios de pago'],
  },
  corporativo: {
    reducir: ['Tareas manuales repetitivas', 'Tiempo de respuesta interno', 'Errores en procesos'],
    aumentar: ['Productividad del equipo', 'Visibilidad operativa', 'Velocidad de decisión'],
    sistematizar: ['Flujos entre departamentos', 'Reportes ejecutivos', 'Atención interna'],
    agentes: ['Agente Operaciones', 'Agente Reportes', 'Agente Atención Interna'],
    automatizaciones: ['Integraciones ERP/CRM', 'Dashboards', 'Workflows sin código'],
  },
  finanzas: {
    reducir: ['Fraude no detectado', 'Cartera vencida sin seguimiento', 'Horas en cobranza manual'],
    aumentar: ['Recuperación de cartera', 'Detección temprana de riesgo', 'Cumplimiento normativo'],
    sistematizar: ['Antifraude en tiempo real', 'Cobranza multicanal', 'Scoring y alertas'],
    agentes: ['Agente Antifraude', 'Agente Cobranza', 'Agente Legal IA', 'Agente Riesgo'],
    automatizaciones: ['Bloqueo de TX sospechosas', 'WhatsApp + llamada IA', 'Dashboard SOC'],
    demoSector: 'finanzas',
  },
  salud: {
    reducir: ['Saturación en urgencias', 'Alertas vitales tardías', 'No-shows en consulta'],
    aumentar: ['Ocupación de agenda', 'Respuesta clínica', 'Trazabilidad de pacientes'],
    sistematizar: ['Monitoreo de vitales', 'Triage automatizado', 'Recordatorios clínicos'],
    agentes: ['Agente Vitales', 'Agente Triage', 'Agente Citas', 'Agente Laboratorio'],
    automatizaciones: ['Alertas a médicos', 'HL7/FHIR integrado', 'Dashboard clínico'],
    demoSector: 'salud',
  },
};

const SLUG_ALIASES: Record<string, string> = {
  agropecuario: 'agro',
};

export function getSectorImpact(slug: string): SectorImpact | undefined {
  return SECTOR_IMPACT[slug] ?? SECTOR_IMPACT[SLUG_ALIASES[slug] ?? ''];
}
