import ExternalServices from "./ExternalServices.mjs";
function packageItems(items) {
    let orderPackage = [];
    //map the items to the orderPackage array
    items.map(item => {
        let orderItem = {
            "id": item.Id,
            "name": item.Name,
            "quantity": item.quantity,
            "price": item.FinalPrice
        };
        orderPackage.push(orderItem);
    });
    return orderPackage;
}


export default class CheckoutProcess{
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.cartTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.qty = 0;
    }
    init() {
        this.list = JSON.parse(localStorage.getItem(this.key));
        document.querySelector(".button").addEventListener("click", this.submitOrder.bind(this));
        this.calcItemSummary();

    }

    calcItemSummary() {
        this.cartTotal = 0;
        this.list.forEach(item => {
            this.cartTotal += item.FinalPrice * item.quantity;
        });
        let itemQty = 0;
        this.list.forEach(item => {
            itemQty += item.quantity;
        });
        if (itemQty > 0) {
            this.shipping = 10;
        }
        this.qty = itemQty;
        this.shipping += (itemQty - 1) * 2;
        this.tax = ((this.cartTotal+ this.shipping) * 0.06).toFixed(2);
        this.calcOrderTotal();
    }


    calcOrderTotal() {
        this.orderTotal = parseFloat(this.cartTotal + this.shipping + this.tax).toFixed(2);
    }

    displayOrderTotals() {
        document.querySelector(".item-count").innerHTML = "Items " + this.qty;
        document.querySelector(".cart-total-sum").innerHTML = "Cart Total $" + this.cartTotal;
        document.querySelector(".shipping").innerHTML = "Shipping $" + this.shipping;
        document.querySelector(".tax").innerHTML = "Tax $" + this.tax;
        document.querySelector(".order-total").innerHTML = "Order Total $" + this.orderTotal;
    }
    
    //add event listener to form


    async submitOrder(){
        // Check if all inputs are valid
        if (!document.querySelector(".checkout-form").checkValidity()) {
            alert("Please fill out all fields");
            return;
        }
        let form = document.querySelector(".checkout-form");
        event.preventDefault();
        let orderPackage = packageItems(this.list);
        let order = {
            "fname": form.firstName.value,
            "lname": form.lastName.value,
            "orderDate": new Date(),
            "street": form.address.value,
            "city": form.city.value,
            "state": form.state.value,
            "zip": form.zip.value,
            "items": orderPackage,
            "total": this.orderTotal,
            "cardNumber" : form.card.value,
            "expiration": form.exp.value,
            "code": form.cvv.value,
        };
        let externalService = new ExternalServices();
        let response = await externalService.checkout(order);
        if (response.message === "Order Placed") {
            localStorage.removeItem("so-cart");
            localStorage.removeItem("so-cart-total");
            document.querySelector("main").innerHTML = `<h1>Thank you for your order!</h1>`;
            document.querySelector("main").innerHTML += `<p>Your order number is ${response.orderId}</p>`;
            document.querySelector("main").innerHTML += `<p>You will receive a confirmation email shortly.</p>`;
            document.querySelector(".cart-count").innerHTML = 0;
        } else {
            console.log("Error");
        }
    }
}

