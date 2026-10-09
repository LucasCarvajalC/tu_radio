# Plan de rediseño visual — Radio Retro como autoestéreo de frontal extraíble

> **Complementa a:** `DEVELOPMENT_PLAN_RADIO_RETRO.md` (sigue siendo la fuente de verdad funcional).
> **Alcance:** solo presentación (markup de layout, CSS, detalles decorativos). **No** se toca la lógica de audio, el reducer, el catálogo ni las reglas de bienvenida/cumpleaños.
> **Referencias:** `referencia_radio.jpg` (objetivo) y `Captura_desde_2026-10-09_13-24-44.png` (estado actual).
> **Estado actual:** Fase 3 del plan original (bienvenida bloqueante, volumen activo en welcome).

---

## 0. Reglas para el agente

1. **Cambio solo visual.** Hooks (`useRadioPlayer`, `useAudioElement`), `radioReducer`, `stations.js`, `shuffle.js` y sus pruebas no se modifican. Si un cambio de markup obliga a tocar una prop, hacerlo con el cambio mínimo y volver a correr las pruebas.
2. **Conservar todo comportamiento existente:** perilla (arrastre + flechas), bloqueo de emisoras durante la bienvenida, volumen activo en welcome, `data-station`, etiquetas accesibles, foco visible, `prefers-reduced-motion`.
3. **Sin fondo blanco, en ningún punto.** La referencia está sobre blanco porque es una foto de catálogo. En el proyecto la radio vive sobre el tablero oscuro. Ninguna superficie, sombra o borde puede ser blanco o gris claro plano.
4. **Original, no copia.** Imitar la *forma y el lenguaje* del equipo, no su marca. No usar "SONY", ni su logotipo, ni su tipografía de marca. Usar la marca ficticia ya existente (`TU RADIO`).
5. **Nada de botones falsos.** Todo elemento decorativo (puerto AUX, rejillas, serigrafías) lleva `aria-hidden="true"`, no recibe foco, no tiene `cursor: pointer` ni hover.
6. **Sin dependencias nuevas** ni imágenes externas. Todo con CSS (gradientes, sombras, pseudo-elementos) y, como máximo, SVG inline. Fuente opcional solo si es autoalojada y de licencia libre.
7. **Validar cada fase:** `lint`, pruebas y `build`, más captura de pantalla comparada con las dos referencias. Una fase no se cierra solo porque compile.
8. Antes de empezar, hacer una captura base del estado actual (escritorio 1440 px y móvil 390 px) en `docs/visual/baseline/`.

---

## 1. Análisis de diferencias (actual vs. referencia)

| Aspecto | Hoy | Objetivo (referencia) |
|---|---|---|
| Proporción | Tarjeta casi 16:7, alta y apilada en filas | Faceplate **apaisado y bajo**, ≈ 3.3 : 1 (tipo DIN 1) |
| Perilla | Grande, a la **derecha**, con aro violeta fino | A la **izquierda**, con aros concéntricos: metal cepillado, anillo azul luminoso, tapa central |
| Pantalla | Rectángulo grande en la parte superior-izquierda, mucho espacio vacío | Pantalla **horizontal** centrada, con bisel hundido y tipografía de matriz de puntos |
| Botones | Cuatro filas (emisoras, power/transport, volumen) con look "web" | **Una sola fila** de teclas pequeñas bajo la pantalla + columna de botones a la izquierda de la perilla |
| Carcasa | Tarjeta redondeada gris con borde fino | **Bisel negro brillante** con laterales biselados, marco interior hundido, reflejo superior |
| Detalles | Textos sueltos `TU RADIO` / `FM STEREO` / `RETRO SOUND` / `MP3` | Serigrafía integrada: `MP3` sobre la pantalla, marca arriba a la derecha, puerto AUX/USB decorativo |
| Fondo | Negro plano con dos cajitas arriba | Tablero oscuro con hueco (ranura DIN) donde "encaja" el equipo |
| Pie de página | Texto de depuración: «Fase 3 — bienvenida bloqueante…» | Eliminado en producción |

---

## 2. Dirección visual

**Concepto:** un frontal extraíble de principios de los 2000, negro piano, con iluminación azul fría en perilla y teclas. La **perilla con anillo luminoso** es el elemento memorable; todo lo demás es sobrio y quieto. No añadir efectos que compitan con ella.

