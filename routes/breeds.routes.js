var express = require('express');
var router = express.Router();
var { showBreedInformation } = require('../controller/breeds.controller');

/* GET home page. */
router.get('/:breedId', showBreedInformation);

module.exports = router;
