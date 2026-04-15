function randomIntInclusive(min, max, randomFn = Math.random) {
  return Math.floor(randomFn() * (max - min + 1)) + min;
}

function pickRandomItem(items, randomFn = Math.random) {
  if (!items.length) return null;
  const index = Math.floor(randomFn() * items.length);
  return items[index];
}

function createAudio(source) {
  if (!source) return null;
  const audio = new Audio(source);
  audio.preload = "auto";
  return audio;
}

// Dedicated coin-only audio controller so coin sound work stays isolated.
export function createCoinAudioController({
  coinPickupSrc = "",
  bonusVoiceLineSrcs = [],
  minFunnyCoinGap = 7,
  maxFunnyCoinGap = 10,
  randomFn = Math.random,
} = {}) {
  const coinPickupAudio = createAudio(coinPickupSrc);
  let voiceLineAudios = bonusVoiceLineSrcs.map(createAudio).filter(Boolean);
  let coinsSinceVoiceLine = 0;
  let nextVoiceLineAt = randomIntInclusive(minFunnyCoinGap, maxFunnyCoinGap, randomFn);
  let isVoiceLinePlaying = false;

  function playAudio(audio) {
    if (!audio) return;

    audio.currentTime = 0;
    audio.play().catch(() => {
      // Ignore autoplay-related failures until the player interacts.
    });
  }

  function playCoinPickup() {
    playAudio(coinPickupAudio);
  }

  function playRandomVoiceLine() {
    const voiceLine = pickRandomItem(voiceLineAudios, randomFn);
    if (!voiceLine) return false;

    isVoiceLinePlaying = true;
    voiceLine.onended = () => {
      isVoiceLinePlaying = false;
    };
    voiceLine.onerror = () => {
      isVoiceLinePlaying = false;
    };

    playAudio(voiceLine);
    return true;
  }

  function registerCoinCollected() {
    if (isVoiceLinePlaying) return;

    coinsSinceVoiceLine++;

    if (coinsSinceVoiceLine < nextVoiceLineAt) {
      playCoinPickup();
      return;
    }

    const playedVoiceLine = playRandomVoiceLine();
    coinsSinceVoiceLine = 0;
    nextVoiceLineAt = randomIntInclusive(minFunnyCoinGap, maxFunnyCoinGap, randomFn);

    if (!playedVoiceLine) {
      playCoinPickup();
    }
  }

  function reset() {
    coinsSinceVoiceLine = 0;
    nextVoiceLineAt = randomIntInclusive(minFunnyCoinGap, maxFunnyCoinGap, randomFn);
    isVoiceLinePlaying = false;
  }

  function replaceVoiceLines(nextVoiceLineSrcs = []) {
    voiceLineAudios = nextVoiceLineSrcs.map(createAudio).filter(Boolean);
  }

  return {
    registerCoinCollected,
    reset,
    replaceVoiceLines,
  };
}
