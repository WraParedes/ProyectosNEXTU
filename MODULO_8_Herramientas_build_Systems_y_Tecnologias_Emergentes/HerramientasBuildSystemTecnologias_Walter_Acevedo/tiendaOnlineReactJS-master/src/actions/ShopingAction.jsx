import Reflux from 'reflux';

let ShopingAction = Reflux.createActions(
		[
			'setShoping',
			'limpiarCarrito',
			'getShoping'
		]
	);

export default ShopingAction;