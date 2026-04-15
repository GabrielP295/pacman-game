import { createCoinAudioController } from "../coin-audio.js";

const voiceLineSrcs = [
  "./audio-manager/sound-effects/coin/voice-01.mp3",
  "./audio-manager/sound-effects/coin/voice-02.mp3",
  "./audio-manager/sound-effects/coin/voice-03.mp3",
  "./audio-manager/sound-effects/coin/voice-04.mp3",
  "./audio-manager/sound-effects/coin/voice-05.mp3",
  "./audio-manager/sound-effects/coin/voice-06.mp3",
  "./audio-manager/sound-effects/coin/voice-07.mp3",
  "./audio-manager/sound-effects/coin/voice-08.mp3",
  "./audio-manager/sound-effects/coin/voice-09.mp3",
  "./audio-manager/sound-effects/coin/voice-10.mp3",
];

export function createDefaultCoinAudioController() {
  return createCoinAudioController({
    coinPickupSrc: "./audio-manager/sound-effects/coin/coin-pickup.mp3",
    bonusVoiceLineSrcs: voiceLineSrcs,
    minFunnyCoinGap: 7,
    maxFunnyCoinGap: 10,
  });
}
