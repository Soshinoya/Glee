// Shop Service
let productService
// const cartService = new CartService()
const htmlService = new HTMLService()

// const cartContainer = document.getElementById('cart')
const productsContainer = document.getElementById('products__items')
const linksList = document.getElementById('header-links')
const filterInput = document.getElementById('header-form__input')
const filterOpenLink = document.getElementById('header-form__link')

const filterCategoryLabels = document.querySelectorAll('.filter-category__label');
const filterCategoryInputs = document.querySelectorAll('.filter-category__input');

const filterBrandLabels = document.querySelectorAll('.filter-brand__label');
const filterBrandInputs = document.querySelectorAll('.filter-brand__input');

const filterPriceFrom = document.querySelector('.filter-price__from');
const filterPriceTo = document.querySelector('.filter-price__to');

window.onload = callCheckInputs;

document.addEventListener('click', (e) => {
  if (e.target.id != 'header-form__input') {
    linksList.innerHTML = '';
  };
});

filterInput.addEventListener('input', event => {
  const value = event.target.value

  const filteredProducts = productService.filterByTitle(value)

  renderLinksList(filteredProducts)
});

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

// productsContainer.addEventListener('click', event => {
//   const sku = event.target.dataset.sku
//     ? event.target.dataset.sku
//     : event.target.closest('li')?.dataset.sku

//   if (sku) {
//     cartService.add(
//       productService.getBySku(+sku)
//     )
//     renderCart()
//   }
// })

// cartContainer.addEventListener('click', event => {
//   const type = event.target?.dataset.type
//   const sku = event.target?.dataset.sku

// switch (type) {
//   case 'clear':
//     cartService.clear()
//     renderCart()
//     break
//   case 'remove':
//     cartService.remove(sku)
//     renderCart()
//     break
// }
// })

function renderLinksList(products) {
  linksList ? linksList.innerHTML = htmlService.paintLinksList(products) : 0;
};

function renderProducts(products) {
  productsContainer ? productsContainer.innerHTML = htmlService.paintProducts(products) : 0;
}

// function renderCart() {
//   cartContainer.innerHTML = htmlService.paintCart(
//     cartService.getInfo()
//   )
// }

function startApplication() {
  // renderCart()
  const data = dataOfProducts;

  productService = new ProductService(data)

  renderProducts(productService.products)
}

startApplication();

//////////////////////

$(function () {

  // Search
  $('.header-form__link').on('click', function () {
    $('.header-form__input').toggleClass('header-form__input--active');
    $('.user__nav-wrapper').toggleClass('user__nav-wrapper--hide');
    $('.user__nav-link--btn').toggleClass('user__nav-link--btn--hide');
    $('.menu').toggleClass('menu--hide');
    $('.logo').toggleClass('logo--hide');
    $('.header-form').toggleClass('header-form--wide');
  });

  $('.pagination__link').on('click', function (e) {
    e.preventDefault();
    $('.pagination__link').removeClass('pagination__link--active');
    $(this).addClass('pagination__link--active');
  });

  $('.user__nav-link--btn').on('click', function () {
    $('.menu').toggleClass('menu--active');
    $(this).toggleClass('user__nav-link--btn-resolve');
  });

  $('.filter__link').on('click', function (e) {
    e.preventDefault();
    $('.blog-aside').toggleClass('blog-aside--active');
    $('.blog__inner').toggleClass('blog__inner-filter');
    $('.filter__inner').toggleClass('filter__inner--active');
    $('.product').toggleClass('product--filter');
  });

  $('.product-tabs__item').on('click', function (e) {
    e.preventDefault();
    $('.product-tabs__item').removeClass('product-tabs__item--active');
    $('.product-tabs__content-item').removeClass('product-tabs__content-item--active');
    $(this).addClass('product-tabs__item--active');
    $($(this).attr('href')).addClass('product-tabs__content-item--active');
  });

  $('.select-style, .product-one__input').styler();

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

  $('.top-slider__inner').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  });

  $('.product-slide__thumb').slick({
    asNavFor: $('.product-slide__big'),
    focusOnSelect: true,
    slidesToShow: 3,
    vertical: true,
    draggable: false,
    arrows: false,
    autoplay: true,
  });
  $('.product-slide__big').slick({
    asNavFor: $('.product-slide__thumb'),
    draggable: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    focusOnSelect: true,
    arrows: false,
    fade: true,
    speed: 500,
    autoplay: true,
  });

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

});