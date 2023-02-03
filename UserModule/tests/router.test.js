const jst = require('@jest/globals');
const testFunctions = require("./../server/router.js")
const app = require("./../app")
const {describe, test, expect, it} = require("@jest/globals");
const request = require("supertest")
const allUsers = require("./test_data.json");

function random_string(n)
{
    let chars = "hrbgvejanvgm'alfmvc broqwj[ervcxbsfnsrttqwcGSOIPKG<VPFSDNGWHBGUOWNGЙЦУКЕНГШЩЗХЭЖДЛОРПАВЫФЯЧСМИТЬБЮйцукенгшщзхфывапролджъёячсмитьбю"
    let res = "";
    for(let i = 0; i < n; ++i) {
        res += chars[Math.floor(Math.random() * chars.length)];
    }
    return res;
}

function random_users() {
    let users = [];
    for(let i = 0; i < 16; ++i)
        users.push(
            {
                id: Math.floor(Math.random() * 65535),
                name: random_string(32),
                email: random_string(16),
                password: random_string(4)
            });
    return users;
}

describe("TESTS", () => {

    test("authenticate", async (done) => {
        request(app)
            .post("/api/authenticate")
            .send({email: "gelninmaxim02@gmail.com", password:"0000", users: JSON.stringify(allUsers)})
            .expect(200)
            .end((err) => {
                if(err) return done(err);
                return done;
            })
    }, 30000);
    it("getting user", () =>{
        let users = random_users();
        let user = users[Math.floor(Math.random() * users.length)];
        jst.expect(testFunctions.getUser(users, user.email, user.password)).toBe(user);
    });
})
