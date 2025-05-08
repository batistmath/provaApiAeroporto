// src/validations/validarPortaoEmUso.js
const Voo = require('../model/modelVoo');

exports.portaoUso = async (portaoId) => {
  const voo = await Voo.findOne({ portaoId });
  return !!voo;
}

