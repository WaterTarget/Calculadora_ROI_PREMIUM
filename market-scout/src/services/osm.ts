// OpenStreetMap Services (Nominatim & Overpass)

export interface Place {
    id: number;
    lat: number;
    lon: number;
    name: string;
    type: string;
    tags?: Record<string, string>;
}

// Nominatim Service (Geocoding)
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

// Overpass API Service (Nearby Places)
const OVERPASS_URL = "https://overpass-api.de/api/interpreter";

export const fetchNearbyPlaces = async (lat: number, lon: number, logicType: string): Promise<Place[]> => {
    let queryBody = "";
    const radius = 500;

    switch (logicType) {
        case 'residential':
            // Buscar zonas residenciales o servicios comunes en zonas residenciales
            // Usamos pharmacy, school, bakery como proxy de actividad residencial
            queryBody = `
        node["landuse"="residential"](around:${radius},${lat},${lon});
        node["amenity"="pharmacy"](around:${radius},${lat},${lon});
        node["amenity"="school"](around:${radius},${lat},${lon});
      `;
            break;
        case 'water':
            // Buscar purificadoras (competencia)
            // Buscamos "water" en nombre o tipo, y drinking_water
            queryBody = `
        node["amenity"="drinking_water"](around:${radius},${lat},${lon});
        node["shop"="water"](around:${radius},${lat},${lon});
        node["craft"="water_purification"](around:${radius},${lat},${lon});
      `;
            break;
        case 'convenience':
            // Buscar Oxxos, Supers
            queryBody = `
        node["shop"="konbini"](around:${radius},${lat},${lon});
        node["shop"="convenience"](around:${radius},${lat},${lon});
        node["shop"="supermarket"](around:${radius},${lat},${lon});
      `;
            break;
        case 'parks':
            // Buscar Parques y Veterinarias/Mascotas
            queryBody = `
        node["leisure"="park"](around:${radius},${lat},${lon});
        node["leisure"="dog_park"](around:${radius},${lat},${lon});
        node["shop"="pet"](around:${radius},${lat},${lon});
        node["amenity"="veterinary"](around:${radius},${lat},${lon});
      `;
            break;
        case 'hospitality':
            // Buscar Hoteles y Restaurantes
            queryBody = `
        node["amenity"="restaurant"](around:${radius},${lat},${lon});
        node["amenity"="bar"](around:${radius},${lat},${lon});
        node["tourism"="hotel"](around:${radius},${lat},${lon});
      `;
            break;
        default:
            return [];
    }

    const query = `
    [out:json];
    (
      ${queryBody}
    );
    out body;
  `;

    try {
        const response = await fetch(OVERPASS_URL, {
            method: "POST",
            body: query,
        });
        const data = await response.json();

        return data.elements.map((el: any) => ({
            id: el.id,
            lat: el.lat,
            lon: el.lon,
            name: el.tags?.name || el.tags?.brand || "Lugar sin nombre",
            type: el.tags?.amenity || el.tags?.shop || el.tags?.leisure || "Punto de Interés",
            tags: el.tags
        }));

    } catch (error) {
        console.error("Overpass Error:", error);
        return [];
    }
};
