import { useState, useEffect, useRef } from 'react';
import DialogueBox from './components/DialogueBox';
import SettingsPanel from './components/SettingsPanel';
import WebcamMirror from './components/WebcamMirror';
import HeartCursor from './components/HeartCursor';
import SideMenu from './components/SideMenu';
import ItemMenu from './components/ItemMenu';
import './App.css';

// Mirror scene dialogue
const sampleDialogues = [
  {
    speaker: '',
    text: "* ..."
  },
  {
    speaker: '',
    text: "* It's you!"
  },
  {
    speaker: '',
    text: "* Despite everything, it's still you."
  },
  {
    speaker: '',
    text: '* Still just you, Amina'
  }
];

function App() {
  const [dialogueComplete, setDialogueComplete] = useState(false);
  const [isCompact, setIsCompact] = useState(true);
  const [isHeartEnabled, setIsHeartEnabled] = useState(false);
  const [isShakeEnabled, setIsShakeEnabled] = useState(true);
  const [compactBackground, setCompactBackground] = useState('black');
  const [isItemMenuOpen, setIsItemMenuOpen] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [musicVolume, setMusicVolume] = useState(0.3);
  
  // Create audio reference
  const audioRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
      if (isMusicEnabled) {
        audioRef.current.play().catch(error => {
          console.log("Autoplay prevented:", error);
        });
      }
    }
  }, []);

  // Update volume when changed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  // Play/pause when toggle changed
  useEffect(() => {
    if (audioRef.current) {
      if (isMusicEnabled) {
        audioRef.current.play().catch(error => {
          console.log("Autoplay error, user needs to interact first");
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicEnabled]);

  const handleDialogueComplete = () => {
    setDialogueComplete(true);
    setTimeout(() => {
      setDialogueComplete(false);
    }, 2000);
  };

  const toggleCompactMode = () => setIsCompact(!isCompact);
  const toggleHeartCursor = () => setIsHeartEnabled(!isHeartEnabled);
  const toggleShakeEffect = () => setIsShakeEnabled(!isShakeEnabled);
  const toggleCompactBackground = () => {
    setCompactBackground(prev => prev === 'grey' ? 'black' : 'grey');
  };
  const toggleMusic = () => setIsMusicEnabled(!isMusicEnabled);
  const increaseVolume = () => {
    if (musicVolume < 1) setMusicVolume(prev => Math.min(1, prev + 0.1));
  };
  const decreaseVolume = () => {
    if (musicVolume > 0) setMusicVolume(prev => Math.max(0, prev - 0.1));
  };

  const openItems = () => setIsItemMenuOpen(true);
  const closeItems = () => setIsItemMenuOpen(false);

  const handleMirrorInteraction = () => {
    setShowDialogue(true);
    // Try to play audio on first user interaction
    if (audioRef.current && isMusicEnabled) {
      audioRef.current.play().catch(e => console.log("Playback error:", e));
    }
  };

  return (
    <div className={`app ${isCompact ? 'compact-layout' : ''} ${isCompact ? `bg-${compactBackground}` : ''}`}>
      {isHeartEnabled && <HeartCursor />}

      <div className="game-container">
        <SideMenu onItemsClick={openItems} />

        <WebcamMirror isCompact={isCompact} onInteractionComplete={handleMirrorInteraction} />

        {isItemMenuOpen && <ItemMenu onClose={closeItems} />}
      </div>

      <SettingsPanel
        isCompact={isCompact}
        onToggleCompact={toggleCompactMode}
        isHeartEnabled={isHeartEnabled}
        onToggleHeart={toggleHeartCursor}
        isShakeEnabled={isShakeEnabled}
        onToggleShake={toggleShakeEffect}
        compactBackground={compactBackground}
        onToggleCompactBackground={toggleCompactBackground}
      />

      {showDialogue && !dialogueComplete && (
        <DialogueBox
          dialogues={sampleDialogues}
          onComplete={handleDialogueComplete}
          enableShake={isShakeEnabled}
        />
      )}

      {showDialogue && dialogueComplete && (
        <div className="complete-message">
          <p>* Dialogue Complete</p>
          <p className="restart-hint">Restarting...</p>
        </div>
      )}

      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/background.m4a"
        loop
        style={{ display: 'none' }}
      />

      {/* Music Player Controls */}
      <div className="music-player" style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '10px',
        borderRadius: '10px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        backdropFilter: 'blur(5px)'
      }}>
        <div style={{ fontSize: '20px' }}>
          {isMusicEnabled ? '🎵' : '🔇'}
        </div>
        
        <button 
          onClick={toggleMusic}
          style={{
            background: isMusicEnabled ? '#4CAF50' : '#f44336',
            border: 'none',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
        >
          {isMusicEnabled ? 'MUTE' : 'UNMUTE'}
        </button>
        
        <button 
          onClick={decreaseVolume}
          disabled={!isMusicEnabled}
          style={{
            background: 'none',
            border: '1px solid white',
            color: 'white',
            padding: '5px 8px',
            borderRadius: '5px',
            cursor: isMusicEnabled ? 'pointer' : 'not-allowed',
            opacity: isMusicEnabled ? 1 : 0.5,
            fontSize: '12px'
          }}
        >
          ➖
        </button>
        
        <div style={{ minWidth: '60px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', opacity: 0.8 }}>VOLUME</div>
          <div>{Math.round(musicVolume * 100)}%</div>
        </div>
        
        <button 
          onClick={increaseVolume}
          disabled={!isMusicEnabled}
          style={{
            background: 'none',
            border: '1px solid white',
            color: 'white',
            padding: '5px 8px',
            borderRadius: '5px',
            cursor: isMusicEnabled ? 'pointer' : 'not-allowed',
            opacity: isMusicEnabled ? 1 : 0.5,
            fontSize: '12px'
          }}
        >
          ➕
        </button>
      </div>
      {/* End Music Player */}
      
    </div>
  );
}

export default App;
