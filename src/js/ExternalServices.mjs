const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor() {

  }
 async getData(category) {
    const resp = await fetch(`${baseURL}/products/search/${category}`)
    const json = await resp.json();
    return json.Result;
 }
  async findProductById(id) {
    const resp = await fetch(`${baseURL}/product/${id}`)
    const json = await resp.json();
    return json.Result;
    
  }

  async checkout(orderPackage) {
    const resp = await fetch(`${baseURL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPackage),
    });
    const json = await resp.json();
    return json;
  }
}
