import changeHash from "../../../utils/changeHash.js";
import numberToFa from "../../../utils/numberToFa.js";
import {
  HashProductId,
  findProduct,
  productActions,
} from "../../../utils/productUtils.js";
import reloadDom from "../../../utils/reloadDom.js";
import cartIcon from "../../siteLayoutComponents/siteNavigation/cartIcon/cartIcon.js";

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
    <div class="img-zoom-container">
      <img
        id="myimage"
        src=${productToShow.imageURL}
        width="368"
        height="368"
        alt="Girl"
      />
       <div id="myresult" class="img-zoom-result"></div>
    </div>
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
                  // location.reload(true);
      });
    }
    if (inCartButton) {
      inCartButton.addEventListener("click", (e) => {
        changeHash("#cart");
        // productIntroduction();
        location.reload(true);
      });
    }

    function imageZoom(imgID, resultID) {
      var img, lens, result, cx, cy;
      img = document.getElementById(imgID);
      result = document.getElementById(resultID);
      /* Create lens: */
      lens = document.createElement("DIV");
      lens.setAttribute("class", "img-zoom-lens");
      /* Insert lens: */
      img.parentElement.insertBefore(lens, img);
      /* Calculate the ratio between result DIV and lens: */
      cx = result.offsetWidth / 60;
      cy = result.offsetHeight / 60;
      /* Set background properties for the result DIV */
      result.style.backgroundImage = "url('" + img.src + "')";
      result.style.backgroundSize =
        img.width * cx + "px " + img.height * cy + "px";
      /* Execute a function when someone moves the cursor over the image, or the lens: */
      lens.addEventListener("mousemove", moveLens);
      img.addEventListener("mousemove", moveLens);
      /* And also for touch screens: */
      lens.addEventListener("touchmove", moveLens);
      img.addEventListener("touchmove", moveLens);
      function moveLens(e) {
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        /* Calculate the position of the lens: */
        x = pos.x - lens.offsetWidth / 2;
        y = pos.y - lens.offsetHeight / 2;
        /* Prevent the lens from being positioned outside the image: */
        if (x > img.width - lens.offsetWidth) {
          x = img.width - lens.offsetWidth;
        }
        if (x < 0) {
          x = 0;
        }
        if (y > img.height - lens.offsetHeight) {
          y = img.height - lens.offsetHeight;
        }
        if (y < 0) {
          y = 0;
        }
        /* Set the position of the lens: */
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        /* Display what the lens "sees": */
        result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
      }
      function getCursorPos(e) {
        var a,
          x = 0,
          y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
      }
    }
    imageZoom("myimage", "myresult");
    clearTimeout(timeout);
  }, 10);
};
window.addEventListener("hashchange", () => {
  if (location.hash.split("#")[1].split("-")[0] === "productPage") timeout();
});

export default productIntroduction;
