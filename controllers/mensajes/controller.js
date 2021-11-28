import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllMensajes = async (callback) => {
  const baseDeDatos = getDB();
  console.log('query');
  await baseDeDatos.collection('Mensajes').find({}).limit(50).toArray(callback);
};

const crearMensaje = async (datosMensaje, callback) => {
  if (
    Object.keys(datosMensaje).includes('nombre') &&
    Object.keys(datosMensaje).includes('correo') &&
    Object.keys(datosMensaje).includes('mensaje') &&
    Object.keys(datosMensaje).includes('estado')
  ) {
    const baseDeDatos = getDB();
    // Código para crear Productos en la BD
    await baseDeDatos.collection('Mensajes').insertOne(datosMensaje, callback);
  } else {
    return 'error';
  }
};

const consultarMensaje = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Mensajes').findOne({ _id: new ObjectId(id) }, callback);
};

const editarMensaje = async (id, edicion, callback) => {
  const filtroMensaje = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('Mensajes')
    .findOneAndUpdate(filtroMensaje, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarMensaje = async (id, callback) => {
  const filtroMensaje = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Mensajes').deleteOne(filtroMensaje, callback);
};

export { queryAllMensajes, crearMensaje, consultarMensaje, editarMensaje, eliminarMensaje };
