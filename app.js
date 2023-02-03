const express = require("express");
const https = require("https");
const fs = require("fs");
const bodyParser = require('body-parser');
const cors = require('cors')
const fileupload = require('express-fileupload')
const router = require("./server/router");
const private_key = fs.readFileSync("privatekey.key", "utf8");
const certificate = fs.readFileSync("certificate.crt", "utf8");

const corsOptions = {
    'credentials': true,
    'origin': true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'allowedHeaders': 'Authorization,X-Requested-With,X-HTTPMethod-Override,Content-Type,Cache-Control,Accept'
}

const app = express();

app.use(cors(corsOptions))
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(fileupload());
app.use(express.urlencoded());
app.use("/", router);



const httpsServer = https.createServer({key: private_key, cert: certificate}, app);
httpsServer.listen(3000);