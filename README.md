# Bernoulli Mukuna

## About the App
The general idea of the app is:
1. Provide information about cats. The application has an home page where information about cats'
breeds are provided. Each of the breed can be clicked and, information about that partcular breed
can be viewed.

2. Provide possibe of picking favourite cats images. There is a 'categorie' section of the app 
where a user can view images and favourite/unfavourite images. All favourited images can also
be viewed in a section called 'My Favourites'.

3. Finally, provide a knowledge test on the breeds of the cats.


## Running the app
The technology used to build this application is NodeJS (express), HTML(Jade), CSS & CSS. To run
the application , please unsure that [node](https://nodejs.org/en/download/) is downloaded. Once
this is downloaded, follow the steps below to run the application:
    * Install the packages:
        ```console 
        npm install
        ```
    * create a ```.env``` file in the root directory
        ```console
        CAT_API_KEY = "<your_api_key>"
        ```
    * run the app
        ```console 
        npm start
        ```