import Reflux from 'reflux';

let ArticulosAction = Reflux.createActions(
		[
			'getArticulos',
			'upArticulos',
			'setArticulo',
			'getArticulo',
			'pagarCompra'
		]
	);

export default ArticulosAction;