**Color de iluminación:** la referencia es azul. Se mantiene el sistema de acentos por emisora del plan original (`--station-accent`), pero con **azul como acento por defecto** en standby, bienvenida y estados sin emisora. En el resto de emisoras, el anillo de la perilla, el texto de la pantalla y la retroiluminación de teclas toman el acento de la emisora.

### 2.1 Tokens nuevos (añadir a `styles/tokens.css`, sin borrar los existentes)

```css
:root {
  /* Bisel / plástico */
  --bezel-black: #07080b;
  --bezel-gloss-top: #2b303a;      /* reflejo superior */
  --bezel-gloss-mid: #11141a;
  --bezel-gloss-bot: #050608;
  --bezel-chamfer: #1b1f27;        /* laterales biselados */
  --inset-panel: #0b0d12;          /* marco interior hundido */

  /* Metal de la perilla */
  --metal-light: #8a93a1;
  --metal-mid: #4a515c;
  --metal-dark: #20242b;

  /* Iluminación (por defecto azul) */
  --station-accent: #2fa8ff;
  --station-glow: rgb(47 168 255 / 35%);
  --key-backlight: var(--station-accent);

  /* Pantalla */
  --lcd-bg: #030a14;
  --lcd-text: #cfe9ff;
  --lcd-text-dim: rgb(207 233 255 / 38%);

  /* Medidas del equipo */
  --faceplate-ratio: 3.3 / 1;
  --faceplate-max-width: 1040px;
  --faceplate-radius: 14px;
}
```

Los acentos por emisora (`[data-station="…"]`) deben seguir redefiniendo `--station-accent` y `--station-glow`. Nada de colores hexadecimales sueltos fuera de los tokens.

### 2.2 Tipografía

- **Pantalla:** familia monoespaciada del sistema con aspecto digital (`ui-monospace, "SF Mono", "Cascadia Mono", Consolas, monospace`), `letter-spacing: .08em`, `font-variant-numeric: tabular-nums`. Opcional: fuente de segmentos/matriz de puntos **autoalojada** (p. ej. una con licencia OFL) con la monoespaciada como respaldo.
- **Serigrafía de carcasa y teclas:** sans condensada del sistema, tamaño pequeño, color `--text-secondary` a baja opacidad (parece pintura sobre plástico, no UI).
- Frecuencia grande en pantalla; el resto de textos de pantalla en un solo tamaño pequeño. Máximo tres niveles tipográficos en total.

---

## 3. Composición objetivo (escritorio ≥ 960 px)

