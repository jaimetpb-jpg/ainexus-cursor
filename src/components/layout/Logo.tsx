import { Link } from 'react-router-dom';

type LogoProps = {
  variant?: 'default' | 'footer' | 'icon';
  className?: string;
};

/** Marca AI Nexus — nodo central + conexiones (red neuronal / nexus) */
export function Logo({ variant = 'default', className = '' }: LogoProps) {
  const icon = (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={variant === 'icon' ? 'h-9 w-9' : 'h-9 w-9 shrink-0'}
      aria-hidden
    >
      <defs>
        <linearGradient id="nexus-grad" x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B9BD5" />
          <stop offset="0.5" stopColor="#3B6EA5" />
          <stop offset="1" stopColor="#1E4A73" />
        </linearGradient>
        <linearGradient id="nexus-glow" x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7eb3e8" stopOpacity="0.6" />
          <stop offset="1" stopColor="#3B6EA5" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#nexus-grad)" />
      <circle cx="20" cy="20" r="14" fill="url(#nexus-glow)" opacity="0.5" />
      {/* Conexiones */}
      <path d="M20 12 L28 18 L26 28 L14 28 L12 18 Z" stroke="white" strokeOpacity="0.35" strokeWidth="1" fill="none" />
      <line x1="20" y1="12" x2="20" y2="20" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="28" y1="18" x2="20" y2="20" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="26" y1="28" x2="20" y2="20" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="14" y1="28" x2="20" y2="20" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="12" y1="18" x2="20" y2="20" stroke="white" strokeOpacity="0.5" strokeWidth="1" />
      {/* Nodos */}
      <circle cx="20" cy="12" r="2.5" fill="white" />
      <circle cx="28" cy="18" r="2" fill="white" fillOpacity="0.9" />
      <circle cx="26" cy="28" r="2" fill="white" fillOpacity="0.9" />
      <circle cx="14" cy="28" r="2" fill="white" fillOpacity="0.9" />
      <circle cx="12" cy="18" r="2" fill="white" fillOpacity="0.9" />
      <circle cx="20" cy="20" r="4" fill="white" />
      <circle cx="20" cy="20" r="2" fill="#3B6EA5" />
    </svg>
  );

  if (variant === 'icon') {
    return <span className={className}>{icon}</span>;
  }

  const wordmark = (
    <span className={`font-bold tracking-tight ${variant === 'footer' ? 'text-[18px] text-ink' : 'text-[17px] text-ink'}`}>
      <span className="text-accent">AI</span>
      <span className="text-ink"> Nexus</span>
    </span>
  );

  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="AI Nexus inicio">
      <span className="transition-transform group-hover:scale-105">{icon}</span>
      {wordmark}
    </Link>
  );
}
