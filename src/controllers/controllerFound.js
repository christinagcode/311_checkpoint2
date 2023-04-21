let db = require("../db.js");

let addItem = function(req,res){
    let n = req.body.name;
    let d = req.body.foundDate;
    let desc = req.body.description;
    let sql = "INSERT INTO foundPets (name, foundDate, description) values (?, ?, ?)";
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
    let foundDate = req.body.foundDate;
    let description = req.body.description;

    let sql = "UPDATE foundPets set id = ?, name = ?, lostDate = ?, description = ?"
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
    db.query("SELECT id, name, foundDate, description FROM foundPets", function(err,results){
        if(err){
            console.log("Failed to fetch foundPets from database", err);
            res.sendStatus(500);
        } else {
            res.json(results);
        }
    })
}

let getItem = function(req,res){

    let id = req.params.id;

    let sql = "SELECT id, name, foundDate, description FROM foundPets where id = ?"
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

    let sql = "DELETE from foundPets where id = ?"
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