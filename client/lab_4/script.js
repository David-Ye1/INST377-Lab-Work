let slidePostition = 0;
const slides = document.querySelectorAll('.carousel_item');
const totalSlides = slides.length;
let nextSlide = document.querySelector('#carousel_button-next');
let prevSlide = document.querySelector('#carousel_button-prev');

nextSlide.addEventListener('click', () => {
  moveToNextSlide();
});
prevSlide.addEventListener('click', () => {
  moveToPrevSlide();
});

function updateSlidePosition() {
  for (let slide of slides) {
    slide.classList.remove('carousel_item-visible');
    slide.classList.add('carousel_item-hidden');
  }

  slides[slidePostition].classList.add('carousel_item-visible');
}

function moveToNextSlide() {
  if (slidePostition === totalSlides - 1) {
    slidePostition = 0;
  } else {
    slidePostition++;
  }
  updateSlidePosition();
}

function moveToPrevSlide() {
  if (slidePostition === 0) {
    slidePostition = totalSlides - 1;
  } else {
    slidePostition--;
  }
  updateSlidePosition();
}