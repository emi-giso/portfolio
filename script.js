/* ============================================
   EMILIA GISO — PORTFOLIO
   Interactivity & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Reveal (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, stop observing
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  
  const handleNavScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Initial check


  // --- Active Nav Link Highlight ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();


  // --- Mobile Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('active');
    });
  });


  // --- Smooth Scroll for Nav Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // --- Contact Form (prevent default, show feedback) ---
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = '¡Mensaje enviado! ✅';
      submitBtn.style.background = '#22c55e';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    });
  }


  // --- Parallax effect on hero orbs ---
  const hero = document.querySelector('.hero');
  
  if (hero) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      
      hero.style.setProperty('--mouse-x', `${x}px`);
      hero.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true });
  }

});


// --- Toggle Project Cards (global function for onclick) ---
function toggleProject(projectId) {
  const card = document.getElementById(projectId);
  if (!card) return;

  // Close other open cards
  document.querySelectorAll('.project-card.active').forEach(openCard => {
    if (openCard.id !== projectId) {
      openCard.classList.remove('active');
    }
  });

  // Toggle this card
  card.classList.toggle('active');
  
  // Smooth scroll to card if opening
  if (card.classList.contains('active')) {
    setTimeout(() => {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
}
