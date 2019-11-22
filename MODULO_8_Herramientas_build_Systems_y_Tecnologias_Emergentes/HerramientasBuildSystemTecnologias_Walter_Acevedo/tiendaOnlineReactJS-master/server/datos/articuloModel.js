var mongoose = require('mongoose');
	
var articuloSchema = new mongoose.Schema({
	nombre: {type: String, required: true},
	img: {type: String, required: true},
	precio: {type: String, required: true},
	stock: String,
});
var Articulo = mongoose.model('Articulo', articuloSchema);
module.exports = Articulo;