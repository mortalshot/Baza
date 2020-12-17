$('.header__burger').click(function (event) {
    $('.header__burger, #navbarSupportedContent').toggleClass('active');
    $('body').toggleClass('lock');
})