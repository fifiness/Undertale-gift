import { useEffect, useState } from 'react';
import './HeartCursor.css';

const HeartCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const updatePosition = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);

            // Check if hovering over clickable elements
            const target = e.target;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.classList.contains('dialogue-box') ||
                target.classList.contains('start-mirror-btn') ||
                target.classList.contains('cancel-btn') ||
                target.classList.contains('retry-btn') ||
                target.classList.contains('sound-toggle') ||
                target.onclick ||
                target.style.cursor === 'pointer' ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(isClickable);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        // Hide default cursor immediately
        document.body.style.cursor = 'none';

        window.addEventListener('mousemove', updatePosition);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`heart-cursor ${isHovering ? 'hovering' : ''}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        />
    );
};

export default HeartCursor;
