const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    nome: String,
    cpf: Number,
    vooId: String,
    statusCheckin: String
});

const modelPassageiro = 'Passageiro'
if(mongoose.connection && mongoose.connection.models[modelPassageiro]){
    module.exports = mongoose.connection.models[modelPassageiro];
} else {
    module.exports = mongoose.model(modelPassageiro, modelSchema)
}