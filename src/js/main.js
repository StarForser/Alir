



(function () {
  ymaps.ready(buildMap);
  let myMap;

  document.addEventListener("DOMContentLoaded", initWork);

  function initWork () {

    let buttons = document.querySelectorAll('.jsCallbtn');
    initBox(buttons,".jsCallBlock",".jsCallCloseBtn","hideBlock");

    menuMobileSnow();

    var slider = new Swiper('.swiper-slider', {
        height: 550,
        watchOverflow: true,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        effect: "fade",
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        
      });
    var lates = new Swiper('.swiper-latest', {
    slidesPerView: 6,
    spaceBetween: 30,
    navigation: {
        nextEl: '.last__button-next',
        prevEl: '.last__button-prev',
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        }
        }
    });
    var lates = new Swiper('.swiper-latest--sale', {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
        nextEl: '.sale__button-next',
        prevEl: '.sale__button-prev',
    },
    breakpoints: {
        576: {
            slidesPerView: 2,
        }
        }
    });

  }
 

  function buildMap () {
      myMap = new ymaps.Map("map", {
          center: [58.61211307, 49.67741000],
          controls: ['typeSelector'],
          zoom: 15
      });
      var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
          hintContent: 'Мы находимся тут',
          balloonContent: 'Грибоедова 1а'
      }, {
          iconLayout: 'default#image',
          iconImageHref: 'images/placemark.png',
          iconImageSize: [32, 32],
          iconImageOffset: [-10, -18]
      });
      myMap.geoObjects.add(myPlacemark); 
  }
  function menuMobileSnow () {
      var btn = document.querySelector(".hamburger");
      var menu = document.querySelector(".jsMobileMenu");
      menu.addEventListener("animationend", throttle(open,100))
      btn.addEventListener("click", throttle(clickBtn,100))
      function open (e) {
        if (e.animationName == "hideMobileMenu") {
            menu.classList.remove(menu.classList[0]+"--mobile");
            menu.classList.remove(menu.classList[0]+"--hide");
        }
      }
      function clickBtn (e) {
        e.preventDefault();
        btn.classList.toggle("is-active");
        if (menu.classList.contains(menu.classList[0]+"--mobile")) {
            menu.classList.add(menu.classList[0]+"--hide");
        }
        else {
            menu.classList.toggle(menu.classList[0]+"--mobile");
        }
      }
  }

  function throttle(func, ms) {

      var isThrottled = false,
          savedArgs,
          savedThis;

      function wrapper() {

          if (isThrottled) {
              savedArgs = arguments;
              savedThis = this;
              return;
          }

          func.apply(this, arguments);

          isThrottled = true;

          setTimeout(function () {
              isThrottled = false;
              if (savedArgs) {
                  wrapper.apply(savedThis, savedArgs);
                  savedArgs = savedThis = null;
              }
          }, ms);
      }

      return wrapper;
  }

})()

function initBox (buttons,boxName, closeBtnName, nameEndAnim, boxTwo) {
    let box = document.querySelector(boxName);
      for (let index = 0; index < buttons.length; index++) {
          let button = buttons[index];
          button.addEventListener('click', openBox(box, nameEndAnim, closeBtnName, boxTwo));
      } 
    let closeBtn = document.querySelector(closeBtnName);
    box.addEventListener("animationend", animationListener(nameEndAnim), false);
    if (closeBtn) {
        box.addEventListener("click", closeBox(box, closeBtn));
    }
}
function openBox (box , nameAnim , closeBtn, boxTwo) {
  return function (evt) {
      evt.preventDefault();
      this.classList.toggle("is-active");
      if (nameAnim != closeBtn && box.classList.contains(box.classList[0] + "--active")) {
        box.classList.toggle(box.classList[0] + "--active");
        box.classList.toggle(box.classList[0] + "--deactive");
        boxTwo.classList.toggle(boxTwo.classList[0] + "--active");
        return;
      }
      if (box.classList.contains(box.classList[0] + "--deactive")) {
          box.classList.remove(box.classList[0] + "--deactive");
      }
      box.classList.toggle(box.classList[0] + "--active");
      if (boxTwo) {
        boxTwo.classList.toggle(boxTwo.classList[0] + "--active");
      }
  }
}
function closeBox (box, btn) {
    return function (evt) {
        if (evt.target == box || evt.target.closest(".jsCallCloseBtn") || evt.target.closest(".jsReviewsCloseBtn")) {
            box.classList.toggle(box.classList[0] + "--active");
            box.classList.toggle(box.classList[0] + "--deactive");
        }
    }
}
function animationListener (nameAnim) {
    return function (e) {
        if (e.animationName == nameAnim) {
            e.target.classList.toggle(e.target.classList[0] + "--deactive");
        }
    }
}


//////////////forma/////////////////////////////////
  function formReady (form) {
    if(form) {
        form.addEventListener("submit", formSend(form)); 
    }
} 
function formSend (forma) {
    return function (e) {
        e.preventDefault();
        var itemBlock = formGetBlock(forma);
        var xhr = new XMLHttpRequest();
        var formData = new FormData(forma);
        xhr.open("POST", "https://alirkirov.ru/index.php?route=information/contact");
        xhr.send(formData);
        xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
            forma.reset();
            itemBlock.button.classList.add(itemBlock.button.classList[0] + "--send");
            itemBlock.textBlock.textContent = "Запрос отправлен";
        }
    }
}
function formGetBlock (form,btn,textItem) {
    var button = initVariableBtn(form, button, btn||"submit" );
    var textBlock = initVariableBtn(button.children, textBlock, textItem||"SPAN" );
    var obj = {
        "button": button,
        "textBlock": textBlock
    };
    function initVariableBtn (list, variable, type) {
        for(var i = 0; i< list.length; i++) {
            if (list[i].type == type|| list[i].tagName) {
                variable = list[i];
            }
        }
        return variable;
    }
    return obj;
}
////////////////////////////////////////////////////