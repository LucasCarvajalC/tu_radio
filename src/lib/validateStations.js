// Valida el catálogo sin bloquear por emisoras vacías (sin audios aún).
// Error = rompe invariantes. Warning = emisora vacía o mejorable.

const ALLOWED_ACCENTS = ["blue", "amber", "cyan", "violet", "birthday"];
const ALLOWED_TYPES = ["music", "special"];

function isWebAudioPath(p) {
  if (typeof p !== "string" || p.length === 0) return false;
  if (!p.startsWith("/audio/")) return false;
  if (p.includes(":\\") || p.startsWith("/home/") || p.startsWith("C:")) return false;
  if (p.includes(" ")) return false;
  return true;
}

export function validateStations(stationList) {
  const errors = [];
  const warnings = [];

  if (!Array.isArray(stationList)) {
    return { errors: ["stations no es un arreglo"], warnings };
  }

  const ids = new Set();
  const trackIds = new Set();
  let musicCount = 0;
  let specialCount = 0;

  for (const s of stationList) {
    if (!s || typeof s !== "object") {
      errors.push("estación inválida (no es objeto)");
      continue;
    }
    if (!s.id) errors.push("estación sin id");
    else if (ids.has(s.id)) errors.push(`id duplicado: ${s.id}`);
    else ids.add(s.id);

    if (!ALLOWED_TYPES.includes(s.type)) {
      errors.push(`${s.id || "?"}: type desconocido ${s.type}`);
      continue;
    }
    if (!s.name) errors.push(`${s.id}: sin name`);
    if (!s.frequency) errors.push(`${s.id}: sin frequency`);
    if (!s.shortLabel) warnings.push(`${s.id}: sin shortLabel`);
    if (!ALLOWED_ACCENTS.includes(s.accent)) {
      errors.push(`${s.id}: accent fuera de paleta (${s.accent})`);
    }

    if (s.type === "music") {
      musicCount += 1;
      if (!isWebAudioPath(s.introSrc)) {
        errors.push(`${s.id}: introSrc inválido (${s.introSrc})`);
      }
      if (!Array.isArray(s.tracks)) {
        errors.push(`${s.id}: tracks no es arreglo`);
        continue;
      }
      if (s.tracks.length === 0) {
        warnings.push(`${s.id}: sin canciones (muestra estado vacío)`);
      }
      for (const t of s.tracks) {
        if (!t.id || !t.title || !t.src) {
          errors.push(`${s.id}: pista sin id/title/src`);
          continue;
        }
        if (trackIds.has(t.id)) errors.push(`track id duplicado: ${t.id}`);
        else trackIds.add(t.id);
        if (!isWebAudioPath(t.src)) {
          errors.push(`${s.id}/${t.id}: src inválido (${t.src})`);
        }
      }
    } else {
      specialCount += 1;
      if (!isWebAudioPath(s.messageSrc)) {
        errors.push(`${s.id}: messageSrc inválido (${s.messageSrc})`);
      }
      if (Array.isArray(s.tracks) && s.tracks.length > 0) {
        errors.push(`${s.id}: especial no debe tener tracks`);
      }
      if (s.introSrc) {
        warnings.push(`${s.id}: especial ignora introSrc`);
      }
    }
  }

  if (musicCount !== 4) warnings.push(`se esperan 4 musicales, hay ${musicCount}`);
  if (specialCount !== 1) warnings.push(`se espera 1 especial, hay ${specialCount}`);

  return { errors, warnings };
}
