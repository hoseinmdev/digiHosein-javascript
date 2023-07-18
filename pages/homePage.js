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
      getProducts("bestSeller"),
      "⭀ پیشنهادات شگفت انگیز !",
      "#ef4444"
    )}
    ${productsLayout(getProducts("laptops"), "⭀ لپتاپ ها", "#374151")}
    ${landingBanners()}
    ${productsLayout(getProducts("phones"), "⭀ موبایل ها", "#60a5fa")}
    ${scrollToUpButton()}
</div>`;

const code = siteLayout(homepage);

export default code;
