function dynamicallyLoadScript(url) {
    var script = document.createElement("script");
    script.src = url;

    document.body.appendChild(script);
}

dynamicallyLoadScript('module/js-service/data.js');
dynamicallyLoadScript('module/js-service/app.js');
dynamicallyLoadScript('module/_header/_header.js');


const filterCategoryLabels = document.querySelectorAll('.filter-category__label');
const filterCategoryInputs = document.querySelectorAll('.filter-category__input');

const filterBrandLabels = document.querySelectorAll('.filter-brand__label');
const filterBrandInputs = document.querySelectorAll('.filter-brand__input');

const filterPriceFrom = document.querySelector('.filter-price__from');
const filterPriceTo = document.querySelector('.filter-price__to');

window.onload = callCheckInputs;

filterCategoryLabels.forEach(label => {
    label.addEventListener('input', callCheckInputs);
});

filterBrandLabels.forEach(label => {
    label.addEventListener('input', callCheckInputs);
});

function callCheckInputs() {

    const activeInputs = checkActiveInputs();
    const filteredProducts = productService.filterBy(activeInputs.categories, activeInputs.brand, activeInputs.priceMin, activeInputs.priceMax);
    renderProducts(filteredProducts);

};

function checkActiveInputs() {
    const categories = [];
    let priceMin = +filterPriceFrom.innerHTML;
    let priceMax = +filterPriceTo.innerHTML;
    let brand = '';

    filterCategoryInputs.forEach(input => {
        if (input.checked) {
            categories.push(input.dataset.filter);
        };
    });

    filterBrandInputs.forEach(input => {
        if (input.checked) {
            brand = input.dataset.filter;
        };
    });

    return { categories, brand, priceMin, priceMax };
};

$(function () {

    $('.filter-price__input').ionRangeSlider({
        type: "double",
        prefix: "$",
        onStart: function (data) {
            $('.filter-price__from').text(data.from);
            $('.filter-price__to').text(data.to);
        },
        onChange: function (data) {
            $('.filter-price__from').text(data.from);
            $('.filter-price__to').text(data.to);
            const activeInputs = checkActiveInputs();

            const filteredProducts = productService.filterBy(activeInputs.categories, activeInputs.brand, activeInputs.priceMin, activeInputs.priceMax);
            renderProducts(filteredProducts);
        },
    });

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