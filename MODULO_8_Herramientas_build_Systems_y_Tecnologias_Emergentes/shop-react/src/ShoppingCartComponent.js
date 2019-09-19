import React, { Component } from 'react';
import ShoppingCartItemComponent from './ShoppingCartItemComponent.js';
import ShoppingCartService from './service/ShoppingCartService';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import ProductCatalogComponent from './ProductCatalogComponent';

class ShoppingCartComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            service: ShoppingCartService.getInstance()
        }

        this.pay = this.pay.bind(this);
    }

    cancel() {

        ReactDOM.render(<ProductCatalogComponent />,
            document.getElementById('content'));

    }

    pay() {

        this.state.service.payShoppingCart();

    }

    render() {

        var body = [];

        this.state.service.shoppingCartItems.forEach(element => {

            body.push(<Col lg={12} key={element.id}><ShoppingCartItemComponent item={element} /></Col>);

        });

        return (

            <Grid>

                <br />

                <Jumbotron>

                    <Grid>

                        <Row>
                            <Col>

                                <h1>Carrito de compras</h1>

                            </Col>
                        </Row>

                        <Row>

                            <Col lg={6}>

                                <Grid>

                                    {body}

                                </Grid>

                            </Col>

                            <Col lg={6}>

                                <h1>Total: {this.state.service.total()}</h1>

                                <Button bsStyle="danger" onClick={this.cancel}>Cancelar</Button>
                                <Button bsStyle="success" onClick={this.pay}>Pagar</Button>

                            </Col>

                        </Row>


                    </Grid>

                </Jumbotron>

            </Grid>


        );

    }

}

export default ShoppingCartComponent;