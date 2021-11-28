import Express from 'express';
import {
  queryAllMensajes,
  crearMensaje,
  editarMensaje,
  eliminarMensaje,
  consultarMensaje,
} from '../../controllers/mensajes/controller.js';

const rutasMensaje = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los mensajes');
  } else {
    res.json(result);
  }
};

rutasMensaje.route('/mensajes').get((req, res) => {
  console.log('Get en la ruta /mensajes');
  queryAllMensajes(genercCallback(res));
});

rutasMensaje.route('/mensajes').post((req, res) => {
  crearMensaje(req.body, genercCallback(res));
});

rutasMensaje.route('/mensajes/:id').get((req, res) => {
  console.log('Get en la ruta /mensajes');
  consultarMensaje(req.params.id, genercCallback(res));
});

rutasMensaje.route('/mensajes/:id').patch((req, res) => {
  editarMensaje(req.params.id, req.body, genercCallback(res));
});

rutasMensaje.route('/mensajes/:id').delete((req, res) => {
  eliminarMensaje(req.params.id, genercCallback(res));
});

export default rutasMensaje;
