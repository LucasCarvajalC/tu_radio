// Catálogo de estaciones. Fuente única para IDs, rutas y temas.
// Las rutas son relativas al servidor web (public/ -> /).
// Sin audios reales aún: tracks vacíos, introSrc declarado.
//
// Para añadir una canción, edita SOLO este archivo:
//   tracks: [{ id: "old-school-001", title: "Nombre", artist: "Artista",
//              src: "/audio/stations/old-school/songs/song-001.mp3" }]
// Y copia el mp3 a public/audio/stations/old-school/songs/song-001.mp3.
// introSrc NUNCA entra en la bolsa aleatoria.

export const GLOBAL_INTRO_SRC = "/audio/global/welcome-radio.mp3";
export const BIRTHDAY_MESSAGE_SRC = "/audio/birthday/birthday-message.mp3";

export const stations = [
  {
    id: "old-school",
    frequency: "88.1 FM",
    name: "Radio Old School",
    shortLabel: "OLD SCHOOL",
    accent: "blue",
    type: "music",
    introSrc: "/audio/stations/old-school/station-intro.mp3",
    tracks: [],
  },
  {
    id: "boleros",
    frequency: "94.7 FM",
    name: "Boleros",
    shortLabel: "ROMANTIC",
    accent: "amber",
    type: "music",
    introSrc: "/audio/stations/boleros/station-intro.mp3",
    tracks: [],
  },
  {
    id: "rock-latino",
    frequency: "101.3 FM",
    name: "Rock Latino",
    shortLabel: "LATIN ROCK",
    accent: "cyan",
    type: "music",
    introSrc: "/audio/stations/rock-latino/station-intro.mp3",
    tracks: [
      { id: "rock-latino-001", title: "Bailar Contigo", artist: "Carlos Vives", src: "/audio/stations/rock-latino/songs/song-001.mp3" },
      { id: "rock-latino-002", title: "Cumbiana", artist: "Carlos Vives", src: "/audio/stations/rock-latino/songs/song-002.mp3" },
      { id: "rock-latino-003", title: "Cuando te veo", artist: "ChocQuibTown", src: "/audio/stations/rock-latino/songs/song-003.mp3" },
      { id: "rock-latino-004", title: "Ella es mi Fiesta", artist: "Carlos Vives", src: "/audio/stations/rock-latino/songs/song-004.mp3" },
      { id: "rock-latino-005", title: "Hips Don't Lie", artist: "Shakira", src: "/audio/stations/rock-latino/songs/song-005.mp3" },
      { id: "rock-latino-006", title: "Ojos Así", artist: "Shakira", src: "/audio/stations/rock-latino/songs/song-006.mp3" },
      { id: "rock-latino-007", title: "Si Te Vas", artist: "Shakira", src: "/audio/stations/rock-latino/songs/song-007.mp3" },
      { id: "rock-latino-008", title: "De Música Ligera", artist: "Soda Stereo", src: "/audio/stations/rock-latino/songs/song-008.mp3" },
      { id: "rock-latino-009", title: "Trátame Suavemente", artist: "Soda Stereo", src: "/audio/stations/rock-latino/songs/song-009.mp3" },
      { id: "rock-latino-010", title: "Te Mando Flores", src: "/audio/stations/rock-latino/songs/song-010.mp3" },
    ],
  },
  {
    id: "pop-kpop",
    frequency: "107.5 FM",
    name: "Pop K-Pop",
    shortLabel: "K-POP / MIX",
    accent: "violet",
    type: "music",
    introSrc: "/audio/stations/pop-kpop/station-intro.mp3",
    tracks: [],
  },
  {
    id: "birthday",
    frequency: "FREQ 05",
    name: "Birthday Special",
    shortLabel: "SPECIAL MESSAGE",
    accent: "birthday",
    type: "special",
    messageSrc: BIRTHDAY_MESSAGE_SRC,
  },
];
