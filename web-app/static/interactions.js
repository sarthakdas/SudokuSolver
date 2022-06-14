// When the user clicks on <span> (x), close the modal
var modal = document.getElementById("myModal");

// the x mark on the modal
var span = document.getElementsByClassName("close")[0];

// close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

