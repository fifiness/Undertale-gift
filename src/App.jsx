import { useState } from 'react';
import DialogueBox from './components/DialogueBox';
import SettingsPanel from './components/SettingsPanel'; // Replaces SoundToggle
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
  const [compactBackground, setCompactBackground] = useState('black'); // 'grey' or 'black'
  const [isItemMenuOpen, setIsItemMenuOpen] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);

  const handleDialogueComplete = () => {
    setDialogueComplete(true);
    // Reset after a delay to allow replay
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

  const openItems = () => setIsItemMenuOpen(true);
  const closeItems = () => setIsItemMenuOpen(false);

  const handleMirrorInteraction = () => {
    setShowDialogue(true);
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
    </div>
  );
}

export default App;
