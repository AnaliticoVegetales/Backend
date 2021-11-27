import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllSales = async (callback) => {
  const baseDeDatos = getDB();
  console.log('query');
  await baseDeDatos.collection('Pedidos').find({}).limit(50).toArray(callback);
};

const crearPedido = async (datosPedido, callback) => {
  if (
    Object.keys(datosPedido).includes('fecha') &&
    Object.keys(datosPedido).includes('producto') &&
    Object.keys(datosPedido).includes('cliente') &&
    Object.keys(datosPedido).includes('cantidad') &&
    Object.keys(datosPedido).includes('precio') &&
    Object.keys(datosPedido).includes('transportador') &&
    Object.keys(datosPedido).includes('sede') &&
    // Object.keys(datosPedido).includes('region') &&
    Object.keys(datosPedido).includes('estado')&&
    Object.keys(datosPedido).includes('total')
  ) {
    const baseDeDatos = getDB();
    // Código para crear Productos en la BD
    await baseDeDatos.collection('Pedidos').insertOne(datosPedido, callback);
  } else {
    return 'error';
  }
};

const consultarPedido = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Pedidos').findOne({ _id: new ObjectId(id) }, callback);
};

const editarPedido = async (id, edicion, callback) => {
  const filtroPedido = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('Pedidos')
    .findOneAndUpdate(filtroPedido, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarPedido = async (id, callback) => {
  const filtroPedido = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('Pedidos').deleteOne(filtroPedido, callback);
};

export { queryAllSales, crearPedido, consultarPedido, editarPedido, eliminarPedido };
