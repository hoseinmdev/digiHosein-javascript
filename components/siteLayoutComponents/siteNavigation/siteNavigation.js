import changeHash from "../../../utils/changeHash.js";
import cartIcon from "./cartIcon/cartIcon.js";
import searchBox from "./searchBox/searchBox.js";

const routes = [
  {
    title: "خانه",
    path: "#home",
  },
  {
    title: "سبد خرید",
    path: "#cart",
  },
  {
    title: "موبایل ها",
    path: "#categories-1-phones",
  },
  {
    title: "تبلت ها",
    path: "#categories-1-tablets",
  },
  {
    title: "اسپیکر",
    path: "#categories-1-speakers",
  },
  {
    title: "لپتاپ ها",
    path: "#categories-1-laptops",
  },
  {
    title: "هدفون و هندزفری",
    path: "#categories-1-headphones",
  },
  {
    title: "گیمینگ",
    path: "#categories-1-consoles",
  },
];
const routesContainer = document.createElement("div");

const renderRoutes = () => {
  routes.forEach((r) => {
    const routeElement = document.createElement("span");
    routeElement.classList.add("navigationLinkRoute");
    routeElement.setAttribute("data-path", r.path);
    routeElement.textContent = r.title;
    routesContainer.append(routeElement);
  });
};
renderRoutes();

const siteNavigation = `
    <div class="siteNavigation">
    <div class="headerOfSiteNavigation">
        <div class="logoAndSearchContainer">
            <div class="siteLogo"><img src="../../assets/images/siteLogo/siteLogo.png"/></div>
            ${searchBox()}
        </div>
        <div class="signupAndCartContainer">
            
            ${cartIcon()}
        </div>
    </div>
    <div class="footerOfSiteNavigation">
        ${routesContainer.innerHTML}
    </div>
    </div>`;

const timeout = () => {
  const timeout = setTimeout(() => {
    const navigationLinkRoutes = document.querySelectorAll(
      ".navigationLinkRoute"
    );
    navigationLinkRoutes.forEach((element) => {
      element.addEventListener("click", (e) => {
        changeHash(`${e.currentTarget.dataset.path}`);
        location.reload();
      });
    });
    clearTimeout(timeout);
  }, 10);
};
timeout();
window.addEventListener("hashchange", () => {
  timeout();
});
export default siteNavigation;
