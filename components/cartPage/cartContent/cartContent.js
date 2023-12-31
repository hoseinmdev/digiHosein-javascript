import changeHash from "../../../utils/changeHash.js";
import numberToFa from "../../../utils/numberToFa.js";
import { findProduct, productActions } from "../../../utils/productUtils.js";
import reloadDom from "../../../utils/reloadDom.js";
import cartIcon from "../../../components/siteLayoutComponents/siteNavigation/cartIcon/cartIcon.js";
import checkout from "../checkout/checkout.js";

const cartProductsContainer = document.createElement("div");
cartProductsContainer.classList.add("cartProductsContainer");

export const cartContent = () => {
  let totalPrice = 0;
  const cart = JSON.parse(localStorage.getItem("cart"));
  cart.forEach((p) => {
    const productPrice = p.price * p.quantity;
    totalPrice += productPrice;
  });
  const renderProductQuantityController = (id) => {
    const product = findProduct(id);
    const productQuantityControllerJsx = `<div class="productQuantityController">
        <button class="increaseProductButton" id=${id}>+</button>
        <p>${product.quantity}</p>
        <button class="${
          product.quantity === 1
            ? `deleteProductButton`
            : "decreaseProductButton"
        }" id=${id}>
        ${
          product.quantity === 1
            ? `<i class="fa-solid fa-trash deleteProductIcon" id=${id}></i>`
            : `—`
        }</button>
    </div>`;
    return productQuantityControllerJsx;
  };
  const renderCartProducts = () => {
    cartProductsContainer.innerHTML = "";
    cart.forEach((p) => {
      const productDiscount = (p.price * p.discount) / 100;
      const finalPrice = p.price - productDiscount;
      const product = document.createElement("div");
      product.classList.add("cartProductContainer");
      product.setAttribute("id", p.id);
      product.innerHTML = `
      <div class="cartProductRightSide">
        <div class="cartProductImageAndDeleteIcon">
            <img class="cartProductDetailImage" id=${p.id} src=${p.imageURL} />
        </div>
        <div class="cartProductTitleAndPrice">
            <h4 class="productDetailTitle"id=${p.id}>${p.title}</h4>
            ${
              !p.discount
                ? `<p>${numberToFa(p.price)} تومان</p>`
                : `<div>
                  <p class="productPreviousPrice">${numberToFa(
                    p.price
                  )} تومان</p>
                  <p class="productNewPrice">${numberToFa(finalPrice)} تومان</p>
                </div>`
            }
            ${renderProductQuantityController(p.id)}
        </div>
      </div>
      <div class="productDetail">
        <div class="productOptions"}>
            <div>
                <i class="fa-solid fa-shield-halved"></i>
                <p>ضمانت هفت روزه کالا</p>
            </div>
            <div>
                <i class="fa-solid fa-star"></i>
                <p>18 ماه گارانتی</p>
            </div>
            <div>
                <i class="fa-solid fa-bolt"></i>
                <p>ارسال سریع</p>
            </div>
        </div>
      </div>
    `;
      cartProductsContainer.append(product);
    });
    return cartProductsContainer.outerHTML;
  };

  const cartContentJsx = `
  <div class="cartContentContainer">
    <div class="TotalPriceContainer">
      <h2><i class="fa-solid fa-cart-shopping"></i> سبد خرید شما</h2>
      <p>جمع کل : ${numberToFa(totalPrice)} تومان</p>
    </div>
    <div class="cartProductsContainer">${renderCartProducts()}</div>
  </div>`;
  reloadDom(".cartContentContainer", cartContentJsx);
  checkout();
  cartIcon();
  timeout();
  return cartContentJsx;
};

const timeout = () => {
  const timeout = setTimeout(() => {
    const increaseProductButton = document.querySelectorAll(
      ".increaseProductButton"
    );
    const decreaseProductButton = document.querySelectorAll(
      ".decreaseProductButton"
    );
    const deleteProductButton = document.querySelectorAll(
      ".deleteProductButton"
    );
    increaseProductButton.forEach((element) => {
      element.addEventListener("click", (e) => {
        productActions({ type: "increaseProduct", id: e.target.id });
        cartContent();
      });
    });
    decreaseProductButton.forEach((element) => {
      element.addEventListener("click", (e) => {
        productActions({ type: "decreaseProduct", id: e.target.id });
        cartContent();
      });
    });
    deleteProductButton.forEach((element) => {
      element.addEventListener("click", (e) => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        productActions({ type: "deleteProduct", id: e.target.id });
        cartContent();
        if (cart.length == 1) location.reload(true);
      });

      const imagesOfProducts = document.querySelectorAll(
        ".cartProductDetailImage"
      );
      const titleOfProducts = document.querySelectorAll(".productTitle");
      [imagesOfProducts, titleOfProducts].forEach((items) => {
        items.forEach((p) => {
          p.addEventListener("click", () => {
            changeHash(`#productPage-${p.id}`);
            location.reload(true);
          });
        });
      });
    });

    clearTimeout(timeout);
  }, 100);
};
window.addEventListener("hashchange", () => {
  if (location.hash === "#cart") {
    timeout();
  }
});
export default cartContent;
