import React from 'react';
import ReactDOM from 'react-dom';
import ShoppingCartItem from '../model/ShoppingCartItem.js';
import Session from '../model/Session.js';
import ProductCatalogComponent from '../ProductCatalogComponent';

export default class ShoppingCartService {

    static instance = null;

    shoppingCartItems = [];

    headerComponent;

    static getInstance() {

        if (this.instance == null) {
            this.instance = new ShoppingCartService();
        }

        return this.instance;

    }

    addProduct(product, quantity) {

        const found = this.shoppingCartItems.find(sci => sci.product.id === product.id);

        if (found != null) {

            if (quantity === 0) {

                const index = this.shoppingCartItems.indexOf(found, 0);
                this.shoppingCartItems.splice(index, 1);

            } else {

                found.quantity = quantity

            }

        } else if (quantity > 0) {

            const shoppingCartItem = new ShoppingCartItem(product, quantity);

            this.shoppingCartItems.push(shoppingCartItem);

        }

        this.headerComponent.forceUpdate();

    }

    resetShoppingCart() {

        this.shoppingCartItems = [];
        this.headerComponent.forceUpdate();

    }

    payShoppingCart() {

        if (this.shoppingCartItems.length > 0) {

            const item = this.shoppingCartItems[0]

            this.payProduct(item);

        }

    }

    payProduct(item) {

        item.product.stock -= item.quantity;

        var session = Session.getInstance();

        var headers = {
            'Authorization': 'Kinvey ' + session.user.token,
            'X-Kinvey-API-Version': '3',
            'Content-Type': 'application/json'
        };

        var body = JSON.stringify(item.product);

        const url = "https://baas.kinvey.com/appdata/kid_ryL78U7WM/products/" + item.product.id;
        fetch(url, {
            method: 'put',
            headers: headers,
            body: body
        }).then(response => response.json())
            .then(responseJson => {

                console.log(responseJson);

                if (responseJson.error) {

                    alert("Ocurrió un error al Pagar el carrito");

                } else {

                    const index = this.shoppingCartItems.indexOf(item, 0);

                    if (index === this.shoppingCartItems.length - 1) {

                        this.resetShoppingCart();
                        ReactDOM.render(
                            <ProductCatalogComponent />,
                            document.getElementById('content')
                        );

                    } else {

                        const sci = this.shoppingCartItems[index + 1];

                        this.payProduct(sci);

                    }

                }

            })
            .catch(error => {

                console.error(error);

            })
        
    }

    total() {

        var total = 0;

        for (let item of this.shoppingCartItems) {
            total += item.subtotal();
        }

        return total;

    }
}