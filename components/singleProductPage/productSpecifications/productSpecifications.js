import { HashProductId, findProduct } from "../../../utils/productUtils.js";

const specificationsContainer = document.createElement("div");
specificationsContainer.classList.add("specificationsContainer");

const productSpecifications = () => {
  const productToShow = findProduct(HashProductId());

  productToShow.specifications.forEach((item) => {
    const specificationContainer = document.createElement("div");
    specificationContainer.classList.add("specificationContainer");
    const specificationValues = item.title.split("/");

    const specificationTitle = document.createElement("p");
    const specificationValue = document.createElement("p");
    specificationTitle.textContent = specificationValues[0];
    specificationValue.textContent = specificationValues[1];

    specificationContainer.append(specificationTitle);
    specificationContainer.append(specificationValue);
    specificationsContainer.append(specificationContainer);
  });

  const productSpecificationsJsx = `${specificationsContainer.outerHTML}`;
  return productSpecificationsJsx;
};
export default productSpecifications;
