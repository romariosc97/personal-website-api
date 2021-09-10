var express = require('express');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    global.connection.query('SELECT id, name, short_description, project_type_id, image FROM projects', (err, rows, fields) =>  {
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
    global.connection.query(`SELECT id, name, short_description, description, development, project_type_id, image FROM projects WHERE id=${req.params.id} LIMIT 1`, (err, rows, fields) =>  {
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
    global.connection.query(`SELECT id, name, image FROM project_images WHERE project_id=${req.params.id}`, (err, rows, fields) =>  {
      if (err) throw err;
      res.status(200).json({sucess: true, data: rows});
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let image = `public/images/projects/${req.files.image.name}`;
    global.connection.query(`INSERT INTO projects (name, short_description, description, development, project_type_id, image, created_by) VALUES ("${req.body.name}", "${req.body.short_description}", "${req.body.description}", "${req.body.development}", ${req.body.project_type_id}, "${image}", 1)`, (err, rows, fields) =>  {
      if (err) throw err;
      req.files.image.mv(`images/projects/${req.files.image.name}`);
      res.status(200).json({success: true, data: rows});
    });
    
  } catch (error) {
    res.status(200).json({success: false, data: []});
  }
});

module.exports = router;