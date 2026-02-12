export interface MarkerData {
    id: string;
    lat: number;
    lng: number;
    label: string;
    type: 'competitor' | 'residential' | 'potential_client' | 'poi';
    color: 'red' | 'blue' | 'green' | 'orange';
}

// Generate random offset for coordinates
const randomOffset = (max: number = 0.01): number => {
    return (Math.random() - 0.5) * max;
};

export const getMockMarkers = (
    logicType: string,
    userLat: number,
    userLng: number
): MarkerData[] => {
    const markers: MarkerData[] = [];

    switch (logicType) {
        case 'residential': // Agranel Dúo
            // Zonas residenciales (azul)
            for (let i = 0; i < 5; i++) {
                markers.push({
                    id: `res-${i}`,
                    lat: userLat + randomOffset(0.015),
                    lng: userLng + randomOffset(0.015),
                    label: `Zona Residencial ${i + 1}`,
                    type: 'residential',
                    color: 'blue'
                });
            }
            // Competencia (rojo)
            for (let i = 0; i < 2; i++) {
                markers.push({
                    id: `comp-${i}`,
                    lat: userLat + randomOffset(0.02),
                    lng: userLng + randomOffset(0.02),
                    label: `Competidor: Kiosko ${i + 1}`,
                    type: 'competitor',
                    color: 'red'
                });
            }
            break;

        case 'residential_low': // Agranel Agua
            // Abarrotes/Farmacias (azul)
            const stores = ['Abarrotes Don José', 'Farmacia Guadalajara', 'Tienda de la Esquina', 'Miscelánea El Sol'];
            stores.forEach((store, i) => {
                markers.push({
                    id: `store-${i}`,
                    lat: userLat + randomOffset(0.012),
                    lng: userLng + randomOffset(0.012),
                    label: store,
                    type: 'poi',
                    color: 'blue'
                });
            });
            break;

        case 'convenience': // Agranel Hielo
            // Oxxos, Licorerías (naranja)
            const convenience = ['OXXO', 'Seven Eleven', 'Licorería La Estrella', 'OXXO Express', 'Depósito Corona'];
            convenience.forEach((place, i) => {
                markers.push({
                    id: `conv-${i}`,
                    lat: userLat + randomOffset(0.01),
                    lng: userLng + randomOffset(0.01),
                    label: place,
                    type: 'poi',
                    color: 'orange'
                });
            });
            break;

        case 'parks': // Agranel Mascotas
            // Parques y Veterinarias (azul)
            const petPlaces = ['Parque Central', 'Veterinaria Pet Care', 'Parque Canino', 'Clínica Veterinaria San Francisco'];
            petPlaces.forEach((place, i) => {
                markers.push({
                    id: `pet-${i}`,
                    lat: userLat + randomOffset(0.013),
                    lng: userLng + randomOffset(0.013),
                    label: place,
                    type: 'poi',
                    color: 'blue'
                });
            });
            break;

        case 'markets': // Agranel Leguminosas
            // Mercados (azul)
            const markets = ['Mercado Municipal', 'Tianguis Orgánico', 'Mercado de Abastos', 'Plaza de Mercado'];
            markets.forEach((market, i) => {
                markers.push({
                    id: `market-${i}`,
                    lat: userLat + randomOffset(0.014),
                    lng: userLng + randomOffset(0.014),
                    label: market,
                    type: 'poi',
                    color: 'blue'
                });
            });
            break;

        case 'offices': // Agranel Café
            // Oficinas, Universidades (azul)
            const offices = ['Torre Corporativa', 'Universidad Tecnológica', 'Centro de Negocios', 'Campus Universitario'];
            offices.forEach((office, i) => {
                markers.push({
                    id: `office-${i}`,
                    lat: userLat + randomOffset(0.012),
                    lng: userLng + randomOffset(0.012),
                    label: office,
                    type: 'poi',
                    color: 'blue'
                });
            });
            break;

        case 'hospitality': // Ice Supply - B2B
            // Hoteles, Restaurantes (verde - clientes potenciales)
            const hospitality = [
                'Hotel Fiesta Inn',
                'Restaurante La Parroquia',
                'Hotel City Express',
                'Restaurante El Fogón',
                'Bar & Grill Los Arcos',
                'Hotel Marriott'
            ];
            hospitality.forEach((place, i) => {
                markers.push({
                    id: `hosp-${i}`,
                    lat: userLat + randomOffset(0.015),
                    lng: userLng + randomOffset(0.015),
                    label: `Cliente Potencial: ${place}`,
                    type: 'potential_client',
                    color: 'green'
                });
            });
            break;

        default:
            break;
    }

    return markers;
};

export const getAnalysisResult = (logicType: string, markerCount: number) => {
    if (logicType === 'hospitality') {
        return {
            title: 'Zona de Alta Demanda B2B',
            message: `Hay ${markerCount} negocios cercanos que gastan en hielo. ¡Véndeles tu equipo!`,
            recommendation: 'Esta ubicación es ideal para ofrecer fabricadoras de hielo industriales. Los negocios identificados tienen alto consumo de hielo y podrían ahorrar significativamente con equipos propios.',
            cta: 'Contactar Asesor B2B'
        };
    } else {
        return {
            title: 'Ubicación Validada',
            message: 'Competencia moderada, ideal para destacar por servicio 24/7.',
            recommendation: `Se identificaron ${markerCount} puntos de interés relevantes en la zona. La ubicación presenta buenas oportunidades para instalación de kioscos Agranel con alta visibilidad y tráfico peatonal.`,
            cta: 'Contactar Asesor'
        };
    }
};
