import categorizedProducts from "../components/categorizedProductsPage/categorizedProducts/categorizedProducts.js";
import categorizedProductsFilters from "../components/categorizedProductsPage/categorizedProductsFilters/categorizedProductsFilters.js";
import siteLayout from "../layout/siteLayout.js";

const categorizedProductsPage = siteLayout(
  `<div class="siteLayoutContent">
    <div class="categorizedProductsPage">
      ${categorizedProductsFilters()}
      <div class="categorizedProductsBlock">
        <p>- محصولات مورد نظر شما : </p>
        ${categorizedProducts()}
      </div>
    </div>
  </div>`
);
export default categorizedProductsPage;
