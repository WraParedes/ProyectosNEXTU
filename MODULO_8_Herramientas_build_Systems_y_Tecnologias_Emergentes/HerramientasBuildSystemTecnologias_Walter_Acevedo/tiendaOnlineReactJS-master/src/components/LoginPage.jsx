import React from 'react';
import AlertaLoginCmp from './AlertaLoginCmp';
import LoginFormCmp from './LoginFormCmp';
import ProgressCmp from './ProgressCmp';
import '../styles/LoginPage.css'

class LoginPage extends React.Component {
	constructor(props){
		super(props);
    	this.state = {
    		msgLogin: ''
    	};
	}

  render() {
  	let progreso,
  		alertaLogin;
    if(this.props.errorLogin !== '') this.setState({msgLogin: this.props.errorLogin});
    if(this.props.progressLogin) progreso = <ProgressCmp />;
  	if(this.state.msgLogin !== '') alertaLogin = <AlertaLoginCmp msgLogin={this.state.msgLogin} />;
    return (
	    <div className="loginContainer">
	    	{alertaLogin}
	        <div className="loginTitle">Inicia Sesión</div>
	        <LoginFormCmp />
	        {progreso}
	    </div>
    );
  }
}

export default LoginPage;
