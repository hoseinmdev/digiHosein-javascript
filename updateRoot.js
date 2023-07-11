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
  fadeShow(elementToFadeShow, 50);
  scrollToUp();
};

window.addEventListener("hashchange", updateRoot);
