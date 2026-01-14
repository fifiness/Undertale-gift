# 🔊 Sound Effects Documentation

## Overview
The UNDERTALE Dialogue System now includes authentic retro 8-bit sound effects generated using the Web Audio API!

## Sound Effects Included

### 1. **Text Blip Sound** 🔤
- **When**: Plays for each character as it appears during typing
- **Sound**: Short, high-pitched square wave (800 Hz)
- **Duration**: 50ms
- **Notes**: Automatically skips for spaces and newlines

### 2. **Confirm Sound** ✅
- **When**: Plays when advancing to the next dialogue
- **Sound**: Rising frequency from 600 Hz to 800 Hz
- **Duration**: 100ms
- **Notes**: Indicates successful progression

### 3. **Skip Sound** ⏩
- **When**: Plays when skipping typing animation
- **Sound**: Rising frequency from 1000 Hz to 1200 Hz
- **Duration**: 80ms
- **Notes**: Faster and higher-pitched than confirm sound

### 4. **End Sound** 🏁
- **When**: Plays when reaching the end of all dialogues
- **Sound**: Falling frequency from 600 Hz to 400 Hz (triangle wave)
- **Duration**: 150ms
- **Notes**: Signals completion of dialogue sequence

## Controls

### Mute/Unmute Button
- **Location**: Top-right corner of the screen
- **Icon**: 
  - 🔊 = Sound ON
  - 🔇 = Sound OFF (muted)
- **Action**: Click to toggle sound effects on/off
- **Keyboard**: Can also click during dialogue interaction

### Keyboard Controls (with sound)
- **Enter / Space / Z**: Advance dialogue or skip typing
  - During typing: Plays skip sound + shows full text
  - After typing: Plays confirm sound + advances to next dialogue
  - On last dialogue: Plays end sound + completes sequence

## Technical Details

### Implementation
The sound effects are generated using the **Web Audio API**, which means:
- ✅ No external audio files needed
- ✅ Works in all modern browsers
- ✅ Lightweight and fast
- ✅ Retro 8-bit aesthetic
- ✅ No copyright issues

### Browser Compatibility
- Chrome/Edge: Full support ✅
- Firefox: Full support ✅
- Safari: Full support ✅
- Opera: Full support ✅

### Files Structure
```
src/
├── utils/
│   └── soundEffects.js      # Sound generation utility
└── components/
    ├── DialogueBox.jsx      # Uses sound effects during dialogue
    ├── SoundToggle.jsx      # Mute/unmute button component
    └── SoundToggle.css      # Button styling
```

## Customization

### Adjust Sound Volume
Edit `src/utils/soundEffects.js`:

```javascript
// For text blip
gainNode.gain.setValueAtTime(0.1, ...);  // Change 0.1 to 0.05 for quieter

// For confirm sound
gainNode.gain.setValueAtTime(0.15, ...); // Change 0.15 to 0.1 for quieter
```

### Change Sound Pitch
Edit frequencies in `src/utils/soundEffects.js`:

```javascript
// Text blip - make it higher/lower
oscillator.frequency.value = 800;  // Try 600 (lower) or 1000 (higher)

// Confirm sound - adjust range
oscillator.frequency.setValueAtTime(600, ...);  // Start frequency
oscillator.frequency.exponentialRampToValueAtTime(800, ...);  // End frequency
```

### Change Sound Type
Modify the `oscillator.type` property:
- `'square'` - Classic 8-bit, harsh (current)
- `'triangle'` - Softer, rounder
- `'sine'` - Pure tone, smooth
- `'sawtooth'` - Buzzy, rich

```javascript
oscillator.type = 'triangle';  // Change from 'square'
```

### Adjust Typing Sound Frequency
In `src/components/DialogueBox.jsx`:

```javascript
// Skip sound for certain characters
if (nextChar !== ' ' && nextChar !== '\n' && nextChar !== ',') {
    soundEffects.playTextBlip();
}
```

## Troubleshooting

### No Sound Playing
1. **Check mute button** - Make sure it shows 🔊 not 🔇
2. **Browser volume** - Ensure browser/system volume is up
3. **Console errors** - Open DevTools and check for errors
4. **Browser support** - Ensure using a modern browser

### Sound Too Quiet/Loud
Adjust gain values in `soundEffects.js`:
```javascript
gainNode.gain.setValueAtTime(0.1, ...);  // Lower = quieter, higher = louder
```

### Sound Crackling or Distorting
This can happen if:
- Volume is too high (reduce gain values)
- Too many sounds playing simultaneously
- Browser audio context is suspended

### Mute Button Not Working
1. Check browser console for errors
2. Ensure `SoundToggle` component is imported in `App.jsx`
3. Verify CSS is loading properly

## Fun Facts

🎵 The frequencies used (600-800 Hz) are inspired by classic 8-bit game consoles

🎮 UNDERTALE's original dialogue uses a similar text-per-character sound system

🔊 Different characters in UNDERTALE have different "voice" pitches - you can customize this!

## Advanced: Character-Specific Voices

Want different characters to have different sound pitches? Edit `DialogueBox.jsx`:

```javascript
// Add this helper function
const getCharacterPitch = (speaker) => {
  const pitchMap = {
    'Sans': 600,      // Low, lazy
    'Papyrus': 1000,  // High, energetic
    'Toriel': 700,    // Warm, motherly
    'Flowey': 1200,   // High, creepy
    'Narrator': 800   // Neutral
  };
  return pitchMap[speaker] || 800;
};

// Then modify the sound call
soundEffects.playTextBlip(getCharacterPitch(currentDialogue.speaker));
```

And update `soundEffects.js`:
```javascript
playTextBlip(frequency = 800) {
  // Use the frequency parameter instead of hardcoded 800
  oscillator.frequency.value = frequency;
  // ... rest of the code
}
```

---

Enjoy your immersive UNDERTALE dialogue experience! 🎮✨
