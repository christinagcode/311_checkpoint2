let db = require("../db");
let argon = require("argon2")
let jwt = require("jsonwebtoken")

let JWT_SECRET = process.env.JWT_SECRET
let register = async function(req,res){
 console.log("inside register function")

 let email = req.body.email;
 let password = req.body.password;
 let fullname = req.body.fullname;

 let pwHash = await argon.hash(password);

 let sql = "insert into userNamePets(email, userName, password_hash) values(?, ?, ?)";
let params = [email, userName, pwHash];

db.query(sql, params, function(err, rows){
    if(err){
        console.error("failed to register", err);
        res.sendStatus(500); 
    } else { 
        res.sendStatus(202);
    }
})
}

let login = function(req,res){
    console.log("inside login function")

let email = req.body.email;
let password = req.body.password;

let sql = "SELECT * from userNamePets where email = ?";
let params = [email];

db.query(sql, params, async function(err, rows){
    if(err){
        console.log("could not get longin info", err);
        res.sendStatus(500);
        return;
    }
    if(rows.length == 0){
        res.sendStatus(403);
        return;
    } 
    if(rows.length > 1 ){
        res.sendStatus(500);
        return;
    }

    let pwHash = rows[0].password_Hash;

    let match = await argon.verify(pwHash, password);

    if(match){
        // if good / truthy return token
        let token = {
            "email": email,
            "fullname": rows[0].full_name,
            "userid": rows[0].id
        };
        token.email = email;
        token.userid = rows[0].id;
        token.fullname = rows[0].full_name;

        let signedToken = jwt.sign(token, JWT_SECRET, {expiresIn: "1h"});

        res.json(signedToken);
    } else {
        res.sendStatus(403);
    }
});
}

module.exports = {
    register, login
};