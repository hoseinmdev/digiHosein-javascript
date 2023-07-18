import getFromLocal from "./getFromLocal.js";
import saveToLocal from "./saveToLocal.js";
import productIntroduction from "../components/singleProductPage/productIntroduction/productIntroduction.js";
import cartContent from "../components/cartPage/cartContent/cartContent.js";

export const productActions = ({ type, id }) => {
  const allProducts = getFromLocal("allProducts");
  const newProducts = allProducts.map((p) => {
    if (p.id === Number(id)) {
      if (type === "addToCart") {
        p.inCart = true;
        productIntroduction();
      }
      if (type === "increaseProduct") p.quantity++;
      if (type === "decreaseProduct") p.quantity--;
      if (type === "deleteProduct") delete p.inCart;
      return p;
    }
    return p;
  });
  saveToLocal("allProducts", newProducts);
  const cart = getFromLocal("allProducts")
    .map((p) => {
      if (p.inCart) return p;
    })
    .filter((p) => p !== undefined);
  saveToLocal("cart", cart);
};

export const findProduct = (id) => {
  const products = getFromLocal("allProducts");
  const productFound = products.find((p) => p.id === Number(id));
  return productFound;
};

export const HashProductId = () => {
  if (!location.hash) location.hash = "#home";
  const productId = location.hash.split("#")[1].split("-")[1]
    ? Number(location.hash.split("#")[1].split("-")[1])
    : 1;
  return productId;
};
