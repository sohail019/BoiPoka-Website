document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 [SLIDER] Initializing synchronized feature slider...');
  
  const slideData = [
    {
      title: "Snap away",
      description: "Point your camera at book spines, individual books, or even that chaotic pile on your nightstand.",
      image: "assets/library.png"
    },
    {
      title: "Watch it organise",
      description: "Our AI identifies books and adds them to your digital library with all the details automatically.",
      image: "assets/shelves.png"
    },
    {
      title: "Discover and share",
      description: "Get recommendations, join discussions, and show off your literary taste.",
      image: "assets/grid.png"
    },
    {
      title: "Use your data for yourself",
      description: "Get insights into your reading habits and discover your literary personality.",
      image: "assets/slide-image.png"
    }
  ];

  console.log('📊 [SLIDER] Loaded', slideData.length, 'slides');

  const paginationNumbers = document.querySelectorAll('.pagination-number');
  const featureImage = document.getElementById('feature-image');
  const featureTitle = document.querySelector('.feature-content-title');
  const featureDescription = document.querySelector('.feature-content-description');

  console.log('🔍 [SLIDER] DOM elements found:', {
    pagination: paginationNumbers.length,
    image: !!featureImage,
    title: !!featureTitle,
    description: !!featureDescription,
    initialImageSrc: featureImage?.src || 'empty'
  });

  // Preload all images to avoid flicker
  console.log('⏳ [PRELOAD] Starting image preload...');
  slideData.forEach((slide, index) => {
    const img = new Image();
    img.onload = () => console.log(`✅ [PRELOAD] Image ${index} loaded:`, slide.image);
    img.onerror = () => console.warn(`❌ [PRELOAD] Failed to load image ${index}:`, slide.image);
    img.src = slide.image;
  });

  let isUpdating = false;

  const featureSwiper = new Swiper('.feature-swiper', {
    slidesPerView: 1,
    speed: 600,
    loop: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: {
      nextEl: '#feature-next',
      prevEl: '#feature-prev',
    },
    effect: 'slide',
    on: {
      init: function () {
        console.log('🎬 [SWIPER] Initialized, setting first slide');
        updateSlideSync(0); // Set everything on first load
      },
      slideChangeTransitionStart: function() {
        console.log('🚀 [SWIPER] Slide transition started to slide', this.activeIndex);
      },
      slideChangeTransitionEnd: function () {
        console.log('🎯 [SWIPER] Slide transition ended, syncing slide', this.activeIndex);
        updateSlideSync(this.activeIndex); // Sync all updates ONLY after transition completes
      },
      autoplayStart: function() {
        console.log('▶️ [AUTOPLAY] Started');
      },
      autoplayStop: function() {
        console.log('⏸️ [AUTOPLAY] Stopped');
      }
    }
  });

  // SYNCHRONIZED UPDATE FUNCTION - All changes happen together
  function updateSlideSync(index) {
    if (isUpdating) {
      console.log('⏸️ [SYNC] Update already in progress, skipping');
      return;
    }

    isUpdating = true;
    console.log(`🔄 [SYNC] Starting synchronized update to slide ${index}`);

    // Step 1: Fade out ALL elements together
    console.log('📉 [SYNC] Fading out all content');
    featureTitle.style.transition = 'opacity 0.25s ease-out';
    featureDescription.style.transition = 'opacity 0.25s ease-out';
    featureImage.style.transition = 'opacity 0.25s ease-out';
    
    featureTitle.style.opacity = '0';
    featureDescription.style.opacity = '0';
    featureImage.style.opacity = '0';

    setTimeout(() => {
      // Step 2: Update ALL content at the same time
      console.log(`📝 [SYNC] Updating all content for slide ${index}:`, {
        title: slideData[index].title,
        image: slideData[index].image
      });
      
      featureTitle.textContent = slideData[index].title;
      featureDescription.textContent = slideData[index].description;
      featureImage.src = slideData[index].image;

      // Step 3: Update pagination (custom UI) 
      console.log(`🔢 [SYNC] Updating pagination to slide ${index}`);
      paginationNumbers.forEach((num, i) => {
        const wasActive = num.classList.contains('active');
        const shouldBeActive = i === index;
        num.classList.toggle('active', shouldBeActive);
        
        if (wasActive !== shouldBeActive) {
          console.log(`📍 [PAGINATION] Slide ${i}:`, shouldBeActive ? 'activated' : 'deactivated');
        }
      });

      // Step 4: Fade in ALL elements together
      console.log('📈 [SYNC] Fading in all content');
      featureTitle.style.opacity = '1';
      featureDescription.style.opacity = '1';
      featureImage.style.opacity = '1';

      setTimeout(() => {
        isUpdating = false;
        console.log(`✅ [SYNC] Synchronized update complete for slide ${index}`);
      }, 250);
    }, 250);
  }

  // Custom pagination click with sync
  paginationNumbers.forEach((num, index) => {
    num.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(`👆 [PAGINATION] Click on slide ${index}`);
      
      if (isUpdating) {
        console.log('⏸️ [PAGINATION] Update in progress, ignoring click');
        return;
      }
      
      if (featureSwiper.activeIndex === index) {
        console.log('⏭️ [PAGINATION] Already on slide', index);
        return;
      }
      
      console.log(`🎯 [PAGINATION] Navigating to slide ${index}`);
      featureSwiper.slideTo(index);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.target.tagName !== 'INPUT' && 
        e.target.tagName !== 'TEXTAREA' && 
        !e.target.isContentEditable &&
        !isUpdating) {
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        console.log('⬅️ [KEYBOARD] Left arrow pressed');
        featureSwiper.slidePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        console.log('➡️ [KEYBOARD] Right arrow pressed');
        featureSwiper.slideNext();
      }
    }
  });

  console.log('🎉 [SLIDER] Synchronized feature slider setup complete with 5s autoplay');
});
