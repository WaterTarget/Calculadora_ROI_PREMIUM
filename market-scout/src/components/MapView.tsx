import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import { type Machine } from '../data/machines';
import { getMockMarkers, type MarkerData } from '../utils/mockData';
import { Navigation, CheckCircle, ArrowRight } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface MapViewProps {
    machine: Machine;
    userLocation: { lat: number; lng: number };
    onViewResults: () => void;
}

// Fix for default marker icons in react-leaflet
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

const MapView = ({ machine, userLocation, onViewResults }: MapViewProps) => {
    const [markers, setMarkers] = useState<MarkerData[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(true);

    useEffect(() => {
        // Simulate analysis time
        setTimeout(() => {
            const mockMarkers = getMockMarkers(machine.mapLogic, userLocation.lat, userLocation.lng);
            setMarkers(mockMarkers);
            setIsAnalyzing(false);
        }, 1500);
    }, [machine, userLocation]);

    const getMarkerColor = (color: string): string => {
        const colors: Record<string, string> = {
            red: '#ef4444',
            blue: '#3b82f6',
            green: '#10b981',
            orange: '#f97316'
        };
        return colors[color] || '#3b82f6';
    };

    return (
        <div className="max-w-7xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-cyan-500 to-primary-600 p-2 rounded-lg">
                        <Navigation className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            Mapa Interactivo
                        </h2>
                        <p className="text-gray-400">
                            Análisis para: <span className="text-cyan-400 font-semibold">{machine.name}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div className="glass-effect rounded-xl overflow-hidden mb-6">
                <div className="relative">
                    {isAnalyzing && (
                        <div className="absolute inset-0 bg-slate-900/90 z-[1000] flex items-center justify-center">
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
                                <p className="text-white text-lg font-semibold">Analizando zona...</p>
                                <p className="text-gray-400 text-sm">Identificando puntos de interés</p>
                            </div>
                        </div>
                    )}

                    <MapContainer
                        center={[userLocation.lat, userLocation.lng]}
                        zoom={14}
                        style={{ height: '500px', width: '100%' }}
                        className="z-0"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* User Location Circle */}
                        <Circle
                            center={[userLocation.lat, userLocation.lng]}
                            radius={500}
                            pathOptions={{
                                color: '#06b6d4',
                                fillColor: '#06b6d4',
                                fillOpacity: 0.1
                            }}
                        />

                        {/* User Location Marker */}
                        <Marker
                            position={[userLocation.lat, userLocation.lng]}
                            icon={createCustomIcon('#06b6d4')}
                        >
                            <Popup>
                                <div className="text-center p-2">
                                    <p className="font-bold text-cyan-600">Tu Ubicación</p>
                                    <p className="text-sm text-gray-600">Punto de análisis</p>
                                </div>
                            </Popup>
                        </Marker>

                        {/* Mock Markers */}
                        {markers.map((marker) => (
                            <Marker
                                key={marker.id}
                                position={[marker.lat, marker.lng]}
                                icon={createCustomIcon(getMarkerColor(marker.color))}
                            >
                                <Popup>
                                    <div className="p-2">
                                        <p className="font-bold" style={{ color: getMarkerColor(marker.color) }}>
                                            {marker.label}
                                        </p>
                                        <p className="text-xs text-gray-600 capitalize">
                                            {marker.type.replace('_', ' ')}
                                        </p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>

            {/* Legend */}
            {!isAnalyzing && (
                <div className="glass-effect rounded-xl p-6 mb-6">
                    <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                        Leyenda del Mapa
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-cyan-500 rounded-full" />
                            <span className="text-gray-300 text-sm">Tu Ubicación</span>
                        </div>
                        {machine.brand === 'Ice Supply' ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-500 rounded-full" />
                                <span className="text-gray-300 text-sm">Clientes Potenciales</span>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-blue-500 rounded-full" />
                                    <span className="text-gray-300 text-sm">Zonas de Interés</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-red-500 rounded-full" />
                                    <span className="text-gray-300 text-sm">Competencia</span>
                                </div>
                            </>
                        )}
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-orange-500 rounded-full" />
                            <span className="text-gray-300 text-sm">Puntos de Venta</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats */}
            {!isAnalyzing && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="glass-effect rounded-xl p-6 text-center">
                        <p className="text-gray-400 text-sm mb-1">Puntos Identificados</p>
                        <p className="text-4xl font-bold text-cyan-400">{markers.length}</p>
                    </div>
                    <div className="glass-effect rounded-xl p-6 text-center">
                        <p className="text-gray-400 text-sm mb-1">Radio de Análisis</p>
                        <p className="text-4xl font-bold text-primary-400">500m</p>
                    </div>
                    <div className="glass-effect rounded-xl p-6 text-center">
                        <p className="text-gray-400 text-sm mb-1">Nivel de Viabilidad</p>
                        <p className="text-4xl font-bold text-green-400">Alto</p>
                    </div>
                </div>
            )}

            {/* Action Button */}
            {!isAnalyzing && (
                <div className="text-center">
                    <button
                        onClick={onViewResults}
                        className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-primary-600 hover:from-cyan-600 hover:to-primary-700 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30 flex items-center gap-3 mx-auto"
                    >
                        <CheckCircle className="w-6 h-6" />
                        Ver Reporte Completo
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MapView;
