import { filters } from "../../../db.js";
import getFromLocal from "../../../utils/getFromLocal.js";
import reloadDom from "../../../utils/reloadDom.js";
import saveToLocal from "../../../utils/saveToLocal.js";
import categorizedProducts from "../categorizedProducts/categorizedProducts.js";

let filtersKey = {};
const allFilters = filters;
const hashProductsCategory = location.hash.split("#")[1].split("-")[2];
const filtersContainer = document.createElement("div");
filtersContainer.classList.add("categorizedProductsFiltersContainer");
const enabledFilters = JSON.parse(localStorage.getItem("enabledFilters"));
enabledFilters ? "" : saveToLocal("enabledFilters", []);

const generateFiltersState = () => {
  if (hashProductsCategory)
    filters[hashProductsCategory].forEach((p) => (filtersKey[p.key] = false));
};
generateFiltersState();

const toggleShowFilterOptionHandler = (key) => {
  filtersKey = { ...filtersKey, [key]: !filtersKey[key] };
  categorizedProductsFilters();
};

const categorizedProductsFilters = () => {
  const enabledFilters = getFromLocal("enabledFilters");

  filtersContainer.innerHTML = "";
  filtersContainer.innerHTML = `<p>فیلتر ها</p>`;

  if (hashProductsCategory) {
    allFilters[hashProductsCategory].forEach((item) => {
      const filterContainer = document.createElement("div");
      filterContainer.classList.add("filterContainer");
      const filterOptions = document.createElement("div");
      filterOptions.classList.add("filterOptionsContainer");

      item.options.forEach((option) => {
        const checked = enabledFilters.find((i) => option.key === i);
        const filterOption = document.createElement("div");
        filterOption.setAttribute("data-key", option.key);
        filterOption.classList.add("filterOptionContainer");
        filterOption.innerHTML = `
        <label>
          <input type="checkbox" ${checked ? "checked" : ""} /> ${option.title}
        </label>
        `;
        filterOptions.append(filterOption);
        const filterContainerHTML = filtersKey[item.key]
          ? `<div class="activeFilterContainer" data-key=${item.key}> ${item.title} <i class="fa-solid fa-chevron-up"></i> </div> 
            ${filterOptions.outerHTML}`
          : `<div class="disabledFilterContainer"  data-key=${item.key}> ${item.title} <i class="fa-solid fa-chevron-down"></i> </div>`;
        filterContainer.innerHTML = filterContainerHTML;
        filtersContainer.append(filterContainer);
      });
    });
  }

  timeout();
  reloadDom(".categorizedProductsFiltersContainer", filtersContainer.outerHTML);
  return filtersContainer.outerHTML;
};

const timeout = () => {
  const timeout = setTimeout(() => {
    const filterContainers = document.querySelectorAll(".filterContainer");
    const filterOptionContainers = document.querySelectorAll(
      ".filterOptionContainer"
    );
    const delFiltersBtn = document.querySelector(".enableDelFiltersBtn");

    filterContainers.forEach((element) => {
      element.childNodes[0].addEventListener("click", (e) => {
        toggleShowFilterOptionHandler(e.target.dataset.key);
      });
    });

    filterOptionContainers.forEach((element) => {
      element.addEventListener("click", (e) => {
        allFilters[hashProductsCategory].forEach((item) => {
          item.options.forEach((i) => {
            if (i.key === e.currentTarget.dataset.key) {
              const enabledFilters = getFromLocal("enabledFilters");
              e.stopImmediatePropagation();
              if (e.target.checked) {
                saveToLocal("enabledFilters", [...enabledFilters, i.key]);
              } else {
                const indexOf = enabledFilters.indexOf(i.key);
                delete enabledFilters[indexOf];
                const newFilters = enabledFilters.filter((f) => f !== null);
                saveToLocal("enabledFilters", newFilters);
              }
            }
          });
        });
        categorizedProducts();
      });
    });
    if (delFiltersBtn) {
      delFiltersBtn.addEventListener("click", () => {
        saveToLocal("enabledFilters", []);
        categorizedProductsFilters();
        categorizedProducts();
      });
    }

    clearTimeout(timeout);
  }, 10);
};
window.addEventListener("hashchange", () => {
  saveToLocal("enabledFilters", []);
});
export default categorizedProductsFilters;
