// Добавьте в конец body или в отдельный файл script.js
const hamburger = document.querySelector('.hamburger')
const navMenu = document.querySelector('.nav-menu')

hamburger.addEventListener('click', () => {
	navMenu.classList.toggle('active')
})

// Smooth scroll animation on page load
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer для анимации появления элементов
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Наблюдаем за всеми элементами с классами анимации
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


// Custom Scroll Progress Bar
function initCustomScrollbar() {
    // Create scroll progress bar
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    

    
 
    
    // Update scroll progress
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        scrollProgress.style.width = scrollPercent + '%';
        
        // Update active dot based on scroll position
        const dots = document.querySelectorAll('.scroll-dot');
        const currentSection = Math.floor((scrollPercent / 100) * sections.length);
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSection);
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', updateScrollProgress);
    
    // Initial update
    updateScrollProgress();
}

// Initialize custom scrollbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCustomScrollbar();
});

// Интерактивные изображения для секции services
function initServicesImages() {
    const serviceTabs = document.querySelectorAll('.service-tab-vertical');
    const serviceImages = document.querySelectorAll('.service-image');
    
    if (!serviceTabs.length || !serviceImages.length) return;
    
    serviceTabs.forEach(tab => {
        tab.addEventListener('mouseenter', () => {
            const service = tab.getAttribute('data-service');
            
            // Скрыть все изображения
            serviceImages.forEach(img => {
                img.classList.remove('active');
            });
            
            // Показать соответствующее изображение
            const targetImage = document.querySelector(`.service-image[data-service="${service}"]`);
            if (targetImage) {
                setTimeout(() => {
                    targetImage.classList.add('active');
                }, 100);
            }
        });
        
        // Скрыть изображение при уходе курсора с конкретного таба
        tab.addEventListener('mouseleave', () => {
            const service = tab.getAttribute('data-service');
            const targetImage = document.querySelector(`.service-image[data-service="${service}"]`);
            if (targetImage) {
                targetImage.classList.remove('active');
            }
        });
    });
}
    
    // Скрыть все изображения при уходе курсора с секции
    const servicesSection = document.querySelector('.services-tabs');
    if (servicesSection) {
        servicesSection.addEventListener('mouseleave', () => {
            serviceImages.forEach(img => {
                img.classList.remove('active');
            });
        });
    }


// Параллакс эффект для секции services-tabs
function initServicesParallax() {
    const servicesSection = document.querySelector('.services-tabs');
    const servicesTabs = document.querySelectorAll('.service-tab-vertical');
    const servicesContainer = document.querySelector('.services-container');
    const servicesImages = document.querySelector('.services-images');
    
    if (!servicesSection) return;
    
    function updateParallax() {
        const rect = servicesSection.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
        
        // Параллакс для контейнера
        const containerOffset = (scrollProgress - 0.5) * 50;
        if (servicesContainer) {
            servicesContainer.style.transform = `translateZ(0) translateY(${containerOffset}px)`;
        }
        
        // Параллакс для изображений
        if (servicesImages) {
            const imageOffset = (scrollProgress - 0.5) * 30;
            servicesImages.style.transform = `translateZ(30px) scale(0.95) translateY(${imageOffset}px)`;
        }
        
        // Параллакс для отдельных табов
        servicesTabs.forEach((tab, index) => {
            const tabOffset = (scrollProgress - 0.5) * (20 + index * 5);
            const currentTransform = tab.style.transform || '';
            
            if (!tab.matches(':hover')) {
                const baseTransform = `translateZ(${25 + index * 5}px) scale(${0.975 - index * 0.005})`;
                tab.style.transform = `${baseTransform} translateY(${tabOffset}px)`;
            }
        });
    }
    
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    updateParallax();
}

