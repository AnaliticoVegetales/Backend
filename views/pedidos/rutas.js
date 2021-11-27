import Express from 'express';
import {
  queryAllSales,
  crearPedido,
  editarPedido,
  eliminarPedido,
  consultarPedido,
} from '../../controllers/pedidos/controller.js';

const rutasPedido = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los pedidos');
  } else {
    res.json(result);
  }
};

rutasPedido.route('/pedidos').get((req, res) => {
  console.log('alguien hizo get en la ruta /pedidos');
  queryAllSales(genercCallback(res));
});

rutasPedido.route('/pedidos').post((req, res) => {
  crearPedido(req.body, genercCallback(res));
});

rutasPedido.route('/pedidos/:id').get((req, res) => {
  console.log('alguien hizo get en la ruta /pedidos');
  consultarPedido(req.params.id, genercCallback(res));
});

rutasPedido.route('/pedidos/:id').patch((req, res) => {
  editarPedido(req.params.id, req.body, genercCallback(res));
});

rutasPedido.route('/pedidos/:id').delete((req, res) => {
  eliminarPedido(req.params.id, genercCallback(res));
});

export default rutasPedido;
