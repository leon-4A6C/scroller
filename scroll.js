// my own smoothScrolling function
var isPageScrolling = false;
function scrollTo(scrollTo, speed) {
  if (!isPageScrolling) {
    isPageScrolling = true;
    if (!speed) {
      if (window.matchMedia("(max-width: 599px)").matches) {
        speed = 25;
      } else {
        // the viewport is less than 599 pixels wide
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
          // done
          isPageScrolling = false;
          return;
        }
        requestAnimationFrame(scroll);
      }
      scroll();
    }
  }
}

function scrollToLR(scrollTo, speed) {
  if (!isPageScrolling) {
    isPageScrolling = true;
    if (!speed) {
      if (window.matchMedia("(max-width: 599px)").matches) {
        speed = 25;
      } else {
        // the viewport is less than 599 pixels wide
        speed = 50;
      }
    }
    if (typeof(scrollTo) != "number") {
      scrollTo = scrollTo.offsetLeft;
    }
    var start = document.body.scrollLeft;
    if (start == scrollTo) {
      return;
    } else {
      var diff;
      var close = false;
      function scroll() {
        diff = document.body.scrollLeft - scrollTo;
        if (diff < speed && diff > -speed) {
          close = true;
        }
        if (diff < 0) {
          if (close) {
            document.body.scrollLeft++;
          } else {
            document.body.scrollLeft += speed;
          }
        } else {
          if (close) {
            document.body.scrollLeft--;
          } else {
            document.body.scrollLeft -= speed;
          }
        }
        if (document.body.scrollLeft === scrollTo) {
          // done
          isPageScrolling = false;
          return;
        }
        requestAnimationFrame(scroll);
      }
      scroll();
    }
  }
}
