const categories = [
  {
    title: "گوشی موبایل",
    imageUrl: "../../../assets/images/circleImages/mobilee.1",
    path: "#categories-1-phones",
  },
  {
    title: "گیمینگ",
    imageUrl: "../../../assets/images/circleImages/gaming.webp",
    path: "#categories-1-consoles",
  },
  {
    title: "تبلت",
    imageUrl: "../../../assets/images/circleImages/tablet.3",
    path: "#categories-1-tablets",
  },
  {
    title: "لپتاپ",
    imageUrl: "../../../assets/images/circleImages/laptop.2",
    path: "#categories-1-laptops",
  },
  {
    title: "هدفون و هندزفری",
    imageUrl: "../../../assets/images/circleImages/headphones.webp",
    path: "#categories-1-headphones",
  },
  {
    title: "اسپیکر",
    imageUrl: "../../../assets/images/circleImages/skeaper.webp",
    path: "#categories-1-speakers",
  },
];
const categoriesContainer = document.createElement("div");
categoriesContainer.classList.add("circleCategoriesContainer");
const renderCategories = () => {
  categories.forEach((c) => {
    const categoryElement = document.createElement("div");
    // categoryElement.textContent = c.title;
    // categoryElement.href = c.path;
    categoryElement.innerHTML = `<img class="circleCategoryImage" src=${c.imageUrl} />
    <p>${c.title}</p>`;
    categoriesContainer.append(categoryElement);
  });
};
renderCategories();

const circleCategories = () => {
  const circleCategoriesJsx = `${categoriesContainer.outerHTML}`;
  return circleCategoriesJsx;
};
export default circleCategories;
