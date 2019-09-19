import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProductCatalogComponent from './ProductCatalogComponent.js';
import { Grid, Jumbotron, Row, Col, Button } from 'react-bootstrap';

class ProductDetailComponent extends Component {

    constructor(props) {

        super(props);

        this.state = {
            product: props.product
        }

        this.goBack = this.goBack.bind(this);

    }

    goBack() {

        ReactDOM.render(
            <ProductCatalogComponent />,
            document.getElementById('content')
        );

    }

    render() {

        var img = require('./img/' + this.state.product.image);

        return (

            <Grid>

                <Jumbotron>

                    <Grid>

                        <Row>
                            <Col>

                                <h1>{this.state.product.name}</h1>

                            </Col>
                        </Row>

                        <Row>

                            <Col lg={6}>

                                <img src={img} alt={img} height="300px" />

                            </Col>

                            <Col lg={6}>

                                <h4>{this.state.product.name}</h4>

                                <h6> <strong> Precio:</strong> {this.state.product.price}</h6>

                                <h6> <strong> Unidades disponibles: </strong> {this.state.product.stock}</h6>

                            </Col>

                        </Row>

                        <Row>
                            <Col lg={2}>

                                <Button bsStyle="default" onClick={this.goBack} >Atrás</Button>

                            </Col>

                        </Row>

                    </Grid>

                </Jumbotron>

            </Grid>

        );
    }
}

export default ProductDetailComponent;