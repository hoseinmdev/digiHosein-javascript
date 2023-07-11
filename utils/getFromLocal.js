import { allProducts } from "../db.js";

const getFromLocal = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  if (data) {
    return data
  } else {
    return allProducts
  }
};
export default getFromLocal;
