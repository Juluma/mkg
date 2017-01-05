var fetchBouquetsUrl = 'ajax.php';
var selImg = {
    prefix  : 'img/bouquets/select/',
    postfix : '-columns.png'
};

var images = [];

jQuery(document).ready(function($){
    
    var overImg = {
        prefix  : 'img/bouquets/popup/',
        postfix : '-pop-up.png'
    };

    makeSelectionBar = function(data) {
        var barHtml = '';

        $.each(data, function(i, img){
            var imgBase = img.replace(selImg.postfix, '');
            images.push(imgBase);
        });

        $.each(images, function(i, imgBase){
            barHtml+= '<div class="col-xs-4 col-sm-3 col-md-2"><a href="#" rel="'+imgBase+'" class="bouquetPopup">';
            barHtml+= '<img src="'+selImg.prefix+imgBase+selImg.postfix+'" class="img-responsive">';
            barHtml+= '</a></div>';
        });

        $('#selection-bar').append(barHtml);
        $('#selection-bar div:first-child .bouquetPopup').click();
    }

    $.ajax({
        url:        fetchBouquetsUrl,
        method:     'POST',
        dataType:   'json',
        success: function(data) {
            makeSelectionBar(data);
        }
    });

    $('#selection-bar').on('click', '.bouquetPopup', function(e){
        e.preventDefault();
        $('#selection-bar').find('div').removeClass('active');
        $('#lady').find('.over-image').remove();
        var imgBase = $(this).attr('rel');
        $(this).closest('div').addClass('active');
        var overImg = overImg.prefix + imgBase + overImg.postfix;
        $('#lady').append('<img src="'+overImg+'" class="over-image">');
    });

});

