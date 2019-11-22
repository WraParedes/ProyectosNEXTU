"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class TiendasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM usuarios_tienda', function (err, rows, fields) {
                if (err)
                    alert("...");
                else {
                    console.log(rows);
                    res.json(rows);
                }
            });
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario } = req.params;
            const { contrasena } = req.params;
            yield database_1.default.query('SELECT * FROM usuarios_tienda WHERE usuario = ? and contrasena = ?', [usuario, contrasena], function (err, rows, fields) {
                if (err)
                    alert("...");
                else {
                    console.log(rows);
                    res.json(rows);
                }
            });
        });
    }
    listaProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('SELECT * FROM productos', function (err, rows, fields) {
                if (err)
                    alert("...");
                else {
                    console.log(rows);
                    res.json(rows);
                }
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO usuarios_tienda set ?', [req.body]);
            console.log(req.body);
            res.json({ message: 'Juego guardado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codigo } = req.params;
            const { cantidad } = req.params;
            yield database_1.default.query('UPDATE productos SET unidades_disponibles = unidades_disponibles - ? WHERE CODIGO = ?', [cantidad, codigo]);
            res.json({ message: 'The game was updated...' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM usuarios_tienda WHERE id = ?', [id]);
            res.json({ message: 'The game was deleted' });
        });
    }
}
exports.tiendaController = new TiendasController();
exports.default = exports.tiendaController;
