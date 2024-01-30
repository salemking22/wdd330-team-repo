import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { getParams } from "./utils.mjs";

const category = getParams("cat");
const Pdata = new ProductData(category);
const element = document.getElementById("products");
const Plist = new ProductListing(Pdata, category, element);
Plist.init();
