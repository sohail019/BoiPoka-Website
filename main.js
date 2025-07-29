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

      $header.css(
        "transform",
        scrolled >= scrollPos && scrollPos > 15
          ? "translateY(-125%)"
          : "translateY(0%)"
      );

      scrollPos = scrolled;
    });
  }

  function init() {
    handleStickyHeader();
  }

  init();
});
