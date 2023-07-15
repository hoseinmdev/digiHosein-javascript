import { allProducts } from "../../../db.js";
import numberToFa from "../../../utils/numberToFa.js";
import changeHash from "../../../utils/changeHash.js";
const productsContainer = document.createElement("div");
productsContainer.classList.add("productsContainer");

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
const getProducts = (category) => {
  allProducts.forEach((p) => {
    const product = document.createElement("div");
    product.classList.add("productContainer");
    product.setAttribute("id", p.id);
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
const productActions = () => {
  const timeout = setTimeout(() => {
    const imagesOfProducts = document.querySelectorAll(".imageStyle");
    const titleOfProducts = document.querySelectorAll(".productTitle");
    [imagesOfProducts, titleOfProducts].forEach((items) => {
      items.forEach((p) => {
        p.addEventListener("click", () => {
          changeHash(`#productPage-${p.id}`);
          location.reload();
        });
      });
    });
    clearTimeout(timeout);
  }, 100);
};
window.addEventListener("hashchange", () => {
  if (location.hash === "#home") {
    productActions();
  }
});
productActions();
export default getProducts;
