const reloadDom = (elementKey, newElement) => {
  const elementToReload = document.querySelector(elementKey);
  if (elementToReload) {
    elementToReload.outerHTML = newElement;
    return elementToReload;
  }
};
export default reloadDom;
