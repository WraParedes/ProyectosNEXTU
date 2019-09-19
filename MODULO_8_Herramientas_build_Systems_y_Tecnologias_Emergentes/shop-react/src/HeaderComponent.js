import React, { Component } from 'react';
import cart from './img/cart.png';
import ReactDOM from 'react-dom';
import logout from './img/logout.png';
import { Navbar, Nav, NavItem, Badge } from 'react-bootstrap';
import ShoppingCartService from './service/ShoppingCartService.js';
import LoginComponent from './LoginComponent';
import ShoppingCartComponent from './ShoppingCartComponent.js';
import Session from './model/Session';
import './HeaderComponent.css';

class HeaderComponent extends Component {

    service = ShoppingCartService.getInstance();

    constructor(props) {
        super(props);

        this.openCart = this.openCart.bind(this);
        this.logout = this.logout.bind(this);

        this.service.headerComponent = this;
    }

    openCart() {

        if (this.service.shoppingCartItems.length > 0) {

            ReactDOM.render(
                <ShoppingCartComponent />,
                document.getElementById('content')
            );
        } else {

            alert("Debes agregar al menos un producto al carrito");

        }

    }

    logout() {

        this.service.resetShoppingCart();
        Session.getInstance().user = null;

        ReactDOM.render(
            <LoginComponent />,
            document.getElementById('root')
        );

    }

    render() {

        return (

            <Navbar>
                <Nav pullRight>
                    <NavItem onClick={this.openCart}>
                        <img src={cart} alt="" height="20" />
                        {this.service.shoppingCartItems.length > 0 &&
                            <span className="badge badge-danger">{this.service.shoppingCartItems.length}</span>
                        }

                    </NavItem>
                    <NavItem onClick={this.logout}>
                        <img src={logout} alt="" height="20" />
                    </NavItem>
                </Nav>
            </Navbar>

        );

    }

}

export default HeaderComponent;