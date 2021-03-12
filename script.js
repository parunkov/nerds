var write = document.querySelector(".write");
var popup = document.querySelector(".modal-content");
var close = document.querySelector(".modal-content-close");

write.addEventListener("click", function(event) {
  event.preventDefault();
  //console.log(1);
  popup.classList.add("modal-content-show");
});
close.addEventListener("click", function(event) {
  event.preventDefault();
  popup.classList.remove("modal-content-show");
});

var popupBtn = popup.querySelector(".submit-btn");

popupBtn.addEventListener("click", function(event) {
	event.preventDefault();
})