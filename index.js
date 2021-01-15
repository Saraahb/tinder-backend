const mysql = require('mysql');
// const conn = mysql.createConnection({
//   host: 'ID328527_tinder.db.webhosting.be',
//   user: 'ID328527_tinder',
//   password: 'Hellotinder2021',
//   database: 'ID328527_tinder'
// });
// conn.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
// });

const express = require('express'),
  app = express(),
  cors = require('cors'),
  db = mysql.createConnection({
    host: 'ID328527_tinder.db.webhosting.be',
    user: 'ID328527_tinder',
    password: 'Hellotinder2021',
    database: 'ID328527_tinder'
  }),
  bodyParser = require('body-parser');

// make server object that contain port property and the value for our server.
var server = {
  port:process.env.PORT || 4040 
};

// use the modules

const usersRouter = require('./routes/users');
app.use(cors())
app.use(bodyParser.json());

app.use('/users', usersRouter);
const PORT = process.env.PORT || 4040;
// starting the server
app.listen(server.port, () => console.log(`Server started, listening port: ${PORT}`));
