$(function () {

  $('.pagination__link').on('click', function(e) {
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
  }) : console.log('No');

  document.body.offsetWidth > 1060 ? $('.related__inner').slick({
    slidesToShow: 4,
    draggable: false,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000
  }) : console.log('No');

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

  $(".star").rateYo({
    starWidth: "20px",
    normalFill: "#CDCDCF",
    ratedFill: "#FFC452",
    readOnly: true
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
    },
  });

  var mixer = mixitup('.products__items');
  var mixer__fiter = mixitup('.product__content');
  var mixer__design = mixitup('.design__inner');

});