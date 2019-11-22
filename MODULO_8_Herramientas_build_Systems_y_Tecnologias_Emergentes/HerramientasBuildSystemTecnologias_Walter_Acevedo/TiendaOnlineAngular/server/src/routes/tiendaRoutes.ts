import { Router } from 'express';
import tiendaController from '../controllers/tiendaController';

class TiendaRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/:usuario/:contrasena', tiendaController.getOne);
        this.router.get('/ListaProductos', tiendaController.listaProductos);
        this.router.post('/DetalleProductos');
        this.router.put('/:codigo/:cantidad', tiendaController.update)
    }
}

const tiendaRoutes = new TiendaRoutes();
export default tiendaRoutes.router;