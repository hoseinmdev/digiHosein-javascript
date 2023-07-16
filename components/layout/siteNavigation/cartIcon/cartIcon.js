import numberToFa from "../../../../utils/numberToFa.js";
import changeHash from "../../../../utils/changeHash.js";
import getFromLocal from "../../../../utils/getFromLocal.js";
import reloadDom from "../../../../utils/reloadDom.js";
import saveToLocal from "../../../../utils/saveToLocal.js";

const productsContainer = document.createElement("div");
productsContainer.classList.add("cartIconProductsContainer");

const renderProductsInCart = (cart) => {
  productsContainer.innerHTML = "";
  cart.forEach((p) => {
    const product = document.createElement("div");
    product.classList.add("cartIconProductContainer");
    product.setAttribute("id", p.id);
    product.innerHTML = `
      <div class="productDetail">
        <h4 class="productDetailTitle"id=${p.id}>${p.title}</h4>
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
      <div class="productImageAndPrice">
        <img class="productDetailImage" id=${p.id} src=${p.imageURL} />
        <p>${numberToFa(p.price)} تومان</p>
      </div>
    `;
    productsContainer.append(product);
  });
  return productsContainer.outerHTML;
};

const cartIcon = () => {
  const cart = getFromLocal("allProducts")
    .map((p) => {
      if (p.inCart) return p;
    })
    .filter((p) => p !== undefined);
  saveToLocal("cart", cart);
  const cartContainerJsx = `
  <div class="cartContainer">
    <i class="fa-solid fa-cart-shopping"></i>
    <span class="numberOfProductInCart">${cart.length}</span>
    ${renderProductsInCart(cart)}
  </div>`;
  reloadDom(".cartContainer", cartContainerJsx);
  timeout();
  return cartContainerJsx;
};

const timeout = () => {
  const timeout = setTimeout(() => {
    const cartButton = document.querySelector(".cartContainer");
    const productsImg = document.querySelectorAll(".productDetailImage");
    const productsTitle = document.querySelectorAll(".productDetailTitle");
    [productsImg, productsTitle].forEach((items) => {
      items.forEach((p) => {
        p.addEventListener("click", () => changeHash(`#productPage-${p.id}`));
      });
    });
    cartButton.addEventListener("click", () => changeHash("#cart"));
    clearTimeout(timeout);
  }, 100);
};
timeout();
window.addEventListener("hashchange", timeout);

export default cartIcon;
