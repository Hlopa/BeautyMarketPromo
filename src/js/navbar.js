import $ from 'jquery';

const NAVBAR_TOGGLED_CLASS = 'navbar--menu-shown';
const SCROLL_DISTANCE_TO_SHOW_NAVBAR = 450;

const navbarElement = $('.navbar');
const burgerElement = $('#navbar-mobile-burger');

/**
 * Toggle shown/hidden for navbar's menu.
 *
 * @param {HTMLElement} navbar navbar bar HTML Element.
 */
function togglenavbarBar(navbar) {
  navbar.toggleClass(NAVBAR_TOGGLED_CLASS);
  $(document.body).toggleClass('navbar-opened');
}

burgerElement.on('click', () => {
  burgerElement.toggleClass('burger--active');
  togglenavbarBar(navbarElement);
});

navbarElement.find('.navbar__link').on('click', () => {
  burgerElement.removeClass('burger--active');
  if ($(document.body).hasClass('navbar-opened'))
    togglenavbarBar(navbarElement);
});

$(window).on('resize', () => {
  $('.navbar').removeClass('navbar--scrolled');
});

$(window).on('scroll', () => {
  if ($(window).scrollTop() > SCROLL_DISTANCE_TO_SHOW_NAVBAR) {
    $('.navbar').addClass('navbar--scrolled');
    $('.menu').addClass('navbar--scrolled');
  } else {
    $('.navbar').removeClass('navbar--scrolled');
    $('.menu').removeClass('navbar--scrolled');
  }
});
