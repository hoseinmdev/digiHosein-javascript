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
    path: "#productPage",
  },
  {
    title: "تبلت ها",
    path: "#cart",
  },
  {
    title: "لپتاپ ها",
    path: "#cart",
  },
  {
    title: "گیمینگ",
    path: "#cart",
  },
];
const routesContainer = document.createElement("div");

const renderRoutes = () => {
  routes.forEach((r) => {
    const routeElement = document.createElement("a");
    routeElement.textContent = r.title;
    routeElement.href = r.path;
    routesContainer.append(routeElement);
  });
};
renderRoutes();

const siteNavigation = `
    <div class="siteNavigation">
    <div class="headerOfSiteNavigation">
        <div class="logoAndSearchContainer">
            <div class="siteLogo"><img src="../../assets/images/siteLogo/siteLogo.png"/></div>
            <div class="searchBox">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input placeholder="محصول مورد نظر را جستجو کنید ..."/>
            </div>
        </div>
        <div class="signupAndCartContainer">
            <button class="signUpContainer">ورود | ثبت نام</button>
            <div class="cartContainer">
                <i class="fa-solid fa-cart-shopping"></i>
                <span class="numberOfProductInCart">3</span>
            </div>
        </div>
    </div>
    <div class="footerOfSiteNavigation">
        ${routesContainer.innerHTML}
    </div>
    </div>`;
export default siteNavigation;
