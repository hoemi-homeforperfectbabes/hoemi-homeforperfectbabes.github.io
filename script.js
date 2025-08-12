// PHOTO VIDEO TOGGLE 
document.addEventListener('DOMContentLoaded', () => {
    const photoBtn = document.getElementById('photoBtn');
    const videoBtn = document.getElementById('videoBtn');

    const photoContainer = document.querySelector('.babe-photo-container');
    const verticalContainer = document.querySelector('.babe-video-container-vertical');
    const horizontalContainer = document.querySelector('.babe-video-container-horizontal');

    // Determine which video container exists on this page
    const videoContainer = verticalContainer || horizontalContainer;

    // Pause all videos (if any)
    function pauseVideos(container) {
        if (!container) return;
        container.querySelectorAll('video').forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
    }

    // Reload iframes to stop playback (simple hack)
    function reloadIframes(container) {
        if (!container) return;
        container.querySelectorAll('iframe').forEach(iframe => {
            const src = iframe.src;
            iframe.src = '';
            iframe.src = src;
        });
    }

    function pauseAllMedia() {
        pauseVideos(verticalContainer);
        reloadIframes(verticalContainer);
        pauseVideos(horizontalContainer);
        reloadIframes(horizontalContainer);
    }

    function setActiveButton(activeBtn) {
        [photoBtn, videoBtn].forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    function showContainer(containerToShow) {
        [photoContainer, verticalContainer, horizontalContainer].forEach(container => {
            if (container) {
                if (container === containerToShow) {
                    container.classList.add('active');
                } else {
                    container.classList.remove('active');
                }
            }
        });
    }

    // Initially show photo container
    showContainer(photoContainer);
    setActiveButton(photoBtn);

    photoBtn.addEventListener('click', () => {
        pauseAllMedia();
        showContainer(photoContainer);
        setActiveButton(photoBtn);
    });

    videoBtn.addEventListener('click', () => {
        pauseAllMedia();
        showContainer(videoContainer);
        setActiveButton(videoBtn);
    });
});


// PHOTO POPUP
const images = Array.from(document.querySelectorAll(".babe-photo-card img"));
const popup = document.querySelector(".popup-babe-photo");
const popupImg = popup.querySelector("img");
const prevBtn = popup.querySelector(".prev-btn");
const nextBtn = popup.querySelector(".next-btn");
const closeBtn = popup.querySelector(".close-btn");

let currentIndex = 0;

images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        showImage();
        popup.style.display = "block";
    });
});

function showImage() {
    popupImg.src = images[currentIndex].src;
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
});

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});




// BACK TO TOP
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// True parallax effect by adjusting background scroll
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // The lower the factor, the slower the background moves
    document.body.style.backgroundPositionY = `${scrollY * 0.5}px`;
});


//RESPONSIVE
