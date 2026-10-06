const IMAGE_DIR = 'assets/images/';
const IMAGES = ['java_1.png', 'java_2.png', 'java_3.png', 'java_4.png'];

export function initHeroImage() {
  const hero = document.getElementById('hero');
  const image = document.getElementById('hero-image');
  if (!hero || !image || !IMAGES.length) return;

  image.src = IMAGE_DIR + IMAGES[Math.floor(Math.random() * IMAGES.length)];
  hero.hidden = false;
}
