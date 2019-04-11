const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')

const app = express();
app.use(cors());
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    socket.on('connectRoom', folder => {
        socket.join(folder)
    })
})

mongoose.connect(
    'mongodb+srv://victor:victor123@cluster0-b3gck.gcp.mongodb.net/fileSys?retryWrites=true',
    {
        useNewUrlParser: true
    }
);

app.use((request, response, next) =>{
    request.io = io;
    return next();
});

app.use(express.json());
app.use('./files', express.static(path.resolve(__dirname, "..", "tmp")))

app.use(express.urlencoded({extended: true})); // permite que possamos enviar arquivos nas requisições
app.use(require("./routes"));
server.listen(69);
 