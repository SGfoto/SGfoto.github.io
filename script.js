document.addEventListener('DOMContentLoaded', () => {
    const albums = document.querySelectorAll('.album');
    const gallerySection = document.getElementById('gallery');
    const albumTitle = document.getElementById('album-title');
    const imageGrid = document.querySelector('.image-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const backToAlbumsBtn = document.getElementById('back-to-albums');
    
    let currentAlbum = '';
    let currentImageIndex = 0;

    albums.forEach(album => {
        album.addEventListener('click', () => {
            currentAlbum = album.getAttribute('data-album');
            loadAlbum(currentAlbum);
        });
    });

    backToAlbumsBtn.addEventListener('click', () => {
        gallerySection.classList.add('hidden');
        document.getElementById('albums').classList.remove('hidden');
    });

    imageGrid.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            currentImageIndex = [...imageGrid.children].indexOf(e.target);
            showLightbox(e.target.src);
        }
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });

    prevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            showLightbox(imageGrid.children[currentImageIndex].src);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentImageIndex < imageGrid.children.length - 1) {
            currentImageIndex++;
            showLightbox(imageGrid.children[currentImageIndex].src);
        }
    });

    function loadAlbum(albumName) {
        document.getElementById('albums').classList.add('hidden');
        gallerySection.classList.remove('hidden');
        albumTitle.textContent = albumName.replace(/^\w/, c => c.toUpperCase());
        imageGrid.innerHTML = '';

        fetch(`albums/${albumName}/`)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const images = [...doc.images].map(img => img.src);
                images.forEach(src => {
                    const imgElement = document.createElement('img');
                    imgElement.src = src;
                    imageGrid.appendChild(imgElement);
                });
            });
    }

    function showLightbox(src) {
        lightboxImage.src = src;
        lightbox.classList.remove('hidden');
    }
});
