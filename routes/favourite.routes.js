var express = require('express');
var router = express.Router();
var { showAllFavouriteCats } = require('../controller/favourite.controller');
var { favouriteImage, deleteFavouriteImage } = require('../controller/favourite.controller');

/* GET favourite page. */
router.get('/', showAllFavouriteCats);

router.post('/:imageId', favouriteImage);

router.delete('/:favouriteId', deleteFavouriteImage);

module.exports = router;
