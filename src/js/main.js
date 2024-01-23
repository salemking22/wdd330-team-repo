import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const Pdata = new ProductData("tents");
const element = document.querySelector(".product-list");
const Plist = new ProductListing(Pdata, "Tents", element);
Plist.init();
