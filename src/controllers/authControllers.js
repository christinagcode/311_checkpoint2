let db = require("../db");
let argon = require("argon2")
let jwt = require("jsonwebtoken")

let JWT_SECRET = process.env.JWT_SECRET
let register = async function(req,res){
 console.log("inside register function")


 /**
  * 1. get the email and password from the request
  * 2. hash up the password
  * 3. store the email and password hash
  * 4. if store was successfull return 202, if store failed return 500
  */

 let email = req.body.email;
 let password = req.body.password;
 let fullname = req.body.fullname;

 let pwHash = await argon.hash(password);

 let sql = "insert into users(email, name, password_hash) values(?, ?, ?)";
let params = [email, fullname, pwHash];

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
 
/**
 * 1. get the email and password from the requrest 
 * 2. get the password hash from the db for the email
 *      2.a. if no email exists return 403
 *      2.a if more than  1 email exists return 500
 *      2.b if exactly 1 email exists, got to #3
 * 3. compare the password to the password hash
 * 4. if they match, return a token
 * 5. if they do not match return a 403
 * 
 */
let email = req.body.email;
let password = req.body.password;

let sql = "SELECT * from users where email = ?";
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

    let pwHash = rows[0].password_hash;

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