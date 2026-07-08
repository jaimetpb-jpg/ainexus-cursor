import { useEffect, useMemo, useRef, useState, Fragment } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Circle, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export type FleetUnit = {
  id: string;
  lat: number;
  lng: number;
  status: 'moving' | 'stopped' | 'deviation' | 'off';
  progress: number;
  routeId: string;
};

/** Corredor CDMX → Querétaro · Carretera 57 — vista cercana 2D */
const ROUTE_MAIN: [number, number][] = [
  [19.4326, -99.1332], [19.48, -99.145], [19.55, -99.162], [19.62, -99.178],
  [19.7212, -99.2085], [19.82, -99.26], [19.92, -99.31], [20.0598, -99.3456],
  [20.14, -99.48], [20.22, -99.58], [20.2847, -99.6543], [20.35, -99.78],
  [20.42, -99.9], [20.48, -100.05], [20.52, -100.18], [20.56, -100.28], [20.5888, -100.3899],
];

const ROUTE_ALT: [number, number][] = [
  [19.4326, -99.1332], [19.4, -99.22], [19.35, -99.35], [19.32, -99.48], [19.3, -99.58], [19.2827, -99.6557],
];

const ROUTE_META = {
  cdmx_qro: { label: 'CDMX → QRO', highway: 'Autop. 57D', color: '#2563eb', glow: '#1d4ed8', weight: 7 },
  cdmx_tol: { label: 'CDMX → TOL', highway: 'Autop. 15', color: '#7c3aed', glow: '#5b21b6', weight: 5, dash: '10 6' },
};

const HUBS = [
  { name: 'CEDIS · CDMX', lat: 19.4326, lng: -99.1332, r: 3500 },
  { name: 'Hub · Querétaro', lat: 20.5888, lng: -100.3899, r: 3200 },
  { name: 'Patio · Toluca', lat: 19.2827, lng: -99.6557, r: 2800 },
];

const CHECKPOINTS = [
  { name: 'Peaje Arco Norte', lat: 19.72, lng: -99.21 },
  { name: 'Caseta SJR', lat: 20.38, lng: -99.98 },
  { name: 'Km 184 · 57D', lat: 20.12, lng: -99.52 },
];

const CONFIGS = [
  { id: 'MX-01', routeId: 'cdmx_qro', route: ROUTE_MAIN, status: 'moving' as const, speed: 0.0016, start: 0.38 },
  { id: 'MX-07', routeId: 'cdmx_qro', route: ROUTE_MAIN, status: 'stopped' as const, speed: 0, start: 0.56 },
  { id: 'MX-12', routeId: 'cdmx_qro', route: ROUTE_MAIN, status: 'moving' as const, speed: 0.0018, start: 0.22 },
  { id: 'MX-19', routeId: 'cdmx_qro', route: ROUTE_MAIN, status: 'deviation' as const, speed: 0.0012, start: 0.48 },
  { id: 'MX-31', routeId: 'cdmx_tol', route: ROUTE_ALT, status: 'moving' as const, speed: 0.0017, start: 0.62 },
  { id: 'MX-08', routeId: 'cdmx_qro', route: ROUTE_MAIN, status: 'off' as const, speed: 0, start: 0.08 },
];

function lerpCoord(route: [number, number][], t: number): [number, number] {
  const segs = route.length - 1;
  const pos = Math.min(0.999, t) * segs;
  const i = Math.floor(pos);
  const f = pos - i;
  const a = route[i];
  const b = route[i + 1] ?? a;
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
}

const STATUS: Record<FleetUnit['status'], { color: string; label: string }> = {
  moving: { color: '#16a34a', label: 'En ruta' },
  stopped: { color: '#ca8a04', label: 'Parada' },
  deviation: { color: '#dc2626', label: 'Desvío' },
  off: { color: '#64748b', label: 'Apagado' },
};

function FitCorridor({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (!points.length) return;
    map.fitBounds(L.latLngBounds(points), { padding: [32, 32], maxZoom: 11 });
  }, [map, points]);
  return null;
}

function buildUnits(progress: Record<string, number>): FleetUnit[] {
  return CONFIGS.map((c) => {
    const [lat, lng] = lerpCoord(c.route, progress[c.id] ?? c.start);
    const offset = c.status === 'deviation' ? 0.012 : 0;
    return {
      id: c.id,
      lat: lat + offset,
      lng: lng + offset * 0.3,
      status: c.status,
      progress: progress[c.id] ?? c.start,
      routeId: c.routeId,
    };
  });
}

function PulsingUnit({ unit }: { unit: FleetUnit }) {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    if (unit.status !== 'moving' && unit.status !== 'deviation') return;
    const id = setInterval(() => setPulse((p) => (p + 1) % 3), 500);
    return () => clearInterval(id);
  }, [unit.status]);

  const r = unit.status === 'moving' ? 12 + pulse : unit.status === 'deviation' ? 13 : 9;
  const color = STATUS[unit.status].color;
  const meta = ROUTE_META[unit.routeId as keyof typeof ROUTE_META];

  return (
    <>
      {(unit.status === 'moving' || unit.status === 'deviation') && (
        <CircleMarker
          center={[unit.lat, unit.lng]}
          radius={r + 10}
          pathOptions={{ color, fillColor: color, fillOpacity: 0.15, weight: 1, opacity: 0.5 }}
        />
      )}
      <CircleMarker
        center={[unit.lat, unit.lng]}
        radius={r}
        pathOptions={{ color: '#fff', fillColor: color, fillOpacity: 1, weight: 3 }}
      >
        <Tooltip direction="top" offset={[0, -14]} opacity={0.98} permanent={unit.status === 'deviation'}>
          <span className="font-mono text-[12px] font-bold">{unit.id}</span>
          <span className="ml-1 text-[11px]">· {STATUS[unit.status].label}</span>
          <br />
          <span className="text-[10px] text-[#64748b]">{meta?.highway}</span>
          {unit.status === 'moving' && <span className="ml-1 text-[10px] font-bold text-[#16a34a]">● LIVE</span>}
        </Tooltip>
      </CircleMarker>
    </>
  );
}

