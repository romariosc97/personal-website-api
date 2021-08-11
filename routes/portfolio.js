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
    connection.query('SELECT id, name, short_description, project_type_id, image FROM projects', (err, rows, fields) =>  {
      if (err) throw err;
      res.status(200).json({sucess: true, data: rows});
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    connection.query(`SELECT id, name, short_description, description, development, project_type_id, image FROM projects WHERE id=${req.params.id} LIMIT 1`, (err, rows, fields) =>  {
      if (err) throw err;
      res.status(200).json({sucess: true, data: rows[0]});
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.get('/:id/images', async (req, res, next) => {
  try {
    connection.query(`SELECT id, name, image FROM project_images WHERE project_id=${req.params.id}`, (err, rows, fields) =>  {
      if (err) throw err;
      res.status(200).json({sucess: true, data: rows});
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;