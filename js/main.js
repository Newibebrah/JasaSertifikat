document.addEventListener('DOMContentLoaded', () => {
  // ===== INJECT WA MODAL =====
  injectWAModal();
  // ===== INIT WA CTA BUTTONS =====
  initWACTAButtons();

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

    document.querySelectorAll('.badge-item').forEach(item => {
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

// ===== WA MODAL FUNCTIONS =====
function injectWAModal() {
  if (document.getElementById('waModal')) return;
  const html = `
    <div id="waModal" class="wa-modal-overlay">
      <div class="wa-modal-content">
        <button class="wa-modal-close" id="waModalClose">&times;</button>
        <div class="wa-modal-icon"><i class="fab fa-whatsapp"></i></div>
        <h3>Hubungi Kami</h3>
        <p class="wa-modal-desc">Silakan isi data di bawah agar kami bisa merespon dengan cepat.</p>
        <form id="waForm">
          <div class="form-group">
            <label>Nama Lengkap <span class="required">*</span></label>
            <input type="text" id="fieldNama" placeholder="Masukkan nama lengkap Anda" required>
          </div>
          <div class="form-group">
            <label>Nomor Telepon / WhatsApp <span class="required">*</span></label>
            <input type="tel" id="fieldTelepon" placeholder="081234567890" required>
          </div>
          <div class="form-group">
            <label>Email <span class="optional">(opsional)</span></label>
            <input type="email" id="fieldEmail" placeholder="email@anda.com">
          </div>
          <div class="form-group">
            <label>Tujuan Menghubungi <span class="required">*</span></label>
            <div class="tujuan-options">
              <label class="tujuan-chip">
                <input type="radio" name="tujuan" value="Ingin Konsultasi" required>
                <span>&#128172; Ingin Konsultasi</span>
              </label>
              <label class="tujuan-chip">
                <input type="radio" name="tujuan" value="Ingin Membeli / Menggunakan Jasa">
                <span>&#128722; Ingin Membeli / Menggunakan Jasa</span>
              </label>
            </div>
          </div>
          <div class="form-group">
            <label>Layanan yang Diminati <span class="required">*</span></label>
            <input type="text" id="fieldLayanan" placeholder="Contoh: Sertifikasi K3 Konstruksi, SBU, dll." required>
            <small class="field-hint">Tulis layanan spesifik yang Anda butuhkan</small>
          </div>
          <div class="form-group">
            <label>Pesan Tambahan <span class="optional">(opsional)</span></label>
            <textarea id="fieldPesan" rows="3" placeholder="Tanyakan hal lain di sini..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:14px;margin-top:4px;">
            <i class="fab fa-whatsapp"></i> Kirim ke WhatsApp
          </button>
          <button type="button" class="btn" id="waBatal" style="width:100%;justify-content:center;padding:10px;background:#F1F5F9;color:#64748B;margin-top:8px;">
            Batal
          </button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
}

function initWACTAButtons() {
  const modal = document.getElementById('waModal');
  if (!modal) return;
  const closeBtn = document.getElementById('waModalClose');
  const batalBtn = document.getElementById('waBatal');
  const form = document.getElementById('waForm');
  const overlay = modal;

  function openModal() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('fieldNama')?.focus(), 100);
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    form?.reset();
  }

  closeBtn?.addEventListener('click', closeModal);
  batalBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = document.getElementById('fieldNama')?.value.trim();
    const telepon = document.getElementById('fieldTelepon')?.value.trim();
    const email = document.getElementById('fieldEmail')?.value.trim();
    const tujuan = document.querySelector('input[name="tujuan"]:checked');
    const layanan = document.getElementById('fieldLayanan')?.value.trim();
    const pesan = document.getElementById('fieldPesan')?.value.trim();

    if (!nama) return alert('Harap isi Nama Lengkap Anda.');
    if (!telepon || telepon.length < 10) return alert('Harap isi Nomor Telepon minimal 10 digit.');
    if (!tujuan) return alert('Pilih Tujuan Anda menghubungi kami.');
    if (!layanan) return alert('Harap isi Layanan yang Anda minati.');

    const WA_NUMBER = '6283841213336';
    const now = new Date();
    const tgl = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const jam = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    let msg = `Halo ARIL HIDAYAT, saya ${nama}.`;
    msg += `\n\n📌 Tujuan: ${tujuan.value}`;
    msg += `\n📋 Layanan: ${layanan}`;
    msg += `\n\n📞 No. Telepon: ${telepon}`;
    if (email) msg += `\n📧 Email: ${email}`;
    if (pesan) msg += `\n💬 Pesan: ${pesan}`;
    msg += `\n\n━━━━━━━━━━━━━━━━━`;
    msg += `\n🕐 Dikirim pada: ${tgl}, ${jam}`;
    msg += `\n━━━━━━━━━━━━━━━━━`;
    msg += `\n\nSaya ingin informasi lebih lanjut. Terima kasih.`;

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    closeModal();
  });

  document.querySelectorAll('.wa-link').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });
}
