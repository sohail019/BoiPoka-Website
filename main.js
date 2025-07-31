jQuery(document).ready(function ($) {
  function handleStickyHeader() {
    const $header = $(".header");
    const $banner = $(".bs-banner");
    let scrollPos = $(window).scrollTop();

    const bannerHeight = $banner.length ? $banner.outerHeight() : 0;

    if (scrollPos > bannerHeight) {
      $header.css("transform", "translateY(-125%)");
    } else {
      $header.css("transform", "translateY(0%)");
    }

    $(window).on("scroll", function () {
      const scrolled = $(this).scrollTop();

      $header.toggleClass("bg-sticky", scrolled > 20);

      $header.css("transform", scrolled >= scrollPos && scrollPos > 15 ? "translateY(-125%)" : "translateY(0%)");

      scrollPos = scrolled;
    });
  }

  function initFeatureSwipers() {
    const featureSwiper = new Swiper(".feature-swiper", {
      loop: true,
      speed: 600,
      effect: "fade",
      fadeEffect: {crossFade: true},
      allowTouchMove: false,
      // autoplay: {
      //   delay: 4000,
      //   disableOnInteraction: false,
      // },
    });

    const imageSwiper = new Swiper(".image-swiper", {
      loop: true,
      speed: 600,
      effect: "fade",
      fadeEffect: {crossFade: true},
      allowTouchMove: false,
      // direction: "vertical",
    });

    // Sync both Swipers
    featureSwiper.controller.control = imageSwiper;
    imageSwiper.controller.control = featureSwiper;

    const paginationNumbers = document.querySelectorAll(".pagination-number");
    function setActivePagination(index) {
      paginationNumbers.forEach((el) => el.classList.remove("active"));
      const realIndex = index % paginationNumbers.length;
      paginationNumbers[realIndex].classList.add("active");
    }

    // Pagination click
    paginationNumbers.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        featureSwiper.slideToLoop(index); // Important: use slideToLoop() when using loop:true
        imageSwiper.slideToLoop(index);
        setActivePagination(index);
      });
    });

    // Update pagination on automatic slide
    featureSwiper.on("slideChange", () => {
      setActivePagination(featureSwiper.realIndex);
    });

    // Arrow controls
    document.getElementById("feature-prev").addEventListener("click", () => {
      featureSwiper.slidePrev();
    });

    document.getElementById("feature-next").addEventListener("click", () => {
      featureSwiper.slideNext();
    });
  }

  function init() {
    handleStickyHeader();
    initFeatureSwipers();
    AOS.init({once: true});
  }

  init();
});
