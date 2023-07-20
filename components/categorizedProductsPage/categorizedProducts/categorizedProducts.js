import getFromLocal from "../../../utils/getFromLocal.js";
import numberToFa from "../../../utils/numberToFa.js";
import reloadDom from "../../../utils/reloadDom.js";
import saveToLocal from "../../../utils/saveToLocal.js";
import categorizedProductsFilters from "../categorizedProductsFilters/categorizedProductsFilters.js";

const productsContainer = document.createElement("div");
productsContainer.classList.add("categorizedProductsContainer");

const renderProductPrice = (price, discount) => {
  if (discount) {
    const productDiscount = (price * discount) / 100;
    const finalPrice = price - productDiscount;
    return `
    <p class=productPriceWithDiscount>
        <div class="productPreviousPrice">${numberToFa(price)} تومان</div>
        <div class="productNewPrice">${numberToFa(finalPrice)} تومان</div>
        <div class="productDiscount">${discount}% تخفیف ویژه</div>
    </p>`;
  }
  if (!discount) {
    return `
      <p class=productPrice>
        ${numberToFa(price)} تومان
      </p>`;
  }
};
const categorizedProducts = () => {
  const hashProductsCategory = location.hash.split("#")[1].split("-")[2];
  const allProducts = getFromLocal("allProducts");
  const enabledFilters = getFromLocal("enabledFilters");
  const products = allProducts.filter(
    (p) => p.category === hashProductsCategory
  );
  const filtersObject = {};

  enabledFilters.forEach((key) => {
    const [filterKey, filterValue] = key.split("_");
    const settledFilterValue = filtersObject[filterKey];
    if (settledFilterValue) {
      filtersObject[filterKey] = [...settledFilterValue, filterValue];
    } else {
      filtersObject[filterKey] = [filterValue];
    }
  });
  let filteredProducts = products.filter((product) => {
    return Object.entries(filtersObject).every(([prop, find]) => {
      const convertStrToNumber = find.map((num) => parseInt(num));
      return convertStrToNumber.includes(product[prop]);
    });
  });

  productsContainer.innerHTML = "";
  filteredProducts.forEach((p) => {
    const product = document.createElement("div");
    product.classList.add("productContainer");
    const productJsx = `
        <img
        id=${p.id}
        class=imageStyle
        src=${p.imageURL}
        />
        <div class=productInfoContainer>
          <h4 class=productTitle data-id=${p.id}>
              ${p.title}
          </h4>
          ${renderProductPrice(p.price, p.discount)}
        </div>`;
    product.innerHTML = productJsx;
    productsContainer.append(product);
  });
  if (filteredProducts.length === 0) {
    productsContainer.innerHTML = `<div class="notFoundProductContainer" >
    <img src="../../../assets/images/other/notFoundProduct.png" />
    <p class="notFoundProductText">متاسفانه محصولی یافت نشد :(</p>
    <button class="deleteAllFiltersButton">حذف  همه فیلتر ها</button>
    </div>`;
    timeout()
  }
  reloadDom(".categorizedProductsContainer", productsContainer.outerHTML);
  return productsContainer.outerHTML;
};


const timeout = () => {
  const timeout = setTimeout(() => {
    const deleteAllFiltersButton = document.querySelector(
      ".deleteAllFiltersButton"
    );
    if (deleteAllFiltersButton) {
      deleteAllFiltersButton.addEventListener("click", () => {
        saveToLocal("enabledFilters", []);
        categorizedProducts()
        categorizedProductsFilters()
      });
    }

    clearTimeout(timeout);
  }, 10);
};
export default categorizedProducts;
