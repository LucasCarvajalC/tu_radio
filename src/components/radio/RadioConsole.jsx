import RadioDisplay from "./RadioDisplay.jsx";
import FrequencyDial from "./FrequencyDial.jsx";
import RadioButtons from "./RadioButtons.jsx";
import VolumeControl from "./VolumeControl.jsx";
import StationPresets from "./StationPresets.jsx";
import AudioErrorMessage from "../overlays/AudioErrorMessage.jsx";
import { stations } from "../../data/stations.js";

function lookupSelected(state) {
  return stations.find((s) => s.id === state.selectedStationId) || null;
}

function lookupTrack(station, trackId) {
  if (!station || !Array.isArray(station.tracks)) return null;
  return station.tracks.find((t) => t.id === trackId) || null;
}

function statusFor(player) {
  const { state } = player;
  if (state.powerState === "off") {
    return { freq: "--.- FM", name: "STANDBY", track: "Pulsa POWER para encender", status: "OFF" };
  }
  if (state.introStatus === "playing") {
    if (state.playbackStatus === "loading") return { freq: "--.- FM", name: "WELCOME", track: "CARGANDO...", status: "LOADING" };
    return { freq: "--.- FM", name: "WELCOME", track: "SPECIAL BROADCAST", status: "WELCOME" };
  }
  if (state.introStatus === "error") {
    return { freq: "--.- FM", name: "WELCOME", track: state.errorMessage || "ERROR", status: "ERROR" };
  }
  // intro completada -> listo / estación
  const station = lookupSelected(state);
  if (!station) {
    return { freq: "--.- FM", name: "READY", track: "Elige una emisora", status: "READY" };
  }
  if (station.type === "special") {
    if (state.playbackStatus === "loading") return { freq: station.frequency, name: station.name, track: "CARGANDO MENSAJE...", status: "LOADING" };
    if (state.playbackStatus === "playing") return { freq: station.frequency, name: station.name, track: "SPECIAL MESSAGE", status: "BIRTHDAY" };
    if (state.playbackStatus === "paused") return { freq: station.frequency, name: station.name, track: "MENSAJE EN PAUSA", status: "PAUSE" };
    if (state.playbackStatus === "error") return { freq: station.frequency, name: station.name, track: state.errorMessage, status: "ERROR" };
    if (state.activeKind === "birthday-finished") return { freq: station.frequency, name: station.name, track: "END OF MESSAGE", status: "END" };
    return { freq: station.frequency, name: station.name, track: "SPECIAL MESSAGE", status: "READY" };
  }
  if (state.activeKind === "station-intro") {
    if (state.playbackStatus === "error") return { freq: station.frequency, name: station.name, track: state.errorMessage, status: "ERROR" };
    if (state.playbackStatus === "loading") return { freq: station.frequency, name: station.name, track: "CARGANDO PRESENTACIÓN...", status: "LOADING" };
    return { freq: station.frequency, name: station.name, track: "PRESENTACIÓN DE LA ESTACIÓN", status: "INTRO" };
  }
  if (state.activeKind === "track") {
    const track = lookupTrack(station, state.currentTrackId);
    const label = track ? `${track.title}${track.artist ? ` — ${track.artist}` : ""}` : "Cargando canción...";
    if (state.playbackStatus === "loading") return { freq: station.frequency, name: station.name, track: "CARGANDO...", status: "LOADING" };
    if (state.playbackStatus === "paused") return { freq: station.frequency, name: station.name, track: label, status: "PAUSE" };
    if (state.playbackStatus === "ended") {
      const empty = station.tracks.length === 0;
      return { freq: station.frequency, name: station.name, track: empty ? "NO HAY CANCIONES EN ESTA FRECUENCIA" : "FIN DE PISTA (NEXT en Fase 6)", status: "END" };
    }
    if (state.playbackStatus === "error") return { freq: station.frequency, name: station.name, track: state.errorMessage, status: "ERROR" };
    return { freq: station.frequency, name: station.name, track: label, status: "PLAY" };
  }
  if (state.playbackStatus === "ended" && station.tracks.length === 0) {
    return { freq: station.frequency, name: station.name, track: "NO HAY CANCIONES EN ESTA FRECUENCIA", status: "END" };
  }
  if (state.playbackStatus === "ended") {
    return { freq: station.frequency, name: station.name, track: "Cargando siguiente...", status: "LOADING" };
  }
  return { freq: station.frequency, name: station.name, track: "Elige una emisora", status: "READY" };
}

