// src/validations/validarCpf.js
const Passageiro = require('../model/modelPassageiro');
const Voo = require('../model/modelPassageiro')

exports.cpfExiste = async (cpf) => {
  const passageiro = await Passageiro.findOne({ cpf });
  return !!passageiro;
};
exports.vooStatus = async(vooId) => {
  const voo = await Voo.findOne({ vooId })
  if (voo.status == 'embarque') {
    return voo
  }
}

