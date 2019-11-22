import Reflux from 'reflux';
import $ from 'jquery';
import LoginAction from '../actions/LoginAction';
import ProgresoAction from '../actions/ProgresoAction';

let LoginStore = Reflux.createStore({
  	listenables: [LoginAction],
    loginMsg: '',
  	loginUser: function(email, password){
  		  $.ajax({
  			    url:'./login',
    			  method: 'POST',
    			  dataType: 'json',
    			  context: this,
    			  data: {email: email, password: password}
  		  })
    		.done(function( res ) {
            this.loginMsg = res.loginMsg;
          	this.trigger(res);
          	ProgresoAction.mostrarProgreso(false);
    		});
  	},
    getLogin: function(){
      this.trigger({loginMsg: this.loginMsg});
    },
    loginOut: function(){
        this.trigger({loginMsg: ''});
    }
});

export default LoginStore;