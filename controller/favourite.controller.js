const axios = require('axios');
const { headers } = require('../config');
const page = 'favourite';
const { Logger } = require('../logger/index')
const log = Logger;

log.info('inside favoruite controller');

const postData = async(data, url) => (
    (await axios({ method: 'POST', url, headers, data })))

// exports
const showAllFavouriteCats = async( req, res, next ) => {
    /*
    * The application contains a place to view all your favourited
    * images of a cat. 
    */

    try {

        log.info('render favourite page');

        let url = 'https://api.thecatapi.com/v1/favourites';
        let favouriteData = (await axios({ method: 'GET', url, headers })).data;

        res.render('main', { page, data: favouriteData });

    } catch ( error ) {

        log.info('error while rendering favourite page')

        next( error );
    }
}

/*
* While the process to favour and unfavour an image is not done in the 
* 'favourite' page, these functions have been included here for clarity.
*/

const favouriteImage = async( req, res, next ) => {
    /*
    * This function is used to favourite an image
    */

    try {

        log.info('favouriting an image');

        var image_id = req.params.imageId;
        var url = 'https://api.thecatapi.com/v1/favourites';
        var response = (await postData({ image_id }, url)).data;

        if (response.message === 'SUCCESS')
            res.status(200).send(response);
        
    } catch ( error ) {

        log.info('error while favouriting an image');

        next( error );
    }
    
}

const deleteFavouriteImage = async( req, res, next ) => {
    /*
    * This function is used to unfavourite an image
    */

    try {

        log.info('un-favouriting an image');

        var favourite_id = req.params.favouriteId;
        var url = `https://api.thecatapi.com/v1/favourites/${favourite_id}`;
        var response = (await axios({ method: 'DELETE', url, headers })).data;

        if (response.message === 'SUCCESS')
            res.status(200).send(response);
        
    } catch ( error ) {

        log.info('erro while un-favouriting an image');

        next( error );
    }
}

module.exports = { showAllFavouriteCats, favouriteImage, deleteFavouriteImage }
