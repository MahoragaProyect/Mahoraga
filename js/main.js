
import { initParallax } from './parallax.js';
import { initSmoothScroll } from './navigation.js';
import { initCarousel } from './carousel.js';
import { initAuthModal } from './modal.js';

initCarousel();

initParallax();

initSmoothScroll();

document.addEventListener('DOMContentLoaded', () => {
    initAuthModal();
    console.log('Mahoraga - All systems initialized ✨');
});