```text
┌──────────────────────────── DASHBOARD (oscuro, textura sutil) ────────────────────────────┐
│    ┌──────────────────────── hueco DIN (sombra interior) ───────────────────────────┐     │
│    │ ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾ FACEPLATE (bisel negro brillante) ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲ │     │
│    │ │  [PWR]            MP3 · FM STEREO                              TU RADIO     │ │     │
│    │ │  [VOL−]  ◉◉◉   ┌───────────── PANTALLA ─────────────┐                      │ │     │
│    │ │  [VOL+] ◉ ● ◉  │ 107.5 FM          ▁▃▅▇▅▃▁   MP3 ST │     ┌──────┐         │ │     │
│    │ │          ◉◉◉   │ Pop K-Pop · NO HAY CANCIONES...    │     │ AUX  │         │ │     │
│    │ │   (perilla)    └────────────────────────────────────┘     └──────┘         │ │     │
│    │ │                 [1][2][3][4][5]  [◂◂][▶❙❙][▸▸]   (fila única de teclas)     │ │     │
│    │ ╲_____________________________________________________________________________╱ │     │
│    └─────────────────────────────────────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

**Rejilla interna del faceplate** (`display: grid`):

| Zona | Ancho | Contenido |
|---|---|---|
| Izquierda | ~24 % | Columna de botones (`POWER`, `VOL−`, `VOL+`) + **perilla** |
| Centro | ~54 % | Serigrafía superior (`MP3`/`FM STEREO`), **pantalla**, fila de teclas |
| Derecha | ~22 % | Marca ficticia (arriba) y puerto AUX decorativo |

El volumen sigue siendo `VOL−` / `VOL+` (decisión del plan original: la perilla sintoniza, no controla volumen). Se muestran como **teclas verticales pequeñas** a la izquierda de la perilla, con el valor `VOL 70` dentro de la pantalla en lugar de entre botones.

---

## 4. Fases de implementación

Cada fase termina con captura de pantalla y verificación de sus criterios.

### Fase V0 — Inspección y línea base
- Localizar los componentes reales: `RadioConsole`, `RadioShell`, `RadioDisplay`, `FrequencyDial`, `RadioButtons`, `StationPresets`, `VolumeControl`, `Equalizer`, `DashboardBackground`, `DashboardVent` y hojas en `styles/`. Adaptarse a los nombres reales si difieren de los del plan.
- Capturar baseline (1440 px y 390 px) en estados: standby, bienvenida, lista, reproduciendo, error.
- **Criterio:** documento corto `docs/visual/NOTAS.md` con los archivos que se tocarán.

### Fase V1 — Tablero y hueco DIN (adiós al aspecto de "tarjeta flotante")
- Fondo del dashboard: negro azulado con textura sutil (gradiente + patrón fino en CSS). Sin blancos.
- Crear un **hueco** donde encaja el equipo: contenedor con `box-shadow: inset` profundo, borde oscuro y marco ligeramente más claro que el fondo.
- Reubicar `DashboardVent`: las dos cajitas actuales salen de encima de la radio; pasan a rejillas discretas **a los lados o debajo** del hueco, a baja opacidad. Si estorban, eliminarlas.
- Eliminar el texto de depuración «Fase 3 — …» del DOM de producción (dejarlo solo bajo `import.meta.env.DEV`, o quitarlo).
- **Criterio:** la radio parece empotrada en un tablero; ningún píxel blanco.

### Fase V2 — Carcasa (faceplate)
- `RadioShell` pasa a ser un **faceplate apaisado**: `aspect-ratio: var(--faceplate-ratio)`, `width: min(100%, var(--faceplate-max-width))`.
- Bisel negro brillante: `linear-gradient` vertical (`--bezel-gloss-top` → `--bezel-gloss-mid` → `--bezel-gloss-bot`), reflejo superior con un pseudo-elemento de 1 px + degradado suave.
- **Laterales biselados:** esquinas con radio asimétrico o `clip-path` ligero para sugerir el chaflán de la referencia; borde con `linear-gradient` en `--bezel-chamfer`.
- **Marco interior hundido** (`--inset-panel`) que aloja pantalla y teclas, con sombra interior.
- **Criterio:** la silueta a escala reducida se reconoce como autoestéreo; proporción ≈ 3.3:1.

### Fase V3 — Reorganización del layout (sin lógica)
- Reestructurar el markup en las tres zonas de la sección 3 usando CSS Grid.
- Convertir las cuatro filas actuales en: **columna izquierda** (`POWER`, `VOL−`, `VOL+`), **fila única de teclas** bajo la pantalla (5 emisoras + `PREV`, `PLAY/PAUSE`, `NEXT`).
- Las teclas de emisora muestran **número** y una **etiqueta corta**. Añadir `shortLabel` opcional al catálogo (por ejemplo `OLD`, `ROM`, `ROCK`, `K-POP`, `MSG`); si no existe, usar el nombre actual truncado con `text-overflow`. El `aria-label` conserva el nombre completo. **No renombrar emisoras ni frecuencias.**
- Eliminar los textos sueltos `TU RADIO`, `FM STEREO`, `RETRO SOUND`, `MP3` de sus posiciones actuales y reubicarlos como serigrafía (V7).
- **Criterio:** una sola fila de teclas, sin scroll interno, todo funcional como antes.

### Fase V4 — Perilla (el elemento protagonista)
Ubicarla a la izquierda del cuerpo. Capas, de fuera hacia dentro:
1. **Aro exterior metálico:** `conic-gradient` con `--metal-light/mid/dark` para efecto cepillado.
2. **Anillo luminoso:** borde interior con `--station-accent`, `box-shadow` doble (nítido + difuso) usando `--station-glow`.
3. **Cuerpo de la perilla:** `radial-gradient` oscuro con relieve.
4. **Moleteado opcional:** `repeating-conic-gradient` muy sutil en el canto.
5. **Tapa central** con pequeño reflejo y un **punto indicador** que rota con la posición.

Reglas:
- La posición se expresa con una variable CSS (`--knob-angle`) y `transform: rotate()`; transición corta (≈ 180 ms); sin transición con `prefers-reduced-motion`.
- Se mantiene el arrastre, el teclado (flechas) y su etiqueta accesible. El foco visible usa `--focus-ring` en un aro externo, sin confundirse con el anillo luminoso.
- En **standby** el anillo está casi apagado (opacidad baja); se enciende en la transición de encendido.
- En **bienvenida** la perilla está visible pero bloqueada (anillo atenuado, `aria-disabled`).
- **Criterio:** se distinguen a simple vista aro metálico, anillo luminoso y tapa; el anillo sigue el color de la emisora activa.

### Fase V5 — Pantalla LCD
- Marco hundido con bisel doble (borde oscuro + luz tenue en el borde inferior), reflejo diagonal muy suave encima (`::after`, `pointer-events: none`).
- Fondo `--lcd-bg`, texto `--lcd-text`, valores atenuados `--lcd-text-dim`. Sin neones saturados: la referencia es un azul-blanco frío.
- Contenido en dos líneas principales:
  - Línea 1: frecuencia grande + ecualizador a la derecha.
  - Línea 2: estado/nombre de emisora/canción (con truncado o desplazamiento suave; nombre completo accesible).
- Indicadores pequeños fijos en la esquina: `MP3`, `ST`, `VOL 70`, `PLAY/PAUSE/WELCOME/ERROR`. Encendidos o atenuados según el estado real.
- El mensaje «NO HAY CANCIONES EN ESTA FRECUENCIA» debe caber sin invadir otros elementos (una línea con elipsis o dos líneas controladas).
- Ecualizador integrado en la pantalla (ya no es una tira suelta debajo); se detiene cuando no hay audio sonando, como exige el plan original.
- **Criterio:** todo el texto legible a 960 px y a 390 px; sin saltos de layout al cambiar de estado.

### Fase V6 — Teclas y botones
- Teclas pequeñas, rectangulares de esquinas suaves, plástico oscuro mate con borde superior más claro, y **etiqueta serigrafiada** (no estilo "botón web").
- Retroiluminación: borde o icono con `--key-backlight`; **intensidad según estado**:
  - apagada (standby): casi sin luz,
  - disponible: luz tenue,
  - activa (emisora seleccionada): luz fuerte con `--station-glow`,
  - deshabilitada (durante bienvenida): apagada y `disabled`.
- Estado pulsado: `transform: translateY(1px)` y sombra interior; foco visible con `--focus-ring`.
- `POWER` conserva el pulso ámbar lento en standby (ya definido en el plan original). Debe seguir siendo el único elemento que "respira".
- Iconos `PREV`/`PLAY`/`NEXT` con SVG inline, no emojis.
- **Criterio:** se entiende de un vistazo qué teclas están activas, cuál es la emisora seleccionada y qué está bloqueado.

### Fase V7 — Serigrafía y detalles decorativos
- Arriba al centro: `MP3 · FM STEREO` en pequeño, como la serigrafía «MP3 WMA AAC» de la referencia.
- Arriba a la derecha: marca ficticia `TU RADIO` (una sola vez), en tipografía sobria.
- Derecha: **puerto AUX/USB decorativo** (rectángulo con ranura, tapa abatible dibujada con CSS). `aria-hidden`, sin interacción.
- Una o dos costuras/tornillos mínimos como máximo. Si algo no aporta, se quita.
- **Criterio:** la carcasa se siente completa sin parecer recargada; nada de elementos con aspecto clicable que no lo sean.

### Fase V8 — Estados visuales completos
Verificar y ajustar para cada estado del plan original:

| Estado | Faceplate | Perilla | Pantalla | Teclas |
|---|---|---|---|---|
| `off` | Muy oscuro, reflejos tenues | Anillo casi apagado | Apagada | Solo `POWER` pulsando en ámbar |
| encendido / bienvenida | Se ilumina en 700–1400 ms | Anillo encendido, bloqueada | `WELCOME`, volumen visible | Emisoras y transporte deshabilitados; `VOL±` activos |
| `ready` | Normal | Activa | Emisora seleccionada | Emisoras activas |
| `station-intro` / `playing` | Acento de la emisora | Anillo en acento | Estado real + ecualizador | Emisora actual resaltada |
| `paused` | Igual | Igual | `PAUSE`, ecualizador quieto | `PLAY` resaltado |
| `birthday-message` | Acento rojo suave/dorado | Acento especial | Mensaje especial | Solo lo permitido |
| `error` | Sin cambios de forma | Anillo en rojo tenue | Mensaje claro y acción de reintento | Reintentar visible |

- Las transiciones de color entre emisoras usan variables CSS y `transition` corta; **no cambia la forma** de la radio, solo la iluminación.
- **Criterio:** capturas de todos los estados incluidas en `docs/visual/after/`.

### Fase V9 — Responsive
- **≥ 960 px:** layout completo de la sección 3.
- **600–959 px:** el faceplate se escala (`width: 100%`), se mantiene la proporción y se reduce el tamaño de serigrafía; la marca ficticia se oculta si no cabe.
- **< 600 px:** el faceplate deja de ser una tira y se reorganiza (sigue pareciendo el mismo equipo):
  1. Pantalla a todo el ancho arriba.
  2. Perilla a la izquierda y columna `POWER`/`VOL±` a la derecha.
  3. Fila de teclas debajo en **dos filas** (emisoras / transporte) con objetivos táctiles ≥ 44 px.
  4. Puerto AUX y serigrafía secundaria ocultos.
- Nada depende de `hover`. Sin scroll horizontal. Prioridad en pantalla pequeña: estado, canción, emisora/frecuencia.
- **Criterio:** probado en 390, 768, 1024 y 1440 px.

### Fase V10 — Accesibilidad, movimiento y rendimiento
- Contraste suficiente de texto sobre pantalla y teclas (≥ 4.5:1 para texto relevante).
- `prefers-reduced-motion`: sin pulso, sin barrido de luz, sin transición de la perilla; iluminación fija.
- Animar solo `opacity` y `transform`. No animar `filter` ni grandes desenfoques de forma continua; los resplandores son `box-shadow` estáticos que cambian por clase/estado.
- El orden de tabulación sigue el orden visual: `POWER` → `VOL−` → `VOL+` → perilla → emisoras → transporte.
- Texto accesible completo aunque el visual esté truncado.
- **Criterio:** navegación completa por teclado, sin elementos decorativos en el orden de foco.

### Fase V11 — Verificación final
1. `lint`, pruebas y `build` sin errores ni regresiones.
2. Comparación lado a lado con `referencia_radio.jpg`: silueta, perilla, distribución pantalla/teclas.
3. Checklist de la sección 5 marcado.
4. Actualizar `README.md` con una captura final y la nota de decisiones de diseño.

---

## 5. Lista de aceptación visual

- [ ] El faceplate es apaisado (~3.3:1) y parece un autoestéreo, no una tarjeta web.
- [ ] Perilla a la izquierda con aro metálico, anillo luminoso y tapa con indicador.
- [ ] Pantalla central con ecualizador integrado y estados legibles.
- [ ] Una sola fila de teclas bajo la pantalla; columna `POWER`/`VOL±` junto a la perilla.
- [ ] Serigrafía y marca ficticia integradas; sin textos sueltos.
- [ ] Puerto AUX decorativo, inerte y `aria-hidden`.
- [ ] Sin blanco ni gris claro plano en ninguna parte; la radio encaja en un hueco del tablero oscuro.
- [ ] Texto de depuración «Fase 3 …» eliminado de producción.
- [ ] Todos los estados del plan original se ven correctos y se mantienen sincronizados con el estado real.
- [ ] La iluminación cambia con la emisora sin cambiar la forma.
- [ ] Móvil y escritorio correctos; objetivos táctiles ≥ 44 px en móvil.
- [ ] Funcionalidad intacta: bienvenida bloqueante, volumen activo en welcome, perilla con arrastre y teclado.
- [ ] Lint, pruebas y build pasan.

---

## 6. Qué NO hacer

- No usar la foto de referencia (ni recortes de ella) como imagen de fondo ni como textura.
- No copiar el logotipo ni el nombre de la marca de la referencia.
- No añadir botones que no hagan nada.
- No animar todo a la vez ni usar parpadeos rápidos.
- No cambiar nombres, frecuencias ni orden de emisoras.
- No tocar la lógica de reproducción para "arreglar" un problema visual.
- No introducir librerías de UI ni de animación.

---

## 7. Entrega esperada

1. Cambios agrupados por fase (un commit por fase, mensajes claros).
2. Capturas `before/` y `after/` en `docs/visual/`.
3. Resumen final con: archivos modificados, decisiones de diseño, qué se dejó fuera y por qué, y cualquier discrepancia entre este plan y el repositorio real.
