document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Language Selector
    const enLang = document.getElementById('en-lang');
    const itLang = document.getElementById('it-lang');
    const languageElements = document.querySelectorAll('.language-content');
    
    // Set default language to English
    let currentLanguage = 'en';
    enLang.classList.add('active');
    
    // Function to update content based on selected language
    function updateLanguage(lang) {
        currentLanguage = lang;
        
        // Update all language elements
        languageElements.forEach(element => {
            if (element.getAttribute(`data-${lang}`)) {
                element.textContent = element.getAttribute(`data-${lang}`);
            }
        });
        
        // Update active state for language buttons
        if (lang === 'en') {
            enLang.classList.add('active');
            itLang.classList.remove('active');
        } else {
            itLang.classList.add('active');
            enLang.classList.remove('active');
        }
    }
    
    // Event listeners for language selection
    enLang.addEventListener('click', function() {
        updateLanguage('en');
    });
    
    itLang.addEventListener('click', function() {
        updateLanguage('it');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
            // Scroll to target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const tour = document.getElementById('tour').value;
            const date = document.getElementById('date').value;
            const participants = document.getElementById('participants').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to your server
            // For now, just show a confirmation message
            const formElements = bookingForm.elements;
            for (let i = 0; i < formElements.length; i++) {
                formElements[i].disabled = true;
            }
            
            const confirmationMessage = document.createElement('div');
            confirmationMessage.className = 'success-message';
            
            const messageText = currentLanguage === 'en' 
                ? `Thank you, ${name}! Your booking request for ${tour} on ${date} has been received. We'll contact you soon.`
                : `Grazie, ${name}! La tua richiesta di prenotazione per ${tour} il ${date} è stata ricevuta. Ti contatteremo presto.`;
            
            confirmationMessage.textContent = messageText;
            
            bookingForm.parentNode.replaceChild(confirmationMessage, bookingForm);
        });
    }
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.tour-card, .guide');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize animations
    function initAnimations() {
        const animatedElements = document.querySelectorAll('.tour-card, .guide');
        
        animatedElements.forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Trigger initial animation check
        animateOnScroll();
        
        // Add scroll event listener
        window.addEventListener('scroll', animateOnScroll);
    }
    
    // Initialize animations after a short delay to ensure page is fully loaded
    setTimeout(initAnimations, 100);
});