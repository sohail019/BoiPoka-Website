document.addEventListener("DOMContentLoaded", () => {
  const slides = [
    {
      title: "Use your data for yourself",
      description:
        "Our AI identifies books and adds them to your digital library with all the details automatically.",
    },
    {
      title: "Track your progress",
      description:
        "Monitor your reading stats, achievements, and milestones with real-time updates.",
    },
    {
      title: "Personalized insights",
      description:
        "Discover your reading personality with beautifully designed analytics and reports.",
    },
    {
      title: "Share your journey",
      description:
        "Connect with friends and share your progress and favorite books instantly.",
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

  let currentSlide = 0;

  function updateSlide(index) {
    currentSlide = index;
    paginationNumbers.forEach((n) => n.classList.remove("active"));
    paginationNumbers[index].classList.add("active");

    featureContentWrapper.classList.add("fade-out");

    setTimeout(() => {
      featureTitle.textContent = slides[index].title;
      featureDescription.textContent = slides[index].description;
      featureContentWrapper.classList.remove("fade-out");
      featureContentWrapper.classList.add("fade-in");

      setTimeout(() => featureContentWrapper.classList.remove("fade-in"), 300);
    }, 300);
  }

  paginationNumbers.forEach((number) => {
    number.addEventListener("click", () =>
      updateSlide(parseInt(number.dataset.slide))
    );
  });

  leftArrow.addEventListener("click", () => {
    const newIndex = (currentSlide - 1 + slides.length) % slides.length;
    updateSlide(newIndex);
  });

  rightArrow.addEventListener("click", () => {
    const newIndex = (currentSlide + 1) % slides.length;
    updateSlide(newIndex);
  });

  // Initialize first slide
  updateSlide(0);
});
