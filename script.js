
function Menu() {
    const nav = document.querySelector(".navlinks");

    if (nav.style.display === "block") {
        nav.style.display = "none";
    } else {
        nav.style.display = "block";
    }
}


// hero section 

const slides = document.querySelectorAll(".hero-slide");
const textBoxes = document.querySelectorAll(".box1");

const nextButton = document.querySelector(".hero-arrow.next");
const prevButton = document.querySelector(".hero-arrow.prev");

let currentIndex = 0;
let isAnimating = false;
let autoSlide;

// Show the selected slide
function showSlide(newIndex, direction = "next") {
    if (isAnimating || newIndex === currentIndex) return;

    isAnimating = true;

    const currentSlide = slides[currentIndex];
    const nextSlide = slides[newIndex];

    // Prepare the incoming image
    nextSlide.style.transition = "none";
    nextSlide.style.transform =
        direction === "next"
            ? "translateX(100%)"
            : "translateX(-100%)";

    nextSlide.classList.add("active");

    // Apply starting position before animation
    nextSlide.offsetWidth;

    // Animate both images
    currentSlide.style.transition = "transform 0.8s ease-in-out";
    nextSlide.style.transition = "transform 0.8s ease-in-out";

    currentSlide.style.transform =
        direction === "next"
            ? "translateX(-100%)"
            : "translateX(100%)";

    nextSlide.style.transform = "translateX(0)";

    // Alternate between the two text containers
    const nextTextIndex = newIndex % 2;

    textBoxes.forEach((box, index) => {
        box.classList.toggle("active", index === nextTextIndex);
    });

    currentIndex = newIndex;

    // Clean up after the image transition
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

// Restart automatic timer after manual navigation
function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 3000);
}

nextButton.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
});

prevButton.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
});

// Automatically change images every 3 seconds
autoSlide = setInterval(nextSlide, 3000);
