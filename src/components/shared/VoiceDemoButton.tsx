import { useRef, useState } from 'react';
import { Play, Square } from 'lucide-react';
import { toast } from 'sonner';
import { track } from '@/lib/analytics';

const DEMO_SRC = '/audio/nexus-vox-demo.mp3?v=4';

/** Demo de voz natural — neural es-MX, ritmo humano con pausas (no acelerada) */
export function VoiceDemoButton({ className = '' }: { className?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const stop = () => {
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
    setPlaying(false);
  };

  const play = async () => {
    track('listen_voice', {});
    if (playing) {
      stop();
      return;
    }
    try {
      if (!audioRef.current) {
        audioRef.current = new Audio(DEMO_SRC);
        audioRef.current.playbackRate = 1.0;
        audioRef.current.onended = () => setPlaying(false);
        audioRef.current.onerror = () => {
          setPlaying(false);
          toast.error('No se pudo cargar la demo de voz.');
        };
      }
      await audioRef.current.play();
      setPlaying(true);
      toast.success('Asistente virtual · español mexicano natural');
    } catch {
      toast.error('Activa el audio del navegador para escuchar la demo.');
    }
  };

  return (
    <button
      type="button"
      onClick={play}
      className={
        className ||
        'mt-3 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-3 py-1.5 text-[13px] font-semibold text-accent transition-colors hover:bg-accent hover:text-white'
      }
    >
      {playing ? <Square size={14} /> : <Play size={14} />}
      {playing ? 'Detener' : 'Escúchalo'}
    </button>
  );
}
