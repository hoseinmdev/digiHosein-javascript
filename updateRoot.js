import { root } from "./index.js";
import { routesPath } from "./routesPath.js";
import fadeShow from "./utils/fadeShowElement.js";

export const updateRoot = () => {
  const currentHash = location.hash.split("#")[1];
  if (!location.hash) location.hash = "#home";
  root.innerHTML = routesPath[currentHash];

  // FADE SHOW CHILD OF LAYOUT
  const elementToFadeShow = document.querySelector(".siteLayout").childNodes[3];
  fadeShow(elementToFadeShow, 300);
};

window.addEventListener("hashchange", updateRoot);
