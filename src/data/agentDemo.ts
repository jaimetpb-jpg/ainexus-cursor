export type ChatMsg = { from: 'user' | 'bot'; text: string };

export const AGENT_QUICK_REPLIES = [
  '¿Atienden 24/7?',
  'Quiero agendar una cita',
  '¿Cuánto tardan en responder?',
];

const SCRIPT: Record<string, string> = {
  default:
    '¡Hola! Soy el asistente de IA de AI Nexus. ¿Le parece bien si agendamos una cita? ¿Qué día y horario le facilita más?',
  '24': 'Sí. Respondo las 24 horas, incluso fuera de horario. Ningún cliente se queda sin respuesta.',
  cita: 'Perfecto. ¿Qué día y horario le facilita más? Por ejemplo, ¿mañana por la mañana o prefiere por la tarde? Al confirmar, aviso a tu equipo y actualizo tu sistema.',
  tarda: 'Respondo en segundos. El cliente nunca espera. Si la duda es compleja, la escalo a una persona de tu equipo con todo el contexto.',
};

export function agentReply(input: string): string {
  const t = input.toLowerCase();
  if (t.includes('24') || t.includes('hora') || t.includes('siempre')) return SCRIPT['24'];
  if (t.includes('cita') || t.includes('agend') || t.includes('reun')) return SCRIPT['cita'];
  if (t.includes('tarda') || t.includes('rápid') || t.includes('rapid') || t.includes('cuánto') || t.includes('cuanto'))
    return SCRIPT['tarda'];
  return 'Buena pregunta. En AI Nexus lo resolvemos con un agente a la medida de tu operación. ¿Quieres que un especialista te muestre cómo aplicaría a tu caso por WhatsApp?';
}

export const GREETING: ChatMsg = { from: 'bot', text: SCRIPT['default'] };
