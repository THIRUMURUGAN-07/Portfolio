/* ==========================================================================
   THIRUMURUGAN L - PORTFOLIO INTERACTIVE SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking links
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Dynamic Typing Effect
  const typedTarget = document.getElementById('typedText');
  if (typedTarget) {
    const phrases = [
      'scalable MERN stack web applications.',
      'secure REST APIs with JWT authentication.',
      'responsive React.js interfaces.',
      'end-to-end full-stack workflows.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typedTarget.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTarget.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let typeSpeed = isDeleting ? 30 : 60;

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // Pause before new phrase
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }

  // Scroll Reveal Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  // Active Navigation Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // Contact Form Submission Handler via FormSubmit (Direct Email to thirumuruganl0307@gmail.com)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('nameInput')?.value.trim();
      const email = document.getElementById('emailInput')?.value.trim();
      const message = document.getElementById('messageInput')?.value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.textContent = 'Please fill out all fields.';
          formStatus.className = 'form-status error';
        }
        return;
      }

      if (formStatus) {
        formStatus.textContent = 'Sending message to Thirumurugan... ✈️';
        formStatus.className = 'form-status';
      }

      if (submitBtn) {
        submitBtn.disabled = true;
      }

      try {
        const response = await fetch('https://formsubmit.co/ajax/thirumuruganl0307@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: `New Portfolio Message from ${name}`
          })
        });

        const data = await response.json();

        if (response.ok || data.success === 'true') {
          if (formStatus) {
            formStatus.textContent = 'Message sent successfully! Thirumurugan will get back to you soon.';
            formStatus.className = 'form-status success';
          }
          contactForm.reset();
        } else {
          throw new Error('Server returned an error');
        }
      } catch (err) {
        console.error('Email send error:', err);
        // Fallback to mailto link if offline or blocked
        const mailtoUri = `mailto:thirumuruganl0307@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nSender Email: ' + email)}`;
        window.location.href = mailtoUri;

        if (formStatus) {
          formStatus.textContent = 'Opened your email application to send directly to thirumuruganl0307@gmail.com.';
          formStatus.className = 'form-status success';
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
        }
      }
    });
  }

  // Copy Email Functionality
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const emailText = 'thirumuruganl0307@gmail.com';
      navigator.clipboard.writeText(emailText).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalText;
        }, 2000);
      });
    });
  }
});
