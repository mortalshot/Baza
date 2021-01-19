$(document).ready(function () {
    @@include('index.js');

    $('.delivery-timeline__btn').click(function (e) {
        e.preventDefault();
        $('.delivery-timeline__wrapper').toggleClass('active');
    });

    if ($('.delivery-history__item')) {
        $('.delivery-history__timeline').css({ 'padding-top': $('.delivery-history__item').outerHeight() / 2, 'padding-bottom': $('.delivery-history__item').outerHeight() / 2 });
    }

    $('#providerTabs .nav-link:not(#providerTab-1)').click(function () {
        $('.provider-reviews').slideUp(300);
    })
    $('#providerTab-1').click(function () {
        $('.provider-reviews').slideDown(300);
    })

    if(!$('#providerTab-1').hasClass('active')) {
        $('.provider-reviews').slideUp(300);
    }
})