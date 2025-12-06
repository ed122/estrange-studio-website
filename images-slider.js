let currentIndex = 0;

const track  = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");

const prevBtn = document.querySelector(".nav-prev");
const nextBtn = document.querySelector(".nav-next");

function updateSlider() {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
  });
}

// Initial state
updateSlider();

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
});

/* =========================
   MOBILE SWIPE SUPPORT
   ========================= */

let startX = 0;
let endX   = 0;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

track.addEventListener("touchend", () => {
  if (startX - endX > 50) {
    // swipe left → next
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  } else if (endX - startX > 50) {
    // swipe right → previous
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }
});
