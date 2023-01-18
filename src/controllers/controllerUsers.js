let db = require("../db.js");

let addItem = function(req,res){
    let un = req.body.userName;
    let fn= req.body.fullName;
    let e = req.body.description;
    let p = req.body.password_Hash;
    let sql = "INSERT INTO userNamePets (userName, fullName, email, password_Hash ) values (?, ?, ?, ?)";
    let params = [un, fn, e, p];

    db.query(sql, params, function(err, results){
        if(err){
            res.sendStatus(500);
        } else {
            res.status(200).json({msg: "Successfully added item."});
        }
    })
}

let editItem = function(req,res){ 
    let id = req.param.id;
    let userName = req.body.userName;
    let fullName = req.body.fullName;
    let email = req.body.email;
    let password = req.body.password_Hash;

    let sql = "UPDATE userNamePets set id = ?, userName = ?, fullName = ?, email= ?, password_Hash = ?"
    let params = [id, userName, fullName, email, password];

    db.query(sql, params, function(err,results){
        if(err){
            console.log("Failed to update.", err);
            res.status(500).json(err);
        } else {
            res.sendStatus(202);
        }
    })
}

let listItem = function(req,res){
    db.query("SELECT id, userName, fullName, email, password_Hash FROM userNamePets", function(err,results){
        if(err){
            console.log("Failed to fetch userNamePets from database", err);
            res.sendStatus(500);
        } else {
            res.json(results);
        }
    })
}

let getItem = function(req,res){

    let id = req.params.id;

    let sql = "SELECT id, userName, fullName, email, password_Hash FROM userNamePets where id = ?"
    let params = [id];
    db.query(sql, params, function(err, results){
        if(err){
            console.log("Error:", err);
            res.sendStatus(500);
        } else {
            res.json(results[0]);
        }
    })
    
}

let deleteItem = function(req,res){
    let id = req.params.id;

    let sql = "DELETE from userNamePets where id = ?"
    let params = [id];

    db.query(sql, params, function(err, results){
        if(err){
            res.sendStatus(500);
        } else {
            res.sendStatus(202);
        }
    })
}

module.exports = {
    addItem, editItem, listItem, getItem, deleteItem
}