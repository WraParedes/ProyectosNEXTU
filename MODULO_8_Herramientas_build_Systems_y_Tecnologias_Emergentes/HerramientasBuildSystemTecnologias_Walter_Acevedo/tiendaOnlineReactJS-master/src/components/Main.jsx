import React from 'react';
import Reflux from 'reflux';
import ReactMixin from 'react-mixin';
import LoginPage from './LoginPage';
import DashPage from './DashPage';
import ProgresoStore from '../stores/ProgresoStore';
import LoginStore from '../stores/LoginStore';

@ReactMixin.decorate(Reflux.connect(ProgresoStore, 'progresostore'))
@ReactMixin.decorate(Reflux.connect(LoginStore, 'loginstore'))
class Main extends React.Component {
  render() {
    if(this.state.progresostore) return (<LoginPage errorLogin='' progressLogin={this.state.progresostore} />);
    if(this.state.loginstore){
      	if(this.state.loginstore.loginMsg == 'Ok') return (<DashPage />);
      	else return (<LoginPage errorLogin={this.state.loginstore.loginMsg} progressLogin={false} />);
    }
    return (<LoginPage errorLogin='' progressLogin={false} />);
  }
}

export default Main;