const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');

const corsOptions = {
    'credentials': true,
    'origin': true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTPMethod-Override,Content-Type,Cache-Control,Accept',
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(corsOptions));


const http_server = require("http").createServer(app);

const io = require("socket.io")(http_server, {
    cors: {
        origins: ["*"],
        handlePreflightRequest: (req, res) => {
            res.writeHead(200, {
                "Access-Control-Allow-Credintals": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,GET,HEAD,PATCH,DELETE",
            });
            res.end();
        }
    }
})
global.server_io = io;
const router = require("./server/router.js").router;
app.use("/", router);
http_server.listen(5000);

module.exports = app;