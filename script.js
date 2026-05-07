const nav = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');

menuToggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

const slider = document.querySelector('#projectSlider');
const prev = document.querySelector('.slider-btn.prev');
const next = document.querySelector('.slider-btn.next');

const scrollAmount = () => Math.min(460, window.innerWidth * 0.85);

prev?.addEventListener('click', () => {
  slider?.scrollBy({
    left: -scrollAmount(),
    behavior: 'smooth'
  });
});

next?.addEventListener('click', () => {
  slider?.scrollBy({
    left: scrollAmount(),
    behavior: 'smooth'
  });
});

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

/* =========================
   SCROLL REVEAL ANIMATION
   Works on scroll down & scroll up
========================= */

const addReveal = (selector, effect = 'up', floating = false, baseDelay = 0, step = 90) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((el, index) => {
    el.classList.add('reveal');

    if (effect) {
      el.dataset.reveal = effect;
    }

    el.style.setProperty('--reveal-delay', `${baseDelay + index * step}ms`);

    if (floating) {
      el.classList.add('float-on');
      el.style.setProperty('--float-delay', `${index * 180}ms`);
    }
  });
};

addReveal('.hero-copy .eyebrow', 'up', false, 0);
addReveal('.hero-copy h1', 'up', false, 120);
addReveal('.hero-copy .hero-text', 'up', false, 180, 120);
addReveal('.hero-actions', 'up', false, 320);

addReveal('.hero-card', 'zoom', true, 120);
addReveal('.hero-stat.top', 'left', true, 180);
addReveal('.hero-stat.middle', 'right', true, 260);
addReveal('.hero-stat.bottom', 'left', true, 340);
addReveal('.hero-stat.writing', 'right', true, 420);

addReveal('.section-heading', 'up', false, 0);
addReveal('.project-card', 'up', false, 0, 100);

addReveal('.about-photo', 'left', false, 0);
addReveal('.about-text', 'right', false, 120);

addReveal('.skill-marquee', 'up', false, 0);
addReveal('.skills-grid article', 'up', false, 0, 100);

addReveal('.writing-section .section-heading', 'left', false, 0);
addReveal('.writing-section .rich-text', 'right', false, 120);

addReveal('.contact-card', 'zoom', false, 0);

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
} else {
  revealElements.forEach((el) => {
    el.classList.add('is-visible');
  });
}