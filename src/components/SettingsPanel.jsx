import { useState, useEffect } from 'react';
import soundEffects from '../utils/soundEffects';
import './SettingsPanel.css';

const SettingsPanel = ({
    isCompact, onToggleCompact,
    isHeartEnabled, onToggleHeart,
    isShakeEnabled, onToggleShake
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // Sync initial state
        setIsMuted(soundEffects.isMuted);
    }, []);

    const handleToggleSound = () => {
        const newMutedState = soundEffects.toggleMute();
        setIsMuted(newMutedState);
    };

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="settings-container">
            <button
                className={`settings-icon ${isOpen ? 'open' : ''}`}
                onClick={togglePanel}
                aria-label="Settings"
            >
                ⚙️
            </button>

            {isOpen && (
                <div className="settings-panel">
                    <h3 className="settings-title">SETTINGS</h3>

                    <div className="setting-option">
                        <span className="setting-label">Sound</span>
                        <button
                            className="setting-toggle"
                            onClick={handleToggleSound}
                        >
                            {isMuted ? 'OFF 🔇' : 'ON 🔊'}
                        </button>
                    </div>

                    <div className="setting-option">
                        <span className="setting-label">Mirror Mode</span>
                        <button
                            className="setting-toggle"
                            onClick={onToggleCompact}
                        >
                            {isCompact ? 'Compact 🖼️' : 'Full 🌌'}
                        </button>
                    </div>

                    <div className="setting-option">
                        <span className="setting-label">Heart Cursor</span>
                        <button
                            className="setting-toggle"
                            onClick={onToggleHeart}
                        >
                            {isHeartEnabled ? 'ON ❤️' : 'OFF ↗️'}
                        </button>
                    </div>

                    <div className="setting-option">
                        <span className="setting-label">Shake FX</span>
                        <button
                            className="setting-toggle"
                            onClick={onToggleShake}
                        >
                            {isShakeEnabled ? 'ON 💥' : 'OFF 🛑'}
                        </button>
                    </div>

                    <div className="setting-info">
                        * Adjust your experience
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsPanel;
