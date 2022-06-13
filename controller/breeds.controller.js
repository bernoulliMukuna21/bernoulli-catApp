const axios = require('axios');
const { headers } = require('../config');
const page = 'breeds';
const { Logger } = require('../logger/index')
const log = Logger;

log.info('inside breeds controller');

// exports
const showBreedInformation = async( req, res, next ) => {
    /*
    * This application offers the opportunity to get to know more about
    * different breeds of cats. With this function, we are providing
    * infomration (including image) of a clicked breed from home page
    */

    try {
        log.info('rendering page to provide more information on breed');
        var breedId = req.params.breedId;
        var url = `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`;
        var data = (await axios({ method: 'GET', url, headers})).data;
        var name = data ? (data[0].breeds)[0].name : undefined;

        res.render('main', { page, data, name });

    } catch (error) {
        log.info('error while rendering breed page');
        next( error );
    }
    
}

module.exports = { showBreedInformation }