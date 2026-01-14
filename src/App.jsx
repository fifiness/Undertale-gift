import { useState } from 'react';
import DialogueBox from './components/DialogueBox';
import SoundToggle from './components/SoundToggle';
import WebcamMirror from './components/WebcamMirror';
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
    text: '* Still just you, amina'
  }
];

function App() {
  const [dialogueComplete, setDialogueComplete] = useState(false);

  const handleDialogueComplete = () => {
    setDialogueComplete(true);
    // Reset after a delay to allow replay
    setTimeout(() => {
      setDialogueComplete(false);
    }, 2000);
  };

  return (
    <div className="app">
      <WebcamMirror />
      <SoundToggle />
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
