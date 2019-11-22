import { Request, Response } from 'express';
import pool from '../database';


class TiendasController {
    public async list(req: Request, res: Response) {
        await pool.query('SELECT * FROM usuarios_tienda', function (err, rows, fields) {
            if (err) alert("...");
            else {
                console.log(rows);
                res.json(rows);
            }
        });
    }

    public async getOne(req: Request, res: Response): Promise<void> {
        const { usuario } = req.params;
        const { contrasena } = req.params;
        await pool.query('SELECT * FROM usuarios_tienda WHERE usuario = ? and contrasena = ?', [usuario, contrasena], function (err, rows, fields) {
            if (err) alert("...");
            else {
                console.log(rows);
                res.json(rows);
            }
        });
    }

    public async listaProductos(req: Request, res: Response) {
        await pool.query('SELECT * FROM productos', function (err, rows, fields) {
            if (err) alert("...");
            else {
                console.log(rows);
                res.json(rows);
            }
        });
    }

    public async create(req: Request, res: Response): Promise<void> {
        await pool.query('INSERT INTO usuarios_tienda set ?', [req.body])
        console.log(req.body);
        res.json({ message: 'Juego guardado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { codigo } = req.params;
        const { cantidad } = req.params;
        await pool.query('UPDATE productos SET unidades_disponibles = unidades_disponibles - ? WHERE CODIGO = ?', [cantidad, codigo]);
        res.json({ message: 'The game was updated...' });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM usuarios_tienda WHERE id = ?', [id]);
        res.json({ message: 'The game was deleted' });
    }
}

export const tiendaController = new TiendasController();
export default tiendaController; 