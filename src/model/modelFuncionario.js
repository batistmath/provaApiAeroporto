const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    cargo: String
});

const modelPassageiro = 'Funcionario'
if(mongoose.connection && mongoose.connection.models[modelPassageiro]){
    module.exports = mongoose.connection.models[modelPassageiro];
} else {
    module.exports = mongoose.model(modelPassageiro, modelSchema)
}