var express = require('express');
var BDAgenda = require('../datos/bdtienda.js'),
	Operaciones = require('../datos/articulosCRUD.js');
var Router = express.Router();

Router.post('/new', (req, res) => {
	data = {nombre: req.body.nombre, precio: req.body.precio, stock: req.body.stock};
	Operaciones.insertarArticulo(data, (error, result) => {
		if(error) res.send(error);
		res.send(result);
	});
});

Router.get('/all', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	Operaciones.consultarArticulos((error, result) => {
		if(error) res.json(error);
		else res.status(200).jsonp(result);
	});
});

Router.post('/update', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	Operaciones.actualizarArticulos(req.body, (error, result) => {
		if(error) res.status(200).jsonp({updateMsg:error});
		else res.status(200).jsonp({updateMsg:"Ok"});
	});
});
module.exports = Router;