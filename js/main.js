document.addEventListener('DOMContentLoaded', () => {
  // ===== MITRA SLIDER =====
  initMitraSlider();
  // ===== BADGE WA CLICK =====
  (function initBadgeWA() {
    const WA_NUMBER = '6283841213336';
    document.querySelectorAll('.badge-grid').forEach(grid => {
      grid.addEventListener('click', (e) => {
        const badge = e.target.closest('.badge-item');
        if (!badge) return;
        const text = badge.textContent.trim();
        const msg = encodeURIComponent(`Halo ARIL HIDAYAT, saya tertarik dengan layanan: ${text}. Mohon informasi lebih lanjut.`);
        window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
      });
    });
  })();
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
          <div class="form-group" id="layananGroup">
            <label>Layanan yang Diminati <span class="required">*</span></label>
            <div class="service-selector" id="serviceSelector">
              <div class="service-category">
                <h4 class="service-cat-title">Sertifikasi Profesi</h4>
                <div class="service-chips" data-category="profesi"></div>
              </div>
              <div class="service-category">
                <h4 class="service-cat-title">Sertifikasi Badan Usaha</h4>
                <div class="service-chips" data-category="badan-usaha"></div>
              </div>
            </div>
            <input type="hidden" id="fieldLayanan" value="">
            <small class="field-hint" id="layananHint">Klik layanan yang Anda butuhkan di atas</small>
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
  renderServiceChips();
}

const WA_SERVICES = {
  'Sertifikasi Profesi': [
    'SKK Konstruksi', 'POP / POM / POU', 'Welder', 'TOT', 'P3K',
    'Serkom', 'K3 Laboratorium', 'Scaffolding', 'Manajemen SDM',
    'Fire Officer', 'K3 Umum', 'K3 Konstruksi', 'Rigger',
    'Ruang Terbatas', 'Hub. Industrial', 'K3 Listrik', 'Mobile Crane',
    'SIO', 'Admin Perkantoran', 'K3 Pertambangan', 'Auditor SMK3',
    'Forklift', 'Damkar D', 'First Aid'
  ],
  'Sertifikasi Badan Usaha': [
    'SBU Konstruksi', 'ISO Akreditasi IAF', 'BPOM', 'SNI',
    'SBU Spesialis', 'ISO Akreditasi KAN', 'Akuntan Publik', 'TKDN',
    'SBU Konsultan', 'ISO Non Akreditasi', 'SKUP Migas', 'SIMPK',
    'SBU JPTL', 'Sertifikat Standar', 'CSMS', 'LKPM',
    'Pendirian PT/CV', 'SMK3', 'PKP', 'PKKPR'
  ]
};

function renderServiceChips() {
  const containers = document.querySelectorAll('.service-chips');
  if (!containers.length) return;
  containers.forEach(container => {
    const cat = container.dataset.category;
    const services = cat === 'profesi' ? WA_SERVICES['Sertifikasi Profesi'] : WA_SERVICES['Sertifikasi Badan Usaha'];
    container.innerHTML = services.map(s =>
      `<div class="service-chip" data-value="${s}">${s}</div>`
    ).join('');
  });

  document.querySelectorAll('.service-chip').forEach(chip => {
    chip.addEventListener('click', function () {
      const parent = this.closest('.service-chips');
      parent.querySelectorAll('.service-chip').forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      const hidden = document.getElementById('fieldLayanan');
      if (hidden) hidden.value = this.dataset.value;
      const hint = document.getElementById('layananHint');
      if (hint) hint.textContent = '✓ ' + this.dataset.value;
    });
  });
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
    toggleLayanan(false);
    setTimeout(() => document.getElementById('fieldNama')?.focus(), 100);
  }

  function toggleLayanan(show) {
    const group = document.getElementById('layananGroup');
    if (!group) return;
    group.style.display = show ? 'block' : 'none';
    if (!show) {
      document.querySelectorAll('.service-chip').forEach(c => c.classList.remove('selected'));
      const hidden = document.getElementById('fieldLayanan');
      if (hidden) hidden.value = '';
      const hint = document.getElementById('layananHint');
      if (hint) hint.textContent = 'Klik layanan yang Anda butuhkan di atas';
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    form?.reset();
    toggleLayanan(false);
  }

  document.querySelectorAll('input[name="tujuan"]').forEach(radio => {
    radio.addEventListener('change', function () {
      toggleLayanan(this.value === 'Ingin Membeli / Menggunakan Jasa');
    });
  });

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
    if (tujuan.value === 'Ingin Membeli / Menggunakan Jasa' && !layanan) return alert('Klik layanan yang Anda butuhkan.');

    const WA_NUMBER = '6283841213336';
    const now = new Date();
    const tgl = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const jam = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    let msg = `Halo ARIL HIDAYAT, saya ${nama}.`;
    msg += `\n\n📌 Tujuan: ${tujuan.value}`;
    if (tujuan.value === 'Ingin Membeli / Menggunakan Jasa' && layanan) {
      msg += `\n📋 Layanan: ${layanan}`;
    }
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

// ===== MITRA SLIDER =====
function initMitraSlider() {
  const track = document.getElementById('mitraSliderTrack');
  if (!track) return;
  const slides = track.querySelectorAll('.mitra-slide');
  const prevBtn = document.getElementById('mitraSliderPrev');
  const nextBtn = document.getElementById('mitraSliderNext');
  const dotsContainer = document.getElementById('mitraSliderDots');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let slidesPerView = window.innerWidth >= 769 ? 3 : 1;

  function updateSlidesPerView() {
    slidesPerView = window.innerWidth >= 769 ? 3 : 1;
  }

  function goToSlide(index) {
    const maxIndex = totalSlides - slidesPerView;
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    const offset = -(currentIndex * (100 / slidesPerView));
    track.style.transform = `translateX(${offset}%)`;
    updateDots();
  }

  function updateDots() {
    const dotCount = totalSlides - slidesPerView + 1;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function nextSlide() { goToSlide(currentIndex + 1); }
  function prevSlide() { goToSlide(currentIndex - 1); }

  prevBtn.addEventListener('click', () => { prevSlide(); });
  nextBtn.addEventListener('click', () => { nextSlide(); });

  // Touch swipe
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const oldSlidesPerView = slidesPerView;
      updateSlidesPerView();
      if (oldSlidesPerView !== slidesPerView) {
        goToSlide(currentIndex);
      }
    }, 150);
  });

  goToSlide(0);
}

