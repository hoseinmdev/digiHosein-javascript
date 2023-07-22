import scrollToUpButton from "../components/scrollToUpButton/scrollToUpButton.js";
import productIntroduction from "../components/singleProductPage/productIntroduction/productIntroduction.js";
import productSpecifications from "../components/singleProductPage/productSpecifications/productSpecifications.js";
import siteLayout from "../layout/siteLayout.js";


const productPage = siteLayout(
  `<div class="siteLayoutContent">
    ${location.hash.split("#")[1].split("-")[1] ? productIntroduction() : ""} 

    ${scrollToUpButton()}
  </div>`
);
export default productPage;
