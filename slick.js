$(document).ready(function () {
    $('#slider-container').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
    });

    $(window).on('resize orientationchange', function () {
        $('.js-slider').slick('resize');
    });
});