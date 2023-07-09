const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'UPDATEUPDATEUPDATE.us-east-1.rds.amazonaws.com', // RDS endpoint will be updated !!!
  user: 'micheal', // RDS user name will be updated !!!
  password: '1234567890*', // RDS password  name will be updated !!!
  database: 'updateupdateuodate' // RDS database name  name will be updated !!!
});

connection.connect(function(error) {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database.');
  }
});

app.post('/api/log', function(req, res) {
  var name = req.body.name;
  var timestamp = new Date().toISOString();

  var log = {
    name: name,
    timestamp: timestamp
  };

  connection.query('INSERT INTO logs SET ?', log, function(error, results, fields) {
    if (error) {
      console.error('Error saving log:', error);
      res.status(500).json({ message: 'Error saving log.' });
    } else {
      console.log('Log saved:', log);
      res.json({ message: 'Log saved successfully.', log: log });
    }
  });
});

app.get('/api/logs', function(req, res) {
  connection.query('SELECT * FROM logs ORDER BY timestamp DESC', function(error, results, fields) {
    if (error) {
      console.error('Error retrieving logs:', error);
      res.status(500).json({ message: 'Error retrieving logs.' });
    } else {
      console.log('Logs retrieved:', results);
      res.json(results);
    }
  });
});

app.listen(3000, function() {
  console.log('Server is running on port 3000');
});
