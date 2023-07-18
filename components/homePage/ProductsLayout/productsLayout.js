import reloadDom from "../../../utils/reloadDom.js";

const productsLayout = (children, title, bgColor) => {
  const homePageProductsLayoutJsx = `
  <div class="homePageProductsLayoutContainer" style="background-color: ${bgColor}">
    <div class="productsTitleContainer">
      <p class="productsTitle">${title}</p>
    </div>
    <div class="swiper mySwiper" style="background-color: ${bgColor}">
      ${children.outerHTML}
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
    </div>
  </div>`;
  reloadDom(".homePageProductsLayoutContainer", homePageProductsLayoutJsx);
  return homePageProductsLayoutJsx;
};
export default productsLayout;
