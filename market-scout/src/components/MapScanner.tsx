import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Machine } from '../data/machines';
import { fetchMarketData, analyzeLocation, Place, AnalysisResult } from '../utils/mapService';
import { Loader2, Flame, Gem, CheckCircle, Rocket, MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Custom Marker Icons
const createCustomIcon = (color: string) => {
    const svgIcon = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C10.48 0 6 4.48 6 10c0 7.5 10 22 10 22s10-14.5 10-22c0-5.52-4.48-10-10-10z" fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="16" cy="10" r="4" fill="white"/>
    </svg>
  `;
    return new Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(svgIcon)}`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};

interface MapScannerProps {
    lat: number;
    lon: number;
    machine: Machine;
    onReset: () => void;
}

const MapScanner = ({ lat, lon, machine, onReset }: MapScannerProps) => {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const analyze = async () => {
            setLoading(true);
            // Fetch real data from Overpass
            const places = await fetchMarketData(lat, lon, machine.queryLogic);
            // Analyze findings with smart verdict
            const analysis = analyzeLocation(places, machine.queryLogic);

            setResult(analysis);
            setLoading(false);
            setTimeout(() => setShowResults(true), 500);
        };

        analyze();
    }, [lat, lon, machine]);

    // Helper to get Icon based on title keywords
    const getResultIcon = (title: string) => {
        if (title.includes("Mercado Validado")) return <Flame className="w-8 h-8 text-orange-600" />;
        if (title.includes("Oportunidad")) return <Gem className="w-8 h-8 text-emerald-600" />;
        if (title.includes("Zona Validada")) return <CheckCircle className="w-8 h-8 text-blue-600" />;
        return <Rocket className="w-8 h-8 text-indigo-600" />;
    };

    return (
        <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white animate-fade-in group">
            <MapContainer
                center={[lat, lon]}
                zoom={15}
                scrollWheelZoom={false}
                className="w-full h-full z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* User Location */}
                <Marker position={[lat, lon]} icon={createCustomIcon('#3b82f6')}>
                    <Popup>
                        <div className="font-bold text-blue-600">Tu Ubicación</div>
                        <div className="text-xs">Punto de análisis</div>
                    </Popup>
                </Marker>

                <Circle
                    center={[lat, lon]}
                    radius={1000}
                    pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.05, dashArray: '10, 10' }}
                />

                {/* Competitors/Points */}
                {result?.points.map((place) => (
                    <Marker
                        key={place.id}
                        position={[place.lat, place.lon]}
                        icon={createCustomIcon('#ef4444')} // Red for competition/points
                    >
                        <Popup>
                            <div className="font-bold text-slate-800">{place.name}</div>
                            <div className="text-xs text-slate-500 capitalize">{place.type?.replace('_', ' ')}</div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Loading State */}
            {loading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
                        <Loader2 className="w-16 h-16 text-blue-600 animate-spin relative z-10" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-slate-800 animate-pulse">
                        Escaneando mercado...
                    </h3>
                    <p className="text-slate-500 mt-2">Buscando competidores y puntos de interés</p>
                </div>
            )}

            {/* Bottom Sheet Results */}
            {result && (
                <div
                    className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)] transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) z-40
            ${showResults ? 'translate-y-0' : 'translate-y-full'}
          `}
                >
                    <div className="p-6 pb-8">
                        {/* Handle Bar */}
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>

                        <div className="flex items-start gap-5 mb-6">
                            <div className={`p-4 rounded-2xl ${result.bg} shrink-0`}>
                                {getResultIcon(result.title)}
                            </div>
                            <div>
                                <h3 className={`text-2xl font-black ${result.color} mb-2 tracking-tight`}>
                                    {result.title}
                                </h3>
                                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                                    {result.msg}
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <MapPin className="w-4 h-4 text-slate-400" />
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Radio de Análisis</p>
                                </div>
                                <p className="text-slate-900 font-black text-2xl">1 km</p>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <Flame className="w-4 h-4 text-slate-400" />
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Competencia</p>
                                </div>
                                <p className="text-slate-900 font-black text-2xl">{result.points.length}</p>
                            </div>
                        </div>

                        <button
                            onClick={onReset}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl active:scale-95 transition-all shadow-lg shadow-slate-200"
                        >
                            Analizar Otra Ubicación
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapScanner;
