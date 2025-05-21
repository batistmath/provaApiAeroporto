const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    numeroVoo: String,
    origem: String,
    destino: String,
    dataHoraPartida: Date,
    portaoId: String,
    status: String
});


const modelVoo = 'Voo'
if(mongoose.connection && mongoose.connection.models[modelVoo]){
    module.exports = mongoose.connection.models[modelVoo];
} else {
    module.exports = mongoose.model(modelVoo, modelSchema)
}