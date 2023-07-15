import numberToFa from "../../../utils/numberToFa.js";
import reloadDom from "../../../utils/reloadDom.js";

const checkout = () => {
  let totalPrice = 0;
  const cart = JSON.parse(localStorage.getItem("cart"));
  cart.forEach((p) => {
    const productPrice = p.price * p.quantity;
    totalPrice += productPrice;
  });
  const checkoutJsx = `<div class="checkoutContainer">
    <p>جمع کل : ${numberToFa(totalPrice)} تومان</p>
    <button>به خرید ادامه بده</button>
  </div>`;
  reloadDom(".checkoutContainer", checkoutJsx);
  return checkoutJsx;
};
export default checkout;
