var BDTienda = require('./datos/bdtienda.js'),
	Operaciones = require('./datos/usuariosCRUD.js');
	OpArticulos = require('./datos/articulosCRUD.js');

Operaciones.eliminarUsuario((error, result) => {
	if(error) console.log(error);
	else{
		console.log(result);
		Operaciones.insertarUsuario((error, result) => {
			if(error) console.log(error);
			console.log(result);
		});
	}
});

OpArticulos.eliminarAllArticulos((error, result) => {
	if(error) console.log(error);
	else {
		console.log(result);
		var articulos = [
			{nombre: "Aguacate", img: "aguacate.jpg", precio: "5.00", stock: "46"},
			{nombre: "Ajo", img: "ajo.jpg", precio: "2.00", stock: "75"},
			{nombre: "Almendras", img: "almendras.jpg", precio: "6.00", stock: "28"},
			{nombre: "Arándanos", img: "arandanos.jpg", precio: "6.00", stock: "39"},
			{nombre: "Brócoli", img: "brocoli.png", precio: "3.00", stock: "45"},
			{nombre: "Calabaza", img: "calabaza.jpg", precio: "6.00", stock: "40"},
			{nombre: "Canela", img: "canela.jpg", precio: "2.00", stock: "20"},
			{nombre: "Cebolla", img: "cebolla.jpg", precio: "4.00", stock: "30"},
			{nombre: "Fresa", img: "fresa.jpg", precio: "2.00", stock: "50"},
			{nombre: "Kiwi", img: "kiwi.jpg", precio: "3.00", stock: "36"},
			{nombre: "Limón", img: "limon.jpg", precio: "1.50", stock: "70"},
			{nombre: "Lychee", img: "lychee.jpg", precio: "5.00", stock: "80"},
			{nombre: "Maiz", img: "maiz.jpg", precio: "2.50", stock: "40"},
			{nombre: "Manzana", img: "manzana.jpg", precio: "3.40", stock: "39"},
			{nombre: "Naranja", img: "naranja.jpg", precio: "3.00", stock: "60"},
			{nombre: "Papa", img: "papa.jpg", precio: "3.50", stock: "60"},
			{nombre: "Pasta", img: "pasta.jpg", precio: "2.50", stock: "47"},
			{nombre: "Pimienta", img: "pimienta.jpg", precio: "3.80", stock: "70"},
			{nombre: "Repollo", img: "repollo.jpg", precio: "4.50", stock: "67"},
			{nombre: "Tomate", img: "tomate.jpg", precio: "2.80", stock: "78"},
			{nombre: "Zanahoria", img: "zanahoria.jpg", precio: "1.80", stock: "58"}
		]
		for (var i = 0; i < articulos.length ; i++) {
			var articulo = articulos[i];
			OpArticulos.insertarArticulo(articulo, (error, result) => {
				if(error) console.log(error);
				console.log(result);
			});
		}
	}
});
