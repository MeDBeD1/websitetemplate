// Получение элементов
var get = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelector(selector);
};

var getAll = function (selector, scope) {
  scope = scope ? scope : document;
  return scope.querySelectorAll(selector);
};

// Эффект печати
if (document.getElementsByClassName('demo').length > 0) {
  var i = 0;
  var txt = `assistant
            [Режим ввода; нажмите Ctrl+D чтобы сохранить и выйти; нажмите Ctrl+C чтобы выйти не сохранив]

            ###Планы на вечер

            - Придумать новую фичу
            - Навестить друга
            - Покушать
            - Поспать`;
  var speed = 60;

  function typeItOut () {
    if (i < txt.length) {
      document.getElementsByClassName('demo')[0].innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeItOut, speed);
    }
  }

  setTimeout(typeItOut, 1800);
}

// Вкладки установки
window.addEventListener("load", function() {
  // Получение контейнеров
  var tabContainers = getAll(".tab__container");

  // Привязка к нажатия кнопки мыши
  for (var i = 0; i < tabContainers.length; i++) {
    get('.tab__menu', tabContainers[i]).addEventListener("click", tabClick);
  }

  // каждый клик связан с tab_container
  function tabClick (event) {
    var scope = event.currentTarget.parentNode;
    var clickedTab = event.target;
    var tabs = getAll('.tab', scope);
    var panes = getAll('.tab__pane', scope);
    var activePane = get(`.${clickedTab.getAttribute('data-tab')}`, scope);

    // Удаление всех активных класов
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('active');
    }

    for (var i = 0; i < panes.length; i++) {
      panes[i].classList.remove('active');
    }

    // Применение активных классов
    clickedTab.classList.add('active');
    activePane.classList.add('active');
  }
});

//Внутренний скроллинг в доках
var btns = getAll('.js-btn');
var sections = getAll('.js-section');

function setActiveLink(event) {
  // Удаление всех активных класов
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('selected');
  }

  event.target.classList.add('selected');
}

function smoothScrollTo(i, event) {
  var element = sections[i];
  setActiveLink(event);

  window.scrollTo({
    'behavior': 'smooth',
    'top': element.offsetTop - 20,
    'left': 0
  });
}

if (btns.length && sections.length > 0) {
  for (var i = 0; i<btns.length; i++) {
    btns[i].addEventListener('click', smoothScrollTo.bind(this,i));
  }
}

// Закрепить меню на скролле
window.addEventListener('scroll', function () {
  var docNav = get('.doc__nav > ul');

  if( docNav) {
    if (window.pageYOffset > 63) {
      docNav.classList.add('fixed');
    } else {
      docNav.classList.remove('fixed');
    }
  }
});

// Отзывчивая навигация
var topNav = get('.menu');
var icon = get('.toggle');

window.addEventListener('load', function(){
  function showNav() {
    if (topNav.className === 'menu') {
      topNav.className += ' responsive';
      icon.className += ' open';
    } else {
      topNav.className = 'menu';
      icon.classList.remove('open');
    }
  }
  icon.addEventListener('click', showNav);
});

document.getElementById('popupButton').addEventListener('click', function () {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('popup').style.display = 'block';
});

function closePopup() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('popup').style.display = 'none';
}

function submitForm() {
  const form = document.getElementById('contactForm');
  const formData = new FormData(form);

  fetch('/process_form', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
  })
  .catch(error => {
      console.error('Error:', error);
  });
}