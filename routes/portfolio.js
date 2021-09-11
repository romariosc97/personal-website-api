var express = require('express');
var router = express.Router();
var helpers = require('./../helpers');

router.get('/', async (req, res, next) => {
  try {
    const response = await helpers.query('SELECT id, name, short_description, project_type_id, image FROM projects', global.connection);
    res.status(200).json({success: true, data: response});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const response = await helpers.query(`SELECT id, name, short_description, description, development, project_type_id, image FROM projects WHERE id=${req.params.id} LIMIT 1`, global.connection);
    res.status(200).json({success: true, data: response[0]});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
});

router.get('/:id/images', async (req, res, next) => {
  try {
    const response = await helpers.query(`SELECT id, name, image FROM project_images WHERE project_id=${req.params.id}`, global.connection);
    res.status(200).json({success: true, data: response});
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
});

router.post('/', async (req, res, next) => {
  try {
    let image = `images/projects/${req.files.image.name}`;
    const response = await helpers.query(`INSERT INTO projects (name, short_description, description, development, project_type_id, image, created_by) VALUES ("${req.body.name}", "${req.body.short_description}", "${req.body.description}", "${req.body.development}", ${req.body.project_type_id}, "${image}", 1)`, global.connection);
    
    req.files.image.mv(`public/images/projects/${req.files.image.name}`);

    let values = "",
        gallery = Object.entries(req.files),
        galleryLength = gallery.length;
    gallery.forEach((v, k) => {
      if(v[0]!=='image'){
        values += `("${response.insertId}", "Galería", "images/projects/${v[1].name}", 1)`;
        if(k < galleryLength-1)
          values += ",";
        v[1].mv(`public/images/projects/${v[1].name}`);
      }
    });
    if(values!=="")
      await helpers.query(`INSERT INTO project_images (project_id, name, image, created_by) VALUES ${values}`, global.connection);

    res.status(200).json({success: true});
    
  } catch (error) {
    res.status(500).json({success: false, message: error});
  }
  
});

module.exports = router;