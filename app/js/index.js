function dynamicallyLoadScript(url) {
    var script = document.createElement("script");
    script.src = url;

    document.body.appendChild(script);
}

dynamicallyLoadScript('module/js-service/data.js');
dynamicallyLoadScript('module/js-service/app.js');
dynamicallyLoadScript('module/_header/_header.js');

// Mixitup
function mixCall() {
    var mixer = mixitup('.products__items', {
        selectors: {
            target: '.products__item'
        }
    });
    var mixer__design = mixitup('.design__inner', {
        selectors: {
            target: '.design__inner-item'
        }
    });
}

$(function () {

    // Top Slider
    $('.top-slider__inner').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
    });

});