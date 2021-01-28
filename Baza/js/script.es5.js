"use strict";

$(document).ready(function () {
  // libs
  // Dynamic Adapt v.1
  // HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
  // e.x. data-da="item,2,992"
  // Andrikanych Yevhen 2020
  // https://www.youtube.com/c/freelancerlifestyle
  "use strict";

  (function () {
    var originalPositions = [];
    var daElements = document.querySelectorAll('[data-da]');
    var daElementsArray = [];
    var daMatchMedia = []; //Заполняем массивы

    if (daElements.length > 0) {
      var number = 0;

      for (var index = 0; index < daElements.length; index++) {
        var daElement = daElements[index];
        var daMove = daElement.getAttribute('data-da');

        if (daMove != '') {
          var daArray = daMove.split(',');
          var daPlace = daArray[1] ? daArray[1].trim() : 'last';
          var daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
          var daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
          var daDestination = document.querySelector('.' + daArray[0].trim());

          if (daArray.length > 0 && daDestination) {
            daElement.setAttribute('data-da-index', number); //Заполняем массив первоначальных позиций

            originalPositions[number] = {
              "parent": daElement.parentNode,
              "index": indexInParent(daElement)
            }; //Заполняем массив элементов 

            daElementsArray[number] = {
              "element": daElement,
              "destination": document.querySelector('.' + daArray[0].trim()),
              "place": daPlace,
              "breakpoint": daBreakpoint,
              "type": daType
            };
            number++;
          }
        }
      }

      dynamicAdaptSort(daElementsArray); //Создаем события в точке брейкпоинта

      for (var _index = 0; _index < daElementsArray.length; _index++) {
        var el = daElementsArray[_index];
        var _daBreakpoint = el.breakpoint;
        var _daType = el.type;
        daMatchMedia.push(window.matchMedia("(" + _daType + "-width: " + _daBreakpoint + "px)"));

        daMatchMedia[_index].addListener(dynamicAdapt);
      }
    } //Основная функция


    function dynamicAdapt(e) {
      for (var _index2 = 0; _index2 < daElementsArray.length; _index2++) {
        var _el = daElementsArray[_index2];
        var _daElement = _el.element;
        var _daDestination = _el.destination;
        var _daPlace = _el.place;
        var _daBreakpoint2 = _el.breakpoint;
        var daClassname = "_dynamic_adapt_" + _daBreakpoint2;

        if (daMatchMedia[_index2].matches) {
          //Перебрасываем элементы
          if (!_daElement.classList.contains(daClassname)) {
            var actualIndex = indexOfElements(_daDestination)[_daPlace];

            if (_daPlace === 'first') {
              actualIndex = indexOfElements(_daDestination)[0];
            } else if (_daPlace === 'last') {
              actualIndex = indexOfElements(_daDestination)[indexOfElements(_daDestination).length];
            }

            _daDestination.insertBefore(_daElement, _daDestination.children[actualIndex]);

            _daElement.classList.add(daClassname);
          }
        } else {
          //Возвращаем на место
          if (_daElement.classList.contains(daClassname)) {
            dynamicAdaptBack(_daElement);

            _daElement.classList.remove(daClassname);
          }
        }
      }

      customAdapt();
    } //Вызов основной функции


    dynamicAdapt(); //Функция возврата на место

    function dynamicAdaptBack(el) {
      var daIndex = el.getAttribute('data-da-index');
      var originalPlace = originalPositions[daIndex];
      var parentPlace = originalPlace['parent'];
      var indexPlace = originalPlace['index'];
      var actualIndex = indexOfElements(parentPlace, true)[indexPlace];
      parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
    } //Функция получения индекса внутри родителя


    function indexInParent(el) {
      var children = Array.prototype.slice.call(el.parentNode.children);
      return children.indexOf(el);
    } //Функция получения массива индексов элементов внутри родителя 


    function indexOfElements(parent, back) {
      var children = parent.children;
      var childrenArray = [];

      for (var i = 0; i < children.length; i++) {
        var childrenElement = children[i];

        if (back) {
          childrenArray.push(i);
        } else {
          //Исключая перенесенный элемент
          if (childrenElement.getAttribute('data-da') == null) {
            childrenArray.push(i);
          }
        }
      }

      return childrenArray;
    } //Сортировка объекта


    function dynamicAdaptSort(arr) {
      arr.sort(function (a, b) {
        if (a.breakpoint > b.breakpoint) {
          return -1;
        } else {
          return 1;
        }
      });
      arr.sort(function (a, b) {
        if (a.place > b.place) {
          return 1;
        } else {
          return -1;
        }
      });
    } //Дополнительные сценарии адаптации


    function customAdapt() {//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
  })();
  /*
  let block = document.querySelector('.click');
  block.addEventListener("click", function (e) {
  	alert('Все ок ;)');
  });
  */

  /*
  //Объявляем переменные
  const parent_original = document.querySelector('.content__blocks_city');
  const parent = document.querySelector('.content__column_river');
  const item = document.querySelector('.content__block_item');
  //Слушаем изменение размера экрана
  window.addEventListener('resize', move);
  //Функция
  function move(){
  	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  	if (viewport_width <= 992) {
  		if (!item.classList.contains('done')) {
  			parent.insertBefore(item, parent.children[2]);
  			item.classList.add('done');
  		}
  	} else {
  		if (item.classList.contains('done')) {
  			parent_original.insertBefore(item, parent_original.children[2]);
  			item.classList.remove('done');
  		}
  	}
  }
  //Вызываем функцию
  move();
  */
  // components


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
      navHeight = nav.outerHeight();
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
  var lockPaddingValue = window.innerWidth - document.querySelector('.site__main').offsetWidth + 'px';
  var mediaQueryLgMin = window.matchMedia('(min-width: 1250px)');

  if (mediaQueryLgMin.matches) {
    $('.navigation-drawer__mobile').not('.filter-selected__reset').on('click', function () {
      $('.drawer-on').addClass('active');
      $('.navigation-drawer__wrapper, .navigation-drawer').addClass('active');
    });
  } else {
    $('.navigation-drawer__mobile').not('.filter-selected__reset').on('click', function () {
      $('.navigation-drawer__wrapper, .navigation-drawer').addClass('active');

      if (lockPadding.length > 0) {
        for (var index = 0; index < lockPadding.length; index++) {
          var el = lockPadding[index];
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

        if (!div.is(e.target) && div.has(e.target).length === 0) {
          $('.navigation-drawer__wrapper, .navigation-drawer, .drawer-on').removeClass('active');

          if (lockPadding.length > 0) {
            for (var index = 0; index < lockPadding.length; index++) {
              var el = lockPadding[index];
              el.style.paddingRight = '0px';
            }
          }

          body.style.paddingRight = '0px';
          body.classList.remove('lock');
        }
      }
    });
  }

  $('.filter-modals__link.popup-link').click(function (e) {
    $('.navigation-drawer__wrapper, .navigation-drawer, .drawer-on').removeClass('active');
  });
  var navItems = document.querySelectorAll('.header__inner .navbar .nav-link');
  var mediaQueryXsMax = window.matchMedia('(max-width: 450px)');

  if (mediaQueryXsMax.matches) {
    for (var index = 0; index < navItems.length; index++) {
      var element = navItems[index];
      $(element).text($(element).data('value'));
    }
  }

  var animItems = document.querySelectorAll('._anim-items');

  if (animItems.length > 0) {
    var animOnScroll = function animOnScroll(params) {
      for (var _index3 = 0; _index3 < animItems.length; _index3++) {
        var animItem = animItems[_index3];
        var animItemHeight = animItem.offsetHeight;
        var animItemOffset = offset(animItem).top;
        var animStart = 4; // Коэффициент старта анимации

        var animItemPoint = window.innerHeight - animItemHeight / animStart;

        if (animItemHeight > window.innerHeight) {
          animItemPoint = window.innerHeight - window.innerHeight / animStart;
        }

        if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
          animItem.classList.add('_active');
        } else {
          if (!animItem.classList.contains('_anim-no-hide')) {
            animItem.classList.remove('_active');
          }
        }
      }
    };

    var offset = function offset(el) {
      var rect = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      };
    };

    window.addEventListener('scroll', animOnScroll);
    setTimeout(function () {
      animOnScroll();
    }, 300);
  }

  var phone = $('#phone');

  if (phone.length > 0) {
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
  } //Select


  var selects = document.getElementsByTagName('select');

  if (selects.length > 0) {
    selects_init();
  }

  function selects_init() {
    for (var _index4 = 0; _index4 < selects.length; _index4++) {
      var select = selects[_index4];
      select_init(select);
    } //select_callback();


    document.addEventListener('click', function (e) {
      selects_close(e);
    });
    document.addEventListener('keydown', function (e) {
      if (e.which == 27) {
        selects_close(e);
      }
    });
  }

  function selects_close(e) {
    var selects = document.querySelectorAll('.select');

    if (!e.target.closest('.select')) {
      for (var _index5 = 0; _index5 < selects.length; _index5++) {
        var select = selects[_index5];
        var select_body_options = select.querySelector('.select__options');
        select.classList.remove('_active');

        _slideUp(select_body_options, 100);
      }
    }
  }

  function select_init(select) {
    var select_parent = select.parentElement;
    var select_modifikator = select.getAttribute('class');
    var select_selected_option = select.querySelector('option:checked');
    select.setAttribute('data-default', select_selected_option.value);
    select.style.display = 'none';
    select_parent.insertAdjacentHTML('beforeend', '<div class="select select_' + select_modifikator + '"></div>');
    var new_select = select.parentElement.querySelector('.select');
    new_select.appendChild(select);
    select_item(select);
  }

  function select_item(select) {
    var select_parent = select.parentElement;
    var select_items = select_parent.querySelector('.select__item');
    var select_options = select.querySelectorAll('option');
    var select_selected_option = select.querySelector('option:checked');
    var select_selected_text = select_selected_option.text;
    var select_type = select.getAttribute('data-type');

    if (select_items) {
      select_items.remove();
    }

    var select_type_content = '';

    if (select_type == 'input') {
      select_type_content = '<div class="select__value"><input autocomplete="off" type="text" name="form[]" value="' + select_selected_text + '" data-error="Ошибка" data-value="' + select_selected_text + '" class="select__input"></div>';
    } else {
      select_type_content = '<div class="select__value"><span>' + select_selected_text + '</span></div>';
    }

    select_parent.insertAdjacentHTML('beforeend', '<div class="select__item">' + '<div class="select__title">' + select_type_content + '</div>' + '<div class="select__options">' + select_get_options(select_options) + '</div>' + '</div></div>');
    select_actions(select, select_parent);
  }

  function select_actions(original, select) {
    var select_item = select.querySelector('.select__item');
    var select_body_options = select.querySelector('.select__options');
    var select_options = select.querySelectorAll('.select__option');
    var select_type = original.getAttribute('data-type');
    var select_input = select.querySelector('.select__input');
    select_item.addEventListener('click', function () {
      var selects = document.querySelectorAll('.select');

      for (var _index6 = 0; _index6 < selects.length; _index6++) {
        var _select = selects[_index6];

        var _select_body_options = _select.querySelector('.select__options');

        if (_select != select_item.closest('.select')) {
          _select.classList.remove('_active');

          _slideUp(_select_body_options, 100);
        }
      }

      _slideToggle(select_body_options, 100);

      select.classList.toggle('_active');
    });

    var _loop = function _loop(_index7) {
      var select_option = select_options[_index7];
      var select_option_value = select_option.getAttribute('data-value');
      var select_option_text = select_option.innerHTML;

      if (select_type == 'input') {
        select_input.addEventListener('keyup', select_search);
      } else {
        if (select_option.getAttribute('data-value') == original.value) {
          select_option.style.display = 'none';
        }
      }

      select_option.addEventListener('click', function () {
        for (var _index8 = 0; _index8 < select_options.length; _index8++) {
          var el = select_options[_index8];
          el.style.display = 'block';
        }

        if (select_type == 'input') {
          select_input.value = select_option_text;
          original.value = select_option_value;
        } else {
          select.querySelector('.select__value').innerHTML = '<span>' + select_option_text + '</span>';
          original.value = select_option_value;
          select_option.style.display = 'none';
        }
      });
    };

    for (var _index7 = 0; _index7 < select_options.length; _index7++) {
      _loop(_index7);
    }
  }

  function select_get_options(select_options) {
    if (select_options) {
      var select_options_content = '';

      for (var _index9 = 0; _index9 < select_options.length; _index9++) {
        var select_option = select_options[_index9];
        var select_option_value = select_option.value;

        if (select_option_value != '') {
          var select_option_text = select_option.text;
          select_options_content = select_options_content + '<div data-value="' + select_option_value + '" class="select__option">' + select_option_text + '</div>';
        }
      }

      return select_options_content;
    }
  }

  function select_search(e) {
    var select_block = e.target.closest('.select ').querySelector('.select__options');
    var select_options = e.target.closest('.select ').querySelectorAll('.select__option');
    var select_search_text = e.target.value.toUpperCase();

    for (var i = 0; i < select_options.length; i++) {
      var select_option = select_options[i];
      var select_txt_value = select_option.textContent || select_option.innerText;

      if (select_txt_value.toUpperCase().indexOf(select_search_text) > -1) {
        select_option.style.display = "";
      } else {
        select_option.style.display = "none";
      }
    }
  }

  function selects_update_all() {
    var selects = document.querySelectorAll('select');

    if (selects) {
      for (var _index10 = 0; _index10 < selects.length; _index10++) {
        var select = selects[_index10];
        select_item(select);
      }
    }
  }

  var _slideUp = function _slideUp(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(function () {
      target.style.display = 'none';
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  };

  var _slideDown = function _slideDown(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    target.style.removeProperty('display');
    var display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    var height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(function () {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('_slide');
    }, duration);
  };

  var _slideToggle = function _slideToggle(target) {
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

    if (!target.classList.contains('_slide')) {
      target.classList.add('_slide');

      if (window.getComputedStyle(target).display === 'none') {
        return _slideDown(target, duration);
      } else {
        return _slideUp(target, duration);
      }
    }
  };

  var popupLinks = document.querySelectorAll('.popup-link');
  var body = document.querySelector('body');
  var lockPadding = document.querySelectorAll(".lock-padding");
  var unlock = true;
  var timeout = 800;

  if (popupLinks.length > 0) {
    var _loop2 = function _loop2(_index11) {
      var popupLink = popupLinks[_index11];
      popupLink.addEventListener("click", function (e) {
        var popupName = popupLink.getAttribute('href').replace('#', '');
        var currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        e.preventDefault();
      });
    };

    for (var _index11 = 0; _index11 < popupLinks.length; _index11++) {
      _loop2(_index11);
    }
  }

  var popupCloseIcon = document.querySelectorAll('.close-popup');

  if (popupCloseIcon.length > 0) {
    var _loop3 = function _loop3(_index12) {
      var el = popupCloseIcon[_index12];
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      });
    };

    for (var _index12 = 0; _index12 < popupCloseIcon.length; _index12++) {
      _loop3(_index12);
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      var popupActive = document.querySelector('.popup.open');

      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }

      currentPopup.classList.add('open');
      currentPopup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupClose(popupActive) {
    var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    if (unlock) {
      popupActive.classList.remove('open');

      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    var lockPaddingValue = window.innerWidth - document.querySelector('.site__main').offsetWidth + 'px'; //!обратить внимание на контейнер

    if (lockPadding.length > 0) {
      for (var _index13 = 0; _index13 < lockPadding.length; _index13++) {
        var el = lockPadding[_index13];
        el.style.paddingRight = lockPaddingValue;
      }
    }

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (var _index14 = 0; _index14 < lockPadding.length; _index14++) {
          var el = lockPadding[_index14];
          el.style.paddingRight = '0px';
        }
      }

      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeout);
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      var popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
    }
  });

  (function () {
    // проверяем поддержку
    if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function (css) {
        var node = this;

        while (node) {
          if (node.matches(css)) return node;else node = node.parentElement;
        }

        return null;
      };
    }
  })();

  (function () {
    // проверяем поддержку
    if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
    }
  })();

  var quantityButtons = document.querySelectorAll('.quantity__button');

  if (quantityButtons.length > 0) {
    var _loop4 = function _loop4(_index15) {
      var quantityButton = quantityButtons[_index15];
      quantityButton.addEventListener("click", function (e) {
        var value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);

        if (quantityButton.classList.contains('quantity__button--plus')) {
          value++;
        } else {
          value = value - 1;

          if (value < 1) {
            value = 1;
          }
        }

        quantityButton.closest('.quantity').querySelector('input').value = value;
      });
    };

    for (var _index15 = 0; _index15 < quantityButtons.length; _index15++) {
      _loop4(_index15);
    }
  }

  $('.catalog-sorting__link, .filter-attributes__link, .filter-product__country-item').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
  });
  $('.filter-product .filter-stirps__item:first-child').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      $(this).closest('.tab-pane').find('.filter-stirps__item').not(':first-child').removeClass('active');
      $(this).closest('.tab-pane').find('.filter-stirps__item').not(':first-child').click();
    } else {
      $(this).closest('.tab-pane').find('.filter-stirps__item').not(':first-child').addClass('active');
      $(this).closest('.tab-pane').find('.filter-stirps__item').not(':first-child').click();
    }
  });
  $('.filter-product .filter-stirps__item').not(':first-child').on('click', function (e) {
    e.preventDefault();
    var id = $(this).attr('href');
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      $(id).slideDown(300);
    } else {
      $(id).slideUp(300);
    }
  });
  $('.filter-attributes__item .filter-attributes__title').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
    $(this).closest('.filter-attributes__item').find('.filter-attributes__link').addClass('active');

    if ($(this).hasClass('active')) {
      $(this).closest('.filter-attributes__item').find('.filter-attributes__link').addClass('active');
    } else {
      $(this).closest('.filter-attributes__item').find('.filter-attributes__link').removeClass('active');
    }
  }); // reset button

  $('.attributes-summary__reset').on('click', function (e) {
    e.preventDefault();
    $('.filter-product .filter-stirps__item, .filter-attributes__title, .filter-attributes__link, .filter-product__country-item').removeClass('active');
    $('.filter-attributes__item').slideUp(300);
  }); // open modal window and change tab

  $('.filter-modals__link').on('click', function (e) {
    var id = $(this).data('tab');
    $(id).closest('#filterAttrTabs').find('.nav-link').removeClass('active');
    $('.filter-attributes .tab-pane').removeClass('active show');
    $(id).click();
  });

  if ('.market__catalog' && $('.catalog__products').hasClass('catalog__products--card')) {
    var popupHeight = $('.catalog__product:last-child .product-popup').outerHeight();
    $('.market__catalog').css({
      'padding-bottom': popupHeight
    });
    $(window).resize(function () {
      popupHeight = $('.catalog__product:last-child .product-popup').outerHeight();
      $('.market__catalog').css({
        'padding-bottom': popupHeight
      });
    });
  }

  $('.accordion__title').click(function (event) {
    var accordionid = $(this).closest('.accordion').attr("id");

    if ($('#' + accordionid).hasClass('accordion-one')) {
      $('#' + accordionid + ' ' + '.accordion__title').not($(this)).removeClass('active');
      $('#' + accordionid + ' ' + '.accordion__text').not($(this).next()).slideUp(300);
    }

    $(this).toggleClass('active').next().slideToggle(300);
  });
  var slider = document.querySelector('.table');
  var isDown = false;
  var startX;
  var scrollLeft;

  if (slider) {
    slider.addEventListener('mousedown', function (e) {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', function () {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', function () {
      isDown = false;
      slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - slider.offsetLeft;
      var walk = (x - startX) * 3; //scroll-fast

      slider.scrollLeft = scrollLeft - walk;
    });
  }

  $('.provider-reviews').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '<button type="button" class="slick-arrow slick-prev"><i class="icon-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-arrow slick-next"><i class="icon-chevron-right"></i></button>',
    dots: false
  }); // $('.gallery__thumbnails').slick({
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

  var chat = $('.chat');

  if (chat) {
    $(".chat__window").scrollTop(function () {
      return this.scrollHeight;
    });
  }

  ;
  $('.delivery-timeline__btn').click(function (e) {
    e.preventDefault();
    $('.delivery-timeline__wrapper').toggleClass('active');
  });

  if ($('.delivery-history__item')) {
    $('.delivery-history__timeline').css({
      'padding-top': $('.delivery-history__item').outerHeight() / 2,
      'padding-bottom': $('.delivery-history__item').outerHeight() / 2
    });
  }

  if ($('#providerTabs').length > 0) {
    $('#providerTabs .nav-link:not(#providerTab-1)').click(function () {
      $('.provider-reviews').slideUp(300);
    });
    $('#providerTab-1').click(function () {
      $('.provider-reviews').slideDown(300);
    });

    if (!$('#providerTab-1').hasClass('active')) {
      $('.provider-reviews').slideUp(300);
    }
  }
});