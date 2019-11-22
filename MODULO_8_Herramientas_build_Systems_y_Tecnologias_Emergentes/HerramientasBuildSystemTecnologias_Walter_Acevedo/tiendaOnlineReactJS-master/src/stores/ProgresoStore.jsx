import Reflux from 'reflux';
import ProgresoAction from '../actions/ProgresoAction';

let ProgresoStore = Reflux.createStore({
	listenables: [ProgresoAction],
	mostrarProgreso: function(activo){
		if(activo){
			this.trigger(true);
		} else {
			this.trigger(false);
		}
	}
});

export default ProgresoStore;