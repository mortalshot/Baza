$('.header__burger').click(function (event) {
    $('.header__burger, #navbarSupportedContent').toggleClass('active');
    $('body').toggleClass('lock');
})

$(function () {
    let section = $('.section'),
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


const lockPaddingValue = window.innerWidth - document.querySelector('.site__main').offsetWidth + 'px';

const mediaQueryLgMin = window.matchMedia('(min-width: 1250px)');

if (mediaQueryLgMin.matches) {
    $('.navigation-drawer__mobile').not('.filter-selected__reset').on('click', function () {
        $('.drawer-on').addClass('active');
        $('.navigation-drawer__wrapper, .navigation-drawer').addClass('active');
    });
} else {
    $('.navigation-drawer__mobile').not('.filter-selected__reset').on('click', function () {
        $('.navigation-drawer__wrapper, .navigation-drawer').addClass('active');

        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = lockPaddingValue;
            }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        $('.filter-product').removeClass('open');
    });

    $(document).mouseup(function (e) {
        if (!$('.popup').hasClass('open') && !$('.header__menu').hasClass('active')) {
            var div = $('.navigation-drawer__wrapper');
            if (!div.is(e.target)
                && div.has(e.target).length === 0) {
                $('.navigation-drawer__wrapper, .navigation-drawer, .drawer-on').removeClass('active');

                if (lockPadding.length > 0) {
                    for (let index = 0; index < lockPadding.length; index++) {
                        const el = lockPadding[index];
                        el.style.paddingRight = '0px';
                    }
                }
                body.style.paddingRight = '0px';
                body.classList.remove('lock');
            }
        }
    });
}




const navItems = document.querySelectorAll('.header__inner .navbar .nav-link, .delivery-card__body .nav-link');
let mediaQueryXsMax = window.matchMedia('(max-width: 450px)');
if (mediaQueryXsMax.matches) {
    for (let index = 0; index < navItems.length; index++) {
        const element = navItems[index];
        $(element).text($(element).data('value'));
    }
}

$('.controls__link--has-children').click(function (e) {
    e.preventDefault();
    $(this).next('.controls__sub-menu').toggleClass('active');
})

$(document).mouseup(function (e) {
    var div = $(".controls__sub-menu");
    if (!div.is(e.target)
        && div.has(e.target).length === 0) {
        $('.controls__sub-menu').removeClass('active');
    }
});