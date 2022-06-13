var express = require('express');
var router = express.Router();
var { showQuestion } = require('../controller/test.controller')

/* GET test page. */
router.get('/', showQuestion);

module.exports = router;
