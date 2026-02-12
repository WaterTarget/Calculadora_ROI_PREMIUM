# 🗺️ Market Scout - Agranel & Ice Supply

Una **PWA (Progressive Web App)** moderna para validar ubicaciones de negocio para máquinas expendedoras de Agranel e Ice Supply.

## ✨ Características

- 🎯 **Selector Inteligente** - Elige entre 7 modelos de máquinas diferentes
- 🗺️ **Mapa Interactivo** - Visualiza puntos de interés con react-leaflet
- 📊 **Análisis de Viabilidad** - Reporte completo con recomendaciones
- 📱 **PWA Ready** - Instalable en dispositivos móviles
- 🌐 **Geolocalización** - Análisis basado en tu ubicación actual
- 🎨 **UI Premium** - Diseño moderno con glassmorphism y animaciones

## 🚀 Tecnologías

- **React 18** + **TypeScript**
- **Vite** - Build tool ultrarrápido
- **Tailwind CSS** - Estilos utilitarios
- **react-leaflet** - Mapas interactivos
- **lucide-react** - Iconos modernos
- **Leaflet** - Biblioteca de mapas

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de producción
npm run preview
```

## 🎯 Modelos de Máquinas

### Agranel
1. **Kiosko Dúo (Agua + Hielo)** - Solución integral para zonas residenciales
2. **Kiosko de Agua** - Módulo de agua purificada para zonas populares
3. **Vending/Ventana Hielo** - Ventana automática 24/7
4. **Mascotas** - Dispensador de croquetas y productos pet
5. **Leguminosas** - Venta a granel de granos y semillas
6. **Café** - Estación de café al paso

### Ice Supply
7. **Fabricadoras de Hielo** - Equipos industriales B2B

## 🗺️ Lógica del Mapa

Cada máquina tiene una lógica específica de análisis:

- **residential** - Busca zonas residenciales de alto tráfico
- **residential_low** - Identifica abarrotes y farmacias
- **convenience** - Localiza Oxxos y licorerías
- **parks** - Encuentra parques y veterinarias
- **markets** - Detecta mercados y tianguis
- **offices** - Ubica oficinas y universidades
- **hospitality** - Identifica hoteles y restaurantes (B2B)

## 📱 Flujo de Usuario

### Pantalla 1: Selector
- Selección de máquina con feedback instantáneo
- Muestra descripción y características al seleccionar
- Botón "Analizar Zona" se activa tras selección

### Pantalla 2: Mapa
- Mapa interactivo centrado en ubicación del usuario
- Marcadores de colores según tipo:
  - 🔵 Azul: Zonas de interés / Residencial
  - 🔴 Rojo: Competencia
  - 🟢 Verde: Clientes potenciales (B2B)
  - 🟠 Naranja: Puntos de venta
- Estadísticas en tiempo real

### Pantalla 3: Resultados
- Reporte completo de viabilidad
- Veredicto personalizado según modelo
- Insights estratégicos
- CTAs para contactar asesores

## 🎨 Diseño

### Paleta de Colores
- **Primary**: Azul oscuro (#0050b3 - #002766)
- **Cyan**: Cian vibrante (#13c2c2 - #006d75)
- **Background**: Gradiente oscuro (#0f172a - #1e293b)

### Efectos Visuales
- Glassmorphism con backdrop-filter
- Animaciones de fade-in
- Hover effects suaves
- Gradientes dinámicos

## 📂 Estructura del Proyecto

```
market-scout/
├── public/
│   └── manifest.json          # PWA manifest
├── src/
│   ├── components/
│   │   ├── MachineSelector.tsx   # Pantalla 1
│   │   ├── MapView.tsx           # Pantalla 2
│   │   └── ResultsView.tsx       # Pantalla 3
│   ├── data/
│   │   └── machines.ts           # Datos maestros
│   ├── utils/
│   │   └── mockData.ts           # Generador de marcadores
│   ├── App.tsx                   # Componente principal
│   ├── index.css                 # Estilos globales
│   └── main.tsx                  # Entry point
├── index.html
├── tailwind.config.js
└── package.json
```

## 🌐 Despliegue

### Opción 1: Vercel
```bash
npm install -g vercel
vercel
```

### Opción 2: Netlify
```bash
npm run build
# Arrastra la carpeta dist/ a Netlify
```

### Opción 3: GitHub Pages
```bash
npm run build
# Sube la carpeta dist/ a gh-pages branch
```

## 🔧 Configuración

### Geolocalización
La app solicita permisos de geolocalización al cargar. Si se deniega, usa Ciudad de México como ubicación por defecto.

### Personalización
Edita `src/data/machines.ts` para modificar los modelos de máquinas o agregar nuevos.

## 📱 PWA Features

- ✅ Instalable en dispositivos móviles
- ✅ Funciona offline (con service worker)
- ✅ Icono de app personalizado
- ✅ Splash screen
- ✅ Standalone mode

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y confidencial. © 2026 Market Scout - Agranel & Ice Supply

## 📞 Soporte

Para soporte técnico o consultas:
- 📧 Email: ventas@marketscout.com
- 📱 Teléfono: +52 55 1234 5678
- 🌐 Web: [marketscout.com](https://marketscout.com)

---

**Desarrollado con ❤️ para Agranel & Ice Supply**
