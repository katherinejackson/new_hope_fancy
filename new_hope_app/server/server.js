// Katherine Jackson, 11142976, kmj908
// CMPT 353

'use strict';

const cors = require('cors');
const express = require("express"); 
const mysql = require('mysql');
const bodyParser = require("body-parser") 

const PORT = 8080;
const app = express(); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended:true})); 

var conn = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'secret',
  database: 'newhope'   
}); 

conn.connect(function(err) {
  if (err) throw err;
  else console.log('Connected to database "newhope" as user "root"');   
});


app.post("/new_dog", function(req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var name = parsedReq.name;
    var age = parsedReq.age || 1;
    var breed = parsedReq.breed || "";
    var gender = parsedReq.gender || "";
        
    var query = `INSERT INTO dogs (name, age, breed, gender) VALUES ('${name}', '${age}', '${breed}', '${gender}')`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("New dog added to dogs table"); 
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "status": 200
        }).send();
    });
    
}); 

app.post("/new_staff", function(req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var lastName = parsedReq.lastName;
    var firstName = parsedReq.firstName;
    var phone = parsedReq.phone;
        
    var query = `INSERT INTO staff (last_name, first_name, phone) VALUES ('${lastName}', '${firstName}', '${phone}')`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("New staff added to staff table"); 

        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "status": 200
        }).send();
    });
    
}); 


app.post("/new_homevisit", function(req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var dog = parsedReq.dog;
    var staff = parsedReq.staff;

    var query = `INSERT INTO homevisits(dog, staff) VALUES ('${dog}', '${staff}')`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("New homevisit added to homevisit table"); 
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "status": 200
        }).send();
    });
    
}); 

app.get("/dog_list", function(req, res) {
    var query = `SELECT * from dogs`;
    
    conn.query(query,function (err, result) {
        if (err) throw err;
        
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "status": 200
        }).json(result)
    });
    
}); 

app.get("/staff_list", function(req, res) {
    var query = `SELECT * from staff`;
    
    conn.query(query,function (err, result) {
        if (err) throw err;
        
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "status": 200
        }).json(result)
    });
    
}); 


app.get("/homevisit_list", function(req, res) {
    var query = `select homevisits.status, homevisits.id, dogs.name as dog, dogs.id as dogid, staff.first_name, staff.last_name, staff.id as staffid from homevisits join dogs on dogs.id=homevisits.dog join staff on staff.id=homevisits.staff`;
    
    conn.query(query,function (err, result) {
        if (err) throw err;
        
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "status": 200
        }).json(result)
    });
});

app.put("/update_dog", function(req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var id = parsedReq.id;
    var name = parsedReq.name || "";
    var age = parsedReq.age || 1;
    var breed = parsedReq.breed || "";
    var gender = parsedReq.gender || "";
    var status = parsedReq.status || 0;
        
    var query = `UPDATE dogs SET name='${name}', age='${age}', breed='${breed}', gender='${gender}', status=${status} WHERE id=${id}`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("Updated Dog"); 
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "status": 200
        }).end()
    });
    
}); 

app.put("/update_staff", function(req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var id = parsedReq.id;
    var lastName = parsedReq.lastName;
    var firstName = parsedReq.firstName;
    var phone = parsedReq.phone;
        
    var query = `UPDATE staff SET first_name='${firstName}', last_name='${lastName}', phone='${phone}' WHERE id=${id}`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("Updated Staff"); 
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "status": 200
        }).end()
    });
    
}); 

app.put("/update_homevisit", function(req, res) {
    const parsedReq = JSON.parse(Object.keys(req.body)[0])
    var id = parsedReq.id;
    var dog = parsedReq.dog;
    var staff = parsedReq.staff;
    var status = parsedReq.status;
        
    var query = `UPDATE homevisits SET dog='${dog}', staff='${staff}', status='${status}' WHERE id=${id}`;
    
    conn.query(query,function (err, data) {
        if (err) throw err;
        else console.log("Updated Homevisit"); 
        res.set({
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "status": 200
        }).end()
    });
    
}); 

app.listen(PORT, function() {
  console.log('Server listening on http://localhost:' + PORT);
});


