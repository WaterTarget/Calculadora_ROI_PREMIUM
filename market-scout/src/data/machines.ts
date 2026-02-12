export interface Machine {
    id: string;
    brand: string;
    name: string;
    description: string;
    characteristic: string;
    queryLogic: 'ice_market' | 'water_ice_mix' | 'water_only' | 'cleaning_market' | 'pet_market';
    color: string;
}

export const MACHINES: Machine[] = [
    {
        id: 'icesupply-hielo',
        brand: 'Ice Supply',
        name: 'Venta de Hielo (Ice Supply)',
        description: 'Sistema de producción y despacho de hielo purificado en bolsa.',
        characteristic: 'Alta demanda en zonas residenciales, comerciales y de ocio.',
        queryLogic: 'ice_market', // Busca Oxxos, Licores, Supers
        color: 'sky' // Azul hielo / Tailwind: text-sky-500
    },
    {
        id: 'agranel-duo',
        brand: 'Agranel',
        name: 'Kiosko Dúo (Agua + Hielo)',
        description: 'Unidad dispensadora híbrida: Agua purificada y Hielo en bolsa.',
        characteristic: 'Sistema de doble salida en gabinete de acero inoxidable.',
        queryLogic: 'water_ice_mix', // Busca Purificadoras + Oxxos
        color: 'blue'
    },
    {
        id: 'agranel-agua',
        brand: 'Agranel',
        name: 'Vending Agua Purificada',
        description: 'Módulo autónomo de purificación y despacho de agua.',
        characteristic: 'Gabinete compacto de 1mt² con ventana de llenado.',
        queryLogic: 'water_only', // Busca Purificadoras
        color: 'cyan'
    },
    {
        id: 'agranel-limpieza',
        brand: 'Agranel',
        name: 'Productos de Limpieza',
        description: 'Sistema de bombeo y despacho a granel para químicos de limpieza.',
        characteristic: 'Dispensado por litro exacto. Compatible con módulos de expansión.',
        queryLogic: 'cleaning_market', // Busca Supers y Lavanderías
        color: 'purple'
    },
    {
        id: 'agranel-mascotas',
        brand: 'Agranel',
        name: 'Mascotas (Croquetas)',
        description: 'Dispensador de alimento para mascotas y productos de limpieza.',
        characteristic: 'Venta a granel por gramaje exacto.',
        queryLogic: 'pet_market', // Busca Veterinarias y Tiendas de Mascotas
        color: 'green'
    }
];
