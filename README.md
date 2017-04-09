# scroller
scrolls to an element on a page somewhat **smoothly**.

### usage
```javascript
// element
smoothScrollTo(document.getElementById('second'));

//number
smoothScrollTo(124);

//speed
smoothScrollTo(document.getElementById('second'), "TB", 50);

//left right scrolling
smoothScrollToLR(document.getElementById('second'), "LR");

//scrolling in BOTH directions
smoothScrollToLR(document.getElementById('second'), "BOTH");
```
