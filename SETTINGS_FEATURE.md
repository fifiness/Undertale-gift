# ⚙️ Settings Panel Feature

## Overview
A new **Settings Panel** has been added to give users control over their experience.

### Features

#### 1. ⚙️ Settings Menu
- Accessed via a **gear icon** in the top-right corner
- Animated slide-down effect
- Pixel-perfect UNDERTALE styling
- Replaces the standalone sound toggle

#### 2. 🔊 Sound Control
- Toggle sound ON/OFF directly from the settings menu
- Persists mute state globally

#### 3. 🖼️ Mirror Mode Toggle (New!)
Two modes available:

**A. Full Screen Mode (Classic)** 🌌
- Mirror acts as the entire background
- Immersive experience
- Dialogue overlays the reflection

**B. Compact Mode** 🖼️
- Mirror becomes a **framed box** in the center
- Dialogue sits **underneath** the mirror
- Cleaner separation between reflection and text
- Great for users who prefer a structured layout

### Technical Implementation
- **SettingsPanel.jsx**: New component handling UI logic
- **WebcamMirror.css**: Added `.compact` class for layout switching
- **App.jsx**: Manages `isCompact` state and passes it down

### How to Use
1. Click the **Gear Icon** (top right)
2. Click **Sound** to mute/unmute
3. Click **Mirror Mode** to switch between "Full" and "Compact"

The interface adapts smoothly with transitions between modes! ✨
