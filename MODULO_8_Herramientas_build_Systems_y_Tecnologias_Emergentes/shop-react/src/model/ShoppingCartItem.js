export default class ShoppingCartItem {
    
    product;
    quantity;

    subtotal() {
        return this.product.price * this.quantity;
    }

    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
     }

}