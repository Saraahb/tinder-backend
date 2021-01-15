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
router.get('/users', function (req, res) {
    let sql = `SELECT * FROM People`;
    db.query(sql, function (err, data, fields) {
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
    let sql = "INSERT INTO `SignUp` (`PersonID`, `FirstName`, `LastName`, `BirthDate`, `City`, `Country`, `Email`) VALUES (?);";
    let values = [
        null,
        req.body.firstname, req.body.lastname, req.body.birthdate, req.body.city, req.body.country, req.body.email
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "New user added successfully"
        })
    })
});

//create liked/lisliked
router.post('/LikeDislike', function (req, res) {
    let sql = "INSERT INTO `SwipeLiked` ('PersonID',`PeopleID`, `Liked`) VALUES (?);";
    let values = [
        null,
        null,
        Boolean(true / false)
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        res.json({
            status: 200,
            message: "New data added successfully"
        })
    })
});
module.exports = router;