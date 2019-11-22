import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import { Link } from 'react-router-dom';
import LoginAction from '../actions/LoginAction';
import ShopingStore from '../stores/ShopingStore';
import '../styles/MenuBar.css'
import imgDash from '../images/ic_dashboard_black_24px.svg';
import imgShopping from '../images/ic_shopping_cart_black_24px.svg';
import imgCredit from '../images/ic_credit_card_black_24px.svg';
import imgExit from '../images/ic_exit_to_app_black_24px.svg';

@ReactMixin.decorate(Reflux.connect(ShopingStore, 'shopingstore'))
class MenuBarCmp extends React.Component {
	constructor(){
		super();
		this.salir = this.salir.bind(this);
	}
	salir(){
		LoginAction.loginOut();
	}
  render() {
  	let spamCar;
  	if (this.state.shopingstore) {
  		const nump = JSON.parse(this.state.shopingstore).length
  		if(nump>0) spamCar = <span className="numProd">{nump}</span>
  	}
    return (
	    <nav>
		    <div className="navbar">
		      <div className="title">La Bodega</div>
		      <ul className="menu">
		      	<li><Link className="enlase" to="/" onClick={this.salir} ><img src={imgExit} /></Link></li>
		      	<li><Link className="enlase" to="/dash/catalogo" ><img src={imgCredit} /></Link></li>
		      	<li><Link className="enlase" to="/dash/carrito" ><img src={imgShopping} /></Link>{spamCar}</li>
		        <li><Link className="enlase" to="/dash/catalogo" ><img src={imgDash} /></Link></li>
		      </ul>
		    </div>
		</nav>
    );
  }
}

export default MenuBarCmp;