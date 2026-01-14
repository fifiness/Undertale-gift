import { useEffect, useRef, useState } from 'react';
import './HeartCursor.css';

const HeartCursor = () => {
    const cursorRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const rafRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const updateCursor = () => {
            if (cursorRef.current) {
                const { x, y } = mouseRef.current;
                cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
            rafRef.current = requestAnimationFrame(updateCursor);
        };

        const onMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            setIsVisible(true);

            // Optimization: Throttled hover check or simple check - doing simple check here
            // purely for DOM lookups, but relying on React state only when value changes.
            const target = e.target;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') || // Handle nested elements in buttons
                target.classList.contains('dialogue-box') ||
                target.onclick ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isClickable);
        };

        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        // Hide default cursor
        document.body.classList.add('custom-cursor-enabled');

        window.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        // Start animation loop
        rafRef.current = requestAnimationFrame(updateCursor);

        return () => {
            document.body.classList.remove('custom-cursor-enabled');
            document.body.style.cursor = '';

            window.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            ref={cursorRef}
            className={`heart-cursor ${isHovering ? 'hovering' : ''}`}
            style={{
                top: 0,
                left: 0,
                willChange: 'transform' // Hint for GPU optimization
            }}
        />
    );
};

export default HeartCursor;
