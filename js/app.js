jQuery(document).ready(function($){

    makeSelection = function(data) {
        
    }

    $.ajax({
        url: fetchBouquetsUrl,
        method: 'POST',
        dataType: 'json',
        success: function(data) {
            makeSelection(data);
        }
    });
});