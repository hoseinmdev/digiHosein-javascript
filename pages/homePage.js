import siteLayout from "../layout/siteLayout.js";
import scrollToUpButton from "../components/scrollToUpButton/scrollToUpButton.js";
import landingSlider from "../components/homePage/landingSlider/landingSlider.js";
import circleCategories from "../components/homePage/circleCategories/circleCategories.js";
import productsLayout from "../components/homePage/ProductsLayout/productsLayout/productsLayout.js";
import getProducts from "../components/homePage/ProductsLayout/getProducts/getProducts.js";
import landingBanners from "../components/homePage/landingBanners/landingBanners.js";
const homepage = `
<div  class="siteLayoutContent">
    ${landingSlider()}
    ${circleCategories()}
    ${productsLayout(
      getProducts("consoles"),
      "⭀ گیمینگ !",
      "#ef4444"
    )}
    ${productsLayout(getProducts("laptops"), "⭀ لپتاپ ها", "#4b5563")}
    ${landingBanners()}
    ${productsLayout(getProducts("phones"), "⭀ موبایل ها", "#93c5fd")}
    ${productsLayout(getProducts("tablets"), "⭀ تبلت ها", "#c4b5fd")}
    ${scrollToUpButton()}
</div>`;

const code = siteLayout(homepage);

export default code;
