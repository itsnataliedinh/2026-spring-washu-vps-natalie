const normalBtn = document.getElementById('normalBtn');
const chaosBtn = document.getElementById('chaosBtn');

// set default state
normalBtn.classList.add('active');

normalBtn.addEventListener('click', () => {
  normalBtn.classList.add('active');
  chaosBtn.classList.remove('active');
});

chaosBtn.addEventListener('click', () => {
  chaosBtn.classList.add('active');
  normalBtn.classList.remove('active');
});

let chaosInterval = null;

// pastel palette
const palette = [
  '#ffd6e8', // pastel pink
  '#ffc8dd', // rose
  '#ffdab9', // peach
  '#fff3b0', // soft yellow
  '#d9f99d', // pastel green
  '#b8f2e6', // mint
  '#a0e7e5', // aqua
  '#bde0fe', // pastel blue
  '#cdb4db', // lavender
  '#e0bbff'  // soft purple
];

function getPaletteColor() {
  return palette[Math.floor(Math.random() * palette.length)];
}

function setRandomGradient() {
  const color1 = getPaletteColor();
  const color2 = getPaletteColor();
  const color3 = getPaletteColor();

  document.body.style.background = `
    linear-gradient(to bottom, ${color1}, ${color2}, ${color3})
  `;
}

chaosBtn.addEventListener('click', () => {
  document.body.classList.add('chaos');

  clearInterval(chaosInterval);
  setRandomGradient();

  chaosInterval = setInterval(() => {
    setRandomGradient();
  }, 2500); // changes every 3 seconds
});

normalBtn.addEventListener('click', () => {
  document.body.classList.remove('chaos');

  clearInterval(chaosInterval);
  chaosInterval = null;

  document.body.style.background = 'rgb(252, 239, 248)';
});