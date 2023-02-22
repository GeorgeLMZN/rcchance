const toggleNav = () => {
  const navList = document.querySelector(".header-nav_list");
  const btnOpen = document.querySelector(".header-nav_btn__open");
  const btnClose = document.querySelector(".header-nav_btn__close");

  btnOpen.addEventListener("click", () => {
    navList.classList.add("visible");
  });

  btnClose.addEventListener("click", () => {
    navList.classList.remove("visible");
    navList.style = "transition: transform .5s;";
  });
};

toggleNav();

const sendFormModal = () => {
  const form = document.querySelector('.modal-window');

  form.addEventListener('submit', (e) => {
    e.preventDefault()
  })
}

const sendFormBlock = () => {
  const form = document.querySelector('.conact-modal');

  form?.addEventListener('submit', (e) => {
    e.preventDefault()
  })
}

const showForm = () => {
  const btnShow = document.querySelector('.header-nav_contact-link');
  const btnHide = document.querySelector('.modal-window_close');
  const form = document.querySelector('.modal');
  const body = document.querySelector('body');

  btnHide.addEventListener('click', (e) => {
    form.classList.add('d-none');
    body.style = '';
  });

  btnShow.addEventListener('click', (e) => {
    form.classList.remove('d-none');
    body.style = 'overflow: hidden';
  });
}

const openSub = () => {
  const btnShow = document.querySelectorAll('.triangle');

  btnShow.forEach((e) => {
    e.addEventListener('click', (e) => {
        const subList = e.target.parentNode.parentNode.querySelector('.header-nav_item-sub');
        subList.classList.toggle('d-none');
        e.target.classList.toggle('open');
    })
  });
}


openSub();
sendFormModal();
sendFormBlock();
showForm();

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      600: {
        items: 3,
        nav: false,
      },
      1000: {
        items: 3,
        nav: true,
        loop: false,
      },
    },
  });
});
