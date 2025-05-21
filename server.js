const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3000

const passageiroRoutes = require('./src/router/routerPassageiro')
app.use('/passageiro', passageiroRoutes)

const vooRoutes = require('./src/router/routerVoo')
app.use('/voo', vooRoutes)

const portaoRoutes = require('./src/router/routerPortaoEmbarque')
app.use('/portao', portaoRoutes)

const funcionarioRoutes = require('./src/router/routerFuncionario')
app.use('/funcionario', funcionarioRoutes)

const getRelatorio = require('./src/router/routerRelatorio')
app.use('/relatorio', getRelatorio)

app.listen(port, () => {
    mongoose.connect("mongodb://localhost:27017/apiAeroporto")
    console.log("Servidor rodando na porta -> ", port)
}) 