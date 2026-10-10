# Notas visuales (línea base)

Fecha: 2026-10-09. Plan: `PLAN_REDISENO_VISUAL_RADIO_RETRO.md` (solo visual).

## Archivos reales que se tocan

- `src/App.jsx` — hint de depuración (V1: solo en DEV).
- `src/components/dashboard/DashboardBackground.jsx` — hueco DIN (V1).
- `src/components/dashboard/DashboardVent.jsx` — reubicar a los lados/debajo (V1).
- `src/components/radio/RadioConsole.jsx` — grid 3 zonas + fila única (V3), serigrafía/AUX (V7).
- `src/components/radio/RadioDisplay.jsx` — LCD 2 líneas + ecualizador integrado (V5).
- `src/components/radio/FrequencyDial.jsx` — perilla protagonista con `--knob-angle` (V4).
- `src/components/radio/StationPresets.jsx` — teclas numeradas con etiqueta corta (V3/V6).
- `src/components/radio/RadioButtons.jsx` — transporte con SVG inline (V6).
- `src/components/radio/VolumeControl.jsx` — teclas verticales izqda (V3).
- `src/components/radio/Equalizer.jsx` — vive dentro de la pantalla (V5).
- `src/styles/tokens.css` — añadir tokens §2.1 sin borrar (V2).
- `src/styles/dashboard.css` — tablero + hueco DIN (V1).
- `src/styles/radio.css` — faceplate 3.3:1 + marco hundido (V2).
- `src/styles/controls.css` — teclas, LCD, perilla (V4/V5/V6).
- `src/styles/animations.css` — estados y `prefers-reduced-motion` (V8/V10).

## No se tocan

`src/app/radioReducer.js`, `src/hooks/useRadioPlayer.js`, `src/data/stations.js`
(salvo `shortLabel` opcional en V3), `src/lib/shuffle.js` y `tests/`.
Si el markup obliga a una prop mínima, se hace y se recorren las pruebas.

## Discrepancias con el plan

- No existe `RadioShell`: su rol lo cumple `RadioConsole`.
- No existe `useAudioElement`: el `<audio>` persistente lo gestiona `useRadioPlayer` (`audioRef`).
- Sin `referencia_radio.jpg` ni capturas base: no hay `docs/visual/baseline/` fotográfico;
  la comparación se hace contra la descripción §1/§3 del plan.
- Estado real: bienvenida + intros + cumpleaños + shuffle funcionando (más allá de "Fase 3").
- `data-station` actual: `old-school|boleros|rock-latino|pop-kpop|birthday`.

## Aplicación V2 (2026-10-09)

- Tokens §2 añadidos sin borrar (`neon-*`, `warm-gold`, `lcd-bg-top/bottom`).
- `DashboardBackground` con halo ambiental en crossfade por `opacity` + modo cálido.
- `RadioConsole`: grid 24/54/22, POWER+VOL+perilla a la izquierda, pantalla+teclas al centro,
  marca+dedicatoria+DIMMER+AUX a la derecha. Orden de tab = orden visual.
- `RadioDisplay`: frecuencia grande, ON AIR honesto, TRK, título, onda decorativa,
  VOL/MP3/ST/estado (`NOW PLAYING` solo con canción real, `PRESENTANDO ESTACIÓN` en intro).
- `Equalizer`: 20 barras (12 en compacto), 4 tonos, solo `transform`, quieto en silencio.
- `FrequencyDial`: clic + flechas + Home/End + arrastre horizontal, `--knob-angle` 180 ms.
- `StationPresets`: corazón solo en emisora especial, `aria-pressed` + borde luminoso.
- `data/personalization.js`: `dedication` y `welcomeLine` genéricos y editables.
- POWER ámbar respirando en standby; resto sobrio. `prefers-reduced-motion` cubre todo.
- No se tocó lógica (`radioReducer`, `useRadioPlayer`, `stations.js`, `shuffle.js`).
- Omitido a propósito (V9 opcional): analizador Web Audio sincronizado — se mantiene
  ecualizador decorativo para no arriesgar la reproducción. Sin dependencias nuevas.
