const IMAGE_DIR = 'assets/images/';
const IMAGES = [
  'java_1.png',
  'java_2.png',
  'java_3.png',
  'java_4.png',
  'bedrock_1.jpeg',
  'bedrock_2.jpeg',
  'bedrock_3.jpeg',
  'bedrock_4.jpeg',
  'bedrock_5.jpeg',
  'bedrock_6.jpeg',
];

export function initHeroImage() {
  const hero = document.getElementById('hero');
  const image = document.getElementById('hero-image');
  if (!hero || !image || !IMAGES.length) return;

  image.src = IMAGE_DIR + IMAGES[Math.floor(Math.random() * IMAGES.length)];
  hero.hidden = false;
}
