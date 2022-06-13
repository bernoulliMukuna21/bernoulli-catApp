const axios = require('axios');
const { headers } = require('../config');
const page = 'index';
const { Logger } = require('../logger/index')
const log = Logger;

log.info('inside index controller');

// exports
const fetchCatData = async( url ) => {
    /*
    * The following function takes a url and returns a list of 
    * all the breeds / categories known catapi.com.
    * Argument: 
    *   - url : string
    */

    try{
        log.info('fetching list of breeds / categories')
        var response = (await axios({ method: 'GET', url, headers})).data;
        var listOfData = [];
        const length = response.length;
        var index = 0

        while (index < length) {
            let currentBreedData = response[index]
            listOfData.push({name: currentBreedData.name, id: currentBreedData.id});
            index++;
        }
        return listOfData;

    }catch(error){
        log.info('error occurred while fetching list of breeds / categories')
        throw error;
    }
}

const renderIndexPage = async( req, res, next ) => {
    /*
    * In this function, we start with fetching the list of breeds
    * and categories before passing them to be displayed on the 
    * home screen.
    */

    try{
        log.info('rendering home page');
        const listOfBreeds = await fetchCatData('https://api.thecatapi.com/v1/breeds');
        const listOfCategories = await fetchCatData('https://api.thecatapi.com/v1/categories');

        res.render('main', { page, listOfBreeds, listOfCategories});

    }catch(error){
        log.info('error occurred while rendering home page');
        next(error);
    }
}

module.exports = { fetchCatData, renderIndexPage }
