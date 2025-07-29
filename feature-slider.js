// Feature Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const featureSection = document.querySelector('.feature-section');
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const contentWrapper = document.querySelector('.feature-content-wrapper');
    const contentTitle = document.querySelector('.feature-content-title');
    const contentDescription = document.querySelector('.feature-content-description');
    const mobileImage = document.querySelector('.mobile-mockup');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    // Slide data
    const slides = [
        {
            title: "Use your data for yourself",
            description: "Our AI identifies books and adds them to your digital library with all the details automatically. Get insights into your reading habits and discover your literary personality.",
            image: "assets/slide-image.png"
        },
        {
            title: "Track your reading journey",
            description: "Monitor your progress, set reading goals, and celebrate milestones. Our smart tracking helps you build consistent reading habits while discovering patterns in your preferences.",
            image: "assets/slide-image.png"
        },
        {
            title: "Connect with readers",
            description: "Join book clubs, share reviews, and discover your next favorite read through our vibrant community. Find readers with similar tastes and expand your literary horizons together.",
            image: "assets/slide-image.png"
        },
        {
            title: "Organize your library",
            description: "Create custom shelves, categorize books by genre or mood, and build your perfect digital library. Access your entire collection from anywhere, anytime with ease.",
            image: "assets/slide-image.png"
        }
    ];

    let currentSlide = 0;
    let autoSlideInterval;
    let isTransitioning = false;

    // Initialize slider
    function initSlider() {
        updateSlide(0);
        startAutoSlide();
        setupEventListeners();
    }

    // Update slide content with fade transition
    function updateSlide(slideIndex, direction = 'next') {
        if (isTransitioning) return;
        
        isTransitioning = true;
        currentSlide = slideIndex;

        // Add fade-out class
        contentWrapper.classList.add('fade-out');
        mobileImage.classList.add('fade-out');

        setTimeout(() => {
            // Update content
            contentTitle.textContent = slides[slideIndex].title;
            contentDescription.textContent = slides[slideIndex].description;
            mobileImage.src = slides[slideIndex].image;
            mobileImage.alt = `Mobile App Mockup - ${slides[slideIndex].title}`;

            // Update pagination
            paginationNumbers.forEach((number, index) => {
                number.classList.toggle('active', index === slideIndex);
            });

            // Remove fade-out and allow fade-in
            setTimeout(() => {
                contentWrapper.classList.remove('fade-out');
                mobileImage.classList.remove('fade-out');
                isTransitioning = false;
            }, 50);
        }, 200);
    }

    // Go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        updateSlide(nextIndex, 'next');
    }

    // Go to previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(prevIndex, 'prev');
    }

    // Start auto-slide with longer delay
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            if (!featureSection.matches(':hover')) {
                nextSlide();
            }
        }, 7000); // Increased from 4000ms to 7000ms (7 seconds)
    }

    // Stop auto-slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    // Restart auto-slide
    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Pagination click events
        paginationNumbers.forEach((number, index) => {
            number.addEventListener('click', () => {
                if (index !== currentSlide && !isTransitioning) {
                    updateSlide(index);
                    restartAutoSlide();
                }
            });
        });

        // Arrow navigation
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                if (!isTransitioning) {
                    prevSlide();
                    restartAutoSlide();
                }
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                if (!isTransitioning) {
                    nextSlide();
                    restartAutoSlide();
                }
            });
        }

        // Pause on hover
        featureSection.addEventListener('mouseenter', () => {
            featureSection.classList.add('paused');
        });

        // Resume on mouse leave
        featureSection.addEventListener('mouseleave', () => {
            featureSection.classList.remove('paused');
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (isElementInViewport(featureSection)) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    if (!isTransitioning) {
                        prevSlide();
                        restartAutoSlide();
                    }
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    if (!isTransitioning) {
                        nextSlide();
                        restartAutoSlide();
                    }
                }
            }
        });

        // Handle visibility change (pause when tab is not active)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoSlide();
            } else {
                restartAutoSlide();
            }
        });
    }

    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Handle window focus/blur for auto-slide
    window.addEventListener('focus', () => {
        if (!document.hidden) {
            restartAutoSlide();
        }
    });

    window.addEventListener('blur', () => {
        stopAutoSlide();
    });

    // Initialize the slider
    initSlider();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        stopAutoSlide();
    });
});