import './scss/main.scss';

// --- Header scroll behavior ---
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// --- Carousel ---
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__btn--next');
const prevButton = document.querySelector('.carousel__btn--prev');
const dots = Array.from(document.querySelectorAll('.carousel__dot'));
const counter = document.getElementById('carouselCounter');

const slideWidth = slides[0].getBoundingClientRect().width;

slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
});

const getCurrentIndex = () => slides.indexOf(track.querySelector('.current-slide'));

const updateUI = (targetIndex) => {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === targetIndex);
    dot.setAttribute('aria-selected', i === targetIndex ? 'true' : 'false');
  });
  if (counter) counter.textContent = `${targetIndex + 1} / ${slides.length}`;
};

const moveToSlide = (currentSlide, targetSlide) => {
  track.style.transform = `translateX(-${targetSlide.style.left})`;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
  updateUI(slides.indexOf(targetSlide));
};

nextButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling || slides[0];
  moveToSlide(currentSlide, nextSlide);
});

prevButton.addEventListener('click', () => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
  moveToSlide(currentSlide, prevSlide);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    moveToSlide(currentSlide, slides[index]);
  });
});

// Auto-play carousel
const carousel = document.querySelector('.carousel');
let autoPlay = setInterval(() => nextButton.click(), 4500);
carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
carousel.addEventListener('mouseleave', () => {
  autoPlay = setInterval(() => nextButton.click(), 4500);
});

// --- Leaflet Map ---
var map = L.map('coverage-map').setView([33.8547, 35.8623], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

var cities = [
  { name: 'Beirut', lat: 33.8938, lng: 35.5018 },
  { name: 'Tripoli', lat: 34.4367, lng: 35.8497 },
  { name: 'Saida', lat: 33.5606, lng: 35.3756 },
  { name: 'Tyre', lat: 33.2730, lng: 35.1939 },
  { name: 'Zahle', lat: 33.8467, lng: 35.9020 },
  { name: 'Byblos', lat: 34.1213, lng: 35.6489 }
];

cities.forEach(c => {
  L.marker([c.lat, c.lng]).addTo(map)
    .bindPopup(`<b>${c.name}</b><br>Coverage Available`);
});

// --- Hamburger menu ---
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('active');
  navMenu.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});
