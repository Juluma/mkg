var fetchBouquetsUrl = 'ajax.php';
var selImgPostfix = '-columns.png';
var popImgPostfix = '-pop-up.png';
var images = [];

jQuery(document).ready(function($){

    makeSelectionBar = function(data) {
        $.each(data, function(i, img){
            var imgBase = img.replace(selImgPostfix, '');
            images.push(imgBase);
        });
        $.each(images, function(i, imgBase){
            $('#selection-bar').append(imgBase+' '); // Testing, add as images
        });
    }

    $.ajax({
        url:        fetchBouquetsUrl,
        method:     'POST',
        dataType:   'json',
        success: function(data) {
            makeSelectionBar(data);
        }
    });



});