const express = require('express');
const app = express();
const routes = require('./router');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


const server = require('http').Server(app);
const io = require('socket.io')(server)

app.use(cors());

/**recebe a conexão com o front ou mobile */
io.on('connection', socket => {
    /**Cria uma rota dentro do socket */
    socket.on('connectRoom', box => {

        /**Cria uma sala única com id de uma box específica */
        socket.join(box);
    })
})


mongoose.connect('mongodb+srv://omnistack-user-db:omnistack@cluster0-ndiry.mongodb.net/rocketbox?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use((req, res, next) => {
    req.io = io;
    return next();
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')))
app.use(routes);


server.listen( process.env.PORT || 3333);
