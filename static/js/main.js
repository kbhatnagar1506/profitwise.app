// Loading screen functionality
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen elements
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const loadingVideo = document.getElementById('loadingVideo');
    
    // Show main content after video ends
    if (loadingVideo) {
        loadingVideo.addEventListener('ended', function() {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transition = 'opacity 0.5s ease-in-out';
            
            setTimeout(function() {
                loadingScreen.style.display = 'none';
                mainContent.classList.remove('hidden');
            }, 500);
        });
        
        // Fallback: Show main content after 10 seconds if video doesn't end
        setTimeout(function() {
            if (loadingScreen && loadingScreen.style.display !== 'none') {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease-in-out';
                
                setTimeout(function() {
                    loadingScreen.style.display = 'none';
                    mainContent.classList.remove('hidden');
                }, 500);
            }
        }, 10000);
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Menu button functionality
    const menuButton = document.getElementById('menuButton');
    const menuContent = document.getElementById('menuContent');
    const menuClose = document.getElementById('menuClose');
    const heroSection = document.getElementById('heroSection');
    
    // Menu button click handler
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            heroSection.classList.add('menu-active');
            menuContent.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }
    
    // Close menu functionality
    if (menuClose) {
        menuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked'); // Debug log
            heroSection.classList.remove('menu-active');
            menuContent.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    // Close menu when clicking outside
    if (menuContent) {
        menuContent.addEventListener('click', function(e) {
            if (e.target === menuContent) {
                heroSection.classList.remove('menu-active');
                menuContent.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuContent && menuContent.classList.contains('active')) {
            heroSection.classList.remove('menu-active');
            menuContent.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Right Menu Animation
    const rightMenu = document.getElementById('rightMenu');
    let menuTimeout;
    let isMenuVisible = false;

    // Mouse movement detection for right menu
    document.addEventListener('mousemove', function(e) {
        const windowWidth = window.innerWidth;
        const rightThreshold = windowWidth - 100; // Trigger zone 100px from right edge
        
        if (e.clientX > rightThreshold && !isMenuVisible) {
            showMenu();
        } else if (e.clientX < rightThreshold - 50 && isMenuVisible) {
            hideMenu();
        }
    });

    // Show menu function
    function showMenu() {
        clearTimeout(menuTimeout);
        rightMenu.classList.add('show');
        isMenuVisible = true;
    }

    // Hide menu function
    function hideMenu() {
        menuTimeout = setTimeout(() => {
            rightMenu.classList.remove('show');
            isMenuVisible = false;
        }, 300); // Small delay to prevent flickering
    }

    // Keep menu open when hovering over it
    rightMenu.addEventListener('mouseenter', function() {
        clearTimeout(menuTimeout);
    });

    rightMenu.addEventListener('mouseleave', function() {
        hideMenu();
    });

    // Smooth scroll for menu links
    const menuLinks = document.querySelectorAll('.menu-item[href^="#"], .menu-link[href^="#"]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close menu if it's open
                if (menuContent && menuContent.classList.contains('active')) {
                    heroSection.classList.remove('menu-active');
                    menuContent.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                const targetPosition = targetSection.offsetTop;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Hide right menu after clicking
                hideMenu();
            }
        });
    });

    // Intersection Observer for feature cards animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Button click handlers
    const primaryBtn = document.querySelector('.btn-primary');
    const secondaryBtn = document.querySelector('.btn-secondary');

    if (primaryBtn) {
        primaryBtn.addEventListener('click', function() {
            // Add your primary action here
            console.log('Get Started clicked');
            // You can redirect to a signup page or open a modal
        });
    }

    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function() {
            // Add your secondary action here
            console.log('Learn More clicked');
            // You can scroll to features section or open a modal
            const featuresSection = document.querySelector('#features');
            if (featuresSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = featuresSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }

            // Add loading animation
            window.addEventListener('load', function() {
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    document.body.style.opacity = '1';
                }, 100);
            });

            // Video section intersection observer
            const videoSection = document.getElementById('videoSection');
            const backgroundVideo = document.getElementById('backgroundVideo');
            
            if (videoSection && backgroundVideo) {
                const videoObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Video section is visible, start playing
                            backgroundVideo.play().catch(e => {
                                console.log('Video autoplay prevented:', e);
                            });
                        } else {
                            // Video section is not visible, pause video
                            backgroundVideo.pause();
                        }
                    });
                }, {
                    threshold: 0.5 // Trigger when 50% of the section is visible
                });
                
                videoObserver.observe(videoSection);
                
                // Video loading handler
                backgroundVideo.addEventListener('loadeddata', function() {
                    // Video is ready to play, remove black overlay
                    videoSection.style.setProperty('--overlay-opacity', '0');
                });
            }
        });
        
        // ProfitWise Video Control
        const profitwiseVideoSection = document.getElementById('profitwiseVideoSection');
        const profitwiseVideo = document.getElementById('profitwiseVideo');
        
        if (profitwiseVideoSection && profitwiseVideo) {
            const profitwiseVideoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        profitwiseVideo.play();
                    } else {
                        profitwiseVideo.pause();
                    }
                });
            }, {
                threshold: 0.5 // Trigger when 50% of the section is visible
            });
            
            profitwiseVideoObserver.observe(profitwiseVideoSection);
        }
