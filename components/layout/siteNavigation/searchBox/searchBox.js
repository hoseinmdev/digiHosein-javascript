import changeHash from "../../../../utils/changeHash.js";
import getFromLocal from "../../../../utils/getFromLocal.js";
import numberToFa from "../../../../utils/numberToFa.js";
import reloadDom from "../../../../utils/reloadDom.js";

const allProducts = getFromLocal("allProducts");

const productsFoundContainer = document.createElement("div");
productsFoundContainer.classList.add("productsFoundInSearchContainer");

const renderProductCountainer = (productsFound, inputValue) => {
  if (productsFound.length !== 0) {
    productsFoundContainer.innerHTML = `<p class="paddingTop1Rem">محصولات پیدا شده برای شما ...</p>`;
  } else if (productsFound.length === 0 && inputValue !== "") {
    productsFoundContainer.innerHTML = `<p class="paddingTop1Rem">متاسفانه محصولی پیدا نشد :(</p>`;
  } else {
    productsFoundContainer.style.display = "none";
    productsFoundContainer.innerHTML = "";
  }

  productsFound.forEach((p) => {
    const product = document.createElement("div");
    product.classList.add("productFoundInSearchContainer");
    product.setAttribute("id", p.id);
    product.innerHTML = `
      <div class="productDetail">
        <h4 class="productDetailTitle"id=${p.id}>${p.title}</h4>
        <div class="productOptions"}>
          <div>
            <i class="fa-solid fa-shield-halved"></i>
            <p>ضمانت هفت روزه کالا</p>
          </div>
          <div>
            <i class="fa-solid fa-star"></i>
            <p>18 ماه گارانتی</p>
          </div>
          <div>
            <i class="fa-solid fa-bolt"></i>
            <p>ارسال سریع</p>
          </div>
        </div>
      </div>
      <div class="productImageAndPrice">
        <img class="productDetailImage" id=${p.id} src=${p.imageURL} />
        <p>${numberToFa(p.price)} تومان</p>
      </div>
    `;
    productsFoundContainer.append(product);
  });
  reloadDom(
    ".productsFoundInSearchContainer",
    productsFoundContainer.outerHTML
  );
  return productsFoundContainer.outerHTML;
};

const searchBox = () => {
  const searchBoxJsx = `<div class="searchBox">
    <div class="backdrop"></div>
    <i class="fa-solid fa-magnifying-glass"></i>
    <input class="searchInput" placeholder="محصول مورد نظر را جستجو کنید ..." />
    ${productsFoundContainer.outerHTML}
  </div>`;

  return searchBoxJsx;
};

const timeout = () => {
  const timeout = setTimeout(() => {
    const searchInputBox = document.querySelector(".searchInput");
    const backdrop = document.querySelector(".backdrop");

    searchInputBox.addEventListener("click", () => {
      backdrop.classList.add("showBackdrop");
      productsFoundContainer.innerHTML = "";
      productsFoundContainer.style.display = "flex";
      reloadDom(
        ".productsFoundInSearchContainer",
        productsFoundContainer.outerHTML
      );
    });
    backdrop.addEventListener("click", () => {
      renderProductCountainer([]);
      searchInputBox.value = "";
      productsFoundContainer.style.display = "none";
      reloadDom(
        ".productsFoundInSearchContainer",
        productsFoundContainer.outerHTML
      );
      backdrop.classList.remove("showBackdrop");
    });

    searchInputBox.addEventListener("input", (e) => {
      productsFoundContainer.style.display = "flex";
      const searchValue = e.target.value;
      const productsFound = allProducts
        .map((p) => {
          if (p.title.includes(searchValue)) return p;
        })
        .filter((p) => p !== undefined);

      if (e.target.value === "")
        renderProductCountainer([], searchInputBox.value);
      renderProductCountainer(productsFound, searchInputBox.value);
    });

    const productsImg = document.querySelectorAll(".productDetailImage");
    const productsTitle = document.querySelectorAll(".productDetailTitle");
    [productsImg, productsTitle].forEach((items) => {
      items.forEach((p) => {
        p.addEventListener("click", () => {
          changeHash(`#productPage-${p.id}`);
          location.reload();
        });
      });
    });

    clearTimeout(timeout);
  }, 100);
};

timeout();
window.addEventListener("hashchange", timeout);

export default searchBox;
