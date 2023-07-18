import changeHash from "../../utils/changeHash.js";
import numberToFa from "../../utils/numberToFa.js";
import {
  HashProductId,
  findProduct,
  productActions,
} from "../../utils/productUtils.js";
import reloadDom from "../../utils/reloadDom.js";
import cartIcon from "../../components/siteLayoutComponents/siteNavigation/cartIcon/cartIcon.js";

const renderProductPrice = (price, discount) => {
  if (discount) {
    const productDiscount = (price * discount) / 100;
    const finalPrice = price - productDiscount;
    return `
    <div class="productPriceWithDiscount">
      <div class="inStore">موجود است</div>
      <div>
        <div class="productPreviousPrice">${numberToFa(price)} تومان</div>
        <div class="productNewPrice">${numberToFa(finalPrice)} تومان</div>
      </div>
      <div>
        <div class="theProductDiscount">${discount}%</div>
      </div>
    </div>`;
  }
  if (!discount) {
    return `
      <p class=productPrice>
        ${numberToFa(price)} تومان
      </p>`;
  }
};

const productIntroduction = () => {
  const productToShow = findProduct(HashProductId());
  const productInfoJsx = `<div class="productInfo">
  <div class="productInfoRightSide">
      <img src=${productToShow.imageURL} />
      <h3>◂${productToShow.title}</h3>
    </div>

    <div class="productInfoLeftSide">

      <div class="sellerContainer">
        <div> <i class="fa-solid fa-bag-shopping"></i> فروشنده : حسین محمودی </div>
        <div class="sellerQuality">عملکرد : عالی  ! ♥️</div>
      </div>

      <div>
        ${renderProductPrice(productToShow.price, productToShow.discount)}
      </div>

      <button class="productButton ${
        productToShow.inCart ? "inCart" : "addToCart"
      }" id=${productToShow.id}>${
    productToShow.inCart ? "در سبد ✓" : "افزودن به سبد"
  }</button>

    </div>
  </div>`;
  cartIcon();
  reloadDom(".productInfo", productInfoJsx);
  timeout();
  if (productToShow) return productInfoJsx;
};

const timeout = () => {
  const timeout = setTimeout(() => {
    const addToCartButton = document.querySelector(".addToCart");
    const inCartButton = document.querySelector(".inCart");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", (e) => {
        productActions({ type: "addToCart", id: addToCartButton.id });
        productIntroduction();
        location.reload()
      });
    }
    if (inCartButton) {
      inCartButton.addEventListener("click", (e) => {
        changeHash("#cart");
        productIntroduction();
        location.reload();
      });
    }
    clearTimeout(timeout);
  }, 100);
};
window.addEventListener("hashchange", () => {
  if (location.hash.split("#")[1].split("-")[0] === "productPage") timeout();
});
timeout();
export default productIntroduction;
