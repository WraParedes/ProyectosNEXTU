import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap';
import './ProductItemComponent.css';
import ProductDetailComponent from './ProductDetailComponent';
import ShoppingCartService from './service/ShoppingCartService.js';

class ProductItemComponent extends Component {

    constructor(props) {
        super(props)

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.viewProductDetail = this.viewProductDetail.bind(this);
        this.addToCart = this.addToCart.bind(this);

        var service = ShoppingCartService.getInstance();
        const found = service.shoppingCartItems.find(sci => sci.product.id === this.props.product.id);

        var purchaseQuantity = 0;
        if (found != null) {

            purchaseQuantity = found.quantity;

        }

        this.state = {
            purchaseQuantity: purchaseQuantity,
            shoppingCartService: service
        };
    }

    onChangeHandler(event) {

        this.setState({
            purchaseQuantity: parseInt(event.target.value, 10)
        });

    }

    addToCart(event) {

        if (this.state.purchaseQuantity <= this.props.product.stock) {

            this.state.shoppingCartService.addProduct(this.props.product, this.state.purchaseQuantity);

        } else {

            alert("No puedes agregar: " + this.state.purchaseQuantity + ", el inventario es de " + this.props.product.stock);
            this.setState({
                purchaseQuantity: 0
            });

        }
    }

    viewProductDetail() {

        ReactDOM.render(
            <ProductDetailComponent product={this.props.product} />,
            document.getElementById('content')
        );

    }

    render() {

        var img = require('./img/' + this.props.product.image);

        return (

            <div className="bordered">

                <img src={img} alt={this.props.product.image} height={150} width={'100%'} />

                <h4>{this.props.product.name}</h4>

                <h6><strong>Precio:</strong> {this.props.product.price}</h6>

                <h6> <strong> Unidades disponibles: </strong> {this.props.product.stock}</h6>

                <Button bsStyle="primary" className="badgeButton" onClick={this.viewProductDetail}>Ver más</Button>
                <Button bsStyle="warning" className="badgeButton" onClick={this.addToCart}>Añadir</Button>
                <input type="number" className="" onChange={this.onChangeHandler} value={this.state.purchaseQuantity} />

            </div>

        );
    }

}

export default ProductItemComponent;