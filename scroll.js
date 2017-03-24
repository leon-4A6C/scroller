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
      scrollTo = getScrollElement();
    }
    var start = getScrollElement();
    if (start == scrollTo) {
      return;
    } else {
      var diff;
      var close = false;
      function scroll() {
        diff = getScrollElement() - scrollTo;
        if (diff < speed && diff > -speed) {
          close = true;
        }
        if (diff < 0) {
          if (close) {
            setScrollElement(getScrollElement()+1);
          } else {
            setScrollElement(getScrollElement()+speed);
          }
        } else {
          if (close) {
            setScrollElement(getScrollElement()-1);
          } else {
            setScrollElement(getScrollElement()-speed);
          }
        }
        if (getScrollElement() === scrollTo) {
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


function getScrollElement(left) {
  if (left) {
    return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
  } else {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }
}

function setScrollElement(x, left) {
  if (left) {
    window.pageXOffset = x;
    document.documentElement.scrollLeft = x;
    document.body.scrollLeft = x;
  } else {
    window.pageYOffset = x;
    document.documentElement.scrollTop = x;
    document.body.scrollTop = x;
  }
}
