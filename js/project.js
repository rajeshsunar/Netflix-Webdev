// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // ===== NAVBAR SCROLL EFFECT =====
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // ===== HERO VIDEO AUTOPLAY =====
    const heroVideo = document.getElementById('heroVideo');

    // Ensure video autoplays
    heroVideo.play().catch(error => {
        console.log('Autoplay prevented:', error);
    });


    // ===== PLAY BUTTON - OPENS FULLSCREEN VIDEO MODAL =====
    const playBtn = document.getElementById('playBtn');
    const fullscreenModal = new bootstrap.Modal(document.getElementById('fullscreenModal'));
    const fullscreenVideo = document.getElementById('fullscreenVideo');

    playBtn.addEventListener('click', function() {
        // Pause hero video
        heroVideo.pause();

        // Open fullscreen modal and play video
        fullscreenModal.show();
        fullscreenVideo.currentTime = 0;
        fullscreenVideo.play();
    });

    // When fullscreen modal closes
    document.getElementById('fullscreenModal').addEventListener('hidden.bs.modal', function() {
        fullscreenVideo.pause();
        heroVideo.play();
    });


    // ===== MORE INFO BUTTON - OPENS INFO MODAL =====
    const moreInfoBtn = document.getElementById('moreInfoBtn');
    const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));

    moreInfoBtn.addEventListener('click', function() {
        infoModal.show();
    });


    // ===== MOVIE CARD VIDEO INTERACTIONS =====
    const movieCards = document.querySelectorAll('.movie-card');
    let hoverTimeout;

    movieCards.forEach(card => {
        const video = card.querySelector('.card-video');

        // On hover - play video after 1 second
        card.addEventListener('mouseenter', function() {
            hoverTimeout = setTimeout(() => {
                video.play().catch(error => {
                    console.log('Video play prevented:', error);
                });
            }, 1000); // 1 second delay before autoplay
        });

        // On mouse leave - pause and reset video
        card.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimeout);
            video.pause();
            video.currentTime = 0;
        });

        // On click - open preview modal
        card.addEventListener('click', function() {
            openVideoPreview(card);
        });
    });


    // ===== VIDEO PREVIEW MODAL =====
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    const previewVideo = document.getElementById('previewVideo');
    const previewTitle = document.getElementById('previewTitle');
    const previewDescription = document.getElementById('previewDescription');

    function openVideoPreview(card) {
        // Get data from clicked card
        const videoSrc = card.getAttribute('data-video');
        const title = card.getAttribute('data-title');
        const description = card.getAttribute('data-description');

        // Update modal content
        previewVideo.querySelector('source').src = videoSrc;
        previewVideo.load();
        previewTitle.textContent = title;
        previewDescription.textContent = description;

        // Also update fullscreen video source
        fullscreenVideo.querySelector('source').src = videoSrc;
        fullscreenVideo.load();

        // Pause hero video
        heroVideo.pause();

        //Show modal and play preview
        videoModal.show();
        previewVideo.play();
    }

    // When preview modal closes
    document.getElementById('videoModal').addEventListener('hidden.bs.modal', function() {
        previewVideo.pause();
        previewVideo.currentTime = 0;
        heroVideo.play();
    });


    // ===== FULLSCREEN PLAY BUTTONS IN PREVIEW MODAL =====
    const fullscreenPlayBtn = document.getElementById('fullscreenPlayBtn');
    const fullscreenPlayBtn2 = document.getElementById('fullscreenPlayBtn2');

    // Play button in overlay
    fullscreenPlayBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        openFullscreenPlayer();
    });

    // Play button below video
    fullscreenPlayBtn2.addEventListener('click', function() {
        openFullscreenPlayer();
    });

    function openFullscreenPlayer() {
        // Close preview modal
        videoModal.hide();

        // Open fullscreen modal
        fullscreenModal.show();
        fullscreenVideo.currentTime = 0;
        fullscreenVideo.play();
    }


    // ===== SLIDER FUNCTIONALITY =====
    const sliders = document.querySelectorAll('.row-slider');

    sliders.forEach(slider => {
        const sliderContent = slider.querySelector('.slider-content');
        const leftBtn = slider.querySelector('.slider-btn-left');
        const rightBtn = slider.querySelector('.slider-btn-right');

        // Calculate scroll amount
        const scrollAmount = 310;

        // Right button click
        rightBtn.addEventListener('click', function() {
            sliderContent.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Left button click
        leftBtn.addEventListener('click', function() {
            sliderContent.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Show/hide buttons based on scroll position
        sliderContent.addEventListener('scroll', function() {
            if (sliderContent.scrollLeft === 0) {
                leftBtn.style.opacity = '0';
                leftBtn.style.pointerEvents = 'none';
            } else {
                leftBtn.style.opacity = '1';
                leftBtn.style.pointerEvents = 'auto';
            }

            if (sliderContent.scrollLeft >= sliderContent.scrollWidth - sliderContent.clientWidth - 10) {
                rightBtn.style.opacity = '0';
                rightBtn.style.pointerEvents = 'none';
            } else {
                rightBtn.style.opacity = '1';
                rightBtn.style.pointerEvents = 'auto';
            }
        });

        // Initial check
        sliderContent.dispatchEvent(new Event('scroll'));
    });


    // ===== PREVENT VIDEO DOWNLOAD =====
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        video.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });
    });

});


// ===== ADDITIONAL HELPER FUNCTIONS =====

// Pause all card videos when scrolling
window.addEventListener('scroll', function() {
    const cardVideos = document.querySelectorAll('.card-video');
    cardVideos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
});


