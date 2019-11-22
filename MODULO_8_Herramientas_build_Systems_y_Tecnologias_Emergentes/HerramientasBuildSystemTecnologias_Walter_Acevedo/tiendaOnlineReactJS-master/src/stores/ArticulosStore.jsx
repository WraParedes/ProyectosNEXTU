import Reflux from 'reflux';
import $ from 'jquery';
import ArticulosAction from '../actions/ArticulosAction';
import ShopingAction from '../actions/ShopingAction';

let ArticulosStore = Reflux.createStore({
	listenables: [ArticulosAction],
	articulos: [],
	articulo: {},
	getArticulos: function(){
		if(this.articulos.length > 0)
			this.trigger(this.articulos);
		else {
			$.ajax({
				url:'/articulos/all',
	  			method: 'GET',
	  			context: this
			})
	  		.done(function( res ) {
	  			this.articulos = res;
	        	this.trigger(this.articulos);
	  		});
		}
	},
	upArticulos: function(id, cant){
		for (var i = 0; i < this.articulos.length; i++) {
			if(this.articulos[i]._id == id) this.articulos[i].stock = this.articulos[i].stock - cant;
		}
		this.trigger(this.articulos);
	},
	setArticulo: function(item){
		this.articulo = item;
	},
	getArticulo: function(){
		this.trigger(this.articulo);
	},
	pagarCompra: function(){
		const data = JSON.stringify(this.articulos);
		$.ajax({
			url:'/articulos/update',
  			method: 'POST',
    		contentType: 'application/json; charset=utf-8',
  			context: this,
  			data: data
		})
  		.done(function( res ) {
  			if(res.updateMsg = 'Ok'){
  				ShopingAction.limpiarCarrito();
  				this.trigger(this.articulos);
  			} else this.getArticulos();
  		});
	}
});

export default ArticulosStore;