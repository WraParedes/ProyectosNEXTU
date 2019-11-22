import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import ListaCompraCmp from './ListaCompraCmp';
import PagoCompraCmp from './PagoCompraCmp';
import ShopingAction from '../actions/ShopingAction';
import ShopingStore from '../stores/ShopingStore';
import '../styles/Carrito.css';

@ReactMixin.decorate(Reflux.connect(ShopingStore, 'shopingstore'))
class CarritoCmp extends React.Component {
	componentDidMount(){
		ShopingAction.getShoping();
	}
  render() {
  	if(this.state.shopingstore){
  		let lista = JSON.parse(this.state.shopingstore);
  		let total=0;
  		for (var i = 0; i < lista.length; i++) {
  			total += lista[i].item.precio*lista[i].cantidad;
  		}
  		return (
		    <div id="carrito">
				<div className="cabecera">
					<h2 className="titulo">Carrito de compras</h2>
				</div>
				<div className="detallecarrito">
					<ListaCompraCmp lista={lista} />
					<PagoCompraCmp error='' total={total} />
				</div>
			</div>
    	);
  	}
    return (
	    <div id="carrito">
			<div className="cabecera">
				<h2 className="titulo">No existe detalles de compras</h2>
			</div>
		</div>
    );
  }
}

export default CarritoCmp;
