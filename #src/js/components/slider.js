$('.provider-reviews').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button type="button" class="slick-arrow slick-prev"><i class="icon-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"><i class="icon-chevron-right"></i></button>',
    dots: false,
});

$('.item-popup__slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button type="button" class="slick-arrow slick-prev"><i class="icon-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"><i class="icon-chevron-right"></i></button>',
    dots: false,
});

// $('.gallery__thumbnails').slick({
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     asNavFor: '.gallery__main',
//     arrows: false,
//     focusOnSelect: true,
//     vertical: true,
//     verticalSwiping: true,

//     responsive: [
//         {
//           breakpoint: 991,
//           settings: {
//             vertical: false,
//             verticalSwiping: false,
//           }
//         },
//       ]
// });

// $('#productGallery .tabs-triggers__item').click(function() {
//     $('.gallery__main').slick('refresh');
//     $('.gallery__thumbnails').slick('refresh');
// })