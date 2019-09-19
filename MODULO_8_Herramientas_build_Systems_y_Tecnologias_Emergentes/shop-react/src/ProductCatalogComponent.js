import React, { Component } from 'react';
import ProductItemComponent from './ProductItemComponent.js'
import { Grid, Row, Col } from 'react-bootstrap';
import Session from './model/Session';
import Product from './model/Product';

class ProductCatalogComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSourceReady: false,
      productsToDisplay: [],
      products: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {

    const searchingText = event.target.value;

    if (searchingText.length > 0) {

      const productsToDisplay = this.state.products.filter(
        product => product.name.toLowerCase().indexOf(searchingText.toLowerCase()) >= 0
      )

      this.setState({
        productsToDisplay: productsToDisplay
      });

    } else {

      this.setState({
        productsToDisplay: this.state.products
      });

    }

  }

  componentDidMount() {

    this.performGetProducts()

  }

  performGetProducts() {

    var session = Session.getInstance();

    var headers = {
      'Authorization': 'Kinvey ' + session.user.token,
      'X-Kinvey-API-Version': '3'
    };

    fetch("https://baas.kinvey.com/appdata/kid_ryL78U7WM/products", {
      method: 'get',
      headers: headers
    }).then(response => response.json())
      .then(responseJson => {

        console.log(responseJson);

        if (responseJson.error) {

          alert('error');

        } else {

          var products = [];
          responseJson.forEach(element => {

            var product = new Product();
            product.id = element._id;
            product.name = element.name;
            product.image = element.image;
            product.price = element.price;
            product.stock = element.stock;

            products.push(product);

          });

          this.setState({
            dataSourceReady: true,
            products: products,
            productsToDisplay: products
          })

        }

      })
      .catch(error => {

        console.error(error);

      })
  }

  render() {

    var body;
    if (this.state.dataSourceReady) {
      
      body = [];
      
      this.state.productsToDisplay.forEach(element => {

        body.push(<Col lg={3} key={element.id}><ProductItemComponent product={element} /></Col>);

      });

    } else {
      body = <h1>Cargando...</h1>
    }

    return (

      <Grid>

        <Row>

          <Col lg={6}>

            <h1>Catálogo de productos</h1>

          </Col>

          <Col lg={6} className="text-right">
            <p>¿Qué estás buscando?</p>
            <input type="text" onChange={this.handleChange} />
          </Col>

        </Row>

        <Row>
          {body}
        </Row>

      </Grid>

    );

  }

}

export default ProductCatalogComponent;