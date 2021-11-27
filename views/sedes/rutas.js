import Express from 'express';
import {
  queryAllSedes,
  consultarSede,
} from '../../controllers/sedes/controller.js';

const rutasSede = Express.Router();

const genercCallback = (res) => (err, result) => {
  if (err) {
    res.status(500).send('Error consultando los sedes');
  } else {
    res.json(result);
  }
};

rutasSede.route('/sedes').get((req, res) => {
  console.log('Get en la ruta /sedes');
  queryAllSedes(genercCallback(res));
});



rutasSede.route('/sedes/:id').get((req, res) => {
  console.log('Get en la ruta /sedes');
  consultarSede(req.params.id, genercCallback(res));
});


export default rutasSede;