export function FleetMapLeaflet() {
  const progressRef = useRef(Object.fromEntries(CONFIGS.map((c) => [c.id, c.start])));
  const trailsRef = useRef<Record<string, [number, number][]>>({});
  const [units, setUnits] = useState<FleetUnit[]>(() => buildUnits(progressRef.current));
  const [trails, setTrails] = useState<Record<string, [number, number][]>>({});

  useEffect(() => {
    const run = () => {
      const progress = progressRef.current;
      CONFIGS.forEach((c) => {
        if (c.speed > 0) progress[c.id] = (progress[c.id] + c.speed + Math.random() * 0.0002) % 1;
      });

      const nextTrails = { ...trailsRef.current };
      CONFIGS.forEach((c) => {
        const pt = lerpCoord(c.route, progress[c.id]);
        const arr = nextTrails[c.id] ?? [];
        arr.push(pt);
        if (arr.length > 30) arr.shift();
        nextTrails[c.id] = arr;
      });
      trailsRef.current = nextTrails;
      setTrails({ ...nextTrails });
      setUnits(buildUnits(progress));
    };
    run();
    const id = setInterval(run, 3200);
    return () => clearInterval(id);
  }, []);

  const corridorPoints = useMemo(
    () => [...ROUTE_MAIN, ...ROUTE_ALT] as [number, number][],
    []
  );

  return (
    <div className="fleet-map fleet-map-pro relative overflow-hidden rounded-lg border border-[#1b2735]">
      <MapContainer
        center={[20.0, -99.72]}
        zoom={10}
        minZoom={9}
        maxZoom={13}
        className="h-[300px] w-full md:h-[400px]"
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false}
      >
        {/* Mapa 2D de calles y carreteras — sin satélite */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution="© OpenStreetMap · CARTO"
          maxZoom={19}
        />
        <FitCorridor points={corridorPoints} />

        {HUBS.map((h) => (
          <Circle
            key={h.name}
            center={[h.lat, h.lng]}
            radius={h.r}
            pathOptions={{ color: '#3b6ea5', fillColor: '#3b6ea5', fillOpacity: 0.08, weight: 2, dashArray: '8 6' }}
          >
            <Tooltip permanent direction="center">
              <span className="font-mono text-[9px] font-bold text-[#1e40af]">{h.name}</span>
            </Tooltip>
          </Circle>
        ))}

        <Fragment>
          <Polyline positions={ROUTE_MAIN} pathOptions={{ color: ROUTE_META.cdmx_qro.glow, weight: 11, opacity: 0.25 }} />
          <Polyline
            positions={ROUTE_MAIN}
            pathOptions={{ color: ROUTE_META.cdmx_qro.color, weight: ROUTE_META.cdmx_qro.weight, opacity: 0.95, lineCap: 'round', lineJoin: 'round' }}
          />
          <Polyline positions={ROUTE_ALT} pathOptions={{ color: ROUTE_META.cdmx_tol.glow, weight: 8, opacity: 0.2, dashArray: '10 6' }} />
          <Polyline
            positions={ROUTE_ALT}
            pathOptions={{ color: '#7c3aed', weight: ROUTE_META.cdmx_tol.weight, opacity: 0.85, dashArray: '10 6', lineCap: 'round' }}
          />
        </Fragment>

        {Object.entries(trails).map(([id, pts]) => {
          const unit = units.find((u) => u.id === id);
          if (!unit || pts.length < 2) return null;
          return (
            <Polyline
              key={`trail-${id}`}
              positions={pts}
              pathOptions={{ color: STATUS[unit.status].color, weight: 4, opacity: 0.65, lineCap: 'round' }}
            />
          );
        })}

        {CHECKPOINTS.map((cp) => (
          <CircleMarker
            key={cp.name}
            center={[cp.lat, cp.lng]}
            radius={6}
            pathOptions={{ color: '#f59e0b', fillColor: '#fbbf24', fillOpacity: 1, weight: 2 }}
          >
            <Tooltip direction="top" offset={[0, -8]}>
              <span className="font-mono text-[10px] font-semibold">⛽ {cp.name}</span>
            </Tooltip>
          </CircleMarker>
        ))}

        {units.map((u) => (
          <PulsingUnit key={u.id} unit={u} />
        ))}
      </MapContainer>

      <div className="pointer-events-none absolute left-3 top-3 z-[500] rounded-lg border border-[#1b2735]/90 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-sm">
        <p className="font-mono text-[10px] font-bold text-[#16a34a]">
          <span className="mr-1.5 inline-block h-2 w-2 animate-pulse-dot rounded-full bg-[#16a34a]" />
          Carretera 57D · vista cercana · 6 unidades
        </p>
        <p className="mt-0.5 font-mono text-[8px] text-[#64748b]">Trazabilidad GPS · geocercas · SIMULACIÓN</p>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[500] bg-gradient-to-t from-[#06090e] via-[#06090e]/95 to-transparent px-3 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-[9px] text-[#94a3b8]">Autop. 57D CDMX↔Querétaro · Autop. 15 Toluca</p>
          <div className="flex flex-wrap gap-2 font-mono text-[8px]">
            <span className="text-[#16a34a]">● En ruta</span>
            <span className="text-[#ca8a04]">● Parada</span>
            <span className="text-[#dc2626]">● Desvío</span>
          </div>
        </div>
      </div>
    </div>
  );
}
