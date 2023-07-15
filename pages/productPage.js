import scrollToUpButton from "../components/scrollToUpButton/scrollToUpButton.js";
import productIntroduction from "../components/singleProductPage/productIntroduction.js";
import productSpecifications from "../components/singleProductPage/productSpecifications.js";
import siteLayout from "../layout/siteLayout.js";

const productPage = siteLayout(
  `<div class="siteLayoutContent">
    ${productIntroduction()} 
    ${productSpecifications()}
    ${scrollToUpButton()}
  </div>`
);
export default productPage;
