import React from 'react';
import { Link } from 'react-router-dom';
import ArticulosAction from '../actions/ArticulosAction';
import ShopingAction from '../actions/ShopingAction';

class ArticulosCmp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cant: '1'
    };
    this.vermasClick = this.vermasClick.bind(this);
    this.addClick = this.addClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  vermasClick(item) {
    ArticulosAction.setArticulo(item);
  }
  onChange(e){
    this.setState({cant: e.target.value});
  }
  addClick(item) {
    ShopingAction.setShoping(item, this.state.cant);
  }
  renderArticulos(){
    return this.props.articulos.map((articulo) => {
      let img = require('../images/' + articulo.img);
      return (
        <div key={articulo._id} className="articulo">
          <div>
            <img src={img} />
          </div>
          <div>
            <h4>{articulo.nombre}</h4>
            <p>Precio: ${articulo.precio}</p>
            <p>Unidades disponibles: {articulo.stock}</p>
          </div>
          <div className="botones">
            <div className="isq">
              <Link to={'/dash/detalle'} className="vermas" onClick={() => ArticulosAction.setArticulo(articulo)}>Ver Más</Link>
            </div>
            <div className="der">
              <a className="add" onClick={() => this.addClick(articulo)}>Añadir</a>
              <input type="number" name="cantidad" onChange={this.onChange} min="1" max={articulo.stock} />
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="articulos">
        <div className="items">
          {this.renderArticulos()}
        </div>
      </div>
    );
  }
}

export default ArticulosCmp;