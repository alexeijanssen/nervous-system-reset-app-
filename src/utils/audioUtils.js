// audioUtils.js - Utility functions for audio synthesis using Tone.js
import * as Tone from 'tone';

/**
 * Initialize audio synthesizers for breathing guide
 * @param {number} initialVolume - Initial volume in decibels for the main tone
 * @param {number} initialBeepVolume - Initial volume in decibels for the beep/click sounds
 * @param {number} initialBinauralVolume - Initial volume in decibels for binaural beats
 * @returns {Object} Object containing references to all synthesizers
 */
export const initializeAudioSynths = (
  initialVolume = -15, 
  initialBeepVolume = -10,
  initialBinauralVolume = -25
) => {
  // Main breath tone synth
  const toneSynth = new Tone.Synth({
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.2,
      decay: 0.1,
      sustain: 0.8,
      release: 0.8
    }
  }).toDestination();
  
  // Beep synth for transition markers and counts
  const beepSynth = new Tone.Synth({
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0,
      release: 0.1
    }
  }).toDestination();
  
  // Binaural beat oscillators
  const binauralLeft = new Tone.Oscillator({
    type: "sine",
    volume: initialBinauralVolume
  });
  
  const binauralRight = new Tone.Oscillator({
    type: "sine", 
    volume: initialBinauralVolume
  });
  
  // Set panning to create stereo effect
  const panLeft = new Tone.Panner(-1).toDestination();
  const panRight = new Tone.Panner(1).toDestination();
  binauralLeft.connect(panLeft);
  binauralRight.connect(panRight);
  
  // Set initial volumes
  toneSynth.volume.value = initialVolume;
  beepSynth.volume.value = initialBeepVolume;
  
  return {
    toneSynth,
    beepSynth,
    binauralLeft,
    binauralRight,
    panLeft,
    panRight
  };
};

/**
 * Clean up and dispose of audio synthesizers
 * @param {Object} synths - Object containing references to all synthesizers
 */
export const disposeSynths = (synths) => {
  if (synths.toneSynth) synths.toneSynth.dispose();
  if (synths.beepSynth) synths.beepSynth.dispose();
  if (synths.binauralLeft) synths.binauralLeft.dispose();
  if (synths.binauralRight) synths.binauralRight.dispose();
  if (synths.panLeft) synths.panLeft.dispose();
  if (synths.panRight) synths.panRight.dispose();
};

/**
 * Set binaural beat frequencies based on the selected wave type
 * @param {Object} synths - Object containing references to the binaural oscillators
 * @param {string} freqType - Type of brainwave to emulate ('delta', 'theta', or 'alpha')
 */
export const setBinauralFrequencies = (synths, freqType) => {
  if (!synths.binauralLeft || !synths.binauralRight) return;
  
  let baseFreq, beatFreq;
  
  // Set frequencies based on selected wave type
  switch(freqType) {
    case 'delta': // Deep sleep (1-4 Hz)
      baseFreq = 100;
      beatFreq = 2; // 2 Hz difference creates delta wave effect
      break;
    case 'theta': // Light sleep, meditation (4-8 Hz)
      baseFreq = 200;
      beatFreq = 6; // 6 Hz difference creates theta wave effect
      break;
    case 'alpha': // Relaxed wakefulness (8-13 Hz)
      baseFreq = 200;
      beatFreq = 10; // 10 Hz difference creates alpha wave effect
      break;
    default:
      baseFreq = 100;
      beatFreq = 2;
  }
  
  // Set frequencies for left and right ear
  synths.binauralLeft.frequency.value = baseFreq;
  synths.binauralRight.frequency.value = baseFreq + beatFreq;
};

/**
 * Start or stop binaural beats
 * @param {Object} synths - Object containing references to the binaural oscillators
 * @param {boolean} enabled - Whether to enable binaural beats
 */
export const toggleBinauralBeats = (synths, enabled) => {
  if (!synths.binauralLeft || !synths.binauralRight) return;
  
  if (enabled) {
    // Start binaural beats if they're not already running
    if (synths.binauralLeft.state !== "started") {
      synths.binauralLeft.start();
    }
    if (synths.binauralRight.state !== "started") {
      synths.binauralRight.start();
    }
  } else {
    // Stop binaural beats if they're running
    if (synths.binauralLeft.state === "started") {
      synths.binauralLeft.stop();
    }
    if (synths.binauralRight.state === "started") {
      synths.binauralRight.stop();
    }
  }
};

/**
 * Play a beep sound to indicate phase transitions or count holds
 * @param {Object} synths - Object containing references to all synthesizers
 * @param {string} type - Type of beep ('inhale', 'exhale', or 'hold')
 */
export const playBeep = (synths, type) => {
  if (!synths.beepSynth) return;
  
  // Different notes for different phase transitions
  switch(type) {
    case 'inhale':
      synths.beepSynth.triggerAttackRelease("C4", "32n");
      break;
    case 'exhale':
      synths.beepSynth.triggerAttackRelease("C5", "32n");
      break;
    case 'hold':
      synths.beepSynth.triggerAttackRelease("E4", "32n");
      break;
    default:
      synths.beepSynth.triggerAttackRelease("C4", "32n");
  }
};

/**
 * Start the inhale tone with rising pitch
 * @param {Object} synths - Object containing references to all synthesizers
 * @param {number} duration - Duration of the inhale in seconds
 */
export const playInhaleTone = (synths, duration) => {
  if (!synths.toneSynth) return;
  
  const startFreq = 165.0; // E3
  const endFreq = 329.6; // E4
  
  synths.toneSynth.triggerAttack(startFreq);
  synths.toneSynth.frequency.rampTo(endFreq, duration);
};

/**
 * Start the exhale tone with falling pitch
 * @param {Object} synths - Object containing references to all synthesizers
 * @param {number} duration - Duration of the exhale in seconds
 */
export const playExhaleTone = (synths, duration) => {
  if (!synths.toneSynth) return;
  
  const startFreq = 329.6; // E4
  const endFreq = 165.0; // E3
  
  synths.toneSynth.triggerAttack(startFreq);
  synths.toneSynth.frequency.rampTo(endFreq, duration);
};

/**
 * Stop any currently playing tones
 * @param {Object} synths - Object containing references to all synthesizers
 */
export const stopTones = (synths) => {
  if (!synths.toneSynth) return;
  synths.toneSynth.triggerRelease();
};

/**
 * Set volume levels for all synthesizers
 * @param {Object} synths - Object containing references to all synthesizers
 * @param {Object} volumes - Object containing volume levels in decibels
 */
export const setVolumes = (synths, volumes) => {
  if (synths.toneSynth && volumes.toneVolume !== undefined) {
    synths.toneSynth.volume.value = volumes.toneVolume;
  }
  
  if (synths.beepSynth && volumes.beepVolume !== undefined) {
    synths.beepSynth.volume.value = volumes.beepVolume;
  }
  
  if (synths.binauralLeft && synths.binauralRight && volumes.binauralVolume !== undefined) {
    synths.binauralLeft.volume.value = volumes.binauralVolume;
    synths.binauralRight.volume.value = volumes.binauralVolume;
  }
};

/**
 * Ensure Tone.js context is started (required by browsers that require user gesture)
 */
export const ensureToneStarted = () => {
  if (Tone.context.state !== 'running') {
    Tone.start();
  }
};
