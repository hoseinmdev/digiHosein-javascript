import cartContent from "../components/cartPage/cartContent/cartContent.js";
import checkout from "../components/cartPage/checkout/checkout.js";
import siteLayout from "../layout/siteLayout.js";

const cartPage = `
<div class="siteLayoutContent">
    <div class="cartPageContainer">
        ${cartContent()}
        ${checkout()}
    </div>
</div>`;
const code = siteLayout(cartPage);
export default code;
