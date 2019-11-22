import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import MenuBarCmp from './MenuBarCmp'
import CatalogoCmp from './CatalogoCmp'
import DetalleItemCmp from './DetalleItemCmp'
import CarritoCmp from './CarritoCmp'
import '../styles/DashPage.css'

class DashPage extends React.Component {
  render() {
    return (
	    <div id="dashboard">
			<Router>
        <div>
          <MenuBarCmp />
          <Route exact={true} path='/' component={ CatalogoCmp } />
          <Route path='/dash/catalogo' component={ CatalogoCmp } />
          <Route path='/dash/detalle' component={ DetalleItemCmp } />
          <Route path='/dash/carrito' component={ CarritoCmp } />
        </div>
      </Router>
		</div>
    );
  }
}

export default DashPage;