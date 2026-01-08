// Import the styling
import './scss/main.scss';

// --- Carousel Logic ---
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__btn--next');
const prevButton = document.querySelector('.carousel__btn--prev');

// Arrange slides next to one another
const slideWidth = slides[0].getBoundingClientRect().width;

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
};

// Next Button Click
nextButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const nextSlide = currentSlide.nextElementSibling;
  
  if (nextSlide) {
    moveToSlide(track, currentSlide, nextSlide);
  } else {
    // Optional: Loop back to start
    moveToSlide(track, currentSlide, slides[0]);
  }
});

// Prev Button Click
prevButton.addEventListener('click', e => {
  const currentSlide = track.querySelector('.current-slide');
  const prevSlide = currentSlide.previousElementSibling;

  if (prevSlide) {
    moveToSlide(track, currentSlide, prevSlide);
  } else {
    // Optional: Loop to end
    moveToSlide(track, currentSlide, slides[slides.length - 1]);
  }
});

var map = L.map('coverage-map').setView([33.8547, 35.8623], 8); // Lebanon center

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
  }).addTo(map);

  // Cities with pins
  var cities = [
    {name: "Beirut", lat: 33.8938, lng: 35.5018},
    {name: "Tripoli", lat: 34.4367, lng: 35.8497},
    {name: "Saida", lat: 33.5606, lng: 35.3756},
    {name: "Tyre", lat: 33.2730, lng: 35.1939},
    {name: "Zahle", lat: 33.8467, lng: 35.9020},
    {name: "Byblos", lat: 34.1213, lng: 35.6489}
  ];

  cities.forEach(c => {
    L.marker([c.lat, c.lng]).addTo(map)
    .bindPopup(`<b>${c.name}</b><br>Coverage Available`);
  });


const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Optional: Close menu when a link is clicked
document.querySelectorAll(".nav__link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));