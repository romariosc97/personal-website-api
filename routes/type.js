var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    global.connection.query('SELECT id, name FROM project_types', function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json({sucess: true, data: rows});
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;