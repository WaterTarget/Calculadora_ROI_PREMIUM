// Map Service: Nominatim & Overpass API Logic
// Maneja la búsqueda de direcciones y el análisis de competencia

export interface Place {
    id: number;
    lat: number;
    lon: number;
    name: string;
    type: string;
    tags?: Record<string, string>;
}

export interface AnalysisResult {
    title: string;
    msg: string;
    color: string;
    bg: string;
    points: Place[];
}

// 1. Nominatim Service (Geocoding)
export const searchAddress = async (query: string): Promise<{ lat: number; lon: number; display_name: string } | null> => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
                display_name: data[0].display_name
            };
        }
        return null;
    } catch (error) {
        console.error("Nominatim Error:", error);
        return null;
    }
};

// 2. Overpass API Service (Market Analysis)
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

const getOverpassQuery = (lat: number, lon: number, logicType: string): string => {
    const radius = 1000; // 1km radius validation
    let queryBody = "";

    switch (logicType) {
        case 'ice_market':
            // Ice Supply: Busca Oxxos, Licorerías, Gasolineras, Supers
            queryBody = `
        node["name"~"Oxxo|Seven|Eleven|Kiosko|Extra|Circle|Super|Vinos|Licores|Hielo|Gasolinera",i](around:${radius},${lat},${lon});
        node["shop"~"convenience|alcohol|supermarket"](around:${radius},${lat},${lon});
        node["amenity"="fuel"](around:${radius},${lat},${lon});
      `;
            break;

        case 'water_ice_mix':
            // Agranel Dúo: Purificadoras + Competencia de Hielo
            queryBody = `
        node["name"~"Oxxo|Seven|Eleven|Kiosko|Extra|Purificadora|Agua|Water|Llenado|Hielo",i](around:${radius},${lat},${lon});
        node["shop"~"convenience|alcohol|supermarket|water"](around:${radius},${lat},${lon});
        node["amenity"="drinking_water"](around:${radius},${lat},${lon});
      `;
            break;

        case 'water_only':
            // Agranel Agua: Solo Purificadoras
            queryBody = `
        node["name"~"Purificadora|Agua|Water|Llenado",i](around:${radius},${lat},${lon});
        node["shop"="water"](around:${radius},${lat},${lon});
        node["amenity"="drinking_water"](around:${radius},${lat},${lon});
      `;
            break;

        case 'cleaning_market':
            // Productos de Limpieza: Supers, Abarrotes, Lavanderías
            queryBody = `
        node["name"~"Bodega|Aurrera|Soriana|Walmart|Chedraui|Super|Abarrotes|Lavanderia",i](around:${radius},${lat},${lon});
        node["shop"~"supermarket|laundry"](around:${radius},${lat},${lon});
      `;
            break;
        case 'pet_market':
            // Mascotas: Veterinarias
            queryBody = `
        node["name"~"Veterinaria|Mascotas|Pet|Croquetas|Alimento",i](around:${radius},${lat},${lon});
        node["shop"="pet"](around:${radius},${lat},${lon});
        node["healthcare"="veterinary"](around:${radius},${lat},${lon});
      `;
            break;

        default:
            return "";
    }

    return `
    [out:json][timeout:25];
    (
      ${queryBody}
    );
    out body;
    >;
    out skel qt;
  `;
};

export const fetchMarketData = async (lat: number, lon: number, logicType: string): Promise<Place[]> => {
    const query = getOverpassQuery(lat, lon, logicType);
    if (!query) return [];

    try {
        const response = await fetch(OVERPASS_URL, {
            method: "POST",
            body: query,
        });
        const data = await response.json();

        // Filter and map results to clean Place objects
        const places = data.elements
            .filter((el: any) => el.type === 'node' && (el.tags?.name || el.tags?.brand || el.tags?.operartor))
            .map((el: any) => ({
                id: el.id,
                lat: el.lat,
                lon: el.lon,
                name: el.tags?.name || el.tags?.brand || "Punto de Venta",
                type: el.tags?.shop || el.tags?.amenity || "Comercio",
                tags: el.tags
            }));

        // Deduplicate by name and very close proximity to avoid noise
        const uniquePlaces = places.filter((place: Place, index: number, self: Place[]) =>
            index === self.findIndex((p) => (
                p.name === place.name || (Math.abs(p.lat - place.lat) < 0.0001 && Math.abs(p.lon - place.lon) < 0.0001)
            ))
        );

        return uniquePlaces;

    } catch (error) {
        console.error("Overpass API Error:", error);
        return [];
    }
};

// 3. Verdict Logic (The "Hook")
export const analyzeLocation = (places: Place[], logicType: string): AnalysisResult => {
    const count = places.length;
    const hasCompetition = count > 0;

    // Ice Supply Specific Logic
    if (logicType === 'ice_market' || logicType === 'water_ice_mix') {
        if (hasCompetition) {
            return {
                title: "🔥 Mercado Validado",
                msg: `Detectamos ${count} puntos de venta de hielo cercanos (Oxxos/Tiendas). La demanda es alta. Tu ventaja será ofrecer hielo 24/7 sin filas.`,
                color: "text-orange-600",
                bg: "bg-orange-50",
                points: places
            };
        } else {
            return {
                title: "💎 Oportunidad de Oro",
                msg: "No hay competidores directos cerca. Serás la única opción de hielo en la zona.",
                color: "text-emerald-600", // Emerald/Green for opportunity
                bg: "bg-emerald-50",
                points: places
            };
        }
    }

    // Generic Logic for others
    if (hasCompetition) {
        return {
            title: "✅ Zona Validada",
            msg: `El mercado ya existe (${count} puntos similares). La gente ya viene aquí a comprar. Tu ventaja es la automatización.`,
            color: "text-blue-600",
            bg: "bg-blue-50",
            points: places
        };
    } else {
        return {
            title: "🚀 Océano Azul",
            msg: "Serás el primero en ofrecer este servicio en la zona. ¡Captura todo el mercado!",
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            points: places
        };
    }
};
