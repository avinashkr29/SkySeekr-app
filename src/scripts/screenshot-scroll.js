document.addEventListener('DOMContentLoaded', function() {
    const showcase = document.querySelector('.screenshot-showcase');
    const track = document.querySelector('.screenshot-track');
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let animationID = 0;

    // Prevent animation on load
    track.style.animation = 'none';
    
    // Re-enable animation after a brief delay
    setTimeout(() => {
        track.style.animation = 'scroll 30s linear infinite';
    }, 100);

    function touchStart(event) {
        track.style.animation = 'none';
        startPosition = getPositionX(event);
        isDragging = true;
        showcase.classList.add('grabbing');
        
        // Stop any existing animation
        cancelAnimationFrame(animationID);
    }

    function touchMove(event) {
        if (!isDragging) return;
        event.preventDefault();
        const currentPosition = getPositionX(event);
        const diff = currentPosition - startPosition;
        currentTranslate = previousTranslate + diff;
        setSliderPosition();
    }

    function touchEnd() {
        isDragging = false;
        showcase.classList.remove('grabbing');
        
        // Save the final position
        previousTranslate = currentTranslate;
        
        // Optional: Add momentum scrolling here
        // For demonstration, we'll just resume the animation
        setTimeout(() => {
            if (!showcase.matches(':hover')) {
                track.style.animation = 'scroll 30s linear infinite';
            }
        }, 50);
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function setSliderPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    // Mouse events
    showcase.addEventListener('mousedown', touchStart);
    showcase.addEventListener('mousemove', touchMove);
    showcase.addEventListener('mouseup', touchEnd);
    showcase.addEventListener('mouseleave', touchEnd);

    // Touch events
    showcase.addEventListener('touchstart', touchStart);
    showcase.addEventListener('touchmove', touchMove);
    showcase.addEventListener('touchend', touchEnd);
    showcase.addEventListener('touchcancel', touchEnd);

    // Prevent context menu on right click
    showcase.addEventListener('contextmenu', e => e.preventDefault());

    // Stop animation on hover
    showcase.addEventListener('mouseenter', () => {
        track.style.animation = 'none';
    });

    // Resume animation when not dragging
    showcase.addEventListener('mouseleave', () => {
        if (!isDragging) {
            track.style.animation = 'scroll 30s linear infinite';
        }
    });
});