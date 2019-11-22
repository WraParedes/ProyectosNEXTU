var mongoose = require('mongoose');  
var usuarioSchema = new mongoose.Schema({
	nombre: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true}
});
var Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
