import { allProducts } from "./db.js";
import { updateRoot } from "./updateRoot.js";
import getFromLocal from "./utils/getFromLocal.js";
import saveToLocal from "./utils/saveToLocal.js";
import "./styles.css"
export const root = document.getElementById("root");
const products = getFromLocal("allProducts");

if (!products) saveToLocal("allProducts", allProducts);
updateRoot();
