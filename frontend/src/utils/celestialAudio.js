// Web Audio API Synthesizer for Heavenly / Ethereal Chimes
class CelestialAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Polite default
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sa_celestial_audio_muted');
      if (saved !== null) {
        this.isMuted = saved === 'true';
      }
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('sa_celestial_audio_muted', this.isMuted ? 'true' : 'false');
    }
    if (!this.isMuted) {
      this.init();
      this.playChime('affirm');
    }
    return this.isMuted;
  }

  playChime(type = 'chime') {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Heavenly Pentatonic Frequencies (E major celestial scale)
    const chords = {
      chime: [659.25, 830.61, 987.77, 1318.51], // E5, G#5, B5, E6
      affirm: [523.25, 659.25, 783.99, 1046.50], // C5, E5, G5, C6
      supernova: [329.63, 493.88, 659.25, 987.77, 1318.51, 1975.53], // Cosmic bloom
      warp: [164.81, 246.94, 329.63, 493.88, 659.25, 987.77, 1479.98] // Hyperspace
    };

    const freqs = chords[type] || chords.chime;

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Sine wave with overtone warmth
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      // Lowpass filter for smooth crystalline warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2500, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + 1.2);

      // Envelope: gentle bell-like attack & long ethereal decay
      gain.gain.setValueAtTime(0.0001, now + idx * 0.04);
      gain.gain.linearRampToValueAtTime(0.045 / (idx + 1), now + idx * 0.04 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.04 + 1.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.04);
      osc.stop(now + idx * 0.04 + 1.5);
    });
  }

  playWarpSweep() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Sub-bass ethereal swell
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(82.41, now); // E2
    subOsc.frequency.exponentialRampToValueAtTime(329.63, now + 1.2); // Swell to E4

    subGain.gain.setValueAtTime(0.001, now);
    subGain.gain.linearRampToValueAtTime(0.08, now + 0.6);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 2.6);

    // Cosmic shimmer arpeggio
    this.playChime('warp');
  }
}

export const celestialAudio = new CelestialAudioEngine();
export default celestialAudio;
