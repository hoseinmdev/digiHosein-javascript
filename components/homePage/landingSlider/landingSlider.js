import fadeShow from "../../../utils/fadeShowElement.js";
import reloadDom from "../../../utils/reloadDom.js";

const allSlides = [
  {
    img: "../../../assets/images/landing/gamingConsole.webp",
  },
  {
    img: "../../../assets/images/landing/laptop.webp",
  },
  {
    img: "../../../assets/images/slider/bannerSpeaker.webp",
  },
  {
    img: "../../../assets/images/slider/bannerAirpods.webp",
  },
  {
    img: "../../../assets/images/landing/littleSpeaker.webp",
  },
  {
    img: "../../../assets/images/slider/bannerConsole.webp",
  },
  {
    img: "../../../assets/images/slider/bannerAirpods2.webp",
  },
  {
    img: "../../../assets/images/slider/bannerTablet.webp",
  },
];
let index = 0;
let sliderInterval;

const slideChanger = (e) => {
  const action = e.currentTarget.dataset.action;
  if (action === "NEXT") {
    index === allSlides.length - 1 ? (index = 0) : index++;
  }
  if (action === "BACK") index <= 0 ? (index = allSlides.length - 1) : index--;
  const slide = document.querySelector(".slideImage");
  slide.src = allSlides[index].img;
  clearInterval(sliderInterval);
  autoSlideChanger();
  landingSlider();
  fadeShow(slide, 150);
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

const renderLandingSliderindexOfContainer = () => {
  const indexOfContainer = document.createElement("div");
  indexOfContainer.classList.add("indexOfContainer");
  indexOfContainer.innerHTML = "";
  allSlides.forEach((e) => {
    const indexElement = document.createElement("div");
    const indexJsx = `<div class="index ${
      allSlides.indexOf(e) === index ? "enableIndex" : ""
    }"></div>`;
    indexElement.innerHTML = indexJsx;
    indexOfContainer.append(indexElement);
  });
  reloadDom(".indexOfContainer", indexOfContainer.outerHTML);
  return indexOfContainer.outerHTML;
};

const landingSlider = () => {
  const sliderContainer = `
  <div class="landingSliderContainer">
    <img class="slideImage" src=${allSlides[index].img} />
    <button class="nextSlideButton sliderButton" data-action="NEXT"><i class="fa-solid fa-arrow-right"></i></button>
    <button class="backSlideButton sliderButton" data-action="BACK"><i class="fa-solid fa-arrow-left"></i></button>
    ${renderLandingSliderindexOfContainer()}
  </div>`;
  return sliderContainer;
};

const sliderActions = () => {
  const timeout = setTimeout(() => {
    const nextSlideButton = document.querySelector(".nextSlideButton");
    const backSlideButton = document.querySelector(".backSlideButton");
    nextSlideButton.addEventListener("click", slideChanger);
    backSlideButton.addEventListener("click", slideChanger);
    autoSlideChanger();
    clearTimeout(timeout);
  }, 100);
};

window.addEventListener("DOMContentLoaded", () => {
  clearInterval(sliderInterval);
  if (location.hash === "#home") sliderActions();
});
window.addEventListener("hashchange", () => {
  clearInterval(sliderInterval);
  if (location.hash === "#home") {
    sliderActions();
  }
});

export default landingSlider;
