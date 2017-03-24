// my own smoothScrolling function
var isPageScrolling = false;
function scrollTo(scrollTo, speed) {
  if (!isPageScrolling) {
    isPageScrolling = true;
    if (!speed) {
      if (window.matchMedia("(max-width: 599px)").matches) {
        speed = 25;
      } else {
        /* the viewport is less than 400 pixels wide */
        speed = 50;
      }
    }
    if (typeof(scrollTo) != "number") {
      scrollTo = scrollTo.offsetTop;
    }
    var start = document.body.scrollTop;
    if (start == scrollTo) {
      return;
    } else {
      var diff;
      var close = false;
      function scroll() {
        diff = document.body.scrollTop - scrollTo;
        if (diff < speed && diff > -speed) {
          close = true;
        }
        if (diff < 0) {
          if (close) {
            document.body.scrollTop++;
          } else {
            document.body.scrollTop += speed;
          }
        } else {
          if (close) {
            document.body.scrollTop--;
          } else {
            document.body.scrollTop -= speed;
          }
        }
        if (document.body.scrollTop === scrollTo) {
          isPageScrolling = false;
          return;
        }
        requestAnimationFrame(scroll);
      }
      scroll();
    }
  }
}
