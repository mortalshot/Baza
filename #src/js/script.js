$(document).ready(function () {
    @@include('index.js');

    $('.delivery-timeline__btn').click(function (e) {
        e.preventDefault();
        $('.delivery-timeline__wrapper').toggleClass('active');
    });

    if ($('.delivery-history__item')) {
        $('.delivery-history__timeline').css({ 'padding-top': $('.delivery-history__item').outerHeight() / 2, 'padding-bottom': $('.delivery-history__item').outerHeight() / 2 });
    }

    if ($('#providerTabs').length > 0) {
        $('#providerTabs .nav-link:not(#providerTab-1)').click(function () {
            $('.provider-reviews').slideUp(300);
        })
        $('#providerTab-1').click(function () {
            $('.provider-reviews').slideDown(300);
        })

        if (!$('#providerTab-1').hasClass('active')) {
            $('.provider-reviews').slideUp(300);
        }
    }

    if ($('.auth').length > 0) {
        let mediaQueryHeight = window.matchMedia('(min-height: 568px)');
        if (mediaQueryHeight.matches) {
            $(window).resize(function () {
                let headerHeight = $('.site__header').innerHeight();
                let footerHeight = $('.site__footer').innerHeight();
                let resultHeight = $(window).height() - headerHeight - footerHeight;
                $('.auth').css({ 'height': resultHeight });
            });

            let headerHeight = $('.site__header').innerHeight();
            let footerHeight = $('.site__footer').innerHeight();
            let resultHeight = $(window).height() - headerHeight - footerHeight;
            $('.auth').css({ 'height': resultHeight });
        }
    }

    $('.notice__btn').click(function(e) {
        e.preventDefault();
        $(this).next('.notice__wrapper').addClass('active');
    })
    $(document).mouseup(function (e) {
        var div = $(".notice__wrapper");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $('.notice__wrapper').removeClass('active');
        }
    });
})