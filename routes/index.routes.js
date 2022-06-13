var express = require('express');
var router = express.Router();
var { renderIndexPage } = require('../controller/index.controller');

/* GET home page. */
router.get('/', renderIndexPage);

module.exports = router;
