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
    var body = document.querySelector('body');
    var lockPaddingValue = window.innerWidth - document.querySelector('.site__main').offsetWidth + 'px';
    var lockPadding = document.querySelectorAll(".lock-padding");
    $('.navigation-drawer__mobile :not(.filter-selected__reset)').on('click', function () {
      $('.navigation-drawer__wrapper, .navigation-drawer').addClass('active');

      if (lockPadding.length > 0) {
        for (var index = 0; index < lockPadding.length; index++) {
          var el = lockPadding[index];
          el.style.paddingRight = lockPaddingValue;
        }
      }

      body.style.paddingRight = lockPaddingValue;
      body.classList.add('lock');
    });
    $(document).mouseup(function (e) {
      var div = $('.navigation-drawer__wrapper');

      if (!div.is(e.target) && div.has(e.target).length === 0) {
        $('.navigation-drawer__wrapper, .navigation-drawer').removeClass('active');

        if (lockPadding.length > 0) {
          for (var index = 0; index < lockPadding.length; index++) {
            var el = lockPadding[index];
            el.style.paddingRight = '0px';
          }
        }

        body.style.paddingRight = '0px';
        body.classList.remove('lock');
      }
    });
  });
  var animItems = document.querySelectorAll('._anim-items');

  if (animItems.length > 0) {
    var animOnScroll = function animOnScroll(params) {
      for (var index = 0; index < animItems.length; index++) {
        var animItem = animItems[index];
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
    for (var index = 0; index < selects.length; index++) {
      var select = selects[index];
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
      for (var index = 0; index < selects.length; index++) {
        var select = selects[index];
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

      for (var index = 0; index < selects.length; index++) {
        var _select = selects[index];

        var _select_body_options = _select.querySelector('.select__options');

        if (_select != select_item.closest('.select')) {
          _select.classList.remove('_active');

          _slideUp(_select_body_options, 100);
        }
      }

      _slideToggle(select_body_options, 100);

      select.classList.toggle('_active');
    });

    var _loop = function _loop(index) {
      var select_option = select_options[index];
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
        for (var _index3 = 0; _index3 < select_options.length; _index3++) {
          var el = select_options[_index3];
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

    for (var index = 0; index < select_options.length; index++) {
      _loop(index);
    }
  }

  function select_get_options(select_options) {
    if (select_options) {
      var select_options_content = '';

      for (var index = 0; index < select_options.length; index++) {
        var select_option = select_options[index];
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
      for (var index = 0; index < selects.length; index++) {
        var select = selects[index];
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
});