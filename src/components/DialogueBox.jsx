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

    const handleNext = () => {
        if (isTyping) {
            // Skip to full text with skip sound
            soundEffects.playSkip();
            setDisplayedText(currentDialogue.text);
            setIsTyping(false);
            setShowContinue(true);
        } else {
            if (currentIndex < dialogues.length - 1) {
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
            <div className="dialogue-box">
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
