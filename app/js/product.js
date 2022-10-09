function dynamicallyLoadScript(url) {
    var script = document.createElement("script");
    script.src = url;

    document.body.appendChild(script);
}

dynamicallyLoadScript('module/js-service/data.js');
dynamicallyLoadScript('module/js-service/app.js');
dynamicallyLoadScript('module/_header/_header.js');

function relatedSliderActivate() {

    document.body.offsetWidth <= 1060 ? $('.related__inner').slick({
        slidesToShow: 4,
        draggable: false,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        vertical: true
    }) : 0;

    document.body.offsetWidth > 1060 ? $('.related__inner').slick({
        slidesToShow: 4,
        draggable: false,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000
    }) : 0;

};

$(function () {

    $('.product-tabs__item').on('click', function (e) {
        e.preventDefault();
        $('.product-tabs__item').removeClass('product-tabs__item--active');
        $('.product-tabs__content-item').removeClass('product-tabs__content-item--active');
        $(this).addClass('product-tabs__item--active');
        $($(this).attr('href')).addClass('product-tabs__content-item--active');
    });

});