import { root } from "./index.js";
import { routesPath } from "./routesPath.js";

export const updateRoot = () => {
  const currentHash = location.hash.split("#")[1];
  if (!location.hash) location.hash = "#home";
  root.innerHTML = routesPath[currentHash];
};

window.addEventListener("hashchange", updateRoot);
