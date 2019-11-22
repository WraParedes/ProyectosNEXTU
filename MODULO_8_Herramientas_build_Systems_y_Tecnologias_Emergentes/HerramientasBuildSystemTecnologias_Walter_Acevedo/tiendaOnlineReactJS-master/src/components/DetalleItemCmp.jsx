import React from 'react';
import { Link } from 'react-router-dom';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import ArticulosAction from '../actions/ArticulosAction';
import ArticulosStore from '../stores/ArticulosStore';
import '../styles/DetalleItem.css';

@ReactMixin.decorate(Reflux.connect(ArticulosStore, 'articulosstore'))
class DetalleItemCmp extends React.Component {
	componentDidMount(){
		ArticulosAction.getArticulo();
	}
  render() {
  	if(this.state.articulosstore){
  		let articulo = this.state.articulosstore,
  			img = require('../images/' + articulo.img);
  		return (
		    <div id="articuloSeleccionado">
				<div className="cabecera">
					<h2 className="titulo">{articulo.nombre}</h2>
				</div>
				<div className="detallearticulo">
					<div className="detimg">
						<img src={img} />
					</div>
					<div className="detdatos">
						<p>Precio: ${articulo.precio}</p>
						<p>Unidades disponibles: {articulo.stock}</p>
					</div>
				</div>
				<div>
					<Link className="volver" to={'/dash/catalogo'}>Volver</Link>
				</div>
			</div>
    	);
  	}
    return (
	    <div id="articuloSeleccionado">
			<div className="cabecera">
				<h2 className="titulo">No se ha seleccionado ningun articulo</h2>
			</div>
		</div>
    );
  }
}

export default DetalleItemCmp;
