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
    var wpbs = 'xs';
    if ($(window).width() >= 992) {
        wpbs = 'md';
    } else if ($(window).width() >= 768) {
        wpbs = 'sm';
    }

    makeSelectionBar = function(data) {
        var barHtml = '';

        $.each(data, function(i, img){
            var imgBase = img.replace(selImg.postfix, '');
            images.push(imgBase);
        });

        $.each(images, function(i, imgBase){
            var xStyle = '';
            if (i >= 3 && wpbs == 'xs' || i >= 4 && wpbs == 'sm' || i >= 6 && wpbs == 'md') {
                xStyle = ' style="display:none"';
            }
            barHtml+= '<div class="col-xs-4 col-sm-3 col-md-2"'+xStyle+'><a href="#" rel="'+imgBase+'" class="bouquetPopup">';
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
        var imgBase     = $(this).attr('rel');
        var divWth      = $('#lady').width();
        var divHt       = $('#lady').height();
        var ladyHt      = $('#lady').find('img:first').height();
        var ladyOrigHt  = $('#lady').find('img:first').prop('naturalHeight');
        var ratio       = ladyHt / ladyOrigHt * 2.5;
        current = imgBase;

        $('#selection-bar').find('div').removeClass('active');
        $('#lady').find('.over-image').remove();

        // Add bouquet
        $(this).closest('div').addClass('active');
        var img = selImg.prefix + imgBase + selImg.postfix;
        $('#lady').append('<img src="'+img+'" class="over-image">');
        var bouquetImg = $('#lady').find('img:last');
        bouquetImg.height($('#lady').find('img:last').prop('naturalHeight') * ratio);

        var fix = 0;
        // Place the bouquet correctly, when ratio between 0.25 - 0.5 (most usual cases)
        // ... and correct there with other cases as well ... :)
        var multiply = ratio * 10 - 2;
        fix = multiply * -5;

        // Position img by wrapping (relative) div
        bouquetImg.css('top', divHt / 3.9);
        bouquetImg.css('left', divWth / 2.00 + fix);
    });

    $('#arrow-right img').click(function(){
        var key = getArrayKeyByValue(current);
        var next = key + 1;
        var link = null;
        if (next in images) {
            link = $('#selection-bar').find('a[rel="'+images[next]+'"]');
        } else {
            link = $('#selection-bar').find('a[rel="'+images[0]+'"]');
        }

        setSelectionVisibilities(link, next, 'right');
        link.click();
    });

    $('#arrow-left img').click(function(){
        var key = getArrayKeyByValue(current);
        var previous = key - 1;
        var link = null;
        if (previous in images) {
            link = $('#selection-bar').find('a[rel="'+images[previous]+'"]');
        } else {
            link = $('#selection-bar').find('a[rel="'+images[images.length-1]+'"]');
        }
        setSelectionVisibilities(link, previous, 'left');
        link.click();
    });

    // Check if parent div is hidden and show that and correct ones
    // based on viewport width (and hiding others)
    setSelectionVisibilities = function(link, img, direction) {
        if (link.closest('div').is(':visible')) {
            return;
        }
        // Element is hidden; hide all scrollbar divs
        $('#selection-bar > div').hide();

        // Show correct ones based on viewport width, img and direction
        var divCount = 3;
        if (wpbs == 'sm') divCount = 4;
        if (wpbs == 'md') divCount = 6;
        var imgKeys = [];
        if (direction == 'right') {
            for (i = img; i <= img + divCount - 1; i++) {
                if (i in images) {
                    imgKeys.push(i);
                } else {
                    if (typeof j == 'undefined') var j = 0;
                    else j++;
                    imgKeys.push(j);
                }
            }
        } else {
            for (i = img; i >= img - divCount + 1; i--) {
                if (i in images) {
                    imgKeys.push(i);
                } else {
                    if (typeof j == 'undefined') var j = images.length - 1;
                    else j--;
                    imgKeys.push(j);
                }
            }
        }

        $.each(imgKeys, function(i, key){
            $('#selection-bar').find("a[rel='"+images[key]+"']").parent('div').show('slow');
        });
    }

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

    $(window).resize(function(){
        location.reload();
    });

});
