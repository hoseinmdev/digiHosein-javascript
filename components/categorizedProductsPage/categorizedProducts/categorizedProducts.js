import getFromLocal from "../../../utils/getFromLocal.js";
import numberToFa from "../../../utils/numberToFa.js";

const productsContainer = document.createElement("div");
productsContainer.classList.add("categorizedProductsContainer");

const renderProductPrice = (price, discount) => {
  if (discount) {
    const productDiscount = (price * discount) / 100;
    const finalPrice = price - productDiscount;
    return `
    <p class=productPriceWithDiscount>
        <div class="productPreviousPrice">${numberToFa(price)} تومان</div>
        <div class="productNewPrice">${numberToFa(finalPrice)} تومان</div>
        <div class="productDiscount">${discount}% تخفیف ویژه</div>
    </p>`;
  }
  if (!discount) {
    return `
      <p class=productPrice>
        ${numberToFa(price)} تومان
      </p>`;
  }
};
const categorizedProducts = () => {
  const hashProductsCategory = location.hash.split("#")[1].split("-")[2];
  const allProducts = getFromLocal("allProducts");
  const products = allProducts.filter(
    (p) => p.category === hashProductsCategory
  );
  products.forEach((p) => {
    const product = document.createElement("div");
    product.classList.add("productContainer");
    product.innerHTML = `
        <img
        id=${p.id}
        class=imageStyle
        src=${p.imageURL}
        />
        <div class=productInfoContainer>
          <h4 class=productTitle data-id=${p.id}>
              ${p.title}
          </h4>
          ${renderProductPrice(p.price, p.discount)}
        </div>`;
    productsContainer.append(product);
  });
  return productsContainer.outerHTML;
};
window.addEventListener("hashchange", () => {
  const hashProductsCategory = location.hash.split("#")[1].split("-")[0];
});
export default categorizedProducts;
