let quantityButtons = document.querySelectorAll('.quantity__button');
if (quantityButtons.length > 0) {
    for (let index = 0; index < quantityButtons.length; index++) {
        const quantityButton = quantityButtons[index];
        quantityButton.addEventListener("click", function (e) {
            let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
            if (quantityButton.classList.contains('quantity__button--plus')) {
                value++;
            } else {
                value = value - 1;
                if (value < 1) {
                    value = 1
                }
            }
            quantityButton.closest('.quantity').querySelector('input').value = value;
        });
    }
}

$('.catalog-sorting__link').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
})

$('.filter-product .filter-stirps__item:first-child').on('click', function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
        $('.filter-product .filter-stirps__item').removeClass('active');
        $('.filter-product .filter-attributes__item').slideUp(300);
    } else {
        $('.filter-product .filter-stirps__item').addClass('active');
        $('.filter-product .filter-attributes__item').slideDown(300);
    }
})

$('.filter-product .filter-stirps__item').not(':first-child').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    const id = $(this).attr('href');
    $(id).slideToggle(300);
})

$('.filter-attributes__item .filter-attributes__title').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).closest('.filter-attributes__item').find('.filter-attributes__link').addClass('active');

    if ($(this).hasClass('active')) {
        $(this).closest('.filter-attributes__item').find('.filter-attributes__link').addClass('active');
    } else {
        $(this).closest('.filter-attributes__item').find('.filter-attributes__link').removeClass('active');
    }
});
$('.filter-attributes__link').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
})

$('.attributes-summary__reset').on('click', function (e) {
    e.preventDefault();
    $('.filter-product .filter-stirps__item,.filter-attributes__title, .filter-attributes__link').removeClass('active');
})

