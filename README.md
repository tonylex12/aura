# Aura — English Conversation Companion (Next.js, TypeScript & Tailwind CSS v4)

¡Bienvenido a **Aura**! Esta es una aplicación web interactiva premium, totalmente responsiva y accesible, diseñada para ayudar a los desarrolladores y estudiantes de software a practicar y mejorar su inglés hablado de forma totalmente autónoma.

Aura está construida sobre un entorno moderno con **Next.js 16 (App Router)**, **TypeScript** y el compilador de alto rendimiento **Tailwind CSS v4** con configuración *CSS-First*. Además, ahora integra una base de datos local **SQLite** gestionada mediante **Prisma ORM**, permitiendo una persistencia de datos relacional y robusta de tipo "Zero-Config" y local-first.

---

## 📸 Demostración Visual de la Interfaz Premium

La interfaz combina una barra de navegación glassmorphic con brillo neón, globos de chat fluidos con reproducción de voz artificial, un sandbox de precisión con retroalimentación circular SVG, tarjetas tridimensionales interactivos para estudiar vocabulario y una nueva arena de exámenes dinámicos con retroalimentación animada de aciertos y errores:

![Aura Application Mockup](file:///home/tonyhuerto93/.gemini/antigravity/brain/3a7273ac-c31f-4bdf-93b5-c34d9f58a0e1/aura_app_mockup_1779590960302.png)

---

## 🏗️ Arquitectura Relacional Local (Zero-Config)

Aura almacena toda la información localmente en un archivo SQLite portable ubicado en `prisma/dev.db`. Esto elimina la necesidad de instalar o levantar servicios adicionales de Docker o Postgres en tu entorno de desarrollo, haciéndola extremadamente fácil de clonar y desplegar en 1 minuto.

*   **Historial Persistente de Chat**: Las conversaciones con Aura se graban y recuperan de SQLite por escenarios (`casual`, `restaurant`, `interview`), manteniendo hilos completos a través de recargas del navegador.
*   **Vocabulario Enriquecido Sembrado**: Al inicializar, la base de datos se puebla con **273 términos premium** académicos, coloquiales, profesionales y tecnológicos del inglés más utilizado.
*   **Libro Digital de Gramática**: Integra 15 lecciones gramaticales completas con fórmulas estructurales, explicaciones ricas en texto y ejemplos narrados con audio interactivo. La lectura y su progreso se guardan directamente en la base de datos SQLite para dar seguimiento.
*   **Arena de Quizzes de Opción Múltiple**: Los tests se generan en tiempo real consultando palabras aleatorias de SQLite y estructurando distractores automáticos. Tus aciertos quedan registrados en un historial de récords y progreso.

---

## 📂 Estructura de Archivos del Proyecto

El proyecto está estructurado con un diseño plano en la raíz (sin carpeta `src/`), completamente en TypeScript:

```text
/home/tonyhuerto93/Documents/aura-next-app/
├── package.json
├── .env.local                 # Contiene tu GEMINI_API_KEY (seguro en el servidor)
├── .env                       # Contiene tu DATABASE_URL (para comandos de Prisma CLI)
├── prisma/
│   ├── schema.prisma          # Configuración del proveedor SQLite y modelos de datos
│   ├── seed.js                # Semillero con 273 palabras y 15 lecciones gramaticales exhaustivas
│   └── dev.db                 # Archivo de base de datos relacional local
├── app/
│   ├── layout.tsx             # Layout HTML5 general con inyección de tipografías premium (Inter & Outfit)
│   ├── page.tsx               # Entrada principal, gestor de estados sincronizados con SQLite y Web Speech APIs
│   ├── globals.css            # CSS-First con Tailwind CSS v4 (@theme) y estilos de vidrio difuminado
│   └── api/
│       ├── chat/
│       │   └── route.ts       # API Route segura que conecta con Google Gemini API
│       ├── history/
│       │   └── route.ts       # API Route para cargar (GET), guardar (POST) y vaciar (DELETE) chats en SQLite
│       ├── vocabulary/
│       │   └── route.ts       # API Route para cargar vocabulario y alternar tarjetas dominadas
│       ├── grammar/
│       │   └── route.ts       # API Route para cargar lecciones gramaticales y alternar progreso de lectura
│       └── quizzes/
│           └── route.ts       # API Route para generar quizzes en tiempo real y guardar récords de respuestas
├── components/
│   ├── Sidebar.tsx            # Barra lateral glassmorphic con la nueva sección de Cuestionarios y Gramática
│   ├── Header.tsx             # Saludo de usuario y badge de estado inteligente/simulado de la API
│   ├── Dashboard.tsx          # Panel principal de estadísticas y atajo de navegación a Quizzes
│   ├── ChatSimulator.tsx      # Chat interactivo con micrófono, dictado y asistente de gramática en tiempo real
│   ├── PronunciationSandbox.tsx# Evaluador de pronunciación palabra por palabra y medidor circular
│   ├── Flashcards.tsx         # Tarjetas 3D dinámicas conectadas con SQLite y soporte para Vocabulario Principal
│   ├── GrammarPanel.tsx       # Libro digital interactivo con paginación, barra de progreso y ejemplos TTS
│   ├── Quizzes.tsx            # Arena interactiva de tests, progreso y récord máximo de respuestas
│   └── SettingsDialog.tsx     # Modal nativo <dialog> para configuraciones de perfil y de voz (TTS)
```

---

## ⚙️ Despliegue Rápido en Entorno Local

Para ejecutar tu nueva aplicación de Aura en tu máquina local, abre una terminal en el directorio del proyecto y sigue estos tres sencillos pasos:

### 1. Instalar dependencias
Asegúrate de que todos los paquetes estén listos en el espacio de trabajo local:
```bash
npm install
```

### 2. Sincronizar y Poblar la Base de Datos (SQLite)
Este comando leerá el esquema, creará la base de datos local `dev.db`, ejecutará las migraciones internas y poblará la tabla de vocabulario con los 273 términos más utilizados y las 15 lecciones de gramática en una sola acción:
```bash
npx prisma db push && npx prisma db seed
```

### 3. Levantar el Servidor de Desarrollo
Inicia el entorno de desarrollo ejecutando:
```bash
npm run dev
```
El servidor se levantará en **[http://localhost:3000](http://localhost:3000)**. Abre este enlace preferiblemente en **Google Chrome** o **Microsoft Edge** para garantizar la máxima compatibilidad de las APIs de reconocimiento de voz de tu navegador.

---

## 🔑 Configurar la Gemini API Key

Para activar las conversaciones abiertas con IA y recibir sugerencias gramaticales exactas de Aura:
1.  Abre el archivo **[.env.local](file:///home/tonyhuerto93/Documents/aura-next-app/.env.local)** en la raíz del proyecto.
2.  Reemplaza `YOUR_GEMINI_API_KEY_HERE` con tu API Key real de Google Gemini (consigue una gratis en [Google AI Studio](https://aistudio.google.com/)).
3.  Guarda el archivo. Next.js recargará las variables automáticamente y el indicador en la parte superior derecha de la aplicación cambiará a **"Modo Inteligente"**. Si no está configurada, Aura usará de forma elegante el simulador situacional local sin conexión.

---

## 💡 Secciones de Práctica de Aura

*   **Configuración**: Ajusta tu nombre de usuario y selecciona el acento y velocidad de la voz del tutor (ej. *Google US English*).
*   **Conversación**: Elige un escenario práctico (Conversación Casual, En el Restaurante o Entrevista de Trabajo). Interactúa mediante tu micrófono dictando en voz alta o responde por escrito. Aura te responderá con audio dinámico y te mostrará correcciones y sugerencias gramaticales detalladas a la derecha. El hilo completo se guardará en tu base de datos SQLite.
*   **Pronunciación**: Escucha la frase modelo en inglés, pulsa el micrófono para leerla y la app evaluará con precisión qué palabras pronunciaste bien (verde) y cuáles debes mejorar (rojo), actualizando tu promedio.
*   **Vocabulario**: Memoriza Phrasal Verbs, modismos y palabras avanzadas usando las flashcards 3D. Marca las palabras como dominadas para que se registren en la base de datos y se sincronicen tus progresos.
*   **Cuestionarios (Quizzes)**: Selecciona una categoría (Idioms, Phrasal Verbs, Negocios, Viajes o Vocabulario Principal) y responde exámenes interactivos dinámicos de 10 preguntas. ¡Pulsa el botón de pista de ejemplo si necesitas ayuda en contexto y supera tu récord personal de respuestas correctas!
*   **Gramática (Libro Digital)**: Estudia los temas gramaticales indispensables (Tiempos verbales, Cuantificadores, Reglas esenciales y Condicionales/Voz pasiva) de manera paginada. Visualiza la estructura exacta del tema con fórmulas monospace, lee explicaciones claras y detalladas del idioma y escucha la pronunciación interactiva de las frases de ejemplo con explicaciones gramaticales de contexto incluidas. Sigue tu lectura de forma secuencial y marca cada tema como completado para registrar tu progreso en tiempo real en la base de datos.