// Улучшенная анимация для секции FEATURES WORKS
function initProjectsScrollAnimation() {
    const projectsSection = document.querySelector('.projects-section');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!projectsSection || !projectCards.length) return;
    
    // Добавляем класс для анимации при скролле
    projectCards.forEach(card => {
        card.classList.add('animate-on-scroll');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Запускаем анимацию карточек с задержками
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    observer.observe(projectsSection);
}

// Анимация появления текста в секции services при скролле
function initServicesScrollAnimation() {
    const servicesSection = document.querySelector('.services-tabs');
    const servicesHeader = document.querySelector('.services-header');
    const servicesSubtitle = document.querySelector('.services-subtitle');
    const servicesTitle = document.querySelector('.services-main-title');
    const viewAllBtn = document.querySelector('.view-all-btn');
    const servicesTabs = document.querySelector('.services-tabs-vertical');
    const servicesImages = document.querySelector('.services-images');
    const serviceTabItems = document.querySelectorAll('.service-tab-vertical');
    
    if (servicesSection) {
        // Добавляем классы для анимации к элементам сервисов
        serviceTabItems.forEach(tab => {
            tab.classList.add('animate-on-scroll');
        });
        
        // Добавляем класс анимации к контейнеру табов
        if (servicesTabs) {
            servicesTabs.classList.add('animate-on-scroll');
        }
        
        // Создаем observer для отслеживания видимости
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Сначала показываем контейнер табов
                    setTimeout(() => {
                        if (servicesTabs) servicesTabs.classList.add('animate-in');
                    }, 200);
                    
                    // Запускаем анимации текстовых элементов с задержками
                    setTimeout(() => {
                        if (servicesSubtitle) servicesSubtitle.classList.add('animate-in');
                    }, 100);
                    
                    setTimeout(() => {
                        if (servicesTitle) servicesTitle.classList.add('animate-in');
                    }, 300);
                    
                    setTimeout(() => {
                        if (viewAllBtn) viewAllBtn.classList.add('animate-in');
                    }, 400);
                    
                    // Анимируем каждое название сервиса с задержкой
                    serviceTabItems.forEach((tab, index) => {
                        setTimeout(() => {
                            tab.classList.add('animate-in');
                        }, 600 + (index * 150)); // Задержка 150ms между каждым элементом
                    });
                    
                    setTimeout(() => {
                        if (servicesImages) servicesImages.classList.add('animate-in');
                    }, 1200); // Изображения появляются после всех названий
                    
                    // Отключаем observer после срабатывания
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(servicesSection);
    }
}

// Инициализируем анимацию при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initServicesImages();
    initServicesParallax();
    initProjectsScrollAnimation();
    initServicesScrollAnimation(); // Добавляем вызов функции анимации services
});

// Scroll to Top Button Functionality
function initScrollToTop() {
	const scrollToTopBtn = document.getElementById('scrollToTop');
	
	if (!scrollToTopBtn) return;
	
	// Show/hide button based on scroll position
	function toggleScrollButton() {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const showThreshold = 300; // Show button after scrolling 300px
			
			if (scrollTop > showThreshold) {
					scrollToTopBtn.classList.add('visible');
			} else {
					scrollToTopBtn.classList.remove('visible');
			}
	}
	
	// Smooth scroll to top
	function scrollToTop() {
			window.scrollTo({
					top: 0,
					behavior: 'smooth'
			});
	}
	
	// Event listeners
	window.addEventListener('scroll', toggleScrollButton);
	scrollToTopBtn.addEventListener('click', scrollToTop);
	
	// Initial check
	toggleScrollButton();
}

// Initialize scroll to top when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {

	initScrollToTop();
});


// Testimonials Slider
function initTestimonialsSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const textSlides = document.querySelectorAll('.testimonial-text-slide');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentSlide = 0;
    let autoSlideInterval;
    let isHovered = false;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        textSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    }

    function startAutoSlide() {
        if (!isHovered) {
            autoSlideInterval = setInterval(() => {
                if (currentSlide < slides.length - 1) {
                    nextSlide();
                } else {
                    currentSlide = 0;
                    showSlide(currentSlide);
                }
            }, 5000);
        }
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
        nextBtn.addEventListener('mouseenter', () => {
            isHovered = true;
            stopAutoSlide();
        });
        nextBtn.addEventListener('mouseleave', () => {
            isHovered = false;
            startAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
        prevBtn.addEventListener('mouseenter', () => {
            isHovered = true;
            stopAutoSlide();
        });
        prevBtn.addEventListener('mouseleave', () => {
            isHovered = false;
            startAutoSlide();
        });
    }

    // Initialize
    showSlide(currentSlide);
    startAutoSlide();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialsSlider();
});


