/* ============================================
   EMILIA GISO — PORTFOLIO
   Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Reveal on Scroll ---
  const revealEls = document.querySelectorAll('.rv');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => obs.observe(el));


  // --- Nav scroll effect ---
  const nav = document.getElementById('navbar');

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  // --- Active nav link ---
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    const y = window.scrollY + 120;
    sections.forEach(s => {
      if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) {
        const id = s.getAttribute('id');
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();


  // --- Hamburger ---
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });


  // --- Smooth scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });


  // --- Contact form ---
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.form-btn');
      const orig = btn.textContent;
      btn.textContent = '¡Enviado! ✅';
      btn.style.background = '#22c55e';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

});
