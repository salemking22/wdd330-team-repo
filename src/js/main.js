import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const Pdata = new ProductData("tents");
const element = document.getElementById("products");
const Plist = new ProductListing(Pdata, "Tents", element);
Plist.init();
