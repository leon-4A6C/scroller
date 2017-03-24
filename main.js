document.getElementById("firstButton").addEventListener("click", function() {
  scrollTo(document.getElementById('second'));
});
document.getElementById("secondButton").addEventListener("click", function() {
  scrollTo(document.getElementById('first'));
});
