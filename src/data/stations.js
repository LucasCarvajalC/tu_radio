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
    tracks: [
      { id: "old-school-001", title: "Pa' Que La Pases Bien", artist: "Arcángel", src: "/audio/stations/old-school/songs/song-001.mp3" },
      { id: "old-school-002", title: "Baila Morena", artist: "Hector y Tito ft. Don Omar, Glory", src: "/audio/stations/old-school/songs/song-002.mp3" },
      { id: "old-school-003", title: "Lo Que Pasó, Pasó", artist: "Daddy Yankee", src: "/audio/stations/old-school/songs/song-003.mp3" },
      { id: "old-school-004", title: "Danza Kuduro (Remix)", artist: "Don Omar ft. Daddy Yankee y Arcangel", src: "/audio/stations/old-school/songs/song-004.mp3" },
      { id: "old-school-005", title: "Virtual Diva", artist: "Don Omar", src: "/audio/stations/old-school/songs/song-005.mp3" },
      { id: "old-school-006", title: "Dile", artist: "Don Omar", src: "/audio/stations/old-school/songs/song-006.mp3" },
      { id: "old-school-007", title: "RX", artist: "Don Omar, Kendo Kapponi", src: "/audio/stations/old-school/songs/song-007.mp3" },
      { id: "old-school-008", title: "Mayor Que Yo", artist: "Wisin & Yandel ft. Daddy Yankee, Baby Ranks y Tony Tun Tun", src: "/audio/stations/old-school/songs/song-008.mp3" },
      { id: "old-school-009", title: "Rakata", artist: "Wisin y Yandel", src: "/audio/stations/old-school/songs/song-009.mp3" },
    ],
  },
  {
    id: "boleros",
    frequency: "94.7 FM",
    name: "Boleros",
    shortLabel: "ROMANTIC",
    accent: "amber",
    type: "music",
    introSrc: "/audio/stations/boleros/station-intro.mp3",
    tracks: [
      { id: "boleros-001", title: "No Me Platiques Más", artist: "Luis Miguel", src: "/audio/stations/boleros/songs/song-001.mp3" },
      { id: "boleros-002", title: "Nosotros", artist: "Luis Miguel", src: "/audio/stations/boleros/songs/song-002.mp3" },
      { id: "boleros-003", title: "Usted", artist: "Luis Miguel", src: "/audio/stations/boleros/songs/song-003.mp3" },
      { id: "boleros-004", title: "El Día Que Me Quieras", artist: "Luis Miguel", src: "/audio/stations/boleros/songs/song-004.mp3" },
      { id: "boleros-005", title: "La Incondicional", artist: "Luis Miguel", src: "/audio/stations/boleros/songs/song-005.mp3" },
      { id: "boleros-006", title: "No Sé Tú", artist: "Luis Miguel", src: "/audio/stations/boleros/songs/song-006.mp3" },
      { id: "boleros-007", title: "Por Debajo De La Mesa", artist: "Luis Miguel", src: "/audio/stations/boleros/songs/song-007.mp3" },
      { id: "boleros-008", title: "Si Nos Dejan", artist: "Luis Miguel", src: "/audio/stations/boleros/songs/song-008.mp3" },
    ],
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
      { id: "rock-latino-011", title: "Experiencia Religiosa", artist: "Enrique Iglesias", src: "/audio/stations/rock-latino/songs/song-011.mp3" },
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
    tracks: [
      { id: "pop-kpop-001", title: "Boy With Luv", artist: "BTS", src: "/audio/stations/pop-kpop/songs/song-001.mp3" },
      { id: "pop-kpop-002", title: "Euphoria", artist: "BTS", src: "/audio/stations/pop-kpop/songs/song-002.mp3" },
      { id: "pop-kpop-003", title: "Just One Day", artist: "BTS", src: "/audio/stations/pop-kpop/songs/song-003.mp3" },
      { id: "pop-kpop-004", title: "Butter", artist: "BTS", src: "/audio/stations/pop-kpop/songs/song-004.mp3" },
      { id: "pop-kpop-005", title: "Dynamite", artist: "BTS", src: "/audio/stations/pop-kpop/songs/song-005.mp3" },
      { id: "pop-kpop-006", title: "Love Maze", artist: "BTS", src: "/audio/stations/pop-kpop/songs/song-006.mp3" },
      { id: "pop-kpop-007", title: "Serendipity", artist: "BTS", src: "/audio/stations/pop-kpop/songs/song-007.mp3" },
      { id: "pop-kpop-008", title: "DNA", artist: "BTS", src: "/audio/stations/pop-kpop/songs/song-008.mp3" },
      { id: "pop-kpop-009", title: "Heartbeat", artist: "BTS", src: "/audio/stations/pop-kpop/songs/song-009.mp3" },
      { id: "pop-kpop-010", title: "Tomorrow", artist: "BTS", src: "/audio/stations/pop-kpop/songs/song-010.mp3" },
      { id: "pop-kpop-011", title: "For Youth", artist: "BTS", src: "/audio/stations/pop-kpop/songs/song-011.mp3" },
    ],
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
