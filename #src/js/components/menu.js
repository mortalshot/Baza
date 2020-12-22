$('.header__burger').click(function (event) {
    $('.header__burger, #navbarSupportedContent').toggleClass('active');
    $('body').toggleClass('lock');
})

$(function () {
    const section = $('.section'),
        nav = $('.header .navbar'),
        navHeight = nav.outerHeight(); // получаем высоту навигации 

    // поворот экрана 
    window.addEventListener('orientationchange', function () {
        navHeight = nav.outerHeight();
    }, false);

    $(window).on('scroll', function () {
        const position = $(this).scrollTop();

        section.each(function () {
            const top = $(this).offset().top - navHeight - 5,
                bottom = top + $(this).outerHeight();

            if (position >= top && position <= bottom) {
                nav.find('.nav-link').removeClass('active');
                section.removeClass('active');

                $(this).addClass('active');
                nav.find('.nav-link[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    });

    nav.find('.nav-link').on('click', function () {
        const id = $(this).attr('href');

        $('html, body').animate({
            scrollTop: $(id).offset().top - navHeight
        }, 487);

        return false;
    });
});