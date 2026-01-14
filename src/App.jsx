import { useState } from 'react';
import DialogueBox from './components/DialogueBox';
import SettingsPanel from './components/SettingsPanel'; // Replaces SoundToggle
import WebcamMirror from './components/WebcamMirror';
import HeartCursor from './components/HeartCursor';
import './App.css';

// Mirror scene dialogue
const sampleDialogues = [
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
  const [isCompact, setIsCompact] = useState(false);

  const handleDialogueComplete = () => {
    setDialogueComplete(true);
    // Reset after a delay to allow replay
    setTimeout(() => {
      setDialogueComplete(false);
    }, 2000);
  };

  const toggleCompactMode = () => {
    setIsCompact(!isCompact);
  };

  return (
    <div className={`app ${isCompact ? 'compact-layout' : ''}`}>
      <HeartCursor />
      <WebcamMirror isCompact={isCompact} />
      <SettingsPanel
        isCompact={isCompact}
        onToggleCompact={toggleCompactMode}
      />

      {!dialogueComplete ? (
        <DialogueBox
          dialogues={sampleDialogues}
          onComplete={handleDialogueComplete}
        />
      ) : (
        <div className="complete-message">
          <p>* Dialogue Complete</p>
          <p className="restart-hint">Restarting...</p>
        </div>
      )}
    </div>
  );
}

export default App;
