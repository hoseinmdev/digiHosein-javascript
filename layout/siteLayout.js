import siteFooter from "../components/siteFooter/siteFooter.js";
import siteNavigation from "../components/siteNavigation/siteNavigation.js";

const siteLayout = (children) => {
  return ` 
    <div class="siteLayout">
        ${siteNavigation}
        ${children}
        ${siteFooter}
    </div>`;
};
export default siteLayout;
