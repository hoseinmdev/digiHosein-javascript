import siteLayout from "../layout/siteLayout.js";
import scrollToUpButton from "../components/scrollToUpButton/scrollToUpButton.js";
import landingSlider from "../components/homePage/landingSlider/landingSlider.js";
import getProducts from "../components/homePage/getProducts/getProducts.js";

const homepage = `
<div  class="siteLayoutContent">
    ${landingSlider()}
    ${getProducts()}
    ${scrollToUpButton()}
</div>`;

const code = siteLayout(homepage);

export default code;
