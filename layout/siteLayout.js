import siteFooter from "../siteFooter/siteFooter.js";
import siteNavigation from "../siteNavigation/siteNavigation.js";

const siteLayout = (children) => {
  return ` 
    <div class="siteLayout">
        ${siteNavigation}
        <div class="noneShow siteLayoutContent">
            ${children}
        </div>
        ${siteFooter}
    </div>`;
};
export default siteLayout;
