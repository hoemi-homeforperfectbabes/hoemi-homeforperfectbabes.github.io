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
const popupPhoto = document.querySelector(".popup-babe-photo");
const popupImg = popupPhoto.querySelector("img");

// Get elements by new IDs
const photoPrevBtn = document.getElementById("photoPrevButton");
const photoNextBtn = document.getElementById("photoNextButton");
const photoCloseBtn = document.getElementById("photoCloseButton");

let photoCurrentIndex = 0;

// Open popup on image click
images.forEach((img, index) => {
    img.addEventListener("click", () => {
        photoCurrentIndex = index;
        showImage();
        popupPhoto.style.display = "block";
        // document.body.style.overflow = "hidden"; // optional: disable scroll
    });
});

// Function to update the popup image
function showImage() {
    popupImg.src = images[photoCurrentIndex].src;
}

// Prev button
photoPrevBtn.addEventListener("click", () => {
    photoCurrentIndex = (photoCurrentIndex - 1 + images.length) % images.length;
    showImage();
});

// Next button
photoNextBtn.addEventListener("click", () => {
    photoCurrentIndex = (photoCurrentIndex + 1) % images.length;
    showImage();
});

// Close button
photoCloseBtn.addEventListener("click", () => {
    popupPhoto.style.display = "none";
    document.body.style.overflow = "auto"; // re-enable scroll
});


// //VIDEO POPUP
// const popup = document.querySelector('.popup-babe-video');
// const popupVideo = document.getElementById('videoFrame');
// const videoCloseBtn = document.getElementById('videoCloseButton');
// const videoPrevBtn = document.getElementById('videoPrevButton');
// const videoNextBtn = document.getElementById('videoNextButton');

// let videoCurrentIndex = 0;
// function openPopup(index) {
//     videoCurrentIndex = index;
//     popupVideo.src = thumbnails[index].video;
//     popup.style.display = 'flex';
//     document.body.style.overflow = 'hidden'; // disable scroll
// }

// function closePopup() {
//     popup.style.display = 'none';
//     popupVideo.src = ''; // stop video
//     document.body.style.overflow = 'auto';
// }

// function showNext() {
//     videoCurrentIndex = (videoCurrentIndex + 1) % thumbnails.length;
//     popupVideo.src = thumbnails[videoCurrentIndex].video;
// }

// function showPrev() {
//     videoCurrentIndex = (videoCurrentIndex - 1 + thumbnails.length) % thumbnails.length;
//     popupVideo.src = thumbnails[videoCurrentIndex].video;
// }

// // Event listeners
// videoCloseBtn.addEventListener('click', closePopup);
// videoNextBtn.addEventListener('click', showNext);
// videoPrevBtn.addEventListener('click', showPrev);

// VIDEO POPUP
const popup = document.querySelector('.popup-babe-video');
const popupVideo = document.getElementById('videoFrame');
const videoCloseBtn = document.getElementById('videoCloseButton');
const videoPrevBtn = document.getElementById('videoPrevButton');
const videoNextBtn = document.getElementById('videoNextButton');

let videoCurrentIndex = 0;

function openPopup(index) {
    videoCurrentIndex = index;

    popupVideo.src = videos[index].file;
    popup.style.display = 'flex';
    popupVideo.play();
    popupVideo.muted = true;
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    popup.style.display = 'none';
    popupVideo.pause();
    popupVideo.src = '';
    document.body.style.overflow = 'auto';
}

function showNext() {
    videoCurrentIndex = (videoCurrentIndex + 1) % videos.length;
    popupVideo.src = videos[videoCurrentIndex].file;
    popupVideo.play();
}

function showPrev() {
    videoCurrentIndex = (videoCurrentIndex - 1 + videos.length) % videos.length;
    popupVideo.src = videos[videoCurrentIndex].file;
    popupVideo.play();
}

// Event listeners
videoCloseBtn.addEventListener('click', closePopup);
videoNextBtn.addEventListener('click', showNext);
videoPrevBtn.addEventListener('click', showPrev);



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


