$(function() {
    var $slides = $('#slides');
    var linksContainer = $('#links')
    $.ajax({
        url: (window.location.protocol === 'https:' ?
            'https://secure' : 'http://api') +
            '.flickr.com/services/rest/',
        data: {
            format: 'json',
            method: 'flickr.interestingness.getList',
            api_key: '7617adae70159d09ba78cfec73c13be3' // jshint ignore:line
        },
        dataType: 'jsonp',
        jsonp: 'jsoncallback'
    }).done(function (result) {
        var carouselLinks = [],
            baseUrl;
        // Add the demo images as links with thumbnails to the page:
        var photos = result.photos.photo.slice(0, 9);
        $.each(photos, function (index, photo) {
            baseUrl = 'http://farm' + photo.farm + '.static.flickr.com/' +
                photo.server + '/' + photo.id + '_' + photo.secret;
            $('<a/>')
                .append($('<img>').prop('src', baseUrl + '_s.jpg'))
                .prop('href', '###')
                .prop('title', photo.title)
                .attr('data-index', index)
                .appendTo(linksContainer);

            $('<li/>')
                .append($('<img>').prop('src', baseUrl + '_b.jpg'))
                .append($('<div/>').html(photo.title))
                .appendTo($slides)
        });

        $('.flexslider').flexslider({
            easing:'easeInOutQuart',
            useCSS: false,
            animation: "slide",
            start: function(slider){
                $('body').removeClass('loading');
            }
        });
        // Initialize the Gallery as image carousel:
    });

    $(document).on('click', '[data-index]', function(event) {
        //event.preventDefault();
        var index = $(this).data('index');
        //linksContainer.hide();
        $('.flexslider').show().flexslider(index);
        return false;
    })
})