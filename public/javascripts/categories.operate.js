$(document).on("click", "#get-another-image", function (event) {
    /*
    * In the categorie page, when the button to show the next image,
    * an ajax call an image to retrieve an image
    */

    var id = $('#categorieId')[0].value;

    $.ajax({
        method: 'GET',
        url: `/categories/${id}?show_another_photo=true`,
        success: function (data) {
            var favouriteId = data.favouriteId;

            $('.currentCategorieImage').attr('src', data.url);
            $('#imageId').attr('value', data.id);
            $('#categorieId').attr('value', data.categories[0].id);

            if (favouriteId){
                $('.like-image').attr("id","imageIsLiked");
                $('#favouriteId').attr('value', favouriteId);
            }

            else{
                $('.like-image').removeAttr('id');
                $('#favouriteId').attr('value', '');
            }
        }
    })
});

function imageFavouriteHandler(method, id){
    $.ajax({
        method,
        url: `/favourite/${id}`,
        success: function (data) {

            if (method === 'POST'){
                $('#favouriteId').attr('value', data.id);
                $('.like-image').attr("id","imageIsLiked");  
            }              

            else if (method === 'DELETE'){
                $('#favouriteId').attr('value', '');
                $('.like-image').removeAttr('id');
            }
                          
        }
    });
}

$(document).on("click", ".like-image", function (event) {
    /* In the same categorie page,  there is an option to
    * like (favourite) / unlike (unfavourite) an image.
    */

    var imageId = $('#imageId')[0].value;
    var favouriteId = $('#favouriteId')[0].value;
    
    /*
    * when an image does not have a favourite id, it has not been
    * favourited yet. So, favourite it. If it has a favourite id
    * then when this button is clicked, unfavourite it.
    */
    if (!favouriteId)
        imageFavouriteHandler('POST', imageId);

    else
        imageFavouriteHandler('DELETE', favouriteId);
});