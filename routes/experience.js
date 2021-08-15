var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    global.connection.query('SELECT id, company_name, company_image, company_url, position, description, period_start, period_end FROM experience ', function(err, rows, fields) {
      if (err) throw err;
      res.status(200).json({sucess: true, data: rows});
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

module.exports = router;