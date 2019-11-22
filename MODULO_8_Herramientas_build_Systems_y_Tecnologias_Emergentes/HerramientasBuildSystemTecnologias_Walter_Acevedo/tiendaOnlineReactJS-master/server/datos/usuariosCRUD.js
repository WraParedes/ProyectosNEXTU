var Usuario = require('./usuarioModel.js');
module.exports.insertarUsuario = function (callback) {
	let User1 = new Usuario({nombre: "Nombre de usuario 1", email: 'usuario1@nextu.com', password:'Cl@veUsuario1'});

	User1.save((error) => {
		if(error) callback(error);
		callback(null,"El usuario se ha guardado...");
	});
};

module.exports.eliminarUsuario = function (callback) {
	Usuario.remove({email: 'usuario1@nextu.com'}, (error) => {
		if(error) callback(error);
		callback(null,"El usuario se ha eliminado exitosamente...");
	});
};

module.exports.consultarUsuario = function (data, callback) {
	Usuario.findOne({email: data.email}, (err, user) => {
		if(user){
			if(user.password === data.password)
				callback(null,user);
      		else
      			callback('La contraseña ingresada es incorrecta');
      	} else
			callback('El usuario ingresado no existe...');
	});
};
