var express = require('express');
var router = express.Router();
var { showCat } = require('../controller/categories.controller');


/* GET categorie image page. */
router.get('/:categorieId', showCat);

module.exports = router;
