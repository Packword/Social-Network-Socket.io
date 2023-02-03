const express = require("express");
const router = express.Router();
const fs = require("fs");
const users = require("../data/users.json");

const {stringify} = require("nodemon/lib/utils");

router.get("/", (req, res, next) => {
    res.render("userList");
});

router.get("/users", (req, res) => {
    res.end(JSON.stringify(users));
});

router.post("/users", (req, res, next) => {
    if(req.body.name !== "") {
        let user = {
            id: parseInt(users[users.length - 1].id) + 1,
            name: req.body.name,
            birthday: req.body.birthday,
            email: req.body.email,
            password: req.body.password,
            photo: "/img/default.png",
            role: "user",
            status: "active",
            friends: [""],
            news: [""]
        }
        users.push(user);
        fs.writeFileSync("data/users.json", JSON.stringify(users));
    }
});

router.post("/addPhoto/:id", (req, res) => {
    const userIndex = users.findIndex(e => e.id === req.params.id);
    const filename = "/img/" + Date.now() + req.files.photoData.name;
    users[userIndex].photo = filename;
    req.files.photoData.mv("C:/Users/maksi/WebstormProjects/SocialAdministratrModule/public" + filename);
    fs.writeFileSync("data/users.json", JSON.stringify(users));
    res.status(200).send({filename: filename});
});

router.get("/friends/:id", (req, res) => {
    res.render("friendList");
});

router.post("/friends/:id", (req, res) => {
    let userIndex = users.findIndex(e => e.id === req.params.id);
    users[userIndex].friends = users[userIndex].friends.filter(u => u !== req.body.friendId);
    fs.writeFileSync("data/users.json", JSON.stringify(users));
    res.status(200).send({});
});

router.post("/addfriends/:id", (req, res) => {
    let userIndex = users.findIndex(e => e.id === req.params.id);
    users[userIndex].friends.push(users.find(u => u.id === req.body.friendId).id);
    fs.writeFileSync("data/users.json", JSON.stringify(users));
    res.status(200).send({});
})

router.post("/addNews/:id", (req, res) => {
    let userIndex = users.findIndex(e => e.id === req.params.id);
    users[userIndex].news.push(req.body.news);
    fs.writeFileSync("data/users.json", JSON.stringify(users));
    res.status(200).send({user: JSON.stringify(users[userIndex])});
})

router.get("/news/:id", (req, res) => {
   res.render("newsList");
});

router.get("/userNews/:id", (req, res) => {
    res.send(users.find(e => e.id === req.params.id).news);
});

router.get("/edit/:id", (req, res) => {
    res.render("editUser");
});

router.post("/edit/:id", (req, res) => {
    console.log("i was here with " + req.body);
    let userIndex = users.findIndex(e => e.id === req.params.id);
    users[userIndex].name = req.body.name;
    users[userIndex].birthday = req.body.birthday;
    users[userIndex].email = req.body.email;
    users[userIndex].role = req.body.role;
    users[userIndex].status = req.body.status;
    fs.writeFileSync("data/users.json", JSON.stringify(users));
    res.status(200).send({});
});

module.exports = router;