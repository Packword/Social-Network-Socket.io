const express = require("express");
const router = express.Router();
let users;
let subscribers = [];
let sessions = [];
const incomingForm = require("formidable").IncomingForm

global.isTesting = false;

router.post("/api/addNews", (req, res) => {
    let user = req.body.user;
    console.log("subs: " + subscribers);
    console.log("users: " + req.body.users);
    subscribers[user.id].socket.emit("created-news", {});
    console.log("send to " + user.id);
    for(const v of JSON.parse(req.body.users)) {
            console.log("send info to " + v);
            if(subscribers[v.id]) {
                console.log("final" + v.id);
                subscribers[v.id].socket.emit("created-news", {});
            }
    }
    res.status(200).end();
});

router.post('/api/authenticate', (req, res) => {
    if (req.body) {
        users = JSON.parse(req.body.users);
        let user = getUser(users, req.body.email, req.body.password);
        if(user !== null){
            res.status(200).send({
                isLogin: true,
                user: JSON.stringify(user),
            });
        }
        else {
            res.status(403).send({
                isLogin: false,
                user: JSON.stringify(user),
                errorMessage: 'wtf'
            });
        }
    }
});

if(!global.isTesting) {
    global.server_io.sockets.on("connection", (socket) => {
        console.log("success");

        socket.on("disconnect", () => {
            console.log("dis");
        });

        socket.on("news-subscribe", (args)=> {
            if(args.token) {
                console.log("sub");
                subscribers[args.token] = {token: args.token, socket};
            }
        });
    })
}

function getUser(curUsers, email, password){
    return curUsers.find(u => u.email === email && u.password === password);
}

module.exports = {router, getUser};