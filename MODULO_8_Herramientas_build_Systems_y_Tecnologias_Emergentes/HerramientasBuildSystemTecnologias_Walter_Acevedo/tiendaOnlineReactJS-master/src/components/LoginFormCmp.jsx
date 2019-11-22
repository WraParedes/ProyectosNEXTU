import React from 'react';
import TextField from './TextFieldCmp';
import LoginAction from '../actions/LoginAction';
import ProgresoAction from '../actions/ProgresoAction';

class LoginFormCmp extends React.Component {
	constructor(props){
		super(props);
    	this.state = {
    		email: '',
    		password: '',
    		errors: {}
    	};

    	this.onSubmit = this.onSubmit.bind(this);
    	this.onChange = this.onChange.bind(this);
	}

	onSubmit(e){
		e.preventDefault();
        if(this.esValido()){
            ProgresoAction.mostrarProgreso(true);
            LoginAction.loginUser(this.state.email, this.state.password);
        }
	}

	onChange(e){
		this.setState({[e.target.name]: e.target.value});
	}

    esValido(){
        let err = true
        const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let errors = {};
        if(!emailRegex.test(this.state.email)){
            errors.email = 'El correo electrónico ingresado es incorrecto...';
            err = false;
        }

        if(this.state.password.trim() == ''){
            errors.password = 'La contraseña ingresada es incorrecta...';
            err = false;
        }

        this.setState({ errors });

        return err;
    }
  render() {
  	const {email, password, errors} = this.state;
    return (
	    <form onSubmit={this.onSubmit}>
        	<TextField
        		field="email"
        		label="Correo Electrónico :"
        		value={email}
        		error={errors.email}
        		onChange={this.onChange}
        		type="email"
        	/>

        	<TextField
        		field="password"
        		label="Contraseña :"
        		value={password}
        		error={errors.password}
        		onChange={this.onChange}
        		type="password"
        	/>

        	<div className="fields-button">
            	<button className="loginButton">Ingresar</button>
        	</div>
    	</form>
    );
  }
}

export default LoginFormCmp;
