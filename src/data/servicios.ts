import {
  MessageSquare,
  Phone,
  Bot,
  Workflow,
  BarChart3,
  Boxes,
  type LucideIcon,
} from 'lucide-react';

export type Servicio = {
  id: string;
  productName: string;
  titulo: string;
  tipo: string;
  descripcion: string;
  problema: string;
  features: string[];
  flujo: { paso: string; detalle: string }[];
  icon: LucideIcon;
  voz?: boolean;
};

export const SERVICIOS: Servicio[] = [
  {
    id: 'nexuschat',
    productName: 'NexusChat',
    titulo: 'Vende y responde por WhatsApp 24/7',
    tipo: 'agente de IA',
    descripcion: 'Atiende consultas, califica clientes y agenda citas automáticamente, con la voz de tu marca.',
    problema: 'Pierdes ventas porque nadie contesta fuera de horario o tarda en responder.',
    features: [
      'Respuesta en segundos, no en horas',
      'Califica clientes antes de pasártelos',
      'Agenda citas sin intervención manual',
      'Escala a humano solo cuando hace falta',
    ],
    flujo: [
      { paso: 'Cliente escribe', detalle: 'WhatsApp' },
      { paso: 'Agente responde', detalle: 'al instante' },
      { paso: 'Califica interés', detalle: 'automático' },
      { paso: 'Agenda o escala', detalle: 'según caso' },
    ],
    icon: MessageSquare,
  },
  {
    id: 'nexusvox',
    productName: 'NexusVox',
    titulo: 'Contesta llamadas con voz natural',
    tipo: 'agente de voz',
    descripcion: 'Un agente que habla con tus clientes, agenda citas y toma acciones por teléfono.',
    problema: 'Llamadas sin contestar, citas perdidas y cobranza manual que consume tiempo.',
    features: [
      'Voz natural en español mexicano',
      'Llamadas entrantes y salientes',
      'Transcripción de cada conversación',
      'Escala a humano en casos complejos',
    ],
    flujo: [
      { paso: 'Llamada recibida', detalle: '24/7' },
      { paso: 'Agente atiende', detalle: 'voz natural' },
      { paso: 'Acción ejecutada', detalle: 'cita o registro' },
      { paso: 'Resumen al equipo', detalle: 'automático' },
    ],
    icon: Phone,
    voz: true,
  },
  {
    id: 'nexusflow',
    productName: 'NexusFlow',
    titulo: 'Automatiza procesos completos',
    tipo: 'automatizaciones',
    descripcion: 'Conecta tus herramientas y deja que la operación fluya sola, sin tareas repetitivas.',
    problema: 'Tu equipo pierde horas copiando datos entre sistemas y haciendo tareas repetitivas.',
    features: [
      'Conecta WhatsApp, email, hojas de cálculo y más',
      'Flujos visuales fáciles de entender',
      'Se ejecuta en segundo plano',
      'Alertas cuando algo requiere atención',
    ],
    flujo: [
      { paso: 'Evento detectado', detalle: 'trigger' },
      { paso: 'Datos conectados', detalle: 'entre apps' },
      { paso: 'Acción ejecutada', detalle: 'automática' },
      { paso: 'Equipo notificado', detalle: 'si hace falta' },
    ],
    icon: Workflow,
  },
  {
    id: 'nexusdata',
    productName: 'NexusData',
    titulo: 'Dashboards que te muestran qué pasa',
    tipo: 'análisis y control',
    descripcion: 'Visualiza ventas, operación y atención en un solo panel, actualizado en tiempo real.',
    problema: 'No sabes qué pasa en tu empresa hasta que alguien hace un reporte manual.',
    features: [
      'KPIs en tiempo real',
      'Alertas automáticas',
      'Reportes sin intervención',
      'Conecta todas tus fuentes de datos',
    ],
    flujo: [
      { paso: 'Datos conectados', detalle: 'multi-fuente' },
      { paso: 'Dashboard actualizado', detalle: 'en vivo' },
      { paso: 'Anomalía detectada', detalle: 'alerta' },
      { paso: 'Reporte enviado', detalle: 'automático' },
    ],
    icon: BarChart3,
  },
  {
    id: 'asistente',
    productName: 'NexusAssist',
    titulo: 'Un asistente que hace tus tareas',
    tipo: 'asistente de IA',
    descripcion: 'Redacta, busca, organiza y prepara lo que tu equipo repite todos los días.',
    problema: 'Tu equipo dedica horas a tareas que una IA podría hacer en minutos.',
    features: [
      'Redacta correos y mensajes',
      'Busca información en tus documentos',
      'Organiza y resume datos',
      'Aprende el contexto de tu empresa',
    ],
    flujo: [
      { paso: 'Tarea solicitada', detalle: 'por el equipo' },
      { paso: 'IA procesa', detalle: 'con contexto' },
      { paso: 'Resultado entregado', detalle: 'listo para usar' },
      { paso: 'Equipo revisa', detalle: 'y aprueba' },
    ],
    icon: Bot,
  },
  {
    id: 'custom',
    productName: 'NexusCustom',
    titulo: 'Sistemas de IA a la medida',
    tipo: 'cuando lo estándar no basta',
    descripcion: 'Software y dashboards diseñados específicamente para tu operación única.',
    problema: 'Ninguna solución estándar encaja con la forma en que opera tu empresa.',
    features: [
      'Diseño a la medida de tu proceso',
      'Integración con sistemas propios',
      'Capacitación incluida',
      'Soporte y mejora continua',
    ],
    flujo: [
      { paso: 'Diagnóstico', detalle: 'de tu operación' },
      { paso: 'Prototipo', detalle: 'con tus datos' },
      { paso: 'Implementación', detalle: 'gradual' },
      { paso: 'Optimización', detalle: 'continua' },
    ],
    icon: Boxes,
  },
];

export const HERRAMIENTAS = [
  'WhatsApp', 'Gmail', 'Excel', 'HubSpot', 'Odoo', 'Shopify',
  'WooCommerce', 'SAT / CFDI', 'SAP', 'Aspel', 'Google Sheets', 'Meta Ads',
];

export const SERVICIOS_PREVIEW = SERVICIOS.slice(0, 5);
