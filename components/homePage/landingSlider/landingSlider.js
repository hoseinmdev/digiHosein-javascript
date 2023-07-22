import changeHash from "../../../utils/changeHash.js";
import fadeShow from "../../../utils/fadeShowElement.js";
import reloadDom from "../../../utils/reloadDom.js";

const allSlidesInDesktop = [
  {
    img: "../../../assets/images/landing/gamingConsole.webp",
    path: "#categories-1-consoles",
  },
  {
    img: "../../../assets/images/landing/laptop.webp",
    path: "#categories-1-laptops",
  },
  {
    img: "../../../assets/images/slider/bannerSpeaker.webp",
    path: "#categories-1-speakers",
  },
  {
    img: "../../../assets/images/slider/bannerMobile.webp",
    path: "#categories-1-phones",
  },
  {
    img: "../../../assets/images/slider/bannerAirpods.webp",
    path: "#categories-1-headphones",
  },
  {
    img: "../../../assets/images/landing/littleSpeaker.webp",
    path: "#categories-1-speakers",
  },
  {
    img: "../../../assets/images/slider/bannerConsole.webp",
    path: "#categories-1-consoles",
  },
  {
    img: "../../../assets/images/slider/bannerAirpods2.webp",
    path: "#categories-1-headphones",
  },
  {
    img: "../../../assets/images/slider/bannerTablet.webp",
    path: "#categories-1-tablets",
  },
];
const allSlidesInMobile = [
  {
    img: "../../../assets/images/slider/consolesBannerInMobile.jpg",
    path: "#categories-1-consoles",
  },
  {
    img: "../../../assets/images/slider/phonesBannerInMobile.jpg",
    path: "#categories-1-phones",
  },
  {
    img: "../../../assets/images/slider/headphonesBannerInMobile.jpg",
    path: "#categories-1-headphones",
  },
  {
    img: "../../../assets/images/slider/speakersBannerInMobile.jpg",
    path: "#categories-1-speakers",
  },
  {
    img: "../../../assets/images/slider/laptopsBannerInMobile.jpg",
    path: "#categories-1-laptops",
  },
];
let allSlides =
  window.innerWidth < 1024 ? allSlidesInMobile : allSlidesInDesktop;
let index = 0;
let sliderInterval;
let touchPosition;

const slideChanger = (e) => {
  const action = e.currentTarget.dataset.action;
  if (action === "NEXT") {
    index === allSlides.length - 1 ? (index = 0) : index++;
  }
  if (action === "BACK") index <= 0 ? (index = allSlides.length - 1) : index--;
  const slide = document.querySelector(".slideImage");
  slide.src = allSlides[index].img;
  slide.setAttribute("data-path", allSlides[index].path);
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
    slide.setAttribute("data-path", allSlides[index].path);
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

const onTouchStartHandler = (e) => {
  touchPosition = e.touches[0].clientX;
};

const onTouchMoveHandler = (e) => {
  if (touchPosition === null) return;
  const currentTouch = e.touches[0].clientX;
  const diff = touchPosition - currentTouch;
  if (diff < 5) index <= 0 ? (index = allSlides.length - 1) : index--;
  if (diff > -5) index === allSlides.length - 1 ? (index = 0) : index++;
  clearInterval(sliderInterval);
  autoSlideChanger();
  landingSlider();
  const slide = document.querySelector(".slideImage");
  slide.src = allSlides[index].img;
  slide.setAttribute("data-path", allSlides[index].path);
  fadeShow(slide, 150);
  touchPosition = null;
};

const landingSlider = () => {
  const sliderContainer = `
  <div class="landingSliderContainer">
      <img class="slideImage" src=${allSlides[index].img}  data-path=${
    allSlides[index].path
  } />
    
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
    const slideImage = document.querySelector(".slideImage");
    slideImage.addEventListener("click", (e) => {
      changeHash(e.target.dataset.path);
                location.reload(true);

    });
    slideImage.addEventListener("touchmove", onTouchMoveHandler);
    slideImage.addEventListener("touchstart", onTouchStartHandler);
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
