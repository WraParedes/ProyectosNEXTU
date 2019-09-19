import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HeaderComponent from './HeaderComponent.js';
import ProductCatalogComponent from './ProductCatalogComponent';
import { Jumbotron, Grid, Row } from 'react-bootstrap';
import './DashboardComponent.css';

class DashboardComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {

        ReactDOM.render(
            <ProductCatalogComponent />,
            document.getElementById('content')
        )

    }

    render() {

        return (

            <div className="background">

                <Grid >
                    <Row>
                        <HeaderComponent />
                    </Row>

                    <Row>

                        <Jumbotron>

                            <div id="content" />

                        </Jumbotron>

                    </Row>

                </Grid>
            </div>

        );

    }

}

export default DashboardComponent;