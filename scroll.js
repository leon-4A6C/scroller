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
    var start = getScrollElement(true);
    if (start == scrollTo) {
      return;
    } else {
      var diff;
      var close = false;
      function scroll() {
        diff = getScrollElement(true) - scrollTo;
        if (diff < speed && diff > -speed) {
          close = true;
        }
        if (diff < 0) {
          if (close) {
            setScrollElement(getScrollElement(true)+1, true);
          } else {
            setScrollElement(getScrollElement(true)+speed, true);
          }
        } else {
          if (close) {
            setScrollElement(getScrollElement(true)-1, true);
          } else {
            setScrollElement(getScrollElement(true)-speed, true);
          }
        }
        if (getScrollElement(true) === scrollTo) {
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

var bestScrollElement;
function getScrollElement(left) {
  if (left) {
    if (!bestScrollElement) {
      if (document.documentElement.scrollLeft) {
        bestScrollElement = 0;
      } else if (document.body.scrollLeft) {
        bestScrollElement = 1;
      } else if (window.pageXOffset) {
        bestScrollElement = 2;
      } else {
        return 0
      }
    }
    switch (bestScrollElement) {
      case 0:
        return document.documentElement.scrollLeft;
        break;
      case 1:
        return document.body.scrollLeft;
        break;
      case 2:
        return window.pageXOffset;
        break;
      default:
        return document.body.scrollLeft;
    }
  } else {
    if (!bestScrollElement) {
      if (document.documentElement.scrollTop) {
        bestScrollElement = 0;
      } else if (document.body.scrollTop) {
        bestScrollElement = 1;
      } else if (window.pageYOffset) {
        bestScrollElement = 2;
      } else {
        return 0
      }
    }
    switch (bestScrollElement) {
      case 0:
        return document.documentElement.scrollTop;
        break;
      case 1:
        return document.body.scrollTop;
        break;
      case 2:
        return window.pageYOffset;
        break;
      default:
        return document.body.scrollTop;
    }
  }
}

function setScrollElement(x, left) {
  if (left) {
    switch (bestScrollElement) {
      case 0:
        document.documentElement.scrollLeft = x;
        break;
      case 1:
        document.body.scrollLeft = x;
        break;
      case 2:
        window.pageXOffset = x;
        break;
      default:
        document.body.scrollLeft = x;
        return 0
    }
  } else {
    switch (bestScrollElement) {
      case 0:
        document.documentElement.scrollTop = x;
        break;
      case 1:
        document.body.scrollTop = x;
        break;
      case 2:
        window.pageYOffset = x;
        break;
      default:
        document.body.scrollTop = x;
        return 0
    }
  }
}
