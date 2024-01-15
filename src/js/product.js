import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  let previousCart = JSON.parse(localStorage.getItem("so-cart")); //Get cart from local storage
  if (!previousCart) {
    //If cart is empty
    previousCart = [];
  }
  let len = previousCart.length; //Get length of cart
  let cartItems = []; //Initialize cart items array
  product.quantity = 1; //Set quantity to 1
  if (len > 0) {
    //If cart is not empty
    for (let i = 0; i < len; i++) {
      //Loop through cart
      if (previousCart[i].Name === product.Name) {
        //If product is already in cart
        previousCart[i].quantity++; //Increment quantity
        previousCart[i].FinalPrice =
          previousCart[i].quantity * previousCart[i].ListPrice; //Update price
        //Set cart items to previous cart
        setLocalStorage("so-cart", previousCart); //Set local storage to cart items
        return; //Exit function
      }
    }
    cartItems = previousCart; //Set cart items to previous cart
    cartItems.push(product); //Push product to cart items
    setLocalStorage("so-cart", cartItems); //Set local storage to cart items
  } else {
    cartItems.push(product); //Push product to cart items
    setLocalStorage("so-cart", cartItems); //Set local storage to cart items
  }
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
