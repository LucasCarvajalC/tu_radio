# Plan de rediseño visual v2 — Radio Retro (neón nocturno + toque romántico)

> **Reemplaza a:** `PLAN_REDISENO_VISUAL_RADIO_RETRO.md` (v1). Este documento es autosuficiente.
> **Complementa a:** `DEVELOPMENT_PLAN_RADIO_RETRO.md`, que sigue siendo la fuente de verdad **funcional**.
> **Referencias:** `referencia_radio.jpg` (silueta y distribución del equipo) y la captura actual (Fase 3: bienvenida bloqueante, volumen activo en welcome).
> **Alcance:** presentación, animaciones y detalles decorativos. **No** se modifica la lógica de audio, el reducer, el catálogo ni las reglas de bienvenida/cumpleaños, salvo lo indicado expresamente en la Fase V9 (analizador opcional).

---

## 0. Reglas para el agente

1. **Cambio visual, no funcional.** `useRadioPlayer`, `useAudioElement`, `radioReducer`, `stations.js`, `shuffle.js` y sus pruebas no se tocan. Si un cambio de markup obliga a pasar una prop nueva, hacer el cambio mínimo y volver a correr las pruebas.
2. **Conservar el comportamiento:** perilla (arrastre + flechas), emisoras bloqueadas durante la bienvenida, volumen activo en welcome, `data-station`, etiquetas accesibles, foco visible y `prefers-reduced-motion`.
3. **Sin fondo blanco, nunca.** La referencia está sobre blanco por ser foto de catálogo. Aquí la radio vive en un tablero oscuro.
4. **Original, no copia.** Imitar forma y lenguaje del equipo, no su marca: nada de «SONY», logotipos ni tipografías de marca. Usar la marca ficticia ya existente (`TU RADIO`).
5. **Nada de botones falsos.** Todo elemento decorativo (puerto AUX, tornillos, rejillas, corazón de ambientación) lleva `aria-hidden="true"`, no recibe foco y no parece clicable.
6. **Honestidad de la interfaz.** Los indicadores (`PLAY`, `ON AIR`, ecualizador) reflejan el estado **real** del reproductor. Si el ecualizador es decorativo, no se presenta como análisis preciso del audio, y se detiene cuando no suena nada.
7. **Una sola cosa memorable.** El protagonista es la **perilla con anillo luminoso** junto con la **iluminación que cambia por emisora**. El resto se mantiene sobrio. Si un detalle no aporta, se elimina.
8. **Sin dependencias nuevas** ni imágenes externas. CSS, SVG inline y React. Fuente decorativa solo si es autoalojada y de licencia libre.
9. **Rendimiento:** animar `opacity` y `transform`. Evitar animar `filter` o desenfoques grandes de forma continua. Los resplandores son capas con `opacity` o `box-shadow` estáticos.
10. **Validar cada fase:** `lint`, pruebas, `build` y captura comparada con las referencias. Una fase no se cierra solo porque compila.
11. Antes de empezar, guardar capturas base (1440 px y 390 px) en `docs/visual/before/`.

---

## 1. Dirección de estilo

Se combinan dos de las direcciones propuestas:

- **A · Retro futurista neón** (uso normal): negro metálico, azul eléctrico, magenta y naranja; pantalla potente; luz ambiental; ecualizador dinámico; teclas retroiluminadas.
- **C · Edición romántica nocturna** (momentos especiales): luces violeta y rosa, reflejos suaves y transiciones especiales cuando suena la voz de bienvenida y en la estación especial/cumpleaños.

**Principio de reparto:** la radio se ve impactante y tecnológica durante el uso normal; lo romántico aparece **en momentos concretos y sorprende**. No llenar la interfaz de corazones ni de colores rosados permanentes.

**Composición que se conserva:** perilla a la izquierda, pantalla al centro, controles junto a la perilla, emisoras debajo de la pantalla. Se mejoran las proporciones: pantalla algo más grande, ecualizador con más presencia, botones con más contraste y marco con más profundidad.

### 1.1 Diferencias con el estado actual

| Aspecto | Hoy | Objetivo |
|---|---|---|
| Forma | Tarjeta alta con filas apiladas | Faceplate apaisado (≈ 3.3 : 1), tipo autoestéreo |
| Perilla | Grande, a la derecha, aro violeta fino | A la izquierda, aros concéntricos: metal, anillo luminoso, tapa con indicador |
| Pantalla | Mucho espacio vacío | Composición rica: frecuencia, emisora, título, ecualizador, `ON AIR`, pista, volumen |
| Botones | Uniformes, aspecto "web" | Teclas con serigrafía, retroiluminadas, con estados claros |
| Entorno | Negro plano | Hueco en el tablero + luz ambiental que sale del equipo |
| Pie de página | Texto de depuración «Fase 3 …» | Eliminado en producción |

