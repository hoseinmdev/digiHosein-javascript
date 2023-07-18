import siteFooter from "../components/siteLayoutComponents/siteFooter/siteFooter.js";
import siteNavigation from "../components/siteLayoutComponents/siteNavigation/siteNavigation.js";

const siteLayout = (children) => {
  return ` 
    <div class="siteLayout">
        ${siteNavigation}
        ${children}
        ${siteFooter}
    </div>`;
};
export default siteLayout;
