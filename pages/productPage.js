import productIntroduction from "../components/singleProductPage/productIntroduction.js";
import siteLayout from "../layout/siteLayout.js";
const productPage = siteLayout(
  `<div class="siteLayoutContent">${productIntroduction()}</div>`
);
export default productPage;