---

## 2. Tokens de diseño

Añadir a `styles/tokens.css` sin borrar los existentes. Nada de hexadecimales sueltos fuera de los tokens.

```css
:root {
  /* Tablero y carcasa */
  --dashboard-bg: #06080c;
  --bezel-gloss-top: #2b303a;
  --bezel-gloss-mid: #11141a;
  --bezel-gloss-bot: #050608;
  --bezel-chamfer: #1b1f27;
  --inset-panel: #0b0d12;

  /* Aluminio cepillado (panel central y perilla) */
  --metal-light: #8a93a1;
  --metal-mid: #4a515c;
  --metal-dark: #20242b;

  /* Pantalla */
  --lcd-bg-top: #06142a;
  --lcd-bg-bottom: #020812;
  --lcd-text: #cfe9ff;
  --lcd-text-dim: rgb(207 233 255 / 38%);

  /* Paleta de iluminación */
  --neon-blue: #2fa8ff;
  --neon-cyan: #46f3ff;
  --neon-violet: #bd5cff;
  --neon-magenta: #ff4ecb;
  --neon-orange: #ff9d2e;
  --warm-gold: #ffc766;

  /* Acento activo (cambia por emisora) */
  --station-accent: var(--neon-blue);
  --station-glow: rgb(47 168 255 / 35%);
  --key-backlight: var(--station-accent);

  /* Medidas */
  --faceplate-ratio: 3.3 / 1;
  --faceplate-max-width: 1040px;
  --faceplate-radius: 14px;
}
```

### 2.1 Colores dinámicos por emisora

El color de la emisora activa ilumina **la pantalla, el anillo de la perilla, el borde de la tecla seleccionada, el halo ambiental y algunos reflejos del marco**. **El metal permanece oscuro y la forma no cambia.**

| Emisora (nombre actual del catálogo) | Acento | Notas |
|---|---|---|
| Old School | Azul eléctrico + naranja | Energía de equipo de sonido de los 2000 |
| Romantic | Ámbar/dorado cálido + toque rosa | Calidez, sin saturar |
| Latin Rock | Cian/azul | Limpio y enérgico |
| K-Pop / Mix | Violeta/magenta | Pop, color, brillo |
| Special Message | Rojo suave + dorado | Ocasión especial, ver sección 6 |

Usar atributos `data-station` y variables CSS (`--station-accent`, `--station-glow`). **No renombrar emisoras ni frecuencias**; los nombres vienen del catálogo existente.

---

## 3. Composición objetivo (escritorio ≥ 960 px)

