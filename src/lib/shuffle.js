// Fisher-Yates puro: no muta el original. random inyectable para tests.
export function shuffleArray(items, random = Math.random) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Bolsa por emisora: baraja IDs, consume en orden, nuevo ciclo al agotar.
// Evita que la primera del nuevo ciclo sea la última del anterior (si >1).
export function createStationQueue(trackIds, random = Math.random) {
  return {
    shuffledTrackIds: shuffleArray(trackIds, random),
    nextIndex: 0,
    lastPlayedTrackId: null,
    cycleNumber: 1,
  };
}

export function nextFromQueue(queue, allTrackIds, random = Math.random) {
  if (!allTrackIds || allTrackIds.length === 0) return { queue, trackId: null };
  if (allTrackIds.length === 1) {
    const only = allTrackIds[0];
    const q = {
      shuffledTrackIds: [only],
      nextIndex: 0,
      lastPlayedTrackId: only,
      cycleNumber: queue?.cycleNumber || 1,
    };
    return { queue: q, trackId: only };
  }

  let q = queue;
  const valid =
    q &&
    Array.isArray(q.shuffledTrackIds) &&
    q.shuffledTrackIds.length === allTrackIds.length &&
    allTrackIds.every((id) => q.shuffledTrackIds.includes(id));

  if (!valid || q.nextIndex >= q.shuffledTrackIds.length) {
    const prevLast = q?.lastPlayedTrackId || null;
    const prevCycle = q?.cycleNumber || 0;
    let shuffled = shuffleArray(allTrackIds, random);
    // Evitar repetición inmediata entre ciclos.
    if (prevLast && shuffled[0] === prevLast) {
      const swapIdx = 1 + Math.floor(random() * (shuffled.length - 1));
      [shuffled[0], shuffled[swapIdx]] = [shuffled[swapIdx], shuffled[0]];
    }
    q = {
      shuffledTrackIds: shuffled,
      nextIndex: 0,
      lastPlayedTrackId: prevLast,
      cycleNumber: prevCycle + 1,
    };
  }

  const trackId = q.shuffledTrackIds[q.nextIndex];
  const updated = {
    ...q,
    shuffledTrackIds: [...q.shuffledTrackIds],
    nextIndex: q.nextIndex + 1,
    lastPlayedTrackId: trackId,
  };
  return { queue: updated, trackId };
}
