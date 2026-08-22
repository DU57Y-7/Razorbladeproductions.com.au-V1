const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.site-menu');
const overlay = document.querySelector('.menu-overlay');

function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
  menu?.setAttribute('aria-hidden', String(!open));
}

menuButton?.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
overlay?.addEventListener('click', () => setMenu(false));
document.querySelectorAll('.site-menu a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

// Gallery: the current images are written directly into gallery.html so they always display.
// Extra sequentially numbered JPGs are then discovered automatically.
// To add photos later, upload 12.jpg, 13.jpg, 14.jpg, etc. to images/gallery.
const gallery = document.querySelector('[data-gallery]');
if (gallery) {
  const firstExtraImage = Number(gallery.dataset.nextImage || 12);

  const loadGalleryImage = (i) => {
    const img = new Image();
    img.alt = `Razor Blade Productions gallery photo ${i}`;
    img.loading = 'lazy';
    img.src = `images/gallery/${i}.jpg`;

    img.onload = () => {
      const figure = document.createElement('figure');
      figure.className = 'gallery-item';
      figure.appendChild(img);
      gallery.appendChild(figure);
      loadGalleryImage(i + 1);
    };

    // The first missing sequential number marks the end of the gallery.
    img.onerror = () => {};
  };

  loadGalleryImage(firstExtraImage);
}
