export function toUserAudioError(error, fallback = "NO SE PUDO REPRODUCIR") {
  if (!error) return fallback;
  const name = error?.name || "";
  if (name === "NotAllowedError") return "PULSA PARA REPRODUCIR";
  if (name === "NotSupportedError") return "AUDIO NO DISPONIBLE";
  return fallback;
}
