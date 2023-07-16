import numberToFa from "../../../utils/numberToFa.js";
import reloadDom from "../../../utils/reloadDom.js";

const checkout = () => {
  let totalPrice = 0;
  let productsDiscount = 0;
  let finalPrice = 0;
  const cart = JSON.parse(localStorage.getItem("cart"));
  cart.forEach((p) => {
    const productDiscount = ((p.price * p.discount) / 100) * p.quantity;
    productsDiscount += productDiscount;
    const productPrice = p.price * p.quantity;
    totalPrice += productPrice;
    finalPrice = totalPrice - productsDiscount;
  });
  const checkoutJsx = `<div class="checkoutContainer">
    <p class="productsPriceText">قیمت کالا ها ← ${numberToFa(
      totalPrice
    )} تومان</p>
    ${
      productsDiscount !== 0
        ? `<p class="allDiscountsText">تخفیف ها ← ${numberToFa(
            productsDiscount
          )} تومان</p>`
        : ""
    }
    <p>جمع کل ← ${numberToFa(finalPrice)} تومان</p>
    <button>به خرید ادامه بده</button>
  </div>`;
  reloadDom(".checkoutContainer", checkoutJsx);
  return checkoutJsx;
};
export default checkout;
