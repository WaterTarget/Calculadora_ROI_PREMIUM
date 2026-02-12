import { useState } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';
import { searchAddress } from '../utils/mapService';


interface LocationInputProps {
    onLocationSelected: (lat: number, lon: number, address: string) => void;
    onError: (msg: string) => void;
}

const LocationInput = ({ onLocationSelected, onError }: LocationInputProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [isLoadingGeo, setIsLoadingGeo] = useState(false);

    const handleUseCurrentLocation = () => {
        if (!navigator.geolocation) {
            onError("Geolocation is not supported by your browser");
            return;
        }

        setIsLoadingGeo(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setIsLoadingGeo(false);
                onLocationSelected(
                    position.coords.latitude,
                    position.coords.longitude,
                    "Mi Ubicación Actual"
                );
            },
            (error) => {
                setIsLoadingGeo(false);
                onError("No se pudo obtener la ubicación. Intenta buscar manualmente.");
            }
        );
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        const result = await searchAddress(searchQuery);
        setIsSearching(false);

        if (result) {
            onLocationSelected(result.lat, result.lon, result.display_name);
        } else {
            onError("No encontramos esa dirección. Intenta ser más específico.");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in-up">
            <div className="space-y-4">
                <button
                    onClick={handleUseCurrentLocation}
                    disabled={isLoadingGeo}
                    className="w-full relative group
            bg-blue-600 hover:bg-blue-700 active:bg-blue-800
            text-white font-bold py-4 px-6 rounded-2xl
            flex items-center justify-center gap-3
            shadow-lg shadow-blue-200/50 transition-all duration-300
            active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
          "
                >
                    {isLoadingGeo ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        <MapPin className="w-6 h-6 group-hover:animate-bounce" />
                    )}
                    <span>{isLoadingGeo ? "Obteniendo ubicación..." : "Usar mi ubicación actual"}</span>
                </button>

                <div className="relative flex items-center justify-center">
                    <div className="border-t border-slate-200 w-full absolute"></div>
                    <span className="bg-slate-50 px-3 text-slate-400 text-sm font-medium relative z-10">O escribe una dirección</span>
                </div>

                <form onSubmit={handleSearch} className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className={`w-5 h-5 text-slate-400 transition-colors group-focus-within:text-blue-500`} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Ej. Calle Reforma 222, CDMX"
                        className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-2xl
              text-slate-800 placeholder-slate-400 font-medium
              focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50
              transition-all duration-300 shadow-sm hover:border-slate-300"
                    />
                    {isSearching && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LocationInput;
