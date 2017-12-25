/* ===== Slider ===== */
var slider = (function () {
  'use strict';
  var parameters, container, list, items, imgWidth;

  /* Add fixed width on UL and LI */
  function setWrapperWidth(block ,imgW, single) {
    var blockWidth =  imgW * single.length;

    single.forEach(function(item, i, arr){
      item.classList.add('line');
      item.style.width = imgW + "px";
    });

    block.style.width = blockWidth + 10 + "px";
    block.style.left = 0 + "px";
  }

  /* Find image width */
  function getImageWidth(item) {
    return item.querySelector('img').width;
  }

  /* Change image */
  function changeImg(num){
    var cont = parameters.wrapper;
    var list = cont.querySelector('.slider__list');
    var item = list.querySelectorAll('.slide__item');

    list.style.left = "-" + item[num].offsetLeft + "px";
  }

  /* Event click on pagination button */
  function evtClick(arr, item, e) {
    var _this = e.currentTarget;
    var num;
    if( _this.classList.contains('pagination__item--active') ){
      return;
    }
    arr.forEach(function(item, i){
      if( item.classList.contains('pagination__item--active') ){
        item.classList.remove('pagination__item--active');
      }
      if( item === _this ) {
        item.classList.add('pagination__item--active');
        num = i;
      }
    });

    changeImg(num);
  }

  /* Add events on created pagination items */
  function addClickPagination(){
    var pagItem = container.querySelectorAll('.pagination__item');
    pagItem.forEach(function(item, i, arr){
      item.addEventListener('click', evtClick.bind(null, arr, item));
    });
  }

  /* Add pagination */
  function addPagination(container, items) {
    var pagList = document.createElement('ul');
    pagList.classList.add('pagination');

    container.appendChild(pagList);

    items.forEach(function(item, i){
      var li = document.createElement('li');
      li.classList.add('pagination__item');
      if( i === 0 ) {
        li.classList.add('pagination__item--active');
      }
      pagList.appendChild(li);
    });

    addClickPagination();
  }

  /* Window on resize */
  function resizeSld() {
    var wrapper = parameters.wrapper,
        list = wrapper.querySelector('.slider__list'),
        slides = wrapper.querySelectorAll('.slide__item');

    window.addEventListener('resize', function(){
      setWrapperWidth(list, wrapper.offsetWidth, slides);
    });
  }

  /* Start slider */
  function initSld() {
    container = parameters.wrapper;
    list = container.querySelector('.slider__list');
    items = container.querySelectorAll('.slide__item');

    container.classList.add('slider-wrapper');

    imgWidth = getImageWidth(list);
    setWrapperWidth(list, imgWidth, items);

    addPagination(container, items);

  }

  return {
    setParam : function (obj) {
      parameters = obj;
    },

    onResize : function () {
      resizeSld();
    },

    initSlider : function () {
      initSld();
    }
  }
}());

/* ===== Gallery ===== */
function Gallery(id, obj) {
  /* Close Popup */
  function closePopup(wrapper, btn, e) {
    if( e.target === btn || e.target == wrapper ) {
      document.body.removeChild(wrapper);
      document.body.style = '';
    }
  }

  /* Add Animate Class */
  function addImgAnimate() {
    var img = document.querySelector('.gallery-wraper__img');
    img.onload = function(){
      img.classList.add('gallery-wraper__img--animate');
    }
  }

  /* Create Popup */
  function createPopup(href) {
    var bgWrapper = document.createElement('div');
    bgWrapper.classList.add('gallery-wraper');

    var img = document.createElement('img');
    img.classList.add('gallery-wraper__img');
    img.setAttribute('src', href);
    bgWrapper.appendChild(img);

    var closeBtn = document.createElement('button');
    closeBtn.classList.add('gallery-wraper__close');
    closeBtn.innerHTML = 'X';
    bgWrapper.appendChild(closeBtn);

    document.body.appendChild(bgWrapper);
    document.body.style = 'overflow: hidden;';

    addImgAnimate();
    bgWrapper.addEventListener('click', closePopup.bind(null, bgWrapper, closeBtn));
  }
  /* Open Popup */
  function openPopup(href){
    createPopup(href);
  }

  /* Get Image Link */
  function clickOnLink(e) {
    e.preventDefault();
    var _target = e.target;
    if( !_target.tagName.toLowerCase() === 'img' ) {
      return;
    }
    var link = _target.parentNode.getAttribute('href');
    openPopup(link);
  }

  /* Add Event on Gallery */
  function addEvent(wrapper) {
    var wrapper = document.querySelector(wrapper);
    wrapper.addEventListener('click', clickOnLink);
  }

  this.id = id;
  this.init = function () {
    addEvent(this.id);
  }

  this.init();
}


window.onload = function(){
  var sliderOnPage = document.querySelector('#slider');
  var galleryOnPage = document.querySelector('#gallery');

  /* Init Slider */
  if( sliderOnPage ) {

    slider.setParam({
      wrapper : document.querySelector('#slider')
    });
    slider.initSlider();
    slider.onResize();
  }

  /* Init Gallery */
  if( galleryOnPage ) {
    var myGallery = new Gallery('#gallery');
  }

  /* Mobile Button */
  (function(){
    var burger = document.querySelector('.mob__btn'),
        navList = document.querySelector('.navigation__list');
    burger.addEventListener('click', function(e) {
      burger.classList.toggle('mob__btn--active');
      navList.classList.toggle('navigation__list--open');
    });
  })();

}
