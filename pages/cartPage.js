import cartContent from "../components/cartPage/cartContent/cartContent.js";
import checkout from "../components/cartPage/checkout/checkout.js";
import emptyCartPage from "../components/cartPage/emptyCartPage/emptyCartPage.js";
import siteLayout from "../layout/siteLayout.js";
import getFromLocal from "../utils/getFromLocal.js";
const cart = getFromLocal("cart");

const cartPage = `
<div class="siteLayoutContent">
    <div class="cartPageContainer">
        ${cartContent()}
        ${checkout()}
    </div>
</div>`;

const code = siteLayout(cart.length !== 0 ? cartPage : emptyCartPage());
export default code;
