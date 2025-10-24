//More info about this project and the newer optimized version: https://isladjan.com/work/4/
//Author: isladjan - https://isladjan.com/

gsap.registerPlugin(ScrollTrigger);

// Floating Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.floating-navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const navbarLinks = document.querySelectorAll('.navbar-link');

    // Mobile menu toggle
    navbarToggle.addEventListener('click', function() {
        navbarToggle.classList.toggle('active');
        if (navbarMenu) navbarMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navbarLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarToggle.classList.remove('active');
            if (navbarMenu) navbarMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });



    // Navbar checkpoint navigation and special actions (e.g. open join form)
    navbarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // If this is the join-tribe link, open the embedded Google form popup
            if (this.classList.contains('join-tribe') || this.id === 'nav-join-tribe') {
                e.preventDefault();
                if (window.openJoinForm) window.openJoinForm();
                return;
            }

            e.preventDefault();
            const checkpointIndex = parseInt(this.getAttribute('data-checkpoint'));
            if (!isNaN(checkpointIndex)) {
                // Update navbar active state
                navbarLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Navigate to checkpoint using existing goTo function
                if (window.checkpointGoTo) {
                    window.checkpointGoTo(checkpointIndex);
                }
            }
        });
    });

    // Video Lazy Loading Functionality
    const lazyVideos = document.querySelectorAll('video[data-lazy-video]');
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const videoSrc = video.getAttribute('data-lazy-video');
                const source = video.querySelector('source[data-src]');
                
                if (videoSrc && source) {
                    // Add loading indicator
                    const videoItem = video.closest('.video-item');
                    const existingIndicator = videoItem.querySelector('.video-loading');
                    
                    if (!existingIndicator) {
                        const loadingIndicator = document.createElement('div');
                        loadingIndicator.className = 'video-loading';
                        loadingIndicator.textContent = 'Loading video...';
                        videoItem.appendChild(loadingIndicator);
                        
                        // Load the video source
                        source.src = source.getAttribute('data-src');
                        video.load();
                        
                        // Remove lazy loading attributes
                        video.removeAttribute('data-lazy-video');
                        source.removeAttribute('data-src');
                        
                        // Stop observing this video
                        videoObserver.unobserve(video);
                        
                        // Handle loading completion
                        video.addEventListener('loadeddata', () => {
                            if (loadingIndicator && loadingIndicator.parentNode) {
                                loadingIndicator.parentNode.removeChild(loadingIndicator);
                            }
                            
                            // If this is the active video, play it
                            if (videoItem && videoItem.classList.contains('active')) {
                                video.muted = true;
                                video.play().catch(e => {
                                    console.log('Lazy loaded video play failed:', e);
                                });
                            }
                        }, { once: true });
                        
                        // Handle loading errors
                        video.addEventListener('error', () => {
                            if (loadingIndicator && loadingIndicator.parentNode) {
                                loadingIndicator.textContent = 'Failed to load video';
                                setTimeout(() => {
                                    if (loadingIndicator.parentNode) {
                                        loadingIndicator.parentNode.removeChild(loadingIndicator);
                                    }
                                }, 2000);
                            }
                        }, { once: true });
                    }
                }
            }
        });
    }, {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    });

    // Start observing all lazy videos
    lazyVideos.forEach(video => {
        videoObserver.observe(video);
    });


});

let speed = 100;
let height = document.querySelector("svg").getBBox().height;
//let svgCord = screenToSVG(document.querySelector("svg"), window.innerWidth / 2, window.innerHeight / 2);

gsap.set("#h2-1", { opacity: 0 });
gsap.set("#bg_grad", { attr: { cy: "-50" } });
gsap.set(["#dinoL", "#dinoR"], { y: 80 });
gsap.set("#dinoL", { x: -10 });

const mm = gsap.matchMedia();
mm.add("(max-width: 1922px)", () => {
    gsap.set(["#cloudStart-L", "#cloudStart-R"], { x: 10, opacity: 1 });
});

/*  SCENE 1 */
let scene1 = gsap.timeline();
ScrollTrigger.create({
    animation: scene1,
    trigger: ".scrollElement",
    start: "top top",
    end: "45% 100%",
    scrub: 3
});

// hills animation
scene1.to("#h1-1", { y: 3 * speed, x: 1 * speed, scale: 0.9, ease: "power1.in" }, 0);
scene1.to("#h1-2", { y: 2.6 * speed, x: -0.6 * speed, ease: "power1.in" }, 0);
scene1.to("#h1-3", { y: 1.7 * speed, x: 1.2 * speed }, 0.03);
scene1.to("#h1-4", { y: 3 * speed, x: 1 * speed }, 0.03);
scene1.to("#h1-5", { y: 2 * speed, x: 1 * speed }, 0.03);
scene1.to("#h1-6", { y: 2.3 * speed, x: -2.5 * speed }, 0);
scene1.to("#h1-7", { y: 5 * speed, x: 1.6 * speed }, 0);
scene1.to("#h1-8", { y: 3.5 * speed, x: 0.2 * speed }, 0);
scene1.to("#h1-9", { y: 3.5 * speed, x: -0.2 * speed }, 0);
scene1.to("#cloudsBig-L", { y: 4.5 * speed, x: -0.2 * speed }, 0);
scene1.to("#cloudsBig-R", { y: 4.5 * speed, x: -0.2 * speed }, 0);
scene1.to("#cloudStart-L", { x: -300 }, 0);
scene1.to("#cloudStart-R", { x: 300 }, 0);

//animate text
scene1.to("#info", { y: 8 * speed }, 0);

/*   Bird   */
gsap.fromTo(
    "#bird",
    { opacity: 1 },
    {
        y: -250,
        x: 800,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".scrollElement",
            start: "15% top",
            end: "60% 100%",
            scrub: 4,
            onEnter: function () {
                gsap.to("#bird", { scaleX: 1, rotation: 0 });
            },
            onLeave: function () {
                gsap.to("#bird", { scaleX: -1, rotation: -15 });
            }
        }
    }
);

/* Clouds  */
let clouds = gsap.timeline();
ScrollTrigger.create({
    animation: clouds,
    trigger: ".scrollElement",
    start: "top top",
    end: "70% 100%",
    scrub: 1
});

