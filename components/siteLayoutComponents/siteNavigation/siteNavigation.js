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

const desktopSiteNavigation = `
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
const mobileSiteNavigation = `
    <div class="mobileSiteNavigation">
      <div class="hamburgerMenuBackdrop"></div>
      <div class="headerOfSiteNavigation">
        <i class="fa-solid fa-bars hamburgerMenuIcon"></i>
        <div class="hamburgerMenu">
          <i class="fa-solid fa-xmark"></i>
          <div class="hamburgerMenuRoutes">
            ${routesContainer.innerHTML}
          </div>
        </div>
        <div class="siteLogo"><img src="../../assets/images/siteLogo/siteLogo.png"/></div>
        ${cartIcon()}
      </div>
      <div class="footerOfSiteNavigation">
        ${searchBox()}
      </div>
    </div>`;

let siteNavigation =
  window.innerWidth < 1024 ? mobileSiteNavigation : desktopSiteNavigation;
const timeout = () => {
  const timeout = setTimeout(() => {
    const navigationLinkRoutes = document.querySelectorAll(
      ".navigationLinkRoute"
    );
    const hamburgerMenuIcon = document.querySelector(".hamburgerMenuIcon");
    const closeHamburgerMenuIcon = document.querySelector(".fa-xmark");
    const hamburgerMenuBackdrop = document.querySelector(
      ".hamburgerMenuBackdrop"
    );
    const hamburgerMenu = document.querySelector(".hamburgerMenu");
    navigationLinkRoutes.forEach((element) => {
      element.addEventListener("click", (e) => {
        changeHash(`${e.currentTarget.dataset.path}`);
        location.reload();
      });
    });
    hamburgerMenuIcon.addEventListener("click", (e) => {
      hamburgerMenuBackdrop.classList.add("showBackdrop");
      hamburgerMenu.classList.add("showHamburgerMenu");
    });
    hamburgerMenuBackdrop.addEventListener("click", () => {
      hamburgerMenuBackdrop.classList.remove("showBackdrop");
      hamburgerMenu.classList.remove("showHamburgerMenu");
    });
    closeHamburgerMenuIcon.addEventListener("click", () => {
      hamburgerMenu.classList.remove("showHamburgerMenu");
      hamburgerMenuBackdrop.classList.remove("showBackdrop");
    });

    clearTimeout(timeout);
  }, 10);
};

window.addEventListener("hashchange", () => {
  timeout();
});
timeout();
export default siteNavigation;
