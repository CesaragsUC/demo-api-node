'use strict' // serve para o node entender que vamos usar o js no modo strict, ou seja, mais seguro

const app = require('../src/app') // importa o app

const express = require('express'); // para usar mvc, model e views no node
const http = require('http'); // cria servidor http
const debug = require('debug')('server:server'); // serve para debugar o código


const port = normalizePort(process.env.PORT || '3000'); // seta a porta
app.set('port', port); // seta a porta na aplicação


const server = http.createServer(app); // cria o servidor http
const router = express.Router(); // cria o router

// cria a rota
const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
});

app.use('/', route); // usa a rota

server.listen(port); // faz o servidor escutar a porta
server.on('error', onError); // se der erro, chama a função onError
server.on('listening', onListening); // se estiver ouvindo, chama a função onListening
console.log('API rodando na porta ' + port);


function normalizePort(val) {

    const port = parseInt(val, 10); // converte para inteiro 

    // se não for um número, retorna o valor
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0 ) {
        return port;
    }

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

    switch(error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
        default:
        throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
}