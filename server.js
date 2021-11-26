// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import rutasVenta from './views/ventas/rutas.js';
import rutasUsuario from './views/usuarios/rutas.js';
import rutasProducto from './views/productos/rutas.js';


dotenv.config({ path: './.env' });
const port = process.env.PORT || 5000;

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVenta);
app.use(rutasUsuario);
app.use(rutasProducto);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${port}`);
  });
};

conectarBD(main);