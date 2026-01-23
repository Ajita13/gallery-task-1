let currentIndex = 0;
const images = Array.from(document.querySelectorAll('.gallery img'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = 'flex';
    updateLightboxImage();
}

function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.style.filter = 'none';
}

function prevImage() {
    let prevIndex = currentIndex;
    do {
        prevIndex = (prevIndex - 1 + images.length) % images.length;
    } while(!images[prevIndex] && prevIndex !== currentIndex);
    currentIndex = prevIndex;
    updateLightboxImage();
}

function nextImage() {
    let nextIndex = currentIndex;
    do {
        nextIndex = (nextIndex + 1) % images.length;
    } while(!images[nextIndex] && nextIndex !== currentIndex);
    currentIndex = nextIndex;
    updateLightboxImage();
}

function updateLightboxImage() {
    if(images[currentIndex]) {
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.dataset.category = images[currentIndex].dataset.category;
    }
}

function applyFilter(filter) {
    lightboxImg.style.filter = filter;
}

function deleteCurrentImage() {
    if(images[currentIndex]) {
        images[currentIndex].remove();
        images[currentIndex] = null; // mark as deleted
        closeLightbox();
    }
}

function filterImages(category) {
    images.forEach(img => {
        if(img) { // skip deleted
            if(category === 'all' || img.dataset.category === category) {
                img.style.display = '';
            } else {
                img.style.display = 'none';
            }
        }
    });
}
