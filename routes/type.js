var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  database : '****',
  user     : '****',
  password : '****',
  port: '****'
});
connection.connect();

router.get('/', async (req, res, next) => {
  try {
    connection.query('SELECT id, name FROM project_types', function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json({sucess: true, data: rows});
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;