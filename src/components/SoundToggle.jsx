import { useState } from 'react';
import soundEffects from '../utils/soundEffects';
import './SoundToggle.css';

const SoundToggle = () => {
    const [isMuted, setIsMuted] = useState(false);

    const handleToggle = () => {
        const newMutedState = soundEffects.toggleMute();
        setIsMuted(newMutedState);
    };

    return (
        <button
            className="sound-toggle"
            onClick={handleToggle}
            aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            title={isMuted ? 'Click to unmute' : 'Click to mute'}
        >
            {isMuted ? '🔇' : '🔊'}
        </button>
    );
};

export default SoundToggle;
