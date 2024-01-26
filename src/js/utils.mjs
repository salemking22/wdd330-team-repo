// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParams(lookup) {
  const params = new URLSearchParams(window.location.search);
  return params.get(lookup);
}

export function renderListWithTemplate(templateFn, parentElement, data, position = "afterBegin",clear = false) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const list = data.map((item) => templateFn(item));
  parentElement.insertAdjacentHTML(position, list.join(""));
}

async function renderWithTemplate(element, data, position = "afterBegin") {
//Render the template using just javascript with no libraries
  element.innerHTML = data; 
}

export async function loadHeaderFooter() {
  const header = qs("header");
  const footer = qs("footer");
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate =  await loadTemplate("../partials/footer.html");
  //Load Cart Item Count
 
  //Render Header and Footer
  renderWithTemplate(header, headerTemplate);
  renderWithTemplate(footer, footerTemplate);
  const cart = getLocalStorage("so-cart");
  let cartCount = 0;
  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      cartCount += cart[i].quantity;
    }
  }
  qs(".cart-count").innerHTML = cartCount;
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}
