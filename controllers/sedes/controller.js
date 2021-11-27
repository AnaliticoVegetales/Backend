import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllSedes = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Sedes').find({}).limit(50).toArray(callback);
};



const consultarSede = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Sedes').findOne({ _id: new ObjectId(id) }, callback);
};




export { queryAllSedes, consultarSede};
