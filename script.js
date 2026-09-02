const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
const tagColors = {
  'unity': 'tag-lime',
  'c#': 'tag-orange',
  'c++': 'tag-blue',
  'python': 'tag-purple',
  'asp.net': 'tag-orange',
  'backend': 'tag-teal',
  'frontend': 'tag-pink',
  'networking': 'tag-blue',
  'vr': 'tag-purple',
  'robotics': 'tag-lime',
  'ros': 'tag-teal',
  'arduino': 'tag-orange',
  'uav': 'tag-pink',
  'communication': 'tag-teal',
  'control': 'tag-blue',
  'systems': 'tag-lime',
  'game dev': 'tag-pink',
  'game jam': 'tag-orange',
  'research': 'tag-purple',
  'university': 'tag-teal',
  'simulation': 'tag-blue',
  'hardware': 'tag-orange',
  'bluetooth': 'tag-pink',
  'design': 'tag-purple',
  'features design': 'tag-purple'
};

document.querySelectorAll('.tags span').forEach((tag) => {
  const tagColor = tagColors[tag.textContent.trim().toLowerCase()];
  if (tagColor) tag.classList.add(tagColor);
});

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    filter.classList.add('active');
    const selected = filter.dataset.filter;
    cards.forEach((card) => {
      const visible = selected === 'all' || card.dataset.tags.split(' ').includes(selected);
      card.hidden = !visible;
    });
  });
});

const galleryImages = Array.from(document.querySelectorAll('.detail-gallery img, .detail-visual > img'));

if (galleryImages.length > 0) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Close image">Close</button>
    <button class="lightbox-previous" type="button" aria-label="Previous image">←</button>
    <figure class="lightbox-figure">
      <img class="lightbox-image" alt="">
      <figcaption class="lightbox-caption"></figcaption>
    </figure>
    <button class="lightbox-next" type="button" aria-label="Next image">→</button>
  `;
  document.body.append(lightbox);

  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  let currentImageIndex = 0;

  const showImage = (imageIndex) => {
    currentImageIndex = (imageIndex + galleryImages.length) % galleryImages.length;
    const selectedImage = galleryImages[currentImageIndex];
    lightboxImage.src = selectedImage.src;
    lightboxImage.alt = selectedImage.alt;
    lightboxCaption.textContent = `${selectedImage.alt} (${currentImageIndex + 1}/${galleryImages.length})`;
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
  };

  galleryImages.forEach((image, imageIndex) => {
    image.classList.add('gallery-image');
    image.addEventListener('click', () => {
      showImage(imageIndex);
      lightbox.hidden = false;
      document.body.classList.add('lightbox-open');
    });
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-previous').addEventListener('click', () => showImage(currentImageIndex - 1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => showImage(currentImageIndex + 1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showImage(currentImageIndex - 1);
    if (event.key === 'ArrowRight') showImage(currentImageIndex + 1);
  });
}
