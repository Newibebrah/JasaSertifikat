document.addEventListener('DOMContentLoaded', () => {
  const WA_LINK = 'https://wa.me/6283841213336?text=Halo%20ARIL%20HIDAYAT%2C%20saya%20tertarik%20dengan%20jasa%20sertifikasi%20dan%20perizinan%20yang%20ditawarkan.%20Saya%20ingin%20konsultasi.';

  // Set all WA links
  document.querySelectorAll('.wa-link').forEach(el => {
    el.href = WA_LINK;
  });

  // ===== STICKY NAVBAR =====
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ===== TYPING ANIMATION =====
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const words = ['JASA SERTIFIKASI TERPERCAYA', 'SOLUSI BISNIS PROFESIONAL', 'MITRA SERTIFIKASI ANDA'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isWaiting = true;
        setTimeout(() => {
          isDeleting = true;
          isWaiting = false;
          typeEffect();
        }, 2000);
        return;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
        return;
      }

      const speed = isDeleting ? 40 : 80;
      setTimeout(typeEffect, speed);
    }

    setTimeout(typeEffect, 500);
  }

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetValue = parseInt(target.dataset.target);
          const duration = 2000;
          const step = Math.ceil(targetValue / (duration / 16));
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current >= targetValue) {
              target.textContent = targetValue + '+';
              return;
            }
            target.textContent = current + '+';
            requestAnimationFrame(updateCounter);
          };

          updateCounter();
          counterObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ===== STAGGERED BADGE ANIMATION =====
  const badgeItems = document.querySelectorAll('.badge-item');
  if (badgeItems.length > 0) {
    const badgeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.badge-item');
          items.forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => {
              item.style.transition = 'all 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0) scale(1)';
            }, i * 60);
          });
          badgeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.badge-grid').forEach(grid => badgeObserver.observe(grid));
  }

  // ===== MODAL LAYANAN =====
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  const modalForm = document.querySelector('.modal-form');
  const modalServiceName = document.querySelector('.modal-service-name');
  const serviceNameInput = document.getElementById('service-name-input');

  if (modalOverlay) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });

    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = document.getElementById('field-nama').value.trim();
      const telepon = document.getElementById('field-telepon').value.trim();
      const email = document.getElementById('field-email').value.trim();
      const layanan = serviceNameInput ? serviceNameInput.value : '';

      if (!nama || !telepon) {
        alert('Harap isi Nama/Perusahaan dan Nomor Telepon.');
        return;
      }

      const waNumber = '6283841213336';
      let message = `Halo ARIL HIDAYAT, saya tertarik dengan layanan ${layanan}. Berikut data saya:%0A`;
      message += `Nama/Perusahaan: ${nama}%0A`;
      message += `No. Telepon: ${telepon}%0A`;
      message += `Email: ${email || '-'}`;

      window.open(`https://wa.me/${waNumber}?text=${message}`, '_blank');
      modalOverlay.classList.remove('active');
      modalForm.reset();
    });

    document.querySelectorAll('.badge-item, .service-card').forEach(item => {
      item.addEventListener('click', function () {
        const name = this.textContent.trim().split('\n')[0];
        if (serviceNameInput) serviceNameInput.value = name;
        if (modalServiceName) modalServiceName.textContent = name;
        modalOverlay.classList.add('active');
        document.getElementById('field-nama').focus();
      });
    });
  }
});
