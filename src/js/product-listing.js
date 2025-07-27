// 🧩 Import modules
// 📦 Import required modules
import ExternalServices from "./ExternalServices.mjs";
import ProductListing from "./ProductList.mjs";
import { getParams } from "./utils.mjs";

// 🛒 Extract the category from the URL query (e.g. ?cat=tents)
const category = getParams("cat");

// 🔌 Create a data service connected to that category
const Pdata = new ExternalServices(category);

// 🎯 Select the HTML element that will display the product cards
const element = document.getElementById("products");

// 🧱 Set up a ProductListing instance using your data and target container
const Plist = new ProductListing(Pdata, category, element);

// 🚀 Start the fetch + render process
Plist.init();