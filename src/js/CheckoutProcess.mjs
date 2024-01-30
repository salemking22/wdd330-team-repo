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
}