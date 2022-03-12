// config inical
const express = require('express');
const { send } = require('express/lib/response');
const app = express();

const mongoose = require('mongoose');

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// rotas da API
const userRoutes = require('./routes/userRoutes')
app.use('/user', userRoutes)

// Rota inicial API
app.get('/', (req, res) => {
    res.send({ message : "Ok" })
})

// conexao com banco de dados
mongoose.connect('mongodb://localhost/apiNode')
.then(() => {
    console.log("Conecction with sucess")
    app.listen(3000)
}) // sucess
.catch((err) => console.log(err)) // erro