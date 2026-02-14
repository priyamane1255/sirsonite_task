document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Scroll Animations (AOS)
    // This handles the fade-left and fade-right for your sections
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // 2. Optimized Number Counter Logic
    const counters = document.querySelectorAll('.num');
    
    const countUp = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || "";
        const duration = 2000; // 2 Seconds
        const frameRate = 1000 / 60; // 60 FPS
        const totalFrames = Math.round(duration / frameRate);
        let currentFrame = 0;

        const animate = () => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            
            // Ease-out effect: starts fast, slows down at the end
            const easeOutValue = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.round(target * easeOutValue);

            el.textContent = currentCount + suffix;

            if (currentFrame < totalFrames) {
                requestAnimationFrame(animate);
            } else {
                el.textContent = target + suffix;
            }
        };
        animate();
    };

    // 3. Intersection Observer (Triggers counter when visible)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                countUp(entry.target);
                observer.unobserve(entry.target); // Animation runs only once
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));

    // 4. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('.navbar');
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }
});