export default function RadioConsole({ player }) {
  const { state } = player;
  const isOff = state.powerState === "off";
  const welcomeLock = state.powerState === "on" && state.introStatus !== "completed";
  const stationsEnabled = !isOff && !welcomeLock;
  const info = statusFor(player);
  const volValue = Math.round(state.volume * 100);
  const selected = lookupSelected(state);
  const dataStation = selected ? selected.id : "old-school";
  const isPlaying = state.playbackStatus === "playing";
  const canPlayPause = !isOff && (state.activeKind === "track" || state.activeKind === "station-intro" || state.activeKind === "global-intro" || state.activeKind === "birthday-message" || state.activeKind === "birthday-finished") && (isPlaying || state.playbackStatus === "paused" || state.activeKind === "birthday-finished");
  const canNext = !isOff && state.activeKind === "track" && !!selected && selected.type === "music" && selected.tracks.length > 0 && (isPlaying || state.playbackStatus === "paused" || state.playbackStatus === "ended");
  const showReplay = !isOff && selected?.type === "special" && state.activeKind === "birthday-finished";

  const lockedReason = isOff
    ? "Radio apagada — pulsa POWER"
    : welcomeLock
      ? "Bloqueado durante la bienvenida"
      : "Elige emisora";

  const showRetry =
    state.powerState === "on" &&
    state.playbackStatus === "error" &&
    (state.activeKind === "global-intro" || state.activeKind === "station-intro" || state.activeKind === "track" || state.activeKind === "birthday-message");

  return (
    <section
      className={isOff ? "radio-console radio-console--off" : "radio-console"}
      data-station={dataStation}
      aria-label={isOff ? "Radio apagada en standby" : "Radio encendida"}
    >
      <div className="faceplate-inset faceplate-grid">
        {/* Zona izquierda: potencia, volumen y perilla */}
        <div className="fp-left">
          <button
            type="button"
            className={isOff ? "btn key power-key power-button--standby" : "btn key power-key"}
            aria-label={isOff ? "Encender radio" : "Apagar radio"}
            aria-pressed={!isOff}
            onClick={player.togglePower}
          >
            POWER
          </button>
          <VolumeControl
            disabled={isOff}
            value={volValue}
            column
            onDown={() => player.setVolume(state.volume - 0.1)}
            onUp={() => player.setVolume(state.volume + 0.1)}
          />
          <FrequencyDial
            disabled={!stationsEnabled}
            locked={welcomeLock}
            stations={stations}
            selectedId={state.selectedStationId}
            onSelect={player.selectStation}
          />
        </div>

        {/* Zona centro: serigrafía, pantalla y fila única de teclas */}
        <div className="fp-center">
          <div className="fp-silk" aria-hidden="true">
            <span>MP3 · FM STEREO</span>
          </div>
          <RadioDisplay
            frequency={info.freq}
            stationName={info.name}
            trackText={info.track}
            status={info.status}
            volume={volValue}
            eqActive={isPlaying}
          />
          {showRetry && (
            <AudioErrorMessage
              message={state.errorMessage}
              onRetry={
                state.activeKind === "global-intro"
                  ? player.retryIntro
                  : selected
                    ? () => player.selectStation(selected.id)
                    : player.retryIntro
              }
            />
          )}
          {player.devSkipEnabled && welcomeLock && (
            <div className="lcd__status">
              <span>DEV_SKIP_INTRO activo (solo desarrollo)</span>
              <button type="button" className="btn key" onClick={player.devSkipIntro}>
                Saltar intro
              </button>
            </div>
          )}
          {showReplay && (
            <div className="lcd__status">
              <span>Mensaje terminado — pulsa para repetir</span>
              <button type="button" className="btn key" onClick={player.replayBirthday}>
                REPLAY
              </button>
            </div>
          )}
          <div className="fp-keys">
            <StationPresets
              stations={stations}
              disabled={!stationsEnabled}
              reason={lockedReason}
              selectedId={state.selectedStationId}
              onSelect={player.selectStation}
            />
            <RadioButtons
              disabledReason={lockedReason}
              powerState={state.powerState}
              onTogglePower={player.togglePower}
              playbackStatus={state.playbackStatus}
              canPlayPause={canPlayPause}
              onTogglePlayPause={player.togglePlayPause}
              canNext={canNext}
              onNext={player.nextTrack}
              hidePower
            />
          </div>
        </div>

        {/* Zona derecha: marca y AUX decorativo */}
        <div className="fp-right">
          <div className="fp-brand" aria-hidden="true">TU RADIO</div>
          <div className="aux-port" aria-hidden="true">
            <span className="aux-port__slot" />
            <span className="aux-port__label">AUX</span>
          </div>
        </div>
      </div>
    </section>
  );
}
