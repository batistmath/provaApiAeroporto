const Funcionario = require('../model/modelFuncionario')
const bcrypt = require('bcrypt')

exports.emailexiste = async (email) => {
    const funcionario = await Funcionario.findOne({ email });
    return !!funcionario;
  }
exports.senhacorreta = async (email, senhadigitada) => {
    const funcionario = await Funcionario.findOne({ email });
    return await bcrypt.compare(senhadigitada, funcionario.senha)

}