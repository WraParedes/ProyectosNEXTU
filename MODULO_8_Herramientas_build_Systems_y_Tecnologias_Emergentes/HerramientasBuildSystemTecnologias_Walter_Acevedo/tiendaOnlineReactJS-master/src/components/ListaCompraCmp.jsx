import React from 'react';

class ListaCompraCmp extends React.Component {
  	renderLista(){
  		return this.props.lista.map((caritem, index) => {
  			let img = require('../images/' + caritem.item.img);
  			return (
  				<li key={index}>
  					<div className="itemdata">
  						<div className="isq">
  							<img src={img} />
  						</div>
  						<div className="der">
  							<p>{caritem.item.nombre}</p>
  							<p>Unidades: {caritem.cantidad}</p>
  						</div>
  					</div>
  					<div className="subtotal">
  						<p>Subtotal: ${caritem.item.precio*caritem.cantidad}</p>
  					</div>
  				</li>
      	);
    	});
  	}
  render() {
    return (
      <div className="lista">
       	<ul>
          {this.renderLista()}
        </ul>
      </div>
    );
  }
}

export default ListaCompraCmp;