function scrollCarousel(btn, dir) {
  const scrollEl = btn.parentElement.querySelector('.scroll-x');
  if (!scrollEl) return;
  const child = scrollEl.querySelector(':scope > *');
  if (!child) return;
  const childWidth = child.offsetWidth + parseInt(getComputedStyle(scrollEl).gap) || child.offsetWidth;
  scrollEl.scrollBy({ left: dir * childWidth, behavior: 'smooth' });
}

// ===== MITRA MODAL =====
const MITRA_DATA = [
  { logo: 'assets/Mitra/PUPR.svg', name: 'PUPR', sub: 'Kementerian PUPR', desc: 'Kementerian PUPR melalui LPJK menerbitkan dan mengawasi Sertifikat Badan Usaha (SBU) bagi perusahaan konstruksi di Indonesia. Sebagai mitra, kami memastikan setiap pengurusan SBU klien memenuhi standar kualifikasi dan klasifikasi yang ditetapkan, sehingga perusahaan dapat bersaing secara profesional di industri jasa konstruksi nasional.' },
  { logo: 'assets/Mitra/kemenker.png', name: 'Kemnaker', sub: 'Kementerian Ketenagakerjaan', desc: 'Kementerian Ketenagakerjaan membina dan mensertifikasi tenaga kerja Indonesia melalui berbagai program kompetensi. Kami bekerja sama dalam pengurusan SKK Konstruksi dan sertifikasi profesi lainnya yang menjadi syarat wajib bagi tenaga ahli untuk meningkatkan daya saing dan kredibilitas di dunia kerja.' },
  { logo: 'assets/Mitra/ESDM.jpg', name: 'ESDM', sub: 'Kementerian ESDM', desc: 'Kementerian Energi dan Sumber Daya Mineral mengatur sertifikasi di sektor energi, migas, dan pertambangan. Afiliasi ini memungkinkan kami mengurus SKUP Migas, SIO, dan berbagai sertifikasi lain yang diakui di lingkungan ESDM secara resmi dan terpercaya.' },
  { logo: 'assets/Mitra/iaf_logo.svg', name: 'IAF', sub: 'International Accreditation Forum', desc: 'International Accreditation Forum adalah organisasi akreditasi global yang memastikan sertifikat sistem manajemen diakui lintas negara. Pengakuan IAF terhadap sertifikat ISO yang kami urus memberi nilai tambah bagi klien yang membutuhkan standar internasional dalam ekspansi bisnis global.' },
  { logo: 'assets/Mitra/KAN.png', name: 'KAN', sub: 'Komite Akreditasi Nasional', desc: 'Komite Akreditasi Nasional sebagai lembaga akreditasi resmi Indonesia memberikan akreditasi kepada lembaga sertifikasi dan laboratorium. Kemitraan dengan KAN memastikan setiap proses sertifikasi yang kami fasilitasi memenuhi standar nasional Indonesia dan diakui secara sah oleh pemerintah.' },
  { logo: 'assets/Mitra/PS3M.png', name: 'P3SM', sub: 'Perkumpulan Profesi Penguji dan Sertifikasi Mutu Indonesia', desc: 'Perkumpulan Profesi Penguji dan Sertifikasi Mutu Indonesia merupakan mitra dalam pengembangan kompetensi tenaga pendidik dan kependidikan. Bersama P3SM, kami menyelenggarakan program pelatihan dan sertifikasi yang bertujuan meningkatkan mutu sumber daya manusia di sektor pendidikan dan pelatihan vokasi.' },
  { logo: 'assets/Mitra/BNSP.png', name: 'BNSP', sub: 'Badan Nasional Sertifikasi Profesi', desc: 'Badan Nasional Sertifikasi Profesi adalah otoritas sertifikasi kompetensi profesi di Indonesia. Melalui lisensi BNSP, kami memfasilitasi sertifikasi profesi yang diakui secara nasional, memastikan tenaga kerja bersertifikat memiliki kompetensi terstandar dan diakui di seluruh Indonesia.' }
];

