import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import './ShoppingCartItemComponent.css';

class ShoppingCartItemComponent extends Component {

    render() {

        var img = require('./img/' + this.props.item.product.image);

        return (

            <div className="itemBordered">

                <Row>

                    <Col lg={3}>

                        <img src={img} alt={img} height="50" width="100" />

                    </Col>
                    <Col lg={1} />
                    <Col lg={7}>

                        <h4> {this.props.item.product.name}</h4>

                        <h6> <strong>Unidades:</strong> {this.props.item.quantity}</h6>

                    </Col>

                </Row>

                <Row>

                    <Col>

                        <h6> <strong> Subtotal: </strong> {this.props.item.subtotal()}</h6>

                    </Col>

                </Row>

            </div>

        );
    }

}

export default ShoppingCartItemComponent;