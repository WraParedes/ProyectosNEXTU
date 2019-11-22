import Reflux from 'reflux';
import ShopingAction from '../actions/ShopingAction';
import ArticulosAction from '../actions/ArticulosAction';

let ShopingStore = Reflux.createStore({
	listenables: [ShopingAction],
	carShoping: [],
	setShoping: function(item, cantidad){
		let cant = parseInt(cantidad);
		ArticulosAction.upArticulos(item._id, cant);
		let encontrado = -1;
	    for (var j = 0; j < this.carShoping.length; j++) {
	      if(this.carShoping[j].item._id == item._id){
	        encontrado = j;
	      }
	    }

	    if(encontrado != -1){
	      this.carShoping[encontrado].cantidad = this.carShoping[encontrado].cantidad + cant;
	    } else {
	      this.carShoping.push({item: item, cantidad: cant});
	    }

		this.trigger(JSON.stringify(this.carShoping));
	},
	limpiarCarrito(){
		this.carShoping.length=0;
		this.carShoping = []
		this.trigger(JSON.stringify(this.carShoping));
	},
	getShoping: function(){
		this.trigger(JSON.stringify(this.carShoping));
	}
});

export default ShopingStore;