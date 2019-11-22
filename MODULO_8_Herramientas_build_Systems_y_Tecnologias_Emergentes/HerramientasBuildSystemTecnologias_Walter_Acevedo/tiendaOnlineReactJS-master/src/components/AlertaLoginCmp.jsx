import React from 'react';

class AlertaLoginCmp extends React.Component {
  render() {
    return (
	    <div className="alertaLogin">{this.props.msgLogin}</div>
    );
  }
}

export default AlertaLoginCmp;