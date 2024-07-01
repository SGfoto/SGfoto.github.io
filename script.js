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
    let images = [];

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
            showLightbox(currentImageIndex);
        }
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.add('hidden');
    });

    prevBtn.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            showLightbox(currentImageIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            showLightbox(currentImageIndex);
        }
    });

    async function loadAlbum(albumName) {
        document.getElementById('albums').classList.add('hidden');
        gallerySection.classList.remove('hidden');
        albumTitle.textContent = albumName.replace(/^\w/, c => c.toUpperCase());
        if (albumName.includes("supercarsunday24")) albumTitle.textContent = "SuperCar Sunday '24";
        if (albumName.includes("zomersalmelo24")) albumTitle.textContent = "Zomers Almelo '24";
        imageGrid.innerHTML = '';
        images = [];

        // Fetch image URLs
        const response = await fetch(`https://api.github.com/repos/SGfoto/SGfoto.github.io/contents/albums/${albumName}`);
        const data = await response.json();
        if (JSON.stringify(data).includes("Not Found")) return;
        for (let file of data) {
            const imgElement = document.createElement('img');
            imgElement.src = `https://sgfoto.github.io/${file.path}`;
            imageGrid.appendChild(imgElement);
            images.push(imgElement); // Add to images array
        }
    }

    function showLightbox(index) {
        lightboxImage.src = images[index].src;
        lightbox.classList.remove('hidden');
    }
});
