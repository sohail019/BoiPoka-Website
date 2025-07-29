document.addEventListener("DOMContentLoaded", () => {
  const slides = [
    {
      title: "Use your data for yourself",
      description:
        "Our AI identifies books and adds them to your digital library with all the details automatically.",
      image: "assets/slide-image.png",
    },
    {
      title: "Track your progress",
      description:
        "Monitor your reading stats, achievements, and milestones with real-time updates.",
      image: "assets/slide-image.png",
    },
    {
      title: "Personalized insights",
      description:
        "Discover your reading personality with beautifully designed analytics and reports.",
      image: "assets/slide-image.png",
    },
    {
      title: "Share your journey",
      description:
        "Connect with friends and share your progress and favorite books instantly.",
      image: "assets/slide-image.png",
    },
  ];

  const paginationNumbers = document.querySelectorAll(".pagination-number");
  const featureContentWrapper = document.querySelector(
    ".feature-content-wrapper"
  );
  const featureTitle = document.querySelector(".feature-content-title");
  const featureDescription = document.querySelector(
    ".feature-content-description"
  );
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  const featureImage = document.querySelector(".mobile-mockup");

  let currentSlide = 0;
  let autoSlideInterval;

  function updateSlide(index) {
    currentSlide = index;
    paginationNumbers.forEach((n) => n.classList.remove("active"));
    paginationNumbers[index].classList.add("active");

    featureContentWrapper.classList.add("fade-out");

    setTimeout(() => {
      featureTitle.textContent = slides[index].title;
      featureDescription.textContent = slides[index].description;
      featureImage.src = slides[index].image;

      featureContentWrapper.classList.remove("fade-out");
      featureContentWrapper.classList.add("fade-in");

      setTimeout(() => featureContentWrapper.classList.remove("fade-in"), 300);
    }, 300);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      const nextIndex = (currentSlide + 1) % slides.length;
      updateSlide(nextIndex);
    }, 4000); // 4 seconds
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  paginationNumbers.forEach((number) => {
    number.addEventListener("click", () => {
      updateSlide(parseInt(number.dataset.slide));
      stopAutoSlide();
      startAutoSlide();
    });
  });

  leftArrow.addEventListener("click", () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide(newIndex);
    stopAutoSlide();
    startAutoSlide();
  });

  rightArrow.addEventListener("click", () => {
    const newIndex = (currentSlide + 1) % slides.length;
    updateSlide(newIndex);
    stopAutoSlide();
    startAutoSlide();
  });

  // Pause on hover
  document
    .querySelector(".feature-center")
    .addEventListener("mouseenter", stopAutoSlide);
  document
    .querySelector(".feature-center")
    .addEventListener("mouseleave", startAutoSlide);

  // Initialize first slide and start auto-slide
  updateSlide(0);
  startAutoSlide();
});