function openMitraModal(index) {
  const modal = document.getElementById('mitraModal');
  const logo = document.getElementById('mitraModalLogo');
  const title = document.getElementById('mitraModalTitle');
  const sub = document.getElementById('mitraModalSub');
  const desc = document.getElementById('mitraModalDesc');
  if (!modal || !MITRA_DATA[index]) return;
  const d = MITRA_DATA[index];
  logo.innerHTML = '<img src="' + d.logo + '" alt="' + d.name + '">';
  title.textContent = d.name;
  sub.textContent = d.sub;
  desc.textContent = d.desc;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('mitraModal');
  if (!modal) return;
  const close = document.getElementById('mitraModalClose');
  function closeMitraModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  close.addEventListener('click', closeMitraModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeMitraModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeMitraModal();
  });
});

// ===== GALERI LIGHTBOX =====
(function initGalleryLightbox() {
  const items = document.querySelectorAll('#galeriGrid .gallery-item');
  if (!items.length) return;
  const descs = [
    'Tim PT. Yash Pijar Arteksi melayani konsultasi tatap muka kepada klien yang ingin mengurus sertifikasi badan usaha maupun profesi, memberikan penjelasan rinci mengenai prosedur, persyaratan, dan estimasi waktu penyelesaian secara profesional dan transparan.',
    'Proses pendampingan pengisian dokumen persyaratan sertifikasi dilakukan secara teliti oleh tim administrasi kami untuk memastikan setiap kelengkapan data sesuai ketentuan yang berlaku sebelum diajukan ke lembaga terkait.',
    'Suasana ruang operasional tim PT. Yash Pijar Arteksi dalam mengoordinasikan setiap tahap pengurusan sertifikat klien, mulai dari verifikasi awal hingga pengajuan akhir ke instansi penerbit sertifikasi.',
    'Penyerahan Sertifikat Badan Usaha (SBU) kepada salah satu klien perusahaan konstruksi yang telah berhasil menyelesaikan seluruh proses sertifikasi sesuai standar kualifikasi yang ditetapkan.',
    'Dokumentasi tim verifikasi saat melakukan pengecekan dokumen teknis dan administratif untuk memastikan keakuratan data sebelum melanjutkan proses sertifikasi ke tahap selanjutnya.',
    'Suasana diskusi dan koordinasi antara manajemen PT. Yash Pijar Arteksi dengan perwakilan mitra institusi dalam rangka mempercepat dan menyelaraskan proses sertifikasi klien sesuai regulasi terkini.',
    'Foto bersama tim dengan klien setelah berhasil menyelesaikan pengurusan sertifikasi profesi SKK Konstruksi, menandai komitmen kami terhadap kepuasan dan kesuksesan klien.',
    'Penyerahan dokumen sertifikat ISO kepada klien perusahaan yang telah menyelesaikan seluruh tahapan audit dan memenuhi standar sistem manajemen mutu internasional.'
  ];

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<div class="lightbox-content"><button class="lightbox-close">&times;</button><img class="lightbox-img" alt=""><div class="lightbox-desc"></div></div>';
  document.body.appendChild(overlay);
  const img = overlay.querySelector('.lightbox-img');
  const desc = overlay.querySelector('.lightbox-desc');
  const close = overlay.querySelector('.lightbox-close');

  items.forEach((item, i) => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const src = item.querySelector('img').src;
      img.src = src;
      desc.textContent = descs[i] || '';
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  close.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();
