const express = require('express'),
    router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'ID328527_tinder.db.webhosting.be',
    user: 'ID328527_tinder',
    password: 'Hellotinder2021',
    database: 'ID328527_tinder'
});

// get user lists
router.post('/users', function (req, res) {
    let sql = "SELECT * FROM Person WHERE PersonId <> ?";
    db.query(sql,[req.body.id] ,function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "People list retrieved successfully"
        })
    })
});

// create new user 

router.post('/new', function (req, res) {
    let sql = "INSERT INTO `Person`(`lastname`, `firstname`, `email`, `country`, `city`, `birthdate`) VALUES (?)";
    let values = [
        req.body.lastname, req.body.firstname, req.body.email, req.body.country, req.body.city, req.body.birthdate
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        console.log(data);
        res.json({
            id : data.insertId,
            status: 200,
            message: "New user added successfully"
        })
    })
});


router.post('/swipe', function (req, res) {
    let sql = "INSERT INTO `Swipe`(`person_1`, `person_2`) VALUES (?,?)";
    let values = [
        req.body.id1 , req.body.id2
    ];
    console.log(values);
    db.query(sql, values, function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "New user added successfully"
        })
    })
});

router.post('/setgender', function (req, res) {
    let sql = "UPDATE `Person` SET `username` = ?, `gender` = ?, `prefferedGender` = ? WHERE `Person`.`PersonId` = ? ";
    db.query(sql, [ req.body.username , req.body.gender , req.body.preferredgender ,Number.parseInt(req.body.id)], function (err, data, fields) {
        if (err) throw err;
        console.log(data);
        res.json({
            status: 200,
            message: "New user added successfully"
        })
    })
});
//SELECT * FROM Person WHERE PersonId IN ( SELECT person_2 FROM Swipe WHERE person_1 = 8 ) 
// get user lists
router.post('/liked', function (req, res) {
    let sql = "SELECT * FROM Person WHERE PersonId IN ( SELECT person_2 FROM Swipe WHERE person_1 = ? ) ";
    db.query(sql,[req.body.id] ,function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "People list retrieved successfully"
        })
    })
});
//SELECT * FROM Person WHERE PersonId NOT IN ( SELECT person_2 FROM Swipe WHERE person_1 = 8 ) AND PersonId <> 8 
// get user lists
router.post('/disliked', function (req, res) {
    let sql = "SELECT * FROM Person WHERE PersonId NOT IN ( SELECT person_2 FROM Swipe WHERE person_1 = ? ) AND PersonId <> ?  ";
    db.query(sql,[req.body.id ,req.body.id] ,function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            data,
            message: "People list retrieved successfully"
        })
    })
});
module.exports = router;
