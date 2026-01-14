import { useState, useEffect } from 'react';
import soundEffects from '../utils/soundEffects';
import './DialogueBox.css';

const DialogueBox = ({ dialogues, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showContinue, setShowContinue] = useState(false);

    const currentDialogue = dialogues[currentIndex];
    const typingSpeed = 50; // milliseconds per character

    useEffect(() => {
        setDisplayedText('');
        setIsTyping(true);
        setShowContinue(false);
        let currentCharIndex = 0;

        const typeInterval = setInterval(() => {
            if (currentCharIndex < currentDialogue.text.length) {
                const nextChar = currentDialogue.text[currentCharIndex];

                // Play text blip sound (skip for spaces and newlines)
                if (nextChar !== ' ' && nextChar !== '\n') {
                    soundEffects.playTextBlip();
                }

                setDisplayedText(currentDialogue.text.substring(0, currentCharIndex + 1));
                currentCharIndex++;
            } else {
                setIsTyping(false);
                setShowContinue(true);
                clearInterval(typeInterval);
            }
        }, typingSpeed);

        return () => clearInterval(typeInterval);
    }, [currentIndex, currentDialogue]);

    const triggerScreenEffect = () => {
        // Screen shake effect
        document.body.style.animation = 'screen-shake 0.5s';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);

        // Flash effect
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0';
        flash.style.left = '0';
        flash.style.width = '100%';
        flash.style.height = '100%';
        flash.style.backgroundColor = 'white';
        flash.style.opacity = '0.8';
        flash.style.zIndex = '9999';
        flash.style.pointerEvents = 'none';
        document.body.appendChild(flash);

        setTimeout(() => {
            flash.style.transition = 'opacity 0.3s';
            flash.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(flash);
            }, 300);
        }, 50);
    };

    const handleNext = () => {
        if (isTyping) {
            // Skip to full text with skip sound
            soundEffects.playSkip();
            setDisplayedText(currentDialogue.text);
            setIsTyping(false);
            setShowContinue(true);
        } else {
            if (currentIndex < dialogues.length - 1) {
                // Check if advancing to final dialogue (index 2 = "Still just you, Amina")
                if (currentIndex === 1) {
                    triggerScreenEffect();
                }
                // Advance to next dialogue
                soundEffects.playConfirm();
                setCurrentIndex(currentIndex + 1);
            } else {
                // End of dialogue
                soundEffects.playEnd();
                if (onComplete) onComplete();
            }
        }
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'z' || e.key === 'Z') {
                handleNext();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isTyping, currentIndex, dialogues.length]);

    return (
        <div className="dialogue-container">
            <div className="dialogue-box" onClick={handleNext}>
                <div className="dialogue-header">
                    {currentDialogue.speaker && (
                        <div className="speaker-name">* {currentDialogue.speaker}</div>
                    )}
                </div>

                <div className="dialogue-content">
                    <div className="text-display">
                        {displayedText}
                        {isTyping && <span className="cursor">▌</span>}
                    </div>
                </div>

                {showContinue && (
                    <div className="continue-indicator">
                        {currentIndex < dialogues.length - 1 ? (
                            <span className="arrow">▼</span>
                        ) : (
                            <span className="end">[END]</span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DialogueBox;
