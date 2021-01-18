$(document).ready(function () {
    @@include('index.js');

    let deliveryTimelineItemHeight = $('.delivery-timeline__item').outerHeight(true);
    let deliveryTimelineBtn = $('.delivery-timeline__btn');

    deliveryTimelineBtn.click(function (e) {
        e.preventDefault();
        $('.delivery-timeline__wrapper').toggleClass('active');
    });
})