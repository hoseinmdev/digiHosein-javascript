import fadeShow from "../../utils/fadeShowElement.js";
const allSlides = [
  {
    img: "../assets/images/slider/bannerConsole.webp",
  },
  {
    img: "../assets/images/slider/bannerSpeaker.webp",
  },
  {
    img: "../assets/images/slider/bannerAirpods.webp",
  },
  {
    img: "../assets/images/slider/bannerRamHard.webp",
  },
  {
    img: "../assets/images/slider/bannerAirpods2.webp",
  },
  {
    img: "../assets/images/slider/bannerDigitalWatch.webp",
  },
  {
    img: "../assets/images/slider/bannerTablet.webp",
  },
];
let index = 0;
let sliderInterval;
let touchPosition;

// const onTouchStartHandler = (e) => {
//   console.log(e);
//   touchPosition = e.touches[0].clientX;
// };
// const onTouchMoveHandler = (e) => {
//   if (touchPosition === null) return;
//   const currentTouch = e.touches[0].clientX;
//   const diff = touchPosition - currentTouch;
//   if (diff > 5) backSlide();
//   if (diff < -5) nextSlide();
//   touchPosition = null;
// };

const slideChanger = (action) => {
  if (action === "NEXT-SLIDE") {
    index === allSlides.length - 1 ? (index = 0) : index++;
  }
  if (action === "BACK-SLIDE")
    index <= 0 ? (index = allSlides.length - 1) : index--;
  const slide = document.querySelector(".slideImage");
  slide.src = allSlides[index].img;
  fadeShow(slide, 150);
  clearInterval(sliderInterval);
  autoSlideChanger();
  landingSlider();
};

const sliderActions = () => {
  const timeout = setTimeout(() => {
    const nextSlideButton = document.querySelector(".nextSlideButton");
    const backSlideButton = document.querySelector(".backSlideButton");
    // const sliderContainer = document.querySelector(".landingSliderContainer");
    // sliderContainer.addEventListener("touchstart", (e) =>
    //   onTouchStartHandler(e)
    // );
    // sliderContainer.addEventListener("touchmove", (e) => onTouchMoveHandler(e));
    nextSlideButton.addEventListener("click", () => slideChanger("NEXT-SLIDE"));
    backSlideButton.addEventListener("click", () => slideChanger("BACK-SLIDE"));
    clearTimeout(timeout);
  }, 100);
};

const autoSlideChanger = () => {
  sliderInterval = setInterval(() => {
    index === allSlides.length - 1 ? (index = 0) : index++;
    const slide = document.querySelector(".slideImage");
    slide.src = allSlides[index].img;
    fadeShow(slide, 150);
    landingSlider();
  }, 8000);
};

const landingSlider = () => {
  const sliderContainer = `
  <div class="landingSliderContainer">
    <img class="slideImage" src=${allSlides[index].img} />
    <button class="nextSlideButton sliderButton"><i class="fa-solid fa-arrow-right"></i></button>
    <button class="backSlideButton sliderButton"><i class="fa-solid fa-arrow-left"></i></button>
  </div>`;
  return sliderContainer;
};

addEventListener("hashchange", () => {
  clearInterval(sliderInterval);
  if (location.hash === "#home") {
    autoSlideChanger();
    sliderActions();
  }
});
addEventListener("DOMContentLoaded", () => {
  if (location.hash === "#home") {
    autoSlideChanger();
    sliderActions();
  }
});

export default landingSlider;
