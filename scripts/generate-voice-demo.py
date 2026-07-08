"""Genera demo de voz natural para NexusVox — edge-tts neural es-MX."""
import asyncio
import edge_tts

OUT = r"C:\dev\ainexus-cursor\public\audio\nexus-vox-demo.mp3"

# Guion alineado con NexusVox: agendar cita, preguntar horario — texto plano (sin SSML que distorsione)
TEXT = (
    "Hola, buenos días. Gracias por llamar a AI Nexus, le atiende su asistente virtual. "
    "Con gusto le puedo agendar una demostración sin costo para que conozca cómo automatizamos "
    "ventas, atención al cliente y operación con agentes de inteligencia artificial. "
    "¿Le parece bien si agendamos una cita? "
    "¿Qué día y horario le facilita más? "
    "Por ejemplo, ¿le acomoda mañana por la mañana o prefiere por la tarde?"
)

VOICE = "es-MX-DaliaNeural"
# Ritmo natural: ni robótico ni acelerado
RATE = "-6%"


async def main() -> None:
    communicate = edge_tts.Communicate(TEXT, VOICE, rate=RATE)
    await communicate.save(OUT)
    print(f"OK -> {OUT}")


if __name__ == "__main__":
    asyncio.run(main())
