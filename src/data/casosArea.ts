import {
  Briefcase,
  Headphones,
  Truck,
  Factory,
  ShoppingCart,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';

export type CasoArea = {
  slug: string;
  nombre: string;
  icon: LucideIcon;
  problema: string;
  solucion: string;
  resultado: string;
  flujo: { paso: string; detalle: string }[];
};

export const CASOS_AREA: CasoArea[] = [
  {
    slug: 'ventas',
    nombre: 'Ventas',
    icon: Briefcase,
    problema: 'Llegan leads por WhatsApp fuera de horario y se enfrían sin respuesta.',
    solucion: 'Un agente califica, responde al instante y agenda; tu sistema se actualiza solo.',
    resultado: 'Más citas agendadas y cero leads perdidos por falta de seguimiento.',
    flujo: [
      { paso: 'Lead por WhatsApp', detalle: '+1 oportunidad' },
      { paso: 'IA responde y califica', detalle: 'respuesta inmediata' },
      { paso: 'Cliente actualizado', detalle: '0 captura manual' },
      { paso: 'Seguimiento automático', detalle: 'sin fugas' },
      { paso: 'Cita sugerida', detalle: 'más cierres' },
      { paso: 'Dashboard actualizado', detalle: 'dirección informada' },
    ],
  },
  {
    slug: 'atencion',
    nombre: 'Atención',
    icon: Headphones,
    problema: 'El equipo responde lo mismo todo el día y los clientes esperan.',
    solucion: 'El agente resuelve dudas frecuentes 24/7 y escala a un humano solo cuando hace falta.',
    resultado: 'Respuestas en segundos y tu equipo enfocado en lo que sí aporta.',
    flujo: [
      { paso: 'Cliente pregunta', detalle: 'cualquier hora' },
      { paso: 'Agente responde', detalle: 'base de conocimiento' },
      { paso: 'Se crea ticket', detalle: 'todo registrado' },
      { paso: 'Escala a humano', detalle: 'solo si hace falta' },
      { paso: 'Cliente satisfecho', detalle: 'sin esperas' },
    ],
  },
  {
    slug: 'logistica',
    nombre: 'Logística',
    icon: Truck,
    problema: 'Clientes llamando por su pedido y evidencias de entrega dispersas.',
    solucion: 'Alertas automáticas de ruta y estado, con notificación al cliente y evidencia guardada.',
    resultado: 'Menos llamadas de seguimiento y más visibilidad para dirección.',
    flujo: [
      { paso: 'Pedido asignado', detalle: 'ruta lista' },
      { paso: 'Ruta actualizada', detalle: 'en tiempo real' },
      { paso: 'Cliente notificado', detalle: 'sin llamadas' },
      { paso: 'Evidencia guardada', detalle: 'todo trazable' },
      { paso: 'Reporte generado', detalle: 'automático' },
    ],
  },
  {
    slug: 'manufactura',
    nombre: 'Manufactura',
    icon: Factory,
    problema: 'Los retrasos de producción se detectan tarde y sin responsable claro.',
    solucion: 'La IA registra avances, detecta retrasos y alerta al responsable al momento.',
    resultado: 'Menos paros silenciosos y un tablero claro del piso de producción.',
    flujo: [
      { paso: 'Orden recibida', detalle: 'registrada' },
      { paso: 'Avance monitoreado', detalle: 'sin capturas' },
      { paso: 'Retraso detectado', detalle: 'al momento' },
      { paso: 'Responsable alertado', detalle: 'acción rápida' },
      { paso: 'Dashboard actualizado', detalle: 'control total' },
    ],
  },
  {
    slug: 'ecommerce',
    nombre: 'Ecommerce',
    icon: ShoppingCart,
    problema: 'Carritos abandonados y preguntas repetidas sobre envíos y stock.',
    solucion: 'El agente recupera ventas, responde dudas y actualiza inventario en tiempo real.',
    resultado: 'Más conversiones y menos trabajo manual en atención.',
    flujo: [
      { paso: 'Carrito abandonado', detalle: 'detectado' },
      { paso: 'Mensaje automático', detalle: 'recuperación' },
      { paso: 'Duda resuelta', detalle: 'stock y envío' },
      { paso: 'Pedido confirmado', detalle: 'sin intervención' },
      { paso: 'Cliente notificado', detalle: 'seguimiento' },
    ],
  },
  {
    slug: 'administracion',
    nombre: 'Administración',
    icon: ClipboardList,
    problema: 'Reportes a mano, datos dispersos y nadie tiene el panorama completo.',
    solucion: 'Dashboards automáticos que consolidan ventas, operación y finanzas en un solo lugar.',
    resultado: 'Decisiones más rápidas con datos claros y actualizados.',
    flujo: [
      { paso: 'Datos conectados', detalle: 'todas las fuentes' },
      { paso: 'Reporte generado', detalle: 'automático' },
      { paso: 'Alerta de anomalía', detalle: 'al detectar' },
      { paso: 'Director informado', detalle: 'sin esperar' },
      { paso: 'Acción tomada', detalle: 'a tiempo' },
    ],
  },
];
