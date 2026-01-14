# UNDERTALE Dialogue System

A React-based recreation of the iconic UNDERTALE dialogue system with authentic UI and interactions.

## 🎮 Features


- **Authentic UNDERTALE UI**: Black background with white-bordered dialogue box
- **Typing Animation**: Character-by-character text reveal with blinking cursor
- **🔊 Retro Sound Effects**: 8-bit style typing, confirm, and skip sounds (with mute/unmute button!)
- **Keyboard Controls**: Advance dialogue using `Enter`, `Space`, or `Z` keys
- **Multiple Characters**: Support for different speakers (Sans, Papyrus, Toriel, etc.)
- **Auto-loop**: Dialogue automatically restarts after completion
- **Responsive Design**: Works on desktop and mobile devices
- **Pixel-Perfect Aesthetic**: Retro font and pixelated rendering

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

Visit `http://localhost:5173` to see your dialogue system in action!

### Build for Production
```bash
npm run build
```

## 📝 Customizing Dialogue

To change the dialogue, edit the `sampleDialogues` array in `src/App.jsx`:

```javascript
const sampleDialogues = [
  {
    speaker: 'Character Name',
    text: 'Your dialogue text here.\nUse \\n for line breaks.'
  },
  // Add more dialogue objects...
];
```

### Dialogue Format

Each dialogue object has two properties:
- **speaker**: The name of the character speaking (displayed with a `*` prefix)
- **text**: The dialogue text (supports multi-line with `\n`)

### Example Dialogue
```javascript
{
  speaker: 'Sans',
  text: 'hey there, buddy.\nnice to see you again.'
}
```

## 🎨 Customization Options

### Typing Speed
Adjust the typing speed in `src/components/DialogueBox.jsx`:
```javascript
const typingSpeed = 50; // milliseconds per character (lower = faster)
```

### Colors
Colors are defined as CSS variables in `src/index.css`:
```css
:root {
  --bg-black: #000000;
  --ui-white: #ffffff;
  --text-box-bg: #000000;
  --text-box-border: #ffffff;
  --text-color: #ffffff;
  --selection-yellow: #ffff00;
  --heart-red: #ff0000;
}
```

### Dialogue Box Size
Modify the dialogue box dimensions in `src/components/DialogueBox.css`:
```css
.dialogue-box {
  width: 600px;
  min-height: 180px;
  /* ... */
}
```

## 🎮 Controls

- **Enter / Space / Z**: Advance to next dialogue or skip typing animation
  - When text is typing: Skip to full text (with skip sound)
  - When text is complete: Move to next dialogue (with confirm sound)
- **Sound Toggle Button** (top-right corner): Click to mute/unmute sound effects
  - 🔊 = Sound ON
  - 🔇 = Sound OFF
  - 

**See [SOUND_EFFECTS_GUIDE.md](SOUND_EFFECTS_GUIDE.md) for detailed sound customization options!**

## 📁 Project Structure

```
src/
├── App.jsx              # Main app component with dialogue data
├── App.css              # App styling
├── index.css            # Global styles and CSS variables
├── main.jsx             # React entry point
├── components/
│   ├── DialogueBox.jsx  # Dialogue box component with typing logic
│   ├── DialogueBox.css  # Dialogue box styling
│   ├── SoundToggle.jsx  # Sound mute/unmute button
│   └── SoundToggle.css  # Sound toggle styling
└── utils/
    └── soundEffects.js  # Web Audio API sound generator
```

## 🎯 Features to Add (Optional)

You can extend this project with:
- Character portraits/sprites
- Multiple choice options
- Character name colors
- Battle UI elements
- Save/load dialogue progress
- Background images or scenes
- Character-specific text speeds or sound pitches

## 🔧 Technical Details

- **Framework**: React 18
- **Build Tool**: Vite
- **Font**: Press Start 2P (Google Fonts)
- **Styling**: Vanilla CSS with CSS variables
- **Animations**: CSS keyframes for typing cursor and indicators
- **Sound**: Web Audio API for retro 8-bit sound effects

## 📜 License

This is a fan project inspired by TOBY FOX's UNDERTALE. 
All UNDERTALE characters and content belong to their respective owners.

---

**Enjoy recreating your favorite UNDERTALE moments!** 💀🌟
