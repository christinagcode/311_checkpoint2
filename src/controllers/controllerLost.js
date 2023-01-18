let db = require("../db.js");

let addItem = function(req,res){
    let n = req.body.name;
    let d = req.body.lostDate;
    let desc = req.body.description;
    let sql = "INSERT INTO lostPets (name, lostDate, description) values (?, ?, ?)";
    let params = [n, d, desc];

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
    let name = req.body.name;
    let lostDate = req.body.lostDate;
    let description = req.body.description;

    let sql = "UPDATE lostPets set id = ?, name = ?, lostDate = ?, description = ?"
    let params = [id, name, lostDate, description];

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
    db.query("SELECT id, name, lostDate, description FROM lostPets", function(err,results){
        if(err){
            console.log("Failed to fetch lostPets from database", err);
            res.sendStatus(500);
        } else {
            res.json(results);
        }
    })
}

let getItem = function(req,res){

    let id = req.params.id;

    let sql = "SELECT id, name, lostDate, description FROM lostPets where id = ?"
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

    let sql = "DELETE from lostPets where id = ?"
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