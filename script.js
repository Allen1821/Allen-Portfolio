// Typing animation
function typeWriter(element, text, speed = 100, done) {
  if (!element) return;
  let i = 0;
  element.textContent = ''; // clear before typing
  (function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i++);
      setTimeout(type, speed);
    } else {
      element.classList.add('typing-complete');
      if (done) setTimeout(done, 300);
    }
  })();
}

if (!window.__typedOnce) {
  window.__typedOnce = true;

  window.addEventListener('DOMContentLoaded', () => {
    // Initialize dark mode as default
    document.body.classList.add('dark-mode');
    const themeIcon = document.querySelector('.theme-toggle i');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }

    const title = document.querySelector('.typing-text');
    const subtitle = document.querySelector('.typing-text-2');

    const titleText = 'Allen Nguyen is HERE';
    const subtitleText = 'Professional at making things work BUT HOW DOES IT WORK!!!!';

    typeWriter(title, titleText, 80, () => {
      typeWriter(subtitle, subtitleText, 60);
    });

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        if (icon) {
          if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
          } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
          }
        }
      });
    }

    // Food tab functionality - fixed to not affect featured card
    const foodTabs = document.querySelectorAll('.tab-btn');
    const foodCards = document.querySelectorAll('.food-card');

    foodTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        foodTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.getAttribute('data-category');

        foodCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category'); // e.g., "restaurant"

        // Show in "all", or when the category matches exactly
        if (category === 'all' || cardCategory === category) {
            card.style.display = '';
            // lil entrance animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.display = 'none';
        }
        });
    });
    });


    // Initially hide cards for animation
    foodCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

  });
}

// Add smooth scrolling to navigation links - fixed home button
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        let target;
        
        if (targetId === '#home') {
            // Scroll to top of page for home
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// nav link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = 'home';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id') || 'home';
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current || 
            (current === 'home' && link.getAttribute('href') === '#home')) {
            link.classList.add('active');
        }
    });
});

//scroll effect to food cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);