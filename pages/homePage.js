import landingSlider from "../components/landingSlider/landingSlider.js";
import siteLayout from "../layout/siteLayout.js";
import getProducts from "../components/getProducts/getProducts.js";
import scrollToUpButton from "../components/scrollToUpButton/scrollToUpButton.js";
const homepage = `<div  class="siteLayoutContent">
    ${landingSlider()}
    ${getProducts()}
    ${scrollToUpButton()}
</div>`;

const code = siteLayout(homepage);

export default code;
