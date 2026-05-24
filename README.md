# Bagues Dashboard — Guía de instalación

## Qué es esto
Dashboard de analytics en tiempo real para Bagues Oficial.
Conectado a Metricool (Instagram, TikTok, YouTube, Meta Ads, Google Ads) y con IA integrada.

---

## Paso 1 — Obtener el token de Metricool

1. Entrá a **app.metricool.com**
2. Menú superior derecho → **Configuración** → **API**
3. Generá un token de API
4. Copialo, lo vas a necesitar en el Paso 3

---

## Paso 2 — Subir el código a GitHub

1. Creá una cuenta en **github.com** (si no tenés)
2. Hacé clic en **New repository** → nombre: `bagues-dashboard` → Public → Create
3. En tu computadora, abrí una terminal en la carpeta `bagues-dashboard` y ejecutá:

```bash
git init
git add .
git commit -m "primer commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/bagues-dashboard.git
git push -u origin main
```

---

## Paso 3 — Desplegar en Render

1. Creá una cuenta en **render.com** (gratis)
2. Hacé clic en **New** → **Web Service**
3. Conectá tu cuenta de GitHub y seleccioná el repositorio `bagues-dashboard`
4. Render va a detectar automáticamente la configuración del `render.yaml`
5. Antes de desplegar, en la sección **Environment Variables** agregá:

| Variable           | Valor                          |
|--------------------|--------------------------------|
| `METRICOOL_TOKEN`  | (el token que copiaste antes)  |
| `ANTHROPIC_KEY`    | (tu API key de Anthropic)      |
| `BLOG_ID`          | `4634674`                      |

6. Hacé clic en **Deploy**
7. En 2-3 minutos vas a tener una URL tipo `https://bagues-dashboard.onrender.com`

---

## Paso 4 — Usar el dashboard

1. Abrí la URL de Render en el navegador
2. Seleccioná el período de fechas
3. Hacé clic en **Actualizar**
4. Navegá entre las tabs: Resumen, Instagram, TikTok, YouTube, Meta Ads, Google Ads
5. Usá el chat de IA al final para hacer preguntas sobre los datos

---

## Actualización automática

Cada vez que hagas `git push`, Render actualiza el dashboard automáticamente.

---

## Soporte

El token de Metricool se puede regenerar en cualquier momento desde la configuración.
Si el plan gratuito de Render tiene latencia al inicio, es normal — se "duerme" después de 15 min de inactividad.
Para mantenerlo siempre activo, activar **Auto-scaling** (plan pago de Render, ~$7/mes).
