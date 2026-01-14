// Sound Effects Utility using Web Audio API
// Creates retro 8-bit style sounds similar to UNDERTALE

class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.isMuted = false;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }

    // Text typing sound (short blip) - Soft like "Despite everything, it's still you" scene
    playTextBlip() {
        if (this.isMuted || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'square'; // Changed from 'sine' to 'square' as per new code
        // Randomize pitch slightly for "voice" effect (Undertale style)
        // Base frequency 200Hz, variance +/- 30Hz
        const variance = Math.random() * 60 - 30;
        oscillator.frequency.setValueAtTime(200 + variance, this.audioContext.currentTime); // Base frequency changed from 700 to 200

        // Short, sharp envelope (duration changed from 0.03 to 0.05)
        gainNode.gain.setValueAtTime(0.08, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05); // End gain changed from 0.001 to 0.01

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05); // Duration changed from 0.03 to 0.05
    }

    // Dialogue advance sound (confirm)
    playConfirm() {
        if (this.isMuted || !this.audioContext) return;
        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        // Harmonious selection sound (Triangle wave for "NES" feel)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, this.audioContext.currentTime); // High A
        osc.frequency.exponentialRampToValueAtTime(1760, this.audioContext.currentTime + 0.1); // Slide up

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        osc.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.1);
    }

    // Text skip sound (faster advance)
    playSkip() {
        if (this.isMuted || !this.audioContext) return;
        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        osc.type = 'sawtooth'; // Buzzer-like skip sound
        osc.frequency.setValueAtTime(400, this.audioContext.currentTime);
        osc.frequency.linearRampToValueAtTime(600, this.audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        osc.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        osc.start();
        osc.stop(this.audioContext.currentTime + 0.1);
    }

    // Dialogue end sound
    playEnd() {
        if (this.isMuted || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.15);
        oscillator.type = 'triangle';

        gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.15);
    }

    // Toggle mute
    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    setMuted(muted) {
        this.isMuted = muted;
    }

    getMuted() {
        return this.isMuted;
    }
}

// Export singleton instance
const soundEffects = new SoundEffects();
export default soundEffects;
