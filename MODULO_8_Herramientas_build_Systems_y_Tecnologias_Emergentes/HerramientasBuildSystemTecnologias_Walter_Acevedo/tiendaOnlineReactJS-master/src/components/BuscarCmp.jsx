import React from 'react';

class BuscarCmp extends React.Component {
	constructor(props){
		super(props);
	}
  render() {
    return (
    	<div className="panelBusqueda">
			<label for="busqueda">¿Qué buscas?</label>
			<input type="text" onChange={this.props.onChange} name="busqueda" placeholder="Buscar producto" />
		</div>
    );
  }
}

export default BuscarCmp;
