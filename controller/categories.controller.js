const axios = require('axios');
const { headers } = require('../config');
const page = 'categories';
const { Logger } = require('../logger/index')
const log = Logger;

log.info('inside categories controller');

const fetchData = async(url) => (
    (await axios({ method: 'GET', url, headers })).data) 

const fetchFavouriteId = async(image_id) => {
    /*
    * Each photo has its own id, and when a photo is favourite,
    * the catapi.com creates a favourite id for that image.
    * This function gets the favoruite id of a given image id.
    *   Argument:
    *       - image_id: string
    */

    log.info('get favourite id for an image');

    var favouriteURI = 'https://api.thecatapi.com/v1/favourites';
    var data = await fetchData(favouriteURI);
    var imageFavouriteData = data.filter( 
        favouriteInfo =>  favouriteInfo.image_id === image_id);
    
    return imageFavouriteData[0] ? imageFavouriteData[0].id : undefined;
}

// exports
const showCat = async( req, res, next ) => {
    /*
    * For each categorie, the application shows random image of a cat
    * for that categorie. This function also checks if the image, to
    * be displayed, has already been favourited.  
    */

    try {

        log.info('show cat image for a categorie');

        var id = req.params.categorieId;
        var data = await fetchData(`https://api.thecatapi.com/v1/images/search?category_ids=${id}`);
        var name = data[0].categories[0].name;

        // check if image has been favourited
        var favouriteId = await fetchFavouriteId(data[0].id);

        /*
        * There is a button to check another cat image for a categorie. When that button is clicked,
        * an ajax call is made to avoid reloading the page.
        */
        var getAnotherImageClicked = req.query ? req.query.show_another_photo === 'true': false;

        if ( !getAnotherImageClicked ) 
            res.render('main', { page, id, name, favouriteId, data });

        else{
            data[0].favouriteId = favouriteId;
            res.status(200).send(data[0]);
        }

    } catch (error) {

        log.info('error while showing cat image for a categorie');

        next( error );
    }
}

module.exports = { showCat }