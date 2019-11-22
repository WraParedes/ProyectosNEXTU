"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiendaController_1 = __importDefault(require("../controllers/tiendaController"));
class TiendaRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/:usuario/:contrasena', tiendaController_1.default.getOne);
        this.router.get('/ListaProductos', tiendaController_1.default.listaProductos);
        this.router.post('/DetalleProductos');
        this.router.put('/:codigo/:cantidad', tiendaController_1.default.update);
    }
}
const tiendaRoutes = new TiendaRoutes();
exports.default = tiendaRoutes.router;
