# 🚀 Guía de Despliegue - Market Scout

## 📋 Pre-requisitos

Antes de desplegar, asegúrate de que la aplicación funciona correctamente en local:

```bash
npm run build
npm run preview
```

Si todo funciona bien, procede con el despliegue.

## 🌐 Opción 1: Vercel (Recomendado)

### Ventajas
- ✅ Despliegue automático desde Git
- ✅ HTTPS gratuito
- ✅ CDN global
- ✅ Dominio personalizado gratis
- ✅ Builds automáticos en cada push

### Pasos

1. **Instalar Vercel CLI**
```bash
npm install -g vercel
```

2. **Login en Vercel**
```bash
vercel login
```

3. **Desplegar**
```bash
vercel
```

4. **Para producción**
```bash
vercel --prod
```

### Configuración Automática
Vercel detecta automáticamente que es un proyecto Vite y configura:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Dominio Personalizado
En el dashboard de Vercel:
1. Ve a Settings → Domains
2. Agrega tu dominio (ej: marketscout.com)
3. Configura los DNS según las instrucciones

---

## 🎯 Opción 2: Netlify

### Ventajas
- ✅ Interfaz muy amigable
- ✅ Drag & drop deployment
- ✅ HTTPS gratuito
- ✅ Formularios integrados

### Método 1: Drag & Drop

1. **Build local**
```bash
npm run build
```

2. **Ir a Netlify**
- Visita https://app.netlify.com/drop
- Arrastra la carpeta `dist/` al área de drop

### Método 2: Git Integration

1. **Sube tu código a GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/market-scout.git
git push -u origin main
```

2. **Conecta con Netlify**
- Ve a https://app.netlify.com
- Click en "New site from Git"
- Selecciona tu repositorio
- Configuración:
  - Build command: `npm run build`
  - Publish directory: `dist`

3. **Deploy**
- Click en "Deploy site"

### Configuración de Redirects
Crea `public/_redirects`:
```
/*    /index.html   200
```

---

## 📦 Opción 3: GitHub Pages

### Pasos

1. **Instalar gh-pages**
```bash
npm install -D gh-pages
```

2. **Agregar scripts a package.json**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Configurar vite.config.ts**
```typescript
export default defineConfig({
  base: '/market-scout/',  // nombre de tu repo
  // ... resto de config
})
```

4. **Desplegar**
```bash
npm run deploy
```

5. **Configurar GitHub Pages**
- Ve a Settings → Pages
- Source: Deploy from branch
- Branch: gh-pages / root

Tu sitio estará en: `https://tu-usuario.github.io/market-scout/`

---

## ☁️ Opción 4: Firebase Hosting

### Pasos

1. **Instalar Firebase CLI**
```bash
npm install -g firebase-tools
```

2. **Login**
```bash
firebase login
```

3. **Inicializar**
```bash
firebase init hosting
```

Configuración:
- Public directory: `dist`
- Single-page app: `Yes`
- GitHub integration: `No` (por ahora)

4. **Build**
```bash
npm run build
```

5. **Deploy**
```bash
firebase deploy
```

---

## 🐳 Opción 5: Docker + Cloud Run

### Dockerfile

Crea `Dockerfile`:
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Crea `nginx.conf`:
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_comp_level 9;
}
```

### Build y Deploy

```bash
# Build imagen
docker build -t market-scout .

# Test local
docker run -p 8080:80 market-scout

# Deploy a Google Cloud Run
gcloud run deploy market-scout \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## 🔒 Configuración de Seguridad

### Headers de Seguridad

Para Netlify, crea `public/_headers`:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

Para Vercel, crea `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

## 📊 Monitoreo Post-Despliegue

### Google Analytics

Agrega en `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Sentry (Error Tracking)

```bash
npm install @sentry/react
```

En `main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "tu-dsn-aqui",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

---

## ✅ Checklist Pre-Despliegue

- [ ] Build funciona sin errores (`npm run build`)
- [ ] Preview funciona correctamente (`npm run preview`)
- [ ] Todas las rutas funcionan
- [ ] Geolocalización funciona (o fallback a default)
- [ ] Mapa se carga correctamente
- [ ] PWA manifest está configurado
- [ ] Iconos de PWA están en public/
- [ ] README actualizado con URL de producción
- [ ] Variables de entorno configuradas (si aplica)
- [ ] Analytics configurado (opcional)

---

## 🔄 CI/CD Automático

### GitHub Actions para Vercel

Crea `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📱 Testing en Dispositivos Móviles

### Usando ngrok (para testing local)

```bash
# Instalar ngrok
npm install -g ngrok

# En una terminal, corre el dev server
npm run dev

# En otra terminal, expón el puerto
ngrok http 5173
```

Obtendrás una URL pública temporal para probar en móviles.

---

## 🎯 Recomendación Final

**Para Market Scout, recomiendo Vercel:**

1. **Rápido**: Deploy en 30 segundos
2. **Gratis**: Plan gratuito generoso
3. **Automático**: Builds en cada push
4. **Profesional**: URLs limpias y HTTPS

**Comando único:**
```bash
vercel --prod
```

¡Y listo! 🚀

---

## 📞 Soporte

Si tienes problemas con el despliegue:
1. Revisa los logs de build
2. Verifica que `npm run build` funcione localmente
3. Consulta la documentación de la plataforma elegida

**¡Éxito con tu despliegue!** 🎉
