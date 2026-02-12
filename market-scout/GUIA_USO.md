# 🎯 Market Scout - Guía de Uso Rápida

## 🚀 Inicio Rápido

La aplicación está corriendo en: **http://localhost:5173/**

## 📱 Flujo de la Aplicación

### 1️⃣ PANTALLA DE SELECTOR

**¿Qué verás?**
- Título "Selecciona tu Máquina"
- Grid de 7 tarjetas de máquinas (2 columnas en desktop)
- Cada tarjeta muestra:
  - Badge con la marca (Agranel o Ice Supply)
  - Nombre de la máquina
  - Descripción breve

**¿Qué hacer?**
1. Haz clic en cualquier tarjeta de máquina
2. La tarjeta seleccionada se iluminará con borde cyan
3. Aparecerá INMEDIATAMENTE debajo un recuadro con:
   - Icono de información
   - Descripción completa
   - Característica clave destacada
4. El botón "Analizar Zona" se activará (cambiará de gris a gradiente cyan-azul)
5. Haz clic en "Analizar Zona"

### 2️⃣ PANTALLA DE MAPA

**¿Qué verás?**
- Animación de carga "Analizando zona..."
- Mapa interactivo de OpenStreetMap
- Tu ubicación marcada con pin cyan
- Círculo de 500m de radio alrededor de tu ubicación
- Múltiples pines de colores según el tipo de máquina seleccionada

**Colores de Pines:**
- 🔵 **Azul Cyan**: Tu ubicación actual
- 🔵 **Azul**: Zonas de interés (residenciales, tiendas, etc.)
- 🔴 **Rojo**: Competencia (otros kioscos)
- 🟢 **Verde**: Clientes potenciales B2B (solo para Ice Supply)
- 🟠 **Naranja**: Puntos de venta (Oxxos, licorerías)

**Interacción:**
- Haz clic en cualquier pin para ver su información
- Desplázate por el mapa
- Haz zoom in/out

**Estadísticas mostradas:**
- Puntos Identificados
- Radio de Análisis (500m)
- Nivel de Viabilidad (Alto)

**¿Qué hacer?**
- Haz clic en "Ver Reporte Completo"

### 3️⃣ PANTALLA DE RESULTADOS

**¿Qué verás?**

**Para Ice Supply (Fabricadoras):**
- Título: "Zona de Alta Demanda B2B"
- Mensaje: "Hay X negocios cercanos que gastan en hielo. ¡Véndeles tu equipo!"
- Recomendación enfocada en venta B2B

**Para Agranel (Kioscos):**
- Título: "Ubicación Validada"
- Mensaje: "Competencia moderada, ideal para destacar por servicio 24/7"
- Recomendación enfocada en instalación de kiosco

**Secciones:**
1. **Veredicto** - Tarjeta principal con análisis
2. **Ubicación Estratégica** - 3 puntos clave con checkmarks
3. **Potencial de Mercado** - 3 puntos clave con checkmarks
4. **Detalles del Equipo** - Información completa de la máquina
5. **CTAs** - Botones para contactar

**¿Qué hacer?**
- Haz clic en "Contactar Asesor" (verde) para llamar
- Haz clic en "Enviar Email" para email
- Haz clic en "Analizar otra ubicación" para volver al inicio

## 🎨 Características Visuales

### Colores Corporativos
- **Fondo**: Gradiente oscuro (slate-900 a slate-800)
- **Acentos**: Cyan (#13c2c2) y Azul (#1890ff)
- **Glassmorphism**: Tarjetas con efecto de vidrio esmerilado

### Animaciones
- Fade-in al cambiar de pantalla
- Hover effects en botones y tarjetas
- Spinner de carga animado
- Transiciones suaves

### Tipografía
- Fuente: **Inter** (Google Fonts)
- Pesos: 300-900

## 🗺️ Ejemplos por Máquina

### Agranel Dúo (Agua + Hielo)
- **Lógica**: residential
- **Pines**: Zonas residenciales (azul) + Competidores (rojo)
- **Ideal para**: Colonias con alto tráfico peatonal

### Ice Supply - Fabricadoras
- **Lógica**: hospitality
- **Pines**: Hoteles y restaurantes (verde - clientes potenciales)
- **Ideal para**: Venta B2B a negocios con alto consumo de hielo

### Agranel Hielo
- **Lógica**: convenience
- **Pines**: Oxxos, Seven Eleven, Licorerías (naranja)
- **Ideal para**: Instalación en fachadas de tiendas

### Agranel Mascotas
- **Lógica**: parks
- **Pines**: Parques, Veterinarias (azul)
- **Ideal para**: Zonas pet-friendly

### Agranel Café
- **Lógica**: offices
- **Pines**: Oficinas, Universidades (azul)
- **Ideal para**: Zonas de espera y campus

## 🔧 Funcionalidades Técnicas

### Geolocalización
- Al cargar, la app pide permisos de ubicación
- Si se acepta: usa tu ubicación real
- Si se rechaza: usa Ciudad de México por defecto (19.4326, -99.1332)

### PWA (Progressive Web App)
- Instalable en móviles (botón "Agregar a pantalla de inicio")
- Funciona offline
- Icono personalizado
- Modo standalone (sin barra del navegador)

### Responsivo
- Desktop: Grid de 2 columnas
- Mobile: Grid de 1 columna
- Mapa adaptable
- Footer fijo en la parte inferior

## 📞 Información de Contacto (Mock)

Los botones de contacto usan:
- **Teléfono**: +52 55 1234 5678
- **Email**: ventas@marketscout.com

## 🎯 Próximos Pasos

1. **Prueba cada máquina** para ver cómo cambian los pines
2. **Compara** Ice Supply vs Agranel para ver la diferencia B2B
3. **Navega** por el mapa y haz clic en los pines
4. **Instala** la PWA en tu móvil para probarla

---

**¡La aplicación está lista para usar!** 🚀

Abre http://localhost:5173/ en tu navegador para comenzar.
