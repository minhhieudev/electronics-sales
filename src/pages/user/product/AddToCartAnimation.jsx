// src/components/animation/AddToCartAnimation.jsx
import { useEffect, useState, useRef } from 'react';

const AddToCartAnimation = ({ startElement, endElement, imageUrl, onAnimationComplete }) => {
    const [position, setPosition] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const animationFrameRef = useRef(null);

    // Điều chỉnh kích thước animation theo viewport
    const getAnimationSize = () => {
        const isMobile = window.innerWidth < 768;
        return {
            width: isMobile ? 80 : 100,
            height: isMobile ? 80 : 100
        };
    };

    // Add resize observer effect
    useEffect(() => {
        if (!startElement || !endElement) return;

        // Create ResizeObserver to watch both elements
        const resizeObserver = new ResizeObserver(() => {
            const startRect = startElement.getBoundingClientRect();

            // Update position immediately when resize happens
            setPosition(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    left: startRect.left + window.scrollX,
                    top: startRect.top + window.scrollY,
                };
            });
        });

        // Observe both elements
        resizeObserver.observe(startElement);
        resizeObserver.observe(endElement);

        // Also handle window resize
        const handleResize = () => {
            const startRect = startElement.getBoundingClientRect();
            const endRect = endElement.getBoundingClientRect();

            setPosition(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    left: startRect.left + window.scrollX,
                    top: startRect.top + window.scrollY,
                };
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, [startElement, endElement]);

    useEffect(() => {
        if (!startElement || !endElement || !imageUrl) {
            return;
        }

        const startRect = startElement.getBoundingClientRect();
        const endRect = endElement.getBoundingClientRect();

        const animSize = getAnimationSize();

        // Set initial position
        setPosition({
            left: startRect.left,
            top: startRect.top,
            width: animSize.width,
            height: animSize.height,
            opacity: 1
        });

        setIsVisible(true);

        const startTime = performance.now();
        const animationDuration = 800;

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

            // Cubic easing
            const easing = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            const easedProgress = easing(progress);

            // Get current positions
            const currentStartRect = startElement.getBoundingClientRect();
            const currentEndRect = endElement.getBoundingClientRect();

            // Calculate the path
            const startX = currentStartRect.left + (currentStartRect.width / 2);
            const startY = currentStartRect.top + (currentStartRect.height / 2);
            const endX = currentEndRect.left + (currentEndRect.width / 2);
            const endY = currentEndRect.top + (currentEndRect.height / 2);

            // Arc height for the parabolic path
            const arcHeight = 100;

            // Determine if the animation is on mobile and if the end element is on the left
            const isMobile = window.innerWidth <= 768;
            const isEndOnLeft = endX < startX;

            // Calculate control points for the quadratic bezier curve
            const controlX = isMobile 
                ? (isEndOnLeft ? endX + Math.abs(endX - startX) * 0.3 : startX - Math.abs(endX - startX) * 0.3)
                : startX + (endX - startX) * 0.5;

            const controlY = isMobile 
                ? Math.min(startY, endY) - (arcHeight * 0.7)
                : startY - arcHeight;

            // Calculate current position using quadratic bezier curve
            const currentX = (1 - easedProgress) * (1 - easedProgress) * startX +
                             2 * (1 - easedProgress) * easedProgress * controlX +
                             easedProgress * easedProgress * endX;

            const currentY = (1 - easedProgress) * (1 - easedProgress) * startY +
                             2 * (1 - easedProgress) * easedProgress * controlY +
                             easedProgress * easedProgress * endY;

            setPosition({
                left: currentX - (animSize.width / 2 * (1 - easedProgress * 0.7)),  // Center the image
                top: currentY - (animSize.height / 2 * (1 - easedProgress * 0.7)),   // Center the image
                width: animSize.width * (1 - easedProgress * 0.7),
                height: animSize.height * (1 - easedProgress * 0.7),
                opacity: 1 - easedProgress
            });

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                setIsVisible(false);
                if (onAnimationComplete) {
                    onAnimationComplete();
                }
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [startElement, endElement, imageUrl, onAnimationComplete]);

    if (!isVisible || !position) return null;

    return (
        <div
            className="fixed pointer-events-none z-[9999]"
            style={{
                left: position.left,
                top: position.top,
                width: position.width,
                height: position.height,
                opacity: position.opacity,
                transform: 'translate3d(0,0,0)',
                transition: 'transform 0.1s ease-out',
                willChange: 'transform'
            }}
        >
            <img
                src={imageUrl}
                alt="Product"
                className="w-full h-full object-cover rounded-md shadow-lg"
            />
        </div>
    );
};

export default AddToCartAnimation;