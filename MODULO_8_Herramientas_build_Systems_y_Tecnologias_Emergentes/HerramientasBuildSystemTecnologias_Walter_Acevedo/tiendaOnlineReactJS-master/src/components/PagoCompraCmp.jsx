import React from 'react';
import { Link } from 'react-router-dom';
import ArticulosAction from '../actions/ArticulosAction';
import ProgressCmp from './ProgressCmp';

class PagoCompraCmp extends React.Component {
	constructor(props){
    	super(props);
      	this.state = {
        	cargando: false
      	};
      	this.pagarCompra = this.pagarCompra.bind(this);
  	}
	pagarCompra(){
		ArticulosAction.pagarCompra();
		this.setState({cargando: true});
	}
  	render() {
  		let progreso,
  			error;
  		if(this.state.cargando) progreso = <ProgressCmp />;
  		if(this.props.error != '') error = <div className="alertaUp">{this.props.error}</div>;
  		return (
			<div className="total">
				<div>
					<h2>Total: ${this.props.total}</h2>
				</div>
				<div>
					<Link className="boton" to={'/dash/catalogo'}>Cancelar</Link>
					<Link className="boton" to={'/dash/catalogo'} onClick={this.pagarCompra} >Pagar</Link>
				</div>
				{progreso}
			   	{error}
			</div>
    	);
  	}
}

export default PagoCompraCmp;