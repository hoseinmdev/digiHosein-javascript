import siteFooter from "../siteFooter/siteFooter.js";
import siteNavigation from "../siteNavigation/siteNavigation.js";

// console.log(children)
// setTimeout(() => (children.style.opacity = 1), 1000);

const siteLayout = (children) => {
  return ` 
    <div class="siteLayout">
        ${siteNavigation}
        <div class="noneShow">
            ${children}
        </div>
        ${siteFooter}
    </div>`;
};
export default siteLayout;
