const nav = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

const slider = document.querySelector('#projectSlider');
const prev = document.querySelector('.slider-btn.prev');
const next = document.querySelector('.slider-btn.next');
const scrollAmount = () => Math.min(460, window.innerWidth * 0.85);

prev?.addEventListener('click', () => slider.scrollBy({ left: -scrollAmount(), behavior: 'smooth' }));
next?.addEventListener('click', () => slider.scrollBy({ left: scrollAmount(), behavior: 'smooth' }));

let isDown = false;
let startX = 0;
let scrollLeft = 0;

slider?.addEventListener('mousedown', (event) => {
  isDown = true;
  slider.style.cursor = 'grabbing';
  startX = event.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider?.addEventListener('mouseleave', () => {
  isDown = false;
  slider.style.cursor = 'grab';
});

slider?.addEventListener('mouseup', () => {
  isDown = false;
  slider.style.cursor = 'grab';
});

slider?.addEventListener('mousemove', (event) => {
  if (!isDown) return;
  event.preventDefault();
  const x = event.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.25;
  slider.scrollLeft = scrollLeft - walk;
});
