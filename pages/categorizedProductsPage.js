import categorizedProducts from "../components/categorizedProductsPage/categorizedProducts/categorizedProducts.js";
import siteLayout from "../layout/siteLayout.js";

const categorizedProductsPage = siteLayout(
  `<div class="siteLayoutContent">
    <div>
      ${categorizedProducts()}
    </div>
  </div>`
);
export default categorizedProductsPage;
