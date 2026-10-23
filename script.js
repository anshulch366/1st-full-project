
function Menu() {
    const nav = document.querySelector(".navlinks");

    if (nav.style.display === "block") {
        nav.style.display = "none";
    } else {
        nav.style.display = "block";
    }
}
