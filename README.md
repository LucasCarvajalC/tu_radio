# Tu Radio Retro

Radio web personal con estética de autoestéreo 2000. Flujo: **apagada → POWER → bienvenida global → ready → selección → intro de estación → música aleatoria sin repetición**. Quinta emisora de cumpleaños aislada (solo mensaje, sin shuffle).

Stack: React 19 + Vite + JavaScript + CSS. Sin backend. Un único `<audio>` persistente.

## Requisitos

- Node.js 22+, npm.

## Instalar y correr

```bash
npm install
npm run dev      # desarrollo (http://localhost:5173)
npm run build    # build producción a dist/
npm run preview  # previsualizar build
npm test         # tests node:test (shuffle, catálogo, reducer)
npm run lint     # oxlint
```

Sin audios la app arranca igual: muestra `AUDIO NO DISPONIBLE` + `INTENTAR DE NUEVO`, nunca salta intros en silencio. Para probar UI sin mp3:

```bash
VITE_SKIP_INTRO=true npm run dev
```

Muestra aviso `DEV_SKIP_INTRO activo`. Nunca usar en producción.

## Dónde poner los audios

`public/` se sirve desde `/`. Estructura obligatoria:

```
public/audio/
  global/welcome-radio.mp3
  stations/old-school/station-intro.mp3
  stations/old-school/songs/song-001.mp3
  stations/boleros/station-intro.mp3
  stations/boleros/songs/...
  stations/rock-latino/station-intro.mp3
  stations/rock-latino/songs/...
  stations/pop-kpop/station-intro.mp3
  stations/pop-kpop/songs/...
  birthday/birthday-message.mp3
```

Rutas declaradas en `src/data/stations.js` (`GLOBAL_INTRO_SRC`, `introSrc`, `tracks[].src`, `messageSrc`). Deben empezar por `/audio/`. No usar `C:\...` ni `/home/...`.

## Cómo añadir una canción

Edita **solo** `src/data/stations.js`:

```js
tracks: [
  { id: "old-school-001", title: "Nombre", artist: "Artista",
    src: "/audio/stations/old-school/songs/song-001.mp3" },
]
```

1. `id` estable y único (no usar el título como id).
2. Copia el mp3 a la ruta exacta de `src`.
3. `introSrc` nunca va en `tracks`.

Si la emisora queda vacía, muestra `NO HAY CANCIONES EN ESTA FRECUENCIA` sin romper la app. Valida con `npm test`.

## Cómo cambiar frecuencias y colores

- Frecuencia/nombre: `frequency`, `name`, `shortLabel` en `src/data/stations.js`.
- Color: `accent` (`blue|amber|cyan|violet|birthday`) + variables en `src/styles/tokens.css` y selector `.radio-console[data-station="<id>"]` en `src/styles/radio.css`. No cambiar la forma, solo el ambiente luminoso.

## Arquitectura breve

- `src/app/radioReducer.js`: máquina `powerState/introStatus/selectedStationId/activeKind/playbackStatus/volume`. Pura, sin DOM.
- `src/hooks/useRadioPlayer.js`: motor único, token anti-carreras, listeners `ended/error`, volumen, `selectStation/play/pause/nextTrack/replayBirthday`.
- `src/lib/shuffle.js`: Fisher-Yates + bolsa por emisora (sin repetición hasta agotar ciclo).
- `src/lib/validateStations.js`: IDs, rutas web, tipos, paleta.
- `src/components/radio/`: consola, LCD, perilla (clic + flechas), presets, botones, volumen, ecualizador.
- Cumpleaños: `activeKind birthday-message/finished`, no entra al shuffle, `REPLAY` reinicia.

## Pruebas

`npm test` cubre shuffle (copia, permutación, ciclos, 0/1 pista), catálogo (duplicados, rutas, especial sin tracks) y reducer (bienvenida bloqueante, pausa no completa, cumpleaños aislado, volumen clamp, power-off). La validación con mp3 reales queda pendiente hasta que el dueño aporte los archivos (ver plan §21.5).

## Diseño (rediseño visual)

Frontal extraíble estilo autoestéreo 2000: faceplate apaisado negro piano
sobre hueco DIN del tablero, perilla a la izquierda con aro metálico y
anillo luminoso del color de la emisora, pantalla LCD central con
ecualizador integrado, fila única de teclas numeradas + transporte y
puerto AUX decorativo (inerte, `aria-hidden`). Marca ficticia `TU RADIO`,
sin marcas reales. Detalles en `PLAN_REDISENO_VISUAL_RADIO_RETRO.md` y
`docs/visual/NOTAS.md`. La verificación visual es manual con
`npm run dev` (escritorio y 390 px); no hay capturas automatizadas.

## Despliegue (pausado)

Sin desplegar por ahora a petición del dueño. Cuando se retome: `npm run build`, servir `dist/`, revisar peso total de `public/audio` (límites del host, no precargar todo, `preload="metadata"`).

## Derechos

Tener un mp3 no autoriza a distribuirlo. Si se publica, verificar derechos de cada canción. Mantener la prueba en acceso controlado.
