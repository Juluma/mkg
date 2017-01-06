jQuery(document).ready(function($){

    var fetchBouquetsUrl = 'ajax.php';
    var selImg = {
        prefix  : 'img/bouquets/select/',
        postfix : '-columns.png'
    };
    var overImg = {
        prefix  : 'img/bouquets/popup/',
        postfix : '-pop-up@2x~ipad.png'
    };
    var images = [];
    var current = null;

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
        var imgBase = $(this).attr('rel');
        var ladyHt = $('#lady').find('img:first').height();
        var ladyOrigHt = $('#lady').find('img:first').prop('naturalHeight');
        var ratio = ladyHt / ladyOrigHt * 2.5;
        current = imgBase;

        $('#selection-bar').find('div').removeClass('active');
        $('#lady').find('.over-image').remove();
        $(this).closest('div').addClass('active');
        var img = selImg.prefix + imgBase + selImg.postfix;
        $('#lady').append('<img src="'+img+'" class="over-image">');
        $('#lady').find('img:last').height($('#lady').find('img:last').prop('naturalHeight') * ratio);
    });

    $('#arrow-right img').click(function(){
        var key = getArrayKeyByValue(current);
        var next = key + 1;
        if (next in images) {
            $('#selection-bar').find('a[rel="'+images[next]+'"]').click();
        } else {
            $('#selection-bar').find('a[rel="'+images[0]+'"]').click();
        }
    });

    $('#arrow-left img').click(function(){
        var key = getArrayKeyByValue(current);
        var previous = key - 1;
        if (previous in images) {
            $('#selection-bar').find('a[rel="'+images[previous]+'"]').click();
        } else {
            $('#selection-bar').find('a[rel="'+images[images.length-1]+'"]').click();
        }
    });

    getArrayKeyByValue = function(value) {
        var key = null;
        $.each(images, function(iKey, iVal) {
            if (iVal == value) {
                key = iKey;
                return false;
            }
        });
        return key;
    }

});
