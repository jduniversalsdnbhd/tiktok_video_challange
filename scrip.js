// Progress Bar
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = progress + '%';
});

// Randomly place icons across the screen
function placeIconsRandomly() {
  const icons = document.querySelectorAll('.icon');
  const width = window.innerWidth;
  const height = window.innerHeight;

  icons.forEach(icon => {
    const randomX = Math.random() * (width - 100);
    const randomY = Math.random() * (height - 100);
    const randomSize = Math.random() * 60 + 40; // 40–100px
    icon.style.left = `${randomX}px`;
    icon.style.top = `${randomY}px`;
    icon.style.width = `${randomSize}px`;
  });
}

// Recalculate when the window loads or resizes
window.addEventListener('load', placeIconsRandomly);
window.addEventListener('resize', placeIconsRandomly);
