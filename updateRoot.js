import cartIcon from "./components/siteLayoutComponents/siteNavigation/cartIcon/cartIcon.js";
import { root } from "./index.js";
import { routesPath } from "./routesPath.js";
import fadeShow from "./utils/fadeShowElement.js";
import scrollToUp from "./utils/scrollToUp.js";

export const updateRoot = () => {
  let currentHash = location.hash.split("#")[1];
  if (currentHash) {
    currentHash = location.hash.split("#")[1].split("-")[0];
  }
  if (!location.hash) location.hash = "#home";
  root.innerHTML = routesPath[currentHash];
  // FADE SHOW CHILD OF LAYOUT
  const elementToFadeShow = document.querySelector(".siteLayoutContent");
  fadeShow(elementToFadeShow, 80);
  cartIcon();
  scrollToUp();
  if (location.hash === "#home") {
    new Swiper(".mySwiper", {
      slidesPerView: window.innerWidth < 1024 ? 1.6 : 6,
      spaceBetween: 0,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
};

window.addEventListener("hashchange", updateRoot);
