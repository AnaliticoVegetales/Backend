import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

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

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://analitico-vegetales.us.auth0.com/.well-known/jwks.json'
}),
audience: 'autenticacion-analitico-vegetales',
issuer: 'https://analitico-vegetales.us.auth0.com/',
algorithms: ['RS256']
});

app.use(jwtCheck);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${port}`);
  });
};

conectarBD(main);