clouds.to("#cloud1", { x: 500 }, 0);
clouds.to("#cloud2", { x: 1000 }, 0);
clouds.to("#cloud3", { x: -1000 }, 0);
clouds.to("#cloud4", { x: -700, y: 25 }, 0);

/* Sun motion Animation  */
let sun = gsap.timeline();
ScrollTrigger.create({
    animation: sun,
    trigger: ".scrollElement",
    start: "1% top",
    end: "2150 100%",
    scrub: 2
    //markers: true,
    //preventOverlaps: true, //if true, it will affect all preceding ScrollTriggers (you can use for example 'scrollTrigger1')
    //fastScrollEnd: true,   //(default 2500px/s)
});

//sun motion
sun.fromTo("#bg_grad", { attr: { cy: "-50" } }, { attr: { cy: "330" } }, 0);
//bg change
//sun.to("#sun", { attr: { offset: "0.15" } }, 0);
sun.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.15" } }, 0);
sun.to("#bg_grad stop:nth-child(3)", { attr: { offset: "0.18" } }, 0);
sun.to("#bg_grad stop:nth-child(4)", { attr: { offset: "0.25" } }, 0);
sun.to("#bg_grad stop:nth-child(5)", { attr: { offset: "0.46" } }, 0);
sun.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#f1e4c6" } }, 0);

/*   SCENE 2  */
let scene2 = gsap.timeline();
ScrollTrigger.create({
    animation: scene2,
    trigger: ".scrollElement",
    start: "15% top",
    end: "40% 100%",
    scrub: 3
});

scene2.fromTo("#h2-1", { y: 500, opacity: 0 }, { y: 0, opacity: 1 }, 0);
scene2.fromTo("#h2-2", { y: 500 }, { y: 0 }, 0.1);
scene2.fromTo("#h2-3", { y: 700 }, { y: 0 }, 0.1);
scene2.fromTo("#h2-4", { y: 700 }, { y: 0 }, 0.2);
scene2.fromTo("#h2-5", { y: 800 }, { y: 0 }, 0.3);
scene2.fromTo("#h2-6", { y: 900 }, { y: 0 }, 0.3);

/* Bats */
gsap.set("#bats", { transformOrigin: "50% 50%" });
gsap.fromTo(
    "#bats",
    { opacity: 1, y: 400, x: 0, scale: 0 },
    {
        y: 20,
        x: 100,
        scale: 0.8,
        //transformOrigin: "50% 50%",
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".scrollElement",
            start: "40% top",
            end: "70% 100%",
            scrub: 3,
            onEnter: function () {
                gsap.utils.toArray("#bats path").forEach((item, i) => {
                    gsap.to(item, {
                        scaleX: 0.5,
                        yoyo: true,
                        repeat: 9,
                        transformOrigin: "50% 50%",
                        duration: 0.15,
                        delay: 0.7 + i / 10
                    });
                });
                gsap.set("#bats", { opacity: 1 });
            },
            onLeave: function () {
                //gsap.to("#bats", { opacity: 0, delay: 2 });
            }
        }
    }
);

/* Sun increase */
let sun2 = gsap.timeline();
ScrollTrigger.create({
    animation: sun2,
    trigger: ".scrollElement",
    start: "2000 top",
    end: "5000 100%",
    scrub: 2
});

sun2.to("#sun", { attr: { offset: "1.4" } }, 0);
sun2.to("#bg_grad stop:nth-child(2)", { attr: { offset: "0.7" } }, 0);
sun2.to("#sun", { attr: { "stop-color": "#ffff00" } }, 0);
sun2.to("#lg4 stop:nth-child(1)", { attr: { "stop-color": "#623951" } }, 0);
sun2.to("#lg4 stop:nth-child(2)", { attr: { "stop-color": "#261F36" } }, 0);
sun2.to("#bg_grad stop:nth-child(6)", { attr: { "stop-color": "#45224A" } }, 0);

/* Transition (from Scene2 to Scene3) */
gsap.set("#scene3", { y: height - 40, visibility: "visible" });
let sceneTransition = gsap.timeline();
ScrollTrigger.create({
    animation: sceneTransition,
    trigger: ".scrollElement",
    start: "60% top",
    end: "bottom 100%",
    scrub: 3
});

sceneTransition.to("#h2-1", { y: -height - 100, scale: 1.5, transformOrigin: "50% 50%" }, 0);
sceneTransition.to("#bg_grad", { attr: { cy: "-80" } }, 0.0);
sceneTransition.to("#bg2", { y: 0 }, 0);

/* Scene 3 */
let scene3 = gsap.timeline();
ScrollTrigger.create({
    animation: scene3,
    trigger: ".scrollElement",
    start: "70% 50%",
    end: "bottom 100%",
    scrub: 3
});

// Footer pointer events management - matches footer visibility timing
ScrollTrigger.create({
    trigger: ".scrollElement",
    start: "70% 50%",
    end: "bottom 100%",
    scrub: true,
    onUpdate: (self) => {
        const footer = document.querySelector('.site-footer');
        if (footer) {
            const progress = self.progress;
            // Enable pointer events when we're 30% through the scene3 animation (when footer becomes visible)
            if (progress >= 0.3) {
                footer.style.pointerEvents = 'auto';
            } else {
                footer.style.pointerEvents = 'none';
            }
        }
    }
});

//Hills motion
scene3.fromTo("#h3-1", { y: 300 }, { y: -550 }, 0);
scene3.fromTo("#h3-2", { y: 800 }, { y: -550 }, 0.03);
scene3.fromTo("#h3-3", { y: 600 }, { y: -550 }, 0.06);
scene3.fromTo("#h3-4", { y: 800 }, { y: -550 }, 0.09);
scene3.fromTo("#h3-5", { y: 1000 }, { y: -550 }, 0.12);

//stars
scene3.fromTo("#stars", { opacity: 0 }, { opacity: 0.5, y: -500 }, 0);

// Text animations
scene3.fromTo("#text2", { opacity: 0 }, { opacity: 0.7, y: -710 }, 0.3);
scene3.to("footer", { opacity: 1 }, 0.3);

//gradient value change
scene3.to("#bg2-grad", { attr: { cy: 600 } }, 0);
scene3.to("#bg2-grad", { attr: { r: 500 } }, 0);

