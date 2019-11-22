"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.send('hola con');
    }
}
exports.indexController = new IndexController();
