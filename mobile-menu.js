// Mobile Menu Functionality - Full Screen Version
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navigation = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    const boipokaText = document.querySelector('.boipoka-text');
    const body = document.body;
    const header = document.querySelector('.header');

    // Check if elements exist
    if (!mobileMenuToggle || !navigation) {
        console.warn('Mobile menu elements not found');
        return;
    }

    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = mobileMenuToggle.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }

    // Open mobile menu
    function openMobileMenu() {
        mobileMenuToggle.classList.add('active');
        navigation.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        
        // Hide BoiPoka text on mobile when menu is open
        if (boipokaText && window.innerWidth <= 768) {
            boipokaText.style.opacity = '0';
            boipokaText.style.transition = 'opacity 0.3s ease';
        }

        // Ensure header stays on top
        if (header) {
            header.style.zIndex = '1000';
        }
    }

    // Close mobile menu
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove('active');
        navigation.classList.remove('active');
        body.style.overflow = ''; // Restore scrolling
        
        // Show BoiPoka text again when menu is closed
        if (boipokaText) {
            boipokaText.style.opacity = '1';
        }

        // Reset header z-index
        if (header) {
            header.style.zIndex = '1000';
        }
    }

    // Event listeners
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow navigation to proceed
            closeMobileMenu();
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navigation.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu on window resize if screen becomes larger
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navigation.classList.contains('active')) {
            closeMobileMenu();
        }
        
        // Restore BoiPoka text visibility on larger screens
        if (window.innerWidth > 768 && boipokaText) {
            boipokaText.style.opacity = '1';
        }
    });

    // Prevent menu from staying open on orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            if (window.innerWidth > 768 && navigation.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 100);
    });
});