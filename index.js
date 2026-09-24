

/* =========================================================
CLUB IARIVO TAEKWONDO — cl.js
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ================= ANNÉE FOOTER ================= */
    
    const yearEl = document.getElementById('year');
    
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
    
    /* ================= NAVBAR ================= */
    
    const navbar = document.getElementById('navbar');
    
    const onScroll = () => {
    
      if (window.scrollY > 40) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    
    };
    
    onScroll();
    
    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true }
    );
    
    /* ================= MENU MOBILE ================= */
    
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    const closeMenu = () => {
    
      navMenu.classList.remove('is-open');
    
      navToggle.classList.remove('is-open');
    
      navToggle.setAttribute(
        'aria-expanded',
        'false'
      );
    
    };
    
    navToggle.addEventListener('click', () => {
    
      const isOpen =
        navMenu.classList.toggle('is-open');
    
      navToggle.classList.toggle(
        'is-open',
        isOpen
      );
    
      navToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );
    
    });
    
    navMenu
      .querySelectorAll('.nav-link')
      .forEach(link => {
    
        link.addEventListener(
          'click',
          closeMenu
        );
    
      });
    
    /* ================= GALERIE ================= */
    
    const filterBtns =
      document.querySelectorAll('.filter-btn');
    
    const galleryItems =
      document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
    
      btn.addEventListener('click', () => {
    
        filterBtns.forEach(b => {
          b.classList.remove('is-active');
        });
    
        btn.classList.add('is-active');
    
    
        const filter =
          btn.dataset.filter;
    
    
        galleryItems.forEach(item => {
    
          const match =
            filter === 'all' ||
            item.dataset.category === filter;
    
          item.classList.toggle(
            'is-hidden',
            !match
          );
    
        });
    
      });
    
    });
    
    /* ================= LIGHTBOX ================= */
    
    const lightbox =
      document.getElementById('lightbox');
    
    const lightboxImg =
      document.getElementById('lightboxImg');
    
    const lightboxClose =
      document.getElementById('lightboxClose');
    
    const lightboxPrev =
      document.getElementById('lightboxPrev');
    
    const lightboxNext =
      document.getElementById('lightboxNext');
    
    let visibleItems = [];
    
    let currentIndex = 0;
    
    const getVisibleItems = () => {
    
      return Array.from(galleryItems)
        .filter(
          item =>
            !item.classList.contains('is-hidden')
        );
    
    };
    
    const updateLightboxImage = () => {
    
      if (!visibleItems.length) {
        return;
      }
    
      const img =
        visibleItems[currentIndex]
          .querySelector('img');
    
      lightboxImg.src = img.src;
    
      lightboxImg.alt = img.alt;
    
    };
    
    const openLightbox = index => {
    
      visibleItems =
        getVisibleItems();
    
      if (!visibleItems.length) {
        return;
      }
    
      currentIndex = index;
    
      updateLightboxImage();
    
      lightbox.classList.add('is-open');
    
      lightbox.setAttribute(
        'aria-hidden',
        'false'
      );
    
      document.body.style.overflow = 'hidden';
    
    };
    
    const closeLightbox = () => {
    
      lightbox.classList.remove('is-open');
    
      lightbox.setAttribute(
        'aria-hidden',
        'true'
      );
    
      document.body.style.overflow = '';
    
    };
    
    const showPrev = () => {
    
      if (!visibleItems.length) {
        return;
      }
    
      currentIndex =
        (currentIndex - 1 + visibleItems.length)
        % visibleItems.length;
    
      updateLightboxImage();
    
    };
    
    const showNext = () => {
    
      if (!visibleItems.length) {
        return;
      }
    
      currentIndex =
        (currentIndex + 1)
        % visibleItems.length;
    
      updateLightboxImage();
    
    };
    
    galleryItems.forEach(item => {
    
      item.addEventListener('click', () => {
    
        const all =
          getVisibleItems();
    
        const index =
          all.indexOf(item);
    
        openLightbox(index);
    
      });
    
    });
    
    lightboxClose.addEventListener(
      'click',
      closeLightbox
    );
    
    lightboxPrev.addEventListener(
      'click',
      showPrev
    );
    
    lightboxNext.addEventListener(
      'click',
      showNext
    );
    
    lightbox.addEventListener('click', e => {
    
      if (e.target === lightbox) {
        closeLightbox();
      }
    
    });
    
    document.addEventListener('keydown', e => {
    
      if (
        !lightbox.classList.contains('is-open')
      ) {
        return;
      }
    
      if (e.key === 'Escape') {
        closeLightbox();
      }
    
      if (e.key === 'ArrowLeft') {
        showPrev();
      }
    
      if (e.key === 'ArrowRight') {
        showNext();
      }
    
    });
    
    });
    
    
