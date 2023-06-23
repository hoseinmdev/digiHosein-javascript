import { root } from "./index.js";
import { routesPath } from "./routesPath.js";

export const updateRoot = () => {
  const currentHash = location.hash.split("#")[1];
  if (!location.hash) location.hash = "#home";
  root.innerHTML = routesPath[currentHash];
  // console.log(root.childNodes[1])
  const childrenOfSiteLayout =
    document.querySelector(".siteLayout").childNodes[3];
  setTimeout(() => {
    childrenOfSiteLayout.classList.remove("noneShow");
  }, 150);
};

window.addEventListener("hashchange", updateRoot);
