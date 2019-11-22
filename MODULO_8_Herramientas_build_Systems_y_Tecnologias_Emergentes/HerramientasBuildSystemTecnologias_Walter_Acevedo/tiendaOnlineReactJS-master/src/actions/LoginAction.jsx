import Reflux from 'reflux';

let LoginAction = Reflux.createActions(
		[
			'loginUser',
			'loginOut'
		]
	);

export default LoginAction;