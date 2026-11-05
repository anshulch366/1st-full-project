
function Menu() {
    const nav = document.querySelector(".navlinks");

    if (nav.style.display === "block") {
        nav.style.display = "none";
    } else {
        nav.style.display = "block";
    }
}


// =========================
// HERO SECTION
// =========================

const slides = document.querySelectorAll(".hero-slide");
const textBoxes = document.querySelectorAll(".box1");

const nextButton = document.querySelector(".hero-arrow.next");
const prevButton = document.querySelector(".hero-arrow.prev");

let currentIndex = 0;
let isAnimating = false;
let autoSlide;


// IMPORTANT: Activate first image and first text box
slides[0].classList.add("active");
slides[0].style.transform = "translateX(0)";

textBoxes[0].classList.add("active");


// Show selected slide
function showSlide(newIndex, direction = "next") {

    if (isAnimating || newIndex === currentIndex) return;

    isAnimating = true;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[newIndex];

    // Prepare incoming image
    nextSlide.style.transition = "none";

    nextSlide.style.transform =
        direction === "next"
            ? "translateX(100%)"
            : "translateX(-100%)";

    nextSlide.classList.add("active");

    // Apply starting position
    nextSlide.offsetWidth;

    // Animate both images
    currentSlide.style.transition = "transform 0.8s ease-in-out";
    nextSlide.style.transition = "transform 0.8s ease-in-out";

    currentSlide.style.transform =
        direction === "next"
            ? "translateX(-100%)"
            : "translateX(100%)";

    nextSlide.style.transform = "translateX(0)";

    // Change text boxes
    const nextTextIndex = newIndex % 2;

    textBoxes.forEach((box, index) => {
        box.classList.toggle("active", index === nextTextIndex);
    });

    currentIndex = newIndex;

    // Cleanup
    setTimeout(() => {

        currentSlide.classList.remove("active");

        currentSlide.style.transition = "";
        currentSlide.style.transform = "";

        nextSlide.style.transition = "";

        isAnimating = false;

    }, 850);
}


// Next image
function nextSlide() {

    const newIndex = (currentIndex + 1) % slides.length;

    showSlide(newIndex, "next");
}


// Previous image
function prevSlide() {

    const newIndex =
        (currentIndex - 1 + slides.length) % slides.length;

    showSlide(newIndex, "prev");
}


// Restart automatic timer
function resetAutoSlide() {

    clearInterval(autoSlide);

    autoSlide = setInterval(nextSlide, 5000);
}


// Next button
nextButton.addEventListener("click", () => {

    nextSlide();
    resetAutoSlide();

});


// Previous button
prevButton.addEventListener("click", () => {

    prevSlide();
    resetAutoSlide();

});


// Automatic slider: 5 seconds
autoSlide = setInterval(nextSlide, 5000);