/*   falling star   */
gsap.set("#fstar", { y: -400 });
let fstarTL = gsap.timeline();
ScrollTrigger.create({
    animation: fstarTL,
    trigger: ".scrollElement",
    start: "4200 top",
    end: "6000 bottom",
    scrub: 2,
    onEnter: function () {
        gsap.set("#fstar", { opacity: 1 });
    },
    onLeave: function () {
        gsap.set("#fstar", { opacity: 0 });
    }
});
fstarTL.to("#fstar", { x: -700, y: -250, ease: "power2.out" }, 0);

gsap.fromTo("#stars path:nth-of-type(1)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.8 });
gsap.fromTo("#stars path:nth-of-type(3)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.8 });
gsap.fromTo("#stars path:nth-of-type(5)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1 });
gsap.fromTo("#stars path:nth-of-type(8)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.2 });
gsap.fromTo("#stars path:nth-of-type(11)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.5 });
gsap.fromTo("#stars path:nth-of-type(15)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 2 });
gsap.fromTo("#stars path:nth-of-type(17)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.1 });
gsap.fromTo("#stars path:nth-of-type(18)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.4 });
gsap.fromTo("#stars path:nth-of-type(25)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.1 });
gsap.fromTo("#stars path:nth-of-type(28)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.9 });
gsap.fromTo("#stars path:nth-of-type(30)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.3 });
gsap.fromTo("#stars path:nth-of-type(35)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 2 });
gsap.fromTo("#stars path:nth-of-type(40)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 0.8 });
gsap.fromTo("#stars path:nth-of-type(45)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.8 });
gsap.fromTo("#stars path:nth-of-type(48)", { opacity: 0.3 }, { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1 });

//reset scrollbar position after refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

/* ----------------------
   Scroll checkpoints / pagination
   When the user scrolls (wheel or touch) we snap the page to predefined
   checkpoints so the GSAP ScrollTrigger animations play between stops.
   This keeps the existing ScrollTrigger timelines intact and uses
   native smooth scrolling to move the document to the next checkpoint.
   ---------------------- */
(function () {
    const scrollElement = document.querySelector('.scrollElement');
    if (!scrollElement) return;

    // percentages of the scrollElement's scrollable range we want checkpoints at
    // const percents = [0, 0.15, 0.4, 0.6, 1];
    const percents = [0, 0.15, 0.4, 0.6, 0.8, 1]; 
    let maxScroll = Math.max(0, scrollElement.offsetHeight - window.innerHeight);
    let checkpoints = percents.map(p => Math.round(p * maxScroll));
    let current = 0;
    let isAnimating = false;

    const updateCheckpoints = () => {
        maxScroll = Math.max(0, scrollElement.offsetHeight - window.innerHeight);
        checkpoints = percents.map(p => Math.round(p * maxScroll));
    };

    window.addEventListener('resize', updateCheckpoints);

    // adjustable snap duration in ms (increase to slow down snapping)
    const snapDuration = 1400;
    let _rafId = null;

    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const smoothScrollTo = (targetY, duration = snapDuration) => {
        if (_rafId) cancelAnimationFrame(_rafId);
        const startY = window.scrollY || window.pageYOffset;
        const diff = targetY - startY;
        if (diff === 0) return Promise.resolve();
        const startTime = performance.now();

        return new Promise((resolve) => {
            const step = (now) => {
                const elapsed = now - startTime;
                const t = Math.min(1, elapsed / duration);
                const eased = easeInOutQuad(t);
                window.scrollTo(0, Math.round(startY + diff * eased));
                if (t < 1) {
                    _rafId = requestAnimationFrame(step);
                } else {
                    _rafId = null;
                    resolve();
                }
            };
            _rafId = requestAnimationFrame(step);
        });
    };

    const updateCheckpointContent = (index) => {
        // Hide all checkpoint content immediately
        document.querySelectorAll('.checkpoint-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Update navbar active state
        document.querySelectorAll('.navbar-link').forEach(link => {
            link.classList.remove('active');
        });
        const activeNavLink = document.querySelector(`[data-checkpoint="${index}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }
        
        // Always hide hero text initially
        document.body.classList.remove('checkpoint-0-active');
        
        // Show content after animations complete
        if (index === 0) {
            // For hero text, wait longer to let all animations finish
            setTimeout(() => {
                document.body.classList.add('checkpoint-0-active');
            }, snapDuration * 0.9); // Show hero text when 90% through scroll animation
        } else {
            // For other checkpoint content
            setTimeout(() => {
                const currentContent = document.getElementById(`checkpoint-${index}`);
                if (currentContent) {
                    currentContent.classList.add('active');
                }
            }, snapDuration * 0.7); // Show text when 70% through scroll animation
        }
    };

    const goTo = (index) => {
        index = Math.max(0, Math.min(checkpoints.length - 1, index));
        if (index === current) return;
        
        // Track checkpoint navigation with Vercel Analytics
        if (typeof window.va !== 'undefined') {
            const checkpointNames = ['Hero', 'About', 'How to Join', 'Journeys', 'Stories', 'Contact'];
            window.va('track', 'Section Navigation', { 
                from: checkpointNames[current] || `Section ${current}`,
                to: checkpointNames[index] || `Section ${index}`
            });
        }
        
        current = index;
        isAnimating = true;

        // Hide current content immediately when starting to scroll
        document.querySelectorAll('.checkpoint-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Always hide hero text initially
        document.body.classList.remove('checkpoint-0-active');

        // animate to checkpoint with a controlled duration
        smoothScrollTo(checkpoints[index], snapDuration).then(() => {
            isAnimating = false;
            
            if (index === 0) {
                // For hero text, add additional delay to let GSAP animations finish
                setTimeout(() => {
                    document.body.classList.add('checkpoint-0-active');
                }, 300); // Extra delay after scroll completes for hero text
            } else {
                // Show other checkpoint content immediately when scroll completes
                const currentContent = document.getElementById(`checkpoint-${index}`);
                if (currentContent) {
                    currentContent.classList.add('active');
                }
            }
        });
    };

    // Wheel handler (desktop). preventDefault to stop native free scrolling
    const wheelHandler = (e) => {
        // if an animation is playing, ignore additional wheel events
        if (isAnimating) {
            e.preventDefault();
            return;
        }

        const delta = e.deltaY;
        if (Math.abs(delta) < 5) return;

        e.preventDefault();
        if (delta > 0) goTo(current + 1);
        else goTo(current - 1);
    };

    // Touch handlers (mobile)
    let touchStartY = null;
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches ? e.touches[0].clientY : null;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        if (isAnimating || touchStartY === null) return;
        const touchEndY = e.changedTouches ? e.changedTouches[0].clientY : null;
        if (touchEndY === null) return;
        const dy = touchStartY - touchEndY;
        if (Math.abs(dy) < 30) return; // small swipe = ignore
        if (dy > 0) goTo(current + 1);
        else goTo(current - 1);
        touchStartY = null;
    }, { passive: true });

    // initialize current index based on current scroll position
    const initIndex = () => {
        updateCheckpoints();
        const y = window.scrollY;
        let i = 0;
        for (let j = 0; j < checkpoints.length; j++) {
            if (y >= checkpoints[j]) i = j;
        }
        current = i;
    };

    initIndex();
    // Initialize content visibility for current checkpoint
    updateCheckpointContent(current);
    
    // Add scroll listener to update navbar on manual scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (isAnimating) return; // Don't update during programmatic scrolling
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const y = window.scrollY;
            let newIndex = 0;
            for (let j = 0; j < checkpoints.length; j++) {
                if (y >= checkpoints[j]) newIndex = j;
            }
            
            if (newIndex !== current) {
                current = newIndex;
                // Update navbar active state directly using existing logic
                document.querySelectorAll('.navbar-link').forEach(link => {
                    link.classList.remove('active');
                });
                const activeNavLink = document.querySelector(`[data-checkpoint="${current}"]`);
                if (activeNavLink) {
                    activeNavLink.classList.add('active');
                }
            }
        }, 50);
    });
    
    // Expose goTo function globally for navbar
    window.checkpointGoTo = goTo;
    
    // attach wheel listener as non-passive so we can preventDefault
    window.addEventListener('wheel', wheelHandler, { passive: false });
})();

// function screenToSVG(svg, x, y) {
//     var pt = svg.createSVGPoint();
//     pt.x = x;
//     pt.y = y;
//     var cursorPt = pt.matrixTransform(svg.getScreenCTM().inverse());
//     return { x: Math.floor(cursorPt.x), y: Math.floor(cursorPt.y) }
// }

// Enhanced checkpoint interaction safety
// Add safeguards to ensure only active checkpoint interactions work
function isCheckpointActive(element) {
    // Check if the element is inside an active checkpoint
    const checkpointContent = element.closest('.checkpoint-content');
    if (!checkpointContent) return true; // Allow interactions outside checkpoints
    return checkpointContent.classList.contains('active');
}

// Override openJoinForm to check for active checkpoint
const originalOpenJoinForm = window.openJoinForm;
window.openJoinForm = function(eventOrUpdateURL, updateURL) {
    // If called from an event, check if the checkpoint is active
    if (eventOrUpdateURL && eventOrUpdateURL instanceof Event) {
        const target = eventOrUpdateURL.target || eventOrUpdateURL.currentTarget;
        if (target && !isCheckpointActive(target)) {
            console.log('Blocked interaction: checkpoint not active');
            return;
        }
    }
    if (originalOpenJoinForm) originalOpenJoinForm(eventOrUpdateURL, updateURL);
};

// Override openB2BForm to check for active checkpoint
const originalOpenB2BForm = window.openB2BForm;
window.openB2BForm = function(eventOrUpdateURL, updateURL) {
    // If called from an event, check if the checkpoint is active
    if (eventOrUpdateURL && eventOrUpdateURL instanceof Event) {
        const target = eventOrUpdateURL.target || eventOrUpdateURL.currentTarget;
        if (target && !isCheckpointActive(target)) {
            console.log('Blocked interaction: checkpoint not active');
            return;
        }
    }
    if (originalOpenB2BForm) originalOpenB2BForm(eventOrUpdateURL, updateURL);
};

// Add click event listeners to all buttons to check checkpoint status
document.addEventListener('DOMContentLoaded', function() {
    // Add checkpoint safety to all buttons
    document.querySelectorAll('.tribe-join-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (!isCheckpointActive(this)) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Blocked button click: checkpoint not active');
                return false;
            }
        }, true); // Use capture phase to intercept before onclick handlers
    });
});

// Join form functionality
// Escape cards modal behavior
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('escape-modal');
    const backdrop = document.getElementById('escape-modal-backdrop');
    const closeBtn = document.getElementById('escape-modal-close');
    const modalImage = document.getElementById('escape-modal-image');
    const modalTitle = document.getElementById('escape-modal-title');
    const modalDesc = document.getElementById('escape-modal-desc');
    const modalJourney = document.getElementById('escape-modal-journey');
    const modalPrice = document.getElementById('escape-modal-price');
    const modalBookBtn = document.getElementById('escape-modal-book');

    // Keep reference to the last clicked card so we can use per-card book links if provided
    let lastClickedCard = null;

    function openModal(data, updateURL = false) {
        if (!modal) return;
        
        // Track escape card modal opening with Vercel Analytics
        if (typeof window.va !== 'undefined') {
            window.va('track', 'Escape Card Viewed', { destination: data.title || 'Unknown' });
        }
        
        modalImage.src = data.imgSrc || '';
        modalImage.alt = data.imgAlt || '';
        modalTitle.textContent = data.title || '';
        modalDesc.textContent = data.description || '';
        modalJourney.textContent = data.journey || 'To be revealed soon';
        modalPrice.textContent = data.price || 'To be revealed soon';
        // store card reference if available
        lastClickedCard = data._card || null;
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        
        // Update URL if requested
        if (updateURL && data.title) {
            const destination = data.title.toLowerCase().replace(/\s+/g, '-');
            updateURLForJourney(destination);
        }
    }

    function closeModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        
        // Clear URL parameter if it exists
        if (window.location.search.includes('journey=')) {
            const newURL = window.location.origin + window.location.pathname;
            window.history.replaceState({}, '', newURL);
        }
    }

    // Click on card to open modal
    document.querySelectorAll('.escape-card').forEach(card => {
        card.addEventListener('click', function (e) {
            // Check if the card's checkpoint is active
            if (!isCheckpointActive(this)) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Blocked escape card click: checkpoint not active');
                return false;
            }

            // Collect data from card
            const img = card.querySelector('.card-image img');
            const title = card.querySelector('.card-title')?.textContent || '';
            const desc = card.querySelector('.card-description')?.textContent || '';

            // Set journey details and price to "to be revealed soon"
            const journey = card.getAttribute('data-journey') || 'To be revealed soon';
            const price = card.getAttribute('data-price') || 'To be revealed soon';

            openModal({ imgSrc: img?.src, imgAlt: img?.alt, title, description: desc, journey, price, _card: card }, true);
        });
    });

    // Close interactions
    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalBookBtn) modalBookBtn.addEventListener('click', function () {
        // Track booking button click with Vercel Analytics
        if (typeof window.va !== 'undefined') {
            const destination = modalTitle ? modalTitle.textContent : 'Unknown';
            window.va('track', 'Booking Requested', { destination: destination });
        }
        
        // Get the trip name from the modal title
        const tripPlace = modalTitle ? modalTitle.textContent.trim() : 'this amazing destination';
        
        // Create WhatsApp URL with phone number and pre-filled message
        const phoneNumber = '918143120853'; // +91 81431 20853
        const message = `Hi, Take me along to ${tripPlace} with you!`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // open in new tab/window
        window.open(whatsappURL, '_blank');
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') {
            closeModal();
        }
    });
});
function openJoinForm(eventOrUpdateURL = false, updateURL = false) {
    // Handle different parameter patterns:
    // openJoinForm() - no URL update
    // openJoinForm(event) - event passed, no URL update 
    // openJoinForm(event, true) - event passed, update URL
    // openJoinForm(true) - no event, update URL
    let shouldUpdateURL = false;
    
    if (typeof eventOrUpdateURL === 'boolean') {
        shouldUpdateURL = eventOrUpdateURL;
    } else if (typeof updateURL === 'boolean') {
        shouldUpdateURL = updateURL;
    }
    
    // Track join form opening with Vercel Analytics
    if (typeof window.va !== 'undefined') {
        window.va('track', 'Join Form Opened');
    }
    
    // Show the popup modal with Google form
    const popup = document.getElementById('joinFormPopup');
    if (popup) {
        // save last focused element to restore later
        window.__lastFocusBeforeJoin = document.activeElement;

        popup.style.display = 'flex';
        popup.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        addPopupScrollBlockers(popup);

        // Update URL if requested (for direct links)
        if (shouldUpdateURL && !window.location.search.includes('form=join')) {
            updateURLForPopup('join');
        }

        // focus the close button for accessibility
        const closeBtn = popup.querySelector('.form-close-btn');
        if (closeBtn) closeBtn.focus();
    }
}

function closeJoinForm() {
    // Hide the popup modal
    const popup = document.getElementById('joinFormPopup');
    if (popup) {
        popup.style.display = 'none';
        popup.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        removePopupScrollBlockers(popup);

        // Clear URL parameter if it exists
        if (window.location.search.includes('form=join')) {
            const newURL = window.location.origin + window.location.pathname;
            window.history.replaceState({}, '', newURL);
        }

        // restore focus
        try {
            const prev = window.__lastFocusBeforeJoin;
            if (prev && typeof prev.focus === 'function') prev.focus();
        } catch (err) { /* ignore */ }
    }
}

// Helper: prevent wheel/touch events on popup from bubbling to the window
function addPopupScrollBlockers(popup) {
    if (!popup) return;
    // avoid adding twice
    if (popup.__blockerHandlers) return;

    const wheelHandler = function (e) {
        // allow the inner element to handle default scrolling but stop propagation to window
        e.stopPropagation();
        // don't call preventDefault so inner scroll still works
    };

    const touchHandler = function (e) {
        e.stopPropagation();
    };

    popup.addEventListener('wheel', wheelHandler, { passive: false });
    popup.addEventListener('touchmove', touchHandler, { passive: false });

    popup.__blockerHandlers = { wheelHandler, touchHandler };
}

function removePopupScrollBlockers(popup) {
    if (!popup || !popup.__blockerHandlers) return;
    const { wheelHandler, touchHandler } = popup.__blockerHandlers;
    popup.removeEventListener('wheel', wheelHandler, { passive: false });
    popup.removeEventListener('touchmove', touchHandler, { passive: false });
    delete popup.__blockerHandlers;
}

function openB2BForm(eventOrUpdateURL = false, updateURL = false) {
    // Handle different parameter patterns similar to openJoinForm
    let shouldUpdateURL = false;
    
    if (typeof eventOrUpdateURL === 'boolean') {
        shouldUpdateURL = eventOrUpdateURL;
    } else if (typeof updateURL === 'boolean') {
        shouldUpdateURL = updateURL;
    }
    
    // Track B2B form opening with Vercel Analytics
    if (typeof window.va !== 'undefined') {
        window.va('track', 'Host Form Opened');
    }
    
    const popup = document.getElementById('b2bPopup');
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        addPopupScrollBlockers(popup);

        // Update URL if requested (for direct links)
        if (shouldUpdateURL && !window.location.search.includes('form=host')) {
            updateURLForPopup('host');
        }
    }
}

function closeB2BForm() {
    const popup = document.getElementById('b2bPopup');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
        removePopupScrollBlockers(popup);

        // Clear URL parameter if it exists
        if (window.location.search.includes('form=host')) {
            const newURL = window.location.origin + window.location.pathname;
            window.history.replaceState({}, '', newURL);
        }
    }
}

// URL-based popup functionality
function checkURLForPopup() {
    const urlParams = new URLSearchParams(window.location.search);
    const formParam = urlParams.get('form');
    const journeyParam = urlParams.get('journey');
    
    if (formParam === 'join') {
        // Open join form popup
        setTimeout(() => openJoinForm(), 100); // Small delay to ensure DOM is ready
    } else if (formParam === 'host') {
        // Open B2B/host form popup
        setTimeout(() => openB2BForm(), 100);
    } else if (journeyParam) {
        // Open journey card modal
        setTimeout(() => openJourneyFromURL(journeyParam), 100);
    }
}

// Function to generate shareable URLs for popups
function getPopupURL(formType) {
    const baseURL = window.location.origin + window.location.pathname;
    return `${baseURL}?form=${formType}`;
}

// Function to update URL when popup opens (optional - adds to browser history)
function updateURLForPopup(formType) {
    const newURL = getPopupURL(formType);
    window.history.pushState({ form: formType }, '', newURL);
}

// Function to update URL for journey modal
function updateURLForJourney(destination) {
    const baseURL = window.location.origin + window.location.pathname;
    const newURL = `${baseURL}?journey=${encodeURIComponent(destination)}`;
    window.history.pushState({ journey: destination }, '', newURL);
}

// Function to get shareable URL for journey
function getJourneyURL(destination) {
    const baseURL = window.location.origin + window.location.pathname;
    return `${baseURL}?journey=${encodeURIComponent(destination)}`;
}

// Function to open journey modal from URL parameter
function openJourneyFromURL(journeyParam) {
    // Decode the journey parameter and find matching card
    const decodedJourney = decodeURIComponent(journeyParam).toLowerCase();
    
    // Find the matching escape card
    const cards = document.querySelectorAll('.escape-card');
    let matchingCard = null;
    
    cards.forEach(card => {
        const title = card.querySelector('.card-title')?.textContent || '';
        const normalizedTitle = title.toLowerCase().replace(/\s+/g, '-');
        
        if (normalizedTitle === decodedJourney) {
            matchingCard = card;
        }
    });
    
    if (matchingCard) {
        // Collect data from the matching card
        const img = matchingCard.querySelector('.card-image img');
        const title = matchingCard.querySelector('.card-title')?.textContent || '';
        const desc = matchingCard.querySelector('.card-description')?.textContent || '';
        const journey = matchingCard.getAttribute('data-journey') || 'To be revealed soon';
        const price = matchingCard.getAttribute('data-price') || 'To be revealed soon';
        
        // Get reference to the modal elements and open modal
        const modal = document.getElementById('escape-modal');
        const modalImage = document.getElementById('escape-modal-image');
        const modalTitle = document.getElementById('escape-modal-title');
        const modalDesc = document.getElementById('escape-modal-desc');
        const modalJourney = document.getElementById('escape-modal-journey');
        const modalPrice = document.getElementById('escape-modal-price');
        
        if (modal && modalImage && modalTitle && modalDesc && modalJourney && modalPrice) {
            // Track modal opening from URL
            if (typeof window.va !== 'undefined') {
                window.va('track', 'Journey Opened From URL', { destination: title });
            }
            
            modalImage.src = img?.src || '';
            modalImage.alt = img?.alt || '';
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modalJourney.textContent = journey;
            modalPrice.textContent = price;
            
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }
}

// Function to copy popup URL to clipboard
function copyPopupURL(formType) {
    const url = getPopupURL(formType);
    
    if (navigator.clipboard && window.isSecureContext) {
        // Use modern clipboard API
        navigator.clipboard.writeText(url).then(() => {
            showCopySuccess(formType);
        }).catch(() => {
            fallbackCopyToClipboard(url, formType);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyToClipboard(url, formType);
    }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text, formType) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showCopySuccess(formType);
    } catch (err) {
        console.error('Could not copy text: ', err);
        // Show the URL in an alert as a final fallback
        alert(`Copy this URL: ${text}`);
    }
    
    document.body.removeChild(textArea);
}

// Show copy success message
function showCopySuccess(formType) {
    const formName = formType === 'join' ? 'Join Form' : 'Host Form';
    
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.textContent = `${formName} link copied to clipboard!`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2d5a2d;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInFromRight 0.3s ease-out;
    `;
    
    // Add animation keyframes if not already present
    if (!document.getElementById('copy-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'copy-notification-styles';
        style.textContent = `
            @keyframes slideInFromRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutToRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds with slide out animation
    setTimeout(() => {
        notification.style.animation = 'slideOutToRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Function to handle browser back button
function handlePopupNavigation(event) {
    if (event.state && event.state.form) {
        // User navigated to a popup state
        const formType = event.state.form;
        if (formType === 'join') {
            openJoinForm();
        } else if (formType === 'host') {
            openB2BForm();
        }
    } else if (event.state && event.state.journey) {
        // User navigated to a journey modal state
        openJourneyFromURL(event.state.journey);
    } else {
        // User navigated away from popup - close any open popups
        const joinPopup = document.getElementById('joinFormPopup');
        const b2bPopup = document.getElementById('b2bPopup');
        const journeyModal = document.getElementById('escape-modal');
        
        if (joinPopup && joinPopup.style.display === 'flex') {
            closeJoinForm();
        }
        if (b2bPopup && b2bPopup.style.display === 'flex') {
            closeB2BForm();
        }
        if (journeyModal && journeyModal.getAttribute('aria-hidden') === 'false') {
            // Close the journey modal
            journeyModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }
}

// EmailJS Configuration
// Replace these with your actual EmailJS credentials
const EMAILJS_CONFIG = {
    serviceId: 'service_x86a8zr',     // Replace with your EmailJS service ID
    templateId: 'template_10x59bl',   // Replace with your EmailJS template ID  
    publicKey: '6NvPuQRD2EKFSDf1j'      // Replace with your EmailJS public key
};

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS with public key
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
});

// B2B form submit handling with email functionality
document.addEventListener('DOMContentLoaded', function () {
    const b2bForm = document.getElementById('b2b-form');
    if (!b2bForm) return;

    b2bForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get submit button for loading state
        const submitBtn = b2bForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn?.textContent || 'Submit';

        // Basic validation for required fields
        const fullName = b2bForm.elements['fullName']?.value?.trim();
        const email = b2bForm.elements['email']?.value?.trim();
        const phone = b2bForm.elements['phone']?.value?.trim();
        const participants = b2bForm.elements['participants']?.value?.trim();

        if (!fullName || !email || !phone || !participants) {
            alert('Please fill the required fields: Full Name, Email, Phone and Number of Travellers.');
            return;
        }

        // Show loading state
        if (submitBtn) {
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        }

        // Collect form data
        const formData = {
            fullName,
            email,
            phone,
            company: b2bForm.elements['company']?.value?.trim() || 'Not specified',
            participants: participants,
            dates: b2bForm.elements['dates']?.value?.trim() || 'Not specified',
            destination: b2bForm.elements['destination']?.value?.trim() || 'Not specified',
            vibe: b2bForm.elements['vibe']?.value || 'Not specified',
            notes: b2bForm.elements['notes']?.value?.trim() || 'No additional notes',
            submissionDate: new Date().toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        try {
            // Send email using EmailJS (only if properly configured)
            if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
                await emailjs.send(
                    EMAILJS_CONFIG.serviceId,
                    EMAILJS_CONFIG.templateId,
                    formData
                );
                console.log('Email sent successfully');
            } else {
                console.log('EmailJS not configured. Form data:', formData);
            }

            // Track successful form submission with Vercel Analytics
            if (typeof window.va !== 'undefined') {
                window.va('track', 'B2B Form Submitted', { 
                    participants: formData.participants,
                    destination: formData.destination,
                    vibe: formData.vibe
                });
            }

            // Show success message
            const successEl = document.getElementById('b2b-success');
            if (successEl) {
                successEl.hidden = false;
                // Scroll success into view (only within popup area)
                successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            // Disable the form to prevent duplicate sends
            Array.from(b2bForm.querySelectorAll('input,textarea,select,button')).forEach(el => {
                if (el.type !== 'submit') el.disabled = true;
            });

            // Reset submit button but keep it disabled
            if (submitBtn) {
                submitBtn.textContent = 'Sent Successfully!';
            }

        } catch (error) {
            console.error('Error sending email:', error);
            
            // Show error message to user
            alert('There was an error sending your message. Please try again or contact us directly.');
            
            // Reset submit button
            if (submitBtn) {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        }
    });
});

// Scroll Down Arrow functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollArrow = document.getElementById('scrollDownArrow');
    
    if (!scrollArrow) return;
    
    let currentCheckpoint = 0;
    
    // Click handler to navigate to next section
    scrollArrow.addEventListener('click', function() {
        if (window.checkpointGoTo) {
            // Navigate to next checkpoint (max 5 checkpoints: 0-5)
            const nextCheckpoint = Math.min(currentCheckpoint + 1, 5);
            window.checkpointGoTo(nextCheckpoint);
            currentCheckpoint = nextCheckpoint;
        }
    });
    
    // Track scroll position to determine current checkpoint and hide arrow appropriately
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Estimate current checkpoint based on scroll position
        const scrollPercent = scrollTop / (documentHeight - windowHeight);
        
        if (scrollPercent <= 0.1) {
            currentCheckpoint = 0;
        } else if (scrollPercent <= 0.25) {
            currentCheckpoint = 1;
        } else if (scrollPercent <= 0.45) {
            currentCheckpoint = 2;
        } else if (scrollPercent <= 0.65) {
            currentCheckpoint = 3;
        } else if (scrollPercent <= 0.85) {
            currentCheckpoint = 4;
        } else {
            currentCheckpoint = 5;
        }
        
        // Hide arrow when we're at the last checkpoint or near the bottom
        if (currentCheckpoint >= 5 || scrollPercent > 0.9) {
            scrollArrow.classList.add('hidden');
        } else {
            scrollArrow.classList.remove('hidden');
        }
    });
});

// iPhone SVG gradient fix
function isIPhone() {
    return /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function applyIPhoneSVGFix() {
    if (isIPhone()) {
        // Add iPhone-specific class for CSS targeting
        document.documentElement.classList.add('ios-device');
        
        // Force SVG re-render on iPhone to fix gradient issues
        const svg = document.querySelector('svg.parallax');
        if (svg) {
            // Force a repaint by temporarily modifying a style
            const originalDisplay = svg.style.display;
            svg.style.display = 'none';
            
            // Force reflow
            svg.offsetHeight;
            
            // Restore display
            svg.style.display = originalDisplay || '';
            
            // Add iPhone-specific attributes to problematic elements
            const gradientPaths = svg.querySelectorAll('path[fill*="url(#grad"], polygon[fill*="url(#grad"]');
            gradientPaths.forEach(path => {
                // Force hardware acceleration
                path.style.transform = 'translateZ(0)';
                path.style.webkitTransform = 'translateZ(0)';
            });
        }
        
        console.log('iPhone SVG fixes applied');
    }
}

// Initialize URL-based popup functionality
document.addEventListener('DOMContentLoaded', function() {
    // Apply iPhone-specific fixes first
    applyIPhoneSVGFix();
    
    // Check URL on page load
    checkURLForPopup();
    
    // Listen for browser back/forward navigation
    window.addEventListener('popstate', handlePopupNavigation);
});

// Video Carousel Functionality
let currentVideoIndex = 1;
const totalVideos = 5;

// Helper function to load and play lazy videos
function loadAndPlayVideo(videoEl) {
    if (!videoEl) return;
    
    // Check if video is lazy loaded
    const videoSrc = videoEl.getAttribute('data-lazy-video');
    const source = videoEl.querySelector('source[data-src]');
    
    if (videoSrc && source) {
        // Add loading indicator
        const videoItem = videoEl.closest('.video-item');
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'video-loading';
        loadingIndicator.textContent = 'Loading video...';
        videoItem.appendChild(loadingIndicator);
        
        // Load the video source
        source.src = source.getAttribute('data-src');
        videoEl.load();
        
        // Remove lazy loading attributes
        videoEl.removeAttribute('data-lazy-video');
        source.removeAttribute('data-src');
        
        // Play after loading
        videoEl.addEventListener('loadeddata', () => {
            // Remove loading indicator
            if (loadingIndicator && loadingIndicator.parentNode) {
                loadingIndicator.parentNode.removeChild(loadingIndicator);
            }
            
            videoEl.currentTime = 0;
            videoEl.muted = true;
            videoEl.play().catch(e => {
                console.log('Video play failed after lazy load:', e);
            });
        }, { once: true });
        
        // Handle loading errors
        videoEl.addEventListener('error', () => {
            if (loadingIndicator && loadingIndicator.parentNode) {
                loadingIndicator.textContent = 'Failed to load video';
                setTimeout(() => {
                    if (loadingIndicator.parentNode) {
                        loadingIndicator.parentNode.removeChild(loadingIndicator);
                    }
                }, 2000);
            }
        }, { once: true });
    } else {
        // Video already loaded, just play
        videoEl.currentTime = 0;
        videoEl.muted = true;
        videoEl.play().catch(e => {
            console.log('Video play failed:', e);
        });
    }
}

function nextVideo() {
    console.log('Next video clicked, current index:', currentVideoIndex);
    
    // Track video navigation with Vercel Analytics
    if (typeof window.va !== 'undefined') {
        window.va('track', 'Video Navigation', { action: 'next', from: currentVideoIndex });
    }
    
    // Calculate next index
    const nextIndex = currentVideoIndex === totalVideos ? 1 : currentVideoIndex + 1;
    
    // Remove active class from current video
    const currentVideo = document.querySelector('.video-item.active');
    if (currentVideo) {
        const currentVideoEl = currentVideo.querySelector('.tribe-video');
        if (currentVideoEl) {
            currentVideoEl.pause();
        }
        currentVideo.classList.remove('active');
    }
    
    // Add active class to next video
    const nextVideo = document.querySelector(`[data-video="${nextIndex}"]`);
    if (nextVideo) {
        nextVideo.classList.add('active');
        
        // Play the new video (only if it's actually a video, not an image)
        const nextVideoEl = nextVideo.querySelector('.tribe-video');
        if (nextVideoEl) {
            loadAndPlayVideo(nextVideoEl);
        }
    }
    
    currentVideoIndex = nextIndex;
    console.log('Switched to video:', nextIndex);
}

function previousVideo() {
    console.log('Previous video clicked, current index:', currentVideoIndex);
    
    // Track video navigation with Vercel Analytics
    if (typeof window.va !== 'undefined') {
        window.va('track', 'Video Navigation', { action: 'previous', from: currentVideoIndex });
    }
    
    // Calculate previous index
    const prevIndex = currentVideoIndex === 1 ? totalVideos : currentVideoIndex - 1;
    
    // Remove active class from current video
    const currentVideo = document.querySelector('.video-item.active');
    if (currentVideo) {
        const currentVideoEl = currentVideo.querySelector('.tribe-video');
        if (currentVideoEl) {
            currentVideoEl.pause();
        }
        currentVideo.classList.remove('active');
    }
    
    // Add active class to previous video
    const prevVideo = document.querySelector(`[data-video="${prevIndex}"]`);
    if (prevVideo) {
        prevVideo.classList.add('active');
        
        // Play the new video (only if it's actually a video, not an image)
        const prevVideoEl = prevVideo.querySelector('.tribe-video');
        if (prevVideoEl) {
            loadAndPlayVideo(prevVideoEl);
        }
    }
    
    currentVideoIndex = prevIndex;
    console.log('Switched to video:', prevIndex);
}

function goToVideo(index) {
    if (index === currentVideoIndex) return;
    
    // Remove active class from current video
    const currentVideo = document.querySelector('.video-item.active');
    if (currentVideo) {
        const currentVideoEl = currentVideo.querySelector('.tribe-video');
        if (currentVideoEl) {
            currentVideoEl.pause();
        }
        currentVideo.classList.remove('active');
    }
    
    // Add active class to target video
    const targetVideo = document.querySelector(`[data-video="${index}"]`);
    if (targetVideo) {
        targetVideo.classList.add('active');
        
        // Play the new video
        const targetVideoEl = targetVideo.querySelector('.tribe-video');
        if (targetVideoEl) {
            loadAndPlayVideo(targetVideoEl);
        }
    }
    
    currentVideoIndex = index;
    console.log('Switched to video:', index);
}

// Initialize video carousel
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing video carousel...');
    
    // Test all videos to make sure they exist and can load
    const allVideos = document.querySelectorAll('.tribe-video');
    allVideos.forEach((video, index) => {
        console.log(`Video ${index + 1}:`, video.src);
        video.addEventListener('loadeddata', () => {
            console.log(`Video ${index + 1} loaded successfully`);
        });
        video.addEventListener('error', (e) => {
            console.error(`Video ${index + 1} failed to load:`, e);
        });
    });
    
    // Add click handlers to indicators
    const indicators = document.querySelectorAll('.video-indicator');
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const videoIndex = parseInt(this.getAttribute('data-video'));
            goToVideo(videoIndex);
        });
    });
    
    // Intersection observer to pause videos when not in view
    const videoCarousel = document.querySelector('.video-carousel');
    if (videoCarousel) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const videos = entry.target.querySelectorAll('.tribe-video');
                if (entry.isIntersecting) {
                    // Load and play active video when carousel comes into view
                    const activeVideo = entry.target.querySelector('.video-item.active .tribe-video');
                    if (activeVideo) {
                        loadAndPlayVideo(activeVideo);
                    }
                } else {
                    // Pause all videos when carousel is out of view
                    videos.forEach(video => video.pause());
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(videoCarousel);
    }
    
    // Test the navigation functions
    console.log('Video carousel initialized. Current video index:', currentVideoIndex);
});

// Logo click handler - scroll to home page
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for all elements to be ready
    setTimeout(function() {
        const logo = document.querySelector('.navbar-brand');
        const logoImg = document.querySelector('.navbar-brand .brand-logo');
        
        if (logo) {
            // Add click handler to the logo container
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Track logo click with Vercel Analytics
                if (typeof window.va !== 'undefined') {
                    window.va('track', 'Logo Clicked', { action: 'scroll_to_home' });
                }
                
                // Navigate to checkpoint 0 (home/hero section)
                if (window.checkpointGoTo) {
                    window.checkpointGoTo(0);
                }
            });
            
            // Make sure the logo has the proper cursor style
            logo.style.cursor = 'pointer';
        }
        
        // Also add click handler to the logo image itself for better coverage
        if (logoImg) {
            logoImg.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Navigate to checkpoint 0 (home/hero section)
                if (window.checkpointGoTo) {
                    window.checkpointGoTo(0);
                }
            });
            
            logoImg.style.cursor = 'pointer';
        }
        
    }, 100); // Small delay to ensure DOM is fully ready
});