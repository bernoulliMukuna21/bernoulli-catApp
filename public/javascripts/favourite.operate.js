$(document).on("click", ".all-favourite-cats .fa.fa-times", function (event) {
    var imageDeleteSection = event.target.parentNode;

    var favouriteId = imageDeleteSection
        .previousSibling.childNodes[3].value;
    
    $.ajax({
        method: 'DELETE',
        url: `/favourite/${favouriteId}`,
        success: function (data) {
            $(imageDeleteSection.parentNode).remove();   
        }
    });
});