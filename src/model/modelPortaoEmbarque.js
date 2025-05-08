const mongoose = require('mongoose')

const modelSchema = new mongoose.Schema({
    codigo: String,
    disponivel: Boolean
});

const modelPortaoEmbarque = 'PortaodeEmbarque'

if(mongoose.connection && mongoose.connection.models[modelPortaoEmbarque]){
    module.exports = mongoose.connection.models[modelPortaoEmbarque];
} else {
    module.exports = mongoose.model(modelPortaoEmbarque, modelSchema)
}