/*
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
≡≡≡≡≡≡                                                                                                      ≡≡≡≡≡≡≡≡≡≡≡≡
≡≡≡≡≡≡   INITIALISE / BASE 1.0                                                                             ≡≡≡≡≡≡≡≡≡≡≡≡
≡≡≡≡≡≡                                                                                                    ≡≡≡≡≡≡≡≡≡≡≡≡
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
*/

'use strict';
$ = $ || jQuery;

$(function () {

  var body = $('body'),
      html = $('html'),
      $doc = $(document),

      handlexxxxxxxxxx = function () {
        
      };


  // get nav for hide/show
  var getNav = document.querySelector('.js-main-nav');
  // construct an instance of Headroom, passing the element and options
  var headroom  = new Headroom(getNav, {
    "tolerance": 5,
    "offset": 58,
    "classes": {
      "initial": "",
      "pinned": "slideInDown",
      "unpinned": "slideOutUp"
    }
  });

  // initialise
  headroom.init();

  //Header image carousel
  /*$('#js-header-hero-carousel').owlCarousel({
    items: 1,
    loop : true,
    loadedClass: 'owl-loaded owl-theme',
    responsiveRefreshRate : 200,
    responsiveBaseElement: window,
    onResized: function (e) {
      $("img.scale").imageScale();
    }
  });*/
  
  //IMAGE SCALE
  $(".negative-container img.scale").imageScale({
    rescaleOnResize: true
  });

  $doc.on('click', '.js-close-banner', function (e) {
    $(this).parents('.component').addClass('slideOutUp');
    e.preventDefault();
  });

  enquire.register("screen and (max-width:480px)", {
    // OPTIONAL
    // If supplied, triggered when a media query matches.
    match : function() {
      
    },      
                                
    // OPTIONAL
    // If supplied, triggered when the media query transitions 
    // *from a matched state to an unmatched state*.
    unmatch : function() {

    },    
    
    // OPTIONAL
    // If supplied, triggered once, when the handler is registered.
    setup : function() {},    
                                
    // OPTIONAL, defaults to false
    // If set to true, defers execution of the setup function 
    // until the first time the media query is matched
    deferSetup : true,
                                
    // OPTIONAL
    // If supplied, triggered when handler is unregistered. 
    // Place cleanup code here
    destroy : function() {}
      
  });

  //DROPDOWN OVERLAY CLOSE DROPDOWNS
  $dropdownOverlay.on('touchstart click', handleCloseHeaderDropdown);

  $(window).scroll(function(){    
    /*hideNavDropdown();*/
  }).scroll();

  $(window).resize(function(){    
    /*basketCalculations();*/
  });

  /*function basketCalculations() {
    var $dropdownHeight = $(window).height();

    $dropdownOverlay.css({'height':(($dropdownHeight))+'px'});
    $basketdropdown.css({'height':(($dropdownHeight))+'px'});
    $basketdropdownItemWrapper.css({'max-height':(($dropdownHeight -120))+'px'});
  }*/

  function cookiesEnabled() {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) { 
        document.cookie="testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    return (cookieEnabled);
  }

  function showRating() {
    $('.component.ratings-banner').addClass('show');
  }

  function ratingCookie() {
    var dateNow = moment().date();

    if (docCookies.getItem('visited') === null) {
      setTimeout(showRating, 120000);
      docCookies.setItem('visited', dateNow, 31536000);
      docCookies.setItem('shown_rating', true, 31536000); 
      return;
    } else {
      docCookies.setItem('visited', dateNow, 31536000); 
    }

    if (docCookies.getItem('visited') < 15) {
      docCookies.setItem('shown_rating', false, 31536000);
      return
    };

    if (docCookies.getItem('visited') >= 15 && docCookies.getItem('shown_rating') === 'false') {
      setTimeout(showRating, 120000);
      docCookies.setItem('shown_rating', true, 31536000);
    }
  }

  // Only run this stuff if page is fully loaded
  // This is needed to prevent onreadystatechange being run twice
  var ready = false;

  document.onreadystatechange = function() {

    if (ready) {
      return;
    }
    
    // interactive = DOMContentLoaded & complete = window.load
    if (document.readyState == 'interactive' || document.readyState == 'complete') {
      ready = true;

      if (cookiesEnabled() === false) {
        return;
      } else {        
        ratingCookie();
      }

      // Star rating
      $('.star-rating').rating({
        'showCaption':false,
        'stars':'5',
        'min':'0',
        'max':'5',
        'step':'1',
        'size':'sm'
      });      
      $('.component.ratings-banner .btn').on('click', function() {
          /*alert('star rating ' + $('.star-rating').val());*/
      });

    }
  };  
});


function isIE () {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

if (isIE () == 9) {
  $('body').addClass('ie9');
}