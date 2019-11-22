import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import BuscarCmp from './BuscarCmp';
import ArticulosCmp from './ArticulosCmp';
import ArticulosAction from '../actions/ArticulosAction';
import ArticulosStore from '../stores/ArticulosStore';
import '../styles/Catalogo.css';

@ReactMixin.decorate(Reflux.connect(ArticulosStore, 'articulosstore'))
class CatalogoCmp extends React.Component {
	constructor(props){
    	super(props);
      	this.state = {
        	articulos: [],
        	filtrados:[],
        	filtro:false
      	};
      	this.onChange = this.onChange.bind(this);
  	}
  	componentDidMount(){
  		ArticulosAction.getArticulos();
  	}
  	onChange(e){
  		this.setState({filtro: true});
  		let articulosfiltrados = this.state.articulos;
  		articulosfiltrados = articulosfiltrados.filter(function(item) {
  			return item.nombre.toLowerCase().search(e.target.value.toLowerCase()) != -1;
  		});
  		this.setState({filtrados: articulosfiltrados});
  	}
  render() {
  	let items;
  	if(this.state.articulosstore && this.state.articulos != this.state.articulosstore){
  		this.setState({articulos: this.state.articulosstore});
  	}
  	if(this.state.filtro) items = this.state.filtrados;
  	else items = this.state.articulos;
    return (
	    <div id="catalogo">
			<div className="cabecera">
				<h2 className="titulo">Catálogo de productos</h2>
				<BuscarCmp onChange={this.onChange} />
			</div>
			<ArticulosCmp articulos={items} />
		</div>
    );
  }
}

export default CatalogoCmp;