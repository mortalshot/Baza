"use strict";

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

$(document).ready(function () {
  function testWebP(callback) {
    var webP = new Image();

    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };

    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  }

  testWebP(function (support) {
    if (support == true) {
      document.querySelector('body').classList.add('webp');
    } else {
      document.querySelector('body').classList.add('no-webp');
    }
  });
  $('.header__burger').click(function (event) {
    $('.header__burger, #navbarSupportedContent').toggleClass('active');
    $('body').toggleClass('lock');
  });
  $(function () {
    var section = $('.section'),
        nav = $('.header .navbar'),
        navHeight = nav.outerHeight(); // получаем высоту навигации 
    // поворот экрана 

    window.addEventListener('orientationchange', function () {
      navHeight = (_readOnlyError("navHeight"), nav.outerHeight());
    }, false);
    $(window).on('scroll', function () {
      var position = $(this).scrollTop();
      section.each(function () {
        var top = $(this).offset().top - navHeight - 5,
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
      var id = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(id).offset().top - navHeight
      }, 487);
      return false;
    });
  });
  var phone = $('#phone');
  var carrotLabel = $('#carrotLabel');
  var carrotLabelShadow = $('#carrotLabelShadow');
  var appleLabel = $('#appleLabel');
  var appleLabelShadow = $('#appleLabelShadow');
  var potatoLabel = $('#potatoLabel');
  var potatoLabelShadow = $('#potatoLabelShadow');
  var door = $('#door');
  var car = $('#car');
  var products = $('#products');
  var success = $('#success');
  gsap.to(carrotLabel, {
    duration: 0.5,
    opacity: 1
  });
  gsap.to(carrotLabel, {
    duration: 0.5,
    y: -90,
    delay: 0.5
  });
  gsap.to(carrotLabelShadow, {
    duration: 0.7,
    opacity: 0,
    delay: 1
  });
  gsap.to(carrotLabel, {
    duration: 1,
    x: -255,
    y: -162,
    delay: 1
  });
  gsap.to(appleLabel, {
    duration: 0.5,
    opacity: 1,
    delay: 1.8
  });
  gsap.to(appleLabel, {
    duration: 0.5,
    y: -150,
    delay: 2.3
  });
  gsap.to(appleLabelShadow, {
    duration: 0.7,
    opacity: 0,
    delay: 2.3
  });
  gsap.to(appleLabel, {
    duration: 1,
    x: -300,
    y: -290,
    delay: 2.8
  });
  gsap.to(potatoLabel, {
    duration: 0.5,
    opacity: 1,
    delay: 3.5
  });
  gsap.to(potatoLabel, {
    duration: 0.5,
    y: -100,
    delay: 4
  });
  gsap.to(potatoLabelShadow, {
    duration: 0.7,
    opacity: 0,
    delay: 4.5
  });
  gsap.to(potatoLabel, {
    duration: 1,
    x: -150,
    y: -183,
    delay: 4.5
  });
  gsap.to(potatoLabel, {
    duration: 1,
    x: -300,
    y: -200,
    delay: 6
  });
  gsap.to(appleLabel, {
    duration: 1,
    x: -450,
    y: -305,
    delay: 7
  });
  gsap.to(carrotLabel, {
    duration: 1,
    x: -405,
    y: -175,
    delay: 8
  });
  gsap.to(potatoLabel, {
    duration: 1,
    opacity: 0,
    delay: 9
  });
  gsap.to(appleLabel, {
    duration: 1,
    opacity: 0,
    delay: 9
  });
  gsap.to(carrotLabel, {
    duration: 1,
    opacity: 0,
    delay: 9
  });
  gsap.to(door, {
    duration: 0.7,
    y: -30,
    delay: 10
  });
  gsap.to(car, {
    duration: 1,
    ease: "none",
    x: 0,
    y: 0,
    delay: 10.7
  });
  gsap.to(products, {
    duration: 1,
    opacity: 1,
    delay: 12
  });
  gsap.to(success, {
    duration: 1,
    opacity: 1,
    delay: 13
  });
});