```text
        ░░░░ halo ambiental (azul/violeta/magenta según emisora) ░░░░
┌──────────────────────── TABLERO oscuro con textura casi imperceptible ───────────────────────┐
│   ┌───────────────────── hueco DIN (sombra interior profunda) ─────────────────────────┐    │
│   │ ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾ FACEPLATE (bisel negro, laterales biselados) ‾‾‾‾‾‾‾‾‾‾‾╲  │    │
│   │ │ [PWR]          MP3 · FM STEREO                         TU RADIO                │  │    │
│   │ │ [VOL−] ◉◉◉   ┌──────────────── PANTALLA ────────────────┐   dedicatoria        │  │    │
│   │ │ [VOL+]◉ ● ◉  │ ON AIR  94.7 FM      ▂▅▇▆▃▅▇▄▂  TRK 03   │   (discreta)        │  │    │
│   │ │        ◉◉◉   │ ROMANTIC · título desplazable   VOL 70   │      ┌──────┐       │  │    │
│   │ │   perilla    └──────────────────────────────────────────┘      │ AUX  │       │  │    │
│   │ │             [1][2][3][4][5]   [◂◂][▶❙❙][▸▸]                     └──────┘       │  │    │
│   │ ╲_________________________________________________________________________________╱  │    │
│   └────────────────────────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

**Rejilla interna del faceplate** (`display: grid`):

| Zona | Ancho | Contenido |
|---|---|---|
| Izquierda | ~24 % | Columna `POWER`, `VOL−`, `VOL+` + **perilla** |
| Centro | ~54 % | Serigrafía superior, **pantalla**, fila de teclas |
| Derecha | ~22 % | Marca ficticia, dedicatoria discreta, puerto AUX decorativo |

El volumen se mantiene en `VOL−` / `VOL+` (decisión del plan original: la perilla sintoniza). El valor `VOL 70` se muestra dentro de la pantalla.

---

## 4. Fases de implementación

### Fase V0 — Inspección y línea base
- Localizar los componentes reales (`RadioConsole`, `RadioShell`, `RadioDisplay`, `FrequencyDial`, `RadioButtons`, `StationPresets`, `VolumeControl`, `Equalizer`, `DashboardBackground`, `DashboardVent` y hojas de `styles/`). Adaptarse a los nombres reales.
- Capturas base en estados: standby, bienvenida, lista, reproduciendo, error.
- **Criterio:** `docs/visual/NOTAS.md` con los archivos que se tocarán.

### Fase V1 — Tablero, hueco DIN y luz ambiental
- Fondo del dashboard: negro azulado con **textura casi imperceptible** (gradiente + patrón fino en CSS) para quitarle lo plano. Sin blancos.
- Hueco donde encaja el equipo: borde oscuro, sombra interior profunda, marco ligeramente más claro que el fondo.
- Reubicar `DashboardVent` a los lados o debajo del hueco, a baja opacidad; si estorba, eliminarlo.
- **Halo ambiental:** capa detrás del faceplate con degradado radial en `--station-glow` (y toques violeta/magenta). Reflejos ambientales suaves sobre el tablero.
  - `off`: iluminación mínima.
  - Encendido: halo alrededor de pantalla y controles.
  - Cambio de emisora: transición de color de **1–2 s** haciendo *crossfade* de dos capas por `opacity` (no animar `filter`).
- Eliminar el pie «Fase 3 — …» de producción (solo visible con `import.meta.env.DEV`, o quitarlo).
- **Criterio:** la radio parece empotrada en un tablero real y ilumina su entorno; ningún píxel blanco.

### Fase V2 — Carcasa (faceplate) y materiales
- `RadioShell`: `aspect-ratio: var(--faceplate-ratio)`, `width: min(100%, var(--faceplate-max-width))`.
- Bisel negro brillante con degradado vertical y reflejo superior de 1 px + degradado suave.
- Laterales biselados (radio asimétrico o `clip-path` ligero) y borde con `--bezel-chamfer`.
- Marco interior hundido (`--inset-panel`) para pantalla y teclas.
- **Panel central de aluminio cepillado** en la zona de la perilla (y marco fino de la pantalla), con `repeating-linear-gradient` muy sutil.
- Detalles mecánicos mínimos: 2–4 tornillos o juntas, pequeños relieves, sombras profundas alrededor de la perilla. Detalles inferiores que parezcan controles reales y no elementos flotando.
- **Criterio:** la silueta a escala reducida se reconoce como autoestéreo; se percibe profundidad sin recargar.

### Fase V3 — Reorganización del layout (sin lógica)
- Reestructurar el markup en las tres zonas de la sección 3 con CSS Grid.
- Columna izquierda (`POWER`, `VOL−`, `VOL+`); **una sola fila de teclas** bajo la pantalla (5 emisoras + `PREV`, `PLAY/PAUSE`, `NEXT`).
- Teclas de emisora con **número** y etiqueta corta. Añadir `shortLabel` opcional al catálogo (p. ej. `OLD`, `ROM`, `ROCK`, `K-POP`, `MSG`); si falta, truncar el nombre actual. El `aria-label` conserva el nombre completo.
- Reubicar los textos sueltos (`TU RADIO`, `FM STEREO`, `RETRO SOUND`, `MP3`) como serigrafía (V8).
- **Criterio:** una fila de teclas, sin scroll interno, todo funcional como antes.

### Fase V4 — Perilla (elemento protagonista)
Capas de fuera hacia dentro:
1. **Aro exterior metálico:** `conic-gradient` con `--metal-*` (efecto cepillado).
2. **Anillo luminoso** en `--station-accent`, con doble `box-shadow` (nítido + difuso) en `--station-glow`.
3. **Cuerpo** con `radial-gradient` oscuro y relieve.
4. **Moleteado** sutil con `repeating-conic-gradient` (opcional).
5. **Tapa central** con reflejo y **punto indicador** que rota.

Reglas:
- Posición con `--knob-angle` y `transform: rotate()`; transición ≈ 180 ms; sin transición con `prefers-reduced-motion`.
- Se mantienen arrastre, teclado (flechas) y etiqueta accesible. Foco visible con `--focus-ring` en un aro externo distinto del anillo luminoso.
- Standby: anillo casi apagado. Bienvenida: visible pero bloqueada (`aria-disabled`, anillo atenuado). Listo: activa.
- **Criterio:** se distinguen aro, anillo luminoso y tapa; el anillo sigue el color de la emisora.

### Fase V5 — Pantalla con personalidad
Aprovechar el espacio vacío con una composición más rica:
- **Frecuencia grande y luminosa** (p. ej. `94.7 FM`) y **nombre de la estación** con tipografía retro.
- **Título de la canción** con desplazamiento suave si no cabe (truncado + nombre completo accesible).
- **Indicador `ON AIR`**: pulso lento de opacidad (≈ 2 s). Nunca parpadeo rápido. Se enciende solo cuando hay voz de presentación o música realmente sonando.
- Número de pista (`TRK 03`) cuando se conozca, estado de reproducción y pequeño indicador `VOL 70`.
- Indicadores `MP3` / `ST` atenuados o encendidos según el estado.
- Fondo con degradado azul oscuro (`--lcd-bg-top` → `--lcd-bg-bottom`) y **reflejo de cristal** suave (`::after`, `pointer-events: none`).
- Una **onda de audio discreta** detrás del título (SVG con baja opacidad; decorativa).
- **Etiquetas de estado de reproducción:**
  - Durante la presentación de una estación: `PRESENTANDO ESTACIÓN`.
  - Cuando empieza una canción real: `NOW PLAYING`, se activa el ecualizador y se actualiza el título.
  - Mensaje de cumpleaños: presentación visual especial (sección 6).
  - Pausa: `PAUSE`; error: mensaje claro con acción de reintento; lista vacía: «NO HAY CANCIONES EN ESTA FRECUENCIA» sin invadir otros elementos.
- **Criterio:** legible a 960 px y a 390 px; sin saltos de layout al cambiar de estado; nunca se muestra «NOW PLAYING» durante la bienvenida o con el audio fallido.

### Fase V6 — Ecualizador espectacular
- Convertir la tira pequeña en un **analizador de espectro** con barras de alturas distintas, integrado en la pantalla.
- Colores: naranja, cian, violeta y rosa (degradado por barra o por grupo), con el acento de la emisora como tono dominante.
- Implementación base **decorativa y honesta**: barras animadas con `transform: scaleY()` y retrasos distintos; **se detienen** cuando no suena nada (pausa, error, standby, lista).
- Número moderado de barras (≈ 16–24) para rendimiento.
- Con `prefers-reduced-motion`: barras estáticas a una altura intermedia cuando haya reproducción.
- La versión sincronizada con el audio real es **opcional** (Fase V9).
- **Criterio:** el ecualizador se ve vivo y llamativo sin distraer del resto, y nunca anima en silencio.

### Fase V7 — Teclas y botones físicos
- Teclas pequeñas de plástico oscuro mate, borde superior más claro, **serigrafía** definida (no estilo botón web). Iconos `PREV`/`PLAY`/`NEXT` con SVG inline.
- **Diferenciar visualmente** controles de reproducción y de configuración (forma, tamaño o posición).
- **Retroiluminación por estado:**
  - apagada (standby): casi sin luz;
  - disponible: brillo interior muy tenue;
  - **activa (emisora seleccionada): borde luminoso fuerte** con `--station-glow`;
  - deshabilitada (bienvenida): apagada y `disabled`.
- La emisora activa destaca claramente; **no todos los botones brillan con la misma intensidad**.
- Efecto de pulsación física: `transform: translateY(1px)` + sombra interior; foco visible con `--focus-ring`.
- `POWER` conserva el pulso ámbar lento en standby y es el único elemento que "respira" en ese estado.
- **Criterio:** se entiende de un vistazo qué está activo, qué emisora suena y qué está bloqueado.

### Fase V8 — Serigrafía, detalles decorativos y toque romántico
Serigrafía y detalles:
- Arriba al centro: `MP3 · FM STEREO` pequeño. Arriba a la derecha: `TU RADIO` (una sola vez).
- Puerto AUX/USB decorativo (`aria-hidden`, inerte).

Toque romántico **discreto** (configurable, no hardcodeado en componentes):
- Crear `data/personalization.js` con textos editables: `dedication` (dedicatoria bajo el nombre de la radio) y `welcomeLine` (por defecto: «Hecho especialmente para ti»). **No inventar nombres propios**; dejar valores genéricos y comentados para que el dueño los cambie.
- **Dedicatoria:** línea pequeña y sobria bajo `TU RADIO`, en tono apagado.
- **Mensaje de bienvenida:** mostrar `welcomeLine` en la pantalla mientras suena la voz de bienvenida.
- **Corazón luminoso** pequeño solo en la tecla/estación especial (SVG, estático o con pulso lento; decorativo).
- Evitar corazones en cualquier otro lugar.
- **Criterio:** lo romántico se nota en momentos clave y no convierte la radio en una app infantil.

### Fase V9 — Animación de encendido y analizador sincronizado (opcional)

**Animación de encendido** (700–1400 ms, **sin retrasar el audio**; la voz de bienvenida empieza en cuanto el navegador lo permita y la animación va en paralelo):
1. La pantalla parte en negro.
2. Aparecen segmentos digitales.
3. Se ilumina la frecuencia.
4. Se encienden los botones de forma secuencial.
5. Anillo de la perilla se enciende.
6. Comienza la bienvenida de voz, con la luz cálida de la sección 6.

La duración de la animación no determina cuándo termina la bienvenida; eso sigue dependiendo del evento `ended`.

**Analizador sincronizado (opcional, solo si no pone en riesgo la reproducción):**
- Usar Web Audio (`AudioContext` + `AnalyserNode`) sobre el elemento de audio existente. Los audios son del mismo origen, por lo que no hay problema de CORS.
- Crear el `MediaElementSource` **una sola vez**, reanudar el contexto tras el gesto del usuario y mantener el volumen controlado por el elemento actual.
- Si falla (navegador, contexto suspendido, error), **volver al modo decorativo** sin afectar el audio.
- Dibujar con `requestAnimationFrame` solo mientras hay reproducción y la pestaña está visible; sin retrasar `ended` ni los eventos del reproductor.
- Tras añadirlo, correr todas las pruebas de audio del plan original. Si hay cualquier regresión, **no entregar esta parte**.
- **Criterio:** la reproducción es idéntica con y sin analizador.

### Fase V10 — Estados visuales completos

| Estado | Faceplate / ambiente | Perilla | Pantalla | Teclas |
|---|---|---|---|---|
| `off` | Muy oscuro, halo mínimo | Anillo casi apagado | Apagada | Solo `POWER` respirando en ámbar |
| Bienvenida | Se ilumina; luz cálida especial | Encendida, bloqueada | `welcomeLine`, `WELCOME`, volumen | Emisoras y transporte deshabilitados; `VOL±` activos |
| `ready` | Halo en acento actual | Activa | Emisora seleccionada, `ON AIR` apagado | Emisoras disponibles |
| `station-intro` | Acento de la emisora | Anillo en acento | `PRESENTANDO ESTACIÓN`, `ON AIR` | Emisora actual resaltada |
| `playing` | Acento + reflejos | Anillo en acento | `NOW PLAYING`, título, ecualizador | Emisora actual resaltada |
| `paused` | Igual | Igual | `PAUSE`, ecualizador quieto | `PLAY` resaltado |
| `birthday-message` | Luces cálidas especiales | Acento especial | Presentación especial | Solo lo permitido |
| `error` | Sin cambios de forma | Anillo rojo tenue | Mensaje claro + reintentar | Reintentar visible |

- Las transiciones de color entre emisoras usan variables y *crossfade*; **no cambia la forma** de la radio.
- **Criterio:** capturas de todos los estados en `docs/visual/after/`.

### Fase V11 — Responsive
- **≥ 960 px:** layout completo.
- **600–959 px:** el faceplate se escala manteniendo proporción; se reduce la serigrafía; se oculta la marca/dedicatoria si no caben.
- **< 600 px:** el equipo se reorganiza sin perder identidad:
  1. Pantalla a todo el ancho arriba.
  2. Perilla a la izquierda y columna `POWER`/`VOL±` a la derecha.
  3. Teclas en dos filas (emisoras / transporte), objetivos táctiles ≥ 44 px.
  4. Puerto AUX y serigrafía secundaria ocultos.
- Halo ambiental reducido en móvil (menos capas) para cuidar rendimiento.
- Nada depende de `hover`; sin scroll horizontal. Prioridad en pantalla pequeña: estado, canción, emisora/frecuencia.
- **Criterio:** probado en 390, 768, 1024 y 1440 px.

### Fase V12 — Accesibilidad, movimiento y rendimiento
- Contraste ≥ 4.5:1 para texto relevante sobre pantalla y teclas.
- `prefers-reduced-motion`: sin pulso de `POWER`, `ON AIR` fijo, sin barrido de luz ni transición de perilla, ecualizador estático, crossfade instantáneo.
- Sin parpadeos rápidos ni estrobos en ningún efecto (incluidas las luces cálidas del cumpleaños).
- Orden de tabulación = orden visual: `POWER` → `VOL−` → `VOL+` → perilla → emisoras → transporte. Decorativos fuera del orden de foco.
- Texto accesible completo aunque el visual esté truncado; los cambios de estado relevantes se anuncian con la región `aria-live` existente (sin duplicar anuncios).
- Revisar rendimiento en móvil (perfil de rendering): sin tirones con halo y ecualizador activos.

### Fase V13 — Verificación final
1. `lint`, pruebas y `build` sin errores ni regresiones.
2. Comparación lado a lado con `referencia_radio.jpg` (silueta, perilla, pantalla/teclas) y con la captura base.
3. Checklist de la sección 5 marcado.
4. Actualizar `README.md` con captura final y decisiones de diseño.

---

## 5. Lista de aceptación visual

- [ ] Faceplate apaisado (~3.3:1) que se lee como autoestéreo, empotrado en un hueco del tablero oscuro.
- [ ] Halo ambiental que cambia de color por emisora con transición de 1–2 s.
- [ ] Perilla a la izquierda con aro metálico, anillo luminoso y tapa con indicador.
- [ ] Pantalla rica: frecuencia grande, estación, título desplazable, `ON AIR`, pista, estado y volumen.
- [ ] Etiquetas correctas: `PRESENTANDO ESTACIÓN` durante la presentación y `NOW PLAYING` solo con canción real.
- [ ] Ecualizador vistoso (naranja, cian, violeta, rosa), integrado y quieto cuando no hay audio.
- [ ] Teclas con retroiluminación diferenciada; la emisora activa destaca claramente.
- [ ] Aluminio cepillado y detalles mecánicos sutiles; textura casi imperceptible en el fondo.
- [ ] Toque romántico: dedicatoria discreta, `welcomeLine`, corazón solo en la estación especial, luces cálidas en bienvenida/cumpleaños.
- [ ] Sin blanco ni gris claro plano; sin texto de depuración «Fase 3 …».
- [ ] Todos los estados del plan original se muestran de forma fiel al estado real.
- [ ] Móvil y escritorio correctos; objetivos táctiles ≥ 44 px en móvil.
- [ ] Funcionalidad intacta: bienvenida bloqueante, volumen activo en welcome, perilla con arrastre y teclado, flujo de presentación y cumpleaños.
- [ ] `prefers-reduced-motion` respetado; sin parpadeos rápidos.
- [ ] Lint, pruebas y build pasan.

---

## 6. Momentos especiales (estilo C)

- **Bienvenida de voz:** al encender, mientras suena la voz, aparece `welcomeLine` y el halo adopta una luz cálida (dorado/rosa suave) que luego **vuelve al acento de la emisora** al terminar la bienvenida.
- **Estación especial / cumpleaños:** acento rojo suave + dorado, corazón luminoso en su tecla y animación de **luces cálidas** (capas de `opacity` con ciclos lentos de varios segundos). Al terminar el mensaje, la pantalla muestra el estado final correcto (`END OF MESSAGE` o equivalente) y las luces regresan a un nivel tranquilo; no se inicia música (regla funcional del plan original).
- Estos efectos son **breves y poco frecuentes**; el resto del tiempo la interfaz es la de la dirección A.

---

## 7. Qué NO hacer

- No usar la foto de referencia (ni recortes) como imagen de fondo o textura.
- No copiar logotipos ni nombres de marca de la referencia.
- No añadir botones que no hagan nada.
- No animar todo a la vez ni usar parpadeos rápidos.
- No renombrar emisoras, frecuencias ni su orden.
- No tocar la lógica de reproducción para resolver un problema visual.
- No presentar el ecualizador decorativo como medición real del audio.
- No introducir librerías de UI ni de animación.
- No llenar la interfaz de corazones ni de rosa permanente.

---

## 8. Entrega esperada

1. Cambios agrupados por fase (un commit por fase, mensajes claros).
2. Capturas `before/` y `after/` en `docs/visual/`.
3. Resumen final: archivos modificados, decisiones de diseño, qué se dejó fuera (p. ej. si el analizador sincronizado se omitió) y cualquier discrepancia entre este plan y el repositorio real.
