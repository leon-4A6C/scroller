// my own smoothScrolling function
var isPageScrolling = false;
function smoothScrollTo(scrollToObject, direction, speed) {
  var directionChange = false;
  if (direction === "BOTH") {
    directionChange = true;
    direction = "TB";
  }
  if (!isPageScrolling) {
    isPageScrolling = true;
    if (!speed) {
      if (window.matchMedia("(max-width: 599px)").matches) {
        speed = 25;
      } else {
        speed = 50;
      }
    }
    if (typeof(scrollToObject) != "number") {
      if (direction === "LR") {
        var scrollTo = scrollToObject.offsetLeft;
      } else {
        var scrollTo = scrollToObject.offsetTop;
      }
    } else {
      var scrollTo = scrollToObject;
    }
    var start = getScrollElement(direction);
    if (start == scrollTo) {
      //done
      isPageScrolling = false;
      if (directionChange === true) {
        direction = "LR";
        smoothScrollTo(scrollToObject, direction);
      }
      return;
    } else {
      var diff;
      var close = false;
      function scroll() {
        diff = getScrollElement(direction) - scrollTo;
        if (diff < speed && diff > -speed) {
          close = true;
        }
        if (diff < 0) {
          if (close) {
            setScrollElement(getScrollElement(direction)+1, direction);
          } else {
            setScrollElement(getScrollElement(direction)+speed, direction);
          }
        } else {
          if (close) {
            setScrollElement(getScrollElement(direction)-1, direction);
          } else {
            setScrollElement(getScrollElement(direction)-speed, direction);
          }
        }
        if (getScrollElement(direction) === scrollTo) {
          // done
          isPageScrolling = false;
          if (directionChange === true) {
            direction = "LR";
            smoothScrollTo(scrollToObject, direction);
          }
          return;
        }
        requestAnimationFrame(scroll);
      }
      scroll();
    }
  }
}

var bestScrollElement;
function getScrollElement(direction) {
  if (!bestScrollElement) {
    if (document.documentElement.scrollLeft || document.documentElement.scrollTop) {
      bestScrollElement = 0;
    } else if (document.body.scrollLeft || document.body.scrollTop) {
      bestScrollElement = 1;
    } else if (window.pageXOffset || window.pageYOffset) {
      bestScrollElement = 2;
    } else {
      return 0
    }
  }
  if (direction === "LR") {
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

function setScrollElement(x, direction) {
  if (direction === "LR") {
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
