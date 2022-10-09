function dynamicallyLoadScript(url) {
    var script = document.createElement("script");
    script.src = url;

    document.body.appendChild(script);
}

dynamicallyLoadScript('module/js-service/data.js');
dynamicallyLoadScript('module/js-service/app.js');
dynamicallyLoadScript('module/_header/_header.js');

$(function () {

    $('.pagination__link').on('click', function (e) {
        e.preventDefault();
        $('.pagination__link').removeClass('pagination__link--active');
        $(this).addClass('pagination__link--active');
    });

    $('.filter__link').on('click', function (e) {
        e.preventDefault();
        $('.blog-aside').toggleClass('blog-aside--active');
        $('.blog__inner').toggleClass('blog__inner-filter');
        $('.filter__inner').toggleClass('filter__inner--active');
        $('.product').toggleClass('product--filter');
    });

});