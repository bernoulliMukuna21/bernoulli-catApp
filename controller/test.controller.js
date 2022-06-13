const axios = require('axios');
const { headers } = require('../config');
const { fetchCatData } = require('../controller/index.controller');
let page = 'test';
const { Logger } = require('../logger/index')
const log = Logger;

log.info('inside test controller');

// exports
const showQuestion = async( req, res, next ) => {
    /*
    * A part of the application is testing knowledge about the cats.
    * The questions are such that: given a picture and five options 
    * of breeds, pick the breed for the cat in the picture.
    */

    try {

        log.info('show a test question');

        /*
        * First, fetch a list of breeds from index controller. Then, shuffle to 
        * them to get 5 random of which will be the correct answer.
        */
        const listOfBreeds = await fetchCatData('https://api.thecatapi.com/v1/breeds');
        const shuffledListOfBreeds = listOfBreeds.sort(() => 0.5 - Math.random());
        const selectedBreedsOptions = shuffledListOfBreeds.slice(0, 5);

        // Question
        const correctAnswer = selectedBreedsOptions[Math.floor(Math.random() * 5)];
        var url = `https://api.thecatapi.com/v1/images/search?breed_id=${correctAnswer.id}`;
        var data = (await axios({ method: 'GET', url , headers})).data;

        /*
        * Similar with images in categories, there is an option to move to
        * the next question. when the button an ajax is made to avoid 
        * reloading the page. 
        */
        var show_another_question = req.query? req.query.show_another_question==='true' : false;
        
        if( !show_another_question )
            res.render('main', { page, selectedBreedsOptions, correctAnswer, data});
        else
            res.status(200).send({selectedBreedsOptions, correctAnswer, image_url: data[0].url})
        
    } catch ( error ) {

        log.info('error while showing a test question');
        
        next( error )
    }
    
}

module.exports = { showQuestion }