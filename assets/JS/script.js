var myDiv = document.getElementById("myDiv");
var myPage = document.getElementById("myPage")

setTimeout(function () {
  myDiv.style.display = 'none'
  myPage.classList.remove("hide")
}, 4 * 1000)