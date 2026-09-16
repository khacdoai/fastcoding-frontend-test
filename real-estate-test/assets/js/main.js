/**
 * main.js — Reanty Real Estate
 * Vanilla JavaScript — No frameworks, no libraries
 */

'use strict';

/* ==========================================
   UTILITY: Fetch Data
   ========================================== */

/**
 * Fetch data from API or local JSON file.
 * Falls back to local JSON if API fails or is not configured.
 * @param {string} key - Data key (properties, services, etc.)
 * @returns {Promise<Array>}
 */
async function fetchData(key) {
  try {
    // If API_BASE_URL is configured, try the API first
    if (CONFIG.API_BASE_URL && CONFIG.API_BASE_URL.trim() !== '') {
      const url = CONFIG.API_BASE_URL + CONFIG.ENDPOINTS[key];
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
    }
    // Fallback: load local JSON file
    const localPath = CONFIG.LOCAL_DATA[key];
    const response = await fetch(localPath);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Failed to load data for: ${key}`);
  } catch (error) {
    console.warn(`[Reanty] Could not fetch "${key}" data:`, error.message);
    return [];
  }
}

/* ==========================================
   SVG ICONS (inline, no external dependency)
   ========================================== */

const ICONS = {
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
  location: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
  chevronRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  chevronUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  // Service icons
  bed: `<svg viewBox="0 0 48 48" width="40" height="40" fill="#FF5A3C"><path d="M12 14c0-1.6 1.4-3 3-3h18c1.6 0 3 1.4 3 3v6H12v-6z"/><rect x="15" y="13" width="7" height="5" rx="1" fill="#ffffff"/><rect x="26" y="13" width="7" height="5" rx="1" fill="#ffffff"/><rect x="9" y="21" width="30" height="6" rx="2" fill="#FF5A3C"/><rect x="11" y="27" width="3" height="7" rx="1" fill="#FF5A3C"/><rect x="34" y="27" width="3" height="7" rx="1" fill="#FF5A3C"/></svg>`,
  pool: `<svg viewBox="0 0 40 40" width="32" height="32" fill="#FF5A3C"><path d="M11 11a1 1 0 0 1 1-1h3a2 2 0 0 1 2 2v4h-2v-3.5a.5.5 0 0 0-.5-.5H13v3h-2v-4z"/><path d="M6 18h28v3a8 8 0 0 1-8 8H14a8 8 0 0 1-8-8v-3zm-2-3a1 1 0 0 1 1-1h30a1 1 0 0 1 1 1v2H4v-2zm4 15v3a1.5 1.5 0 0 1-3 0v-3h3zm24 0v3a1.5 1.5 0 0 1-3 0v-3h3z"/></svg>`,
  copy: `<svg viewBox="0 0 36 36" width="32" height="32" fill="#FF5A3C"><path d="M6 6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 1.41-3.41L8.41 7.41A2 2 0 0 0 6 6zm6 10l8 8H12v-8z"/></svg>`,
  smart: `<svg viewBox="0 0 40 40" width="32" height="32"><path d="M20 4L4 16v16a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V16L20 4z" fill="#FF5A3C"/><circle cx="27" cy="27" r="7" fill="#ffffff"/><circle cx="27" cy="27" r="5.5" fill="#FF5A3C"/><text x="27" y="30.5" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">$</text></svg>`,
  library: `<svg viewBox="0 0 40 40" width="32" height="32" fill="#FF5A3C"><path d="M6 12a2 2 0 0 1 2-2h24a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V12zm11-2v9h6V10h-6z"/></svg>`,
  responsive: `<svg viewBox="0 0 40 40" width="32" height="32"><path d="M20 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm-10 24c0-5.5 4.5-10 10-10s10 4.5 10 10v3H10v-3z" fill="#FF5A3C"/><circle cx="29" cy="27" r="7" fill="#ffffff"/><circle cx="29" cy="27" r="5.5" fill="#FF5A3C"/><text x="29" y="30.5" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">$</text></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  starEmpty: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>`,
};

/* ==========================================
   MOBILE MENU
   ========================================== */

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const overlay = document.getElementById('overlay');
  const mobileNavLinks = document.querySelectorAll('.header__mobile-nav-link');

  if (!hamburger || !mobileNav) return;

  function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ==========================================
   HEADER — Scroll Effect
   ========================================== */

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run on load
}

/* ==========================================
   SERVICES
   ========================================== */

async function loadServices() {
  const container = document.getElementById('servicesGrid');
  if (!container) return;

  if (container.children.length === 0) {
    const services = await fetchData('services');
    if (services && services.length) {
      renderServices(services, container);
    }
  }
}

function renderServices(services, container) {
  container.innerHTML = services
    .map(
      (service) => `
    <div class="service-card fade-in-up">
      <div class="service-card__icon-box">
        ${ICONS[service.icon] || ICONS.home}
      </div>
      <h3 class="service-card__title">${service.title}</h3>
      <p class="service-card__desc">${service.description}</p>
      <a href="#" class="service-card__link" aria-label="Learn more about ${service.title}">
        Learn more <span class="service-card__arrow">&rarr;</span>
      </a>
    </div>
  `
    )
    .join('');
}

/* ==========================================
   PROPERTIES
   ========================================== */

let allProperties = [];
let activeFilter = 'popular';

async function loadProperties() {
  const container = document.getElementById('propertyGrid');
  if (!container) return;

  allProperties = await fetchData('properties');
  renderProperties(allProperties, activeFilter);
}

function renderProperties(properties, filter) {
  const container = document.getElementById('propertyGrid');
  if (!container) return;

  // 1. Filter by selected tab category
  let filtered = properties.filter((p) => p.category === filter);

  // 2. Fallback: show items marked as featured
  if (filtered.length < 3) {
    filtered = properties.filter((p) => p.featured === true);
  }

  // 3. Final fallback: just take first 3
  if (!filtered.length) {
    filtered = properties.slice(0, 3);
  }

  container.innerHTML = filtered
    .slice(0, 3)
    .map(
      (property, index) => `
    <article class="property-card fade-in-up">
      <div class="property-card__image-wrapper">
        <img
          src="${property.image}"
          alt="${property.title || 'The Stokes Appartment'}"
          class="property-card__image"
          loading="lazy"
          onerror="this.style.display='none'"
        />
      </div>
      <div class="property-card__info-box">
        <div class="property-card__details">
          <h3 class="property-card__title">The Stokes Appartment</h3>
          <div class="property-card__location">
            <svg class="property-card__location-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5"/>
            </svg>
            <span>Cleveland, United States</span>
          </div>
          <div class="property-card__price">$2,32,120</div>
        </div>
        <a href="#" class="property-card__arrow-btn" aria-label="View property">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    </article>
  `
    )
    .join('');

  observeElements();
}

/* ==========================================
   PROPERTY TABS
   ========================================== */

function initPropertyTabs() {
  const tabs = document.querySelectorAll('.featured-property__tab');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter properties
      activeFilter = tab.dataset.filter;
      renderProperties(allProperties, activeFilter);
    });
  });
}

/* ==========================================
   TESTIMONIALS SLIDER
   ========================================== */

let testimonials = [];
let currentSlide = 0;
let sliderInterval = null;

async function loadTestimonials() {
  testimonials = await fetchData('testimonials');
  if (!testimonials.length) return;

  renderTestimonials(testimonials);
  initTestimonialSlider();
}

function renderTestimonials(data) {
  const sliderEl = document.getElementById('testimonialsSlider');
  const dotsEl = document.getElementById('testimonialsDots');
  if (!sliderEl) return;

  // Render slides
  sliderEl.innerHTML = data
    .map(
      (t) => `
    <div class="testimonial-card" role="group" aria-label="Testimonial from ${t.name}">
      <div class="testimonial-card__image-wrapper">
        <div class="testimonial-card__image-bg"></div>
        <div class="testimonial-card__image-box"></div>
      </div>
      <div class="testimonial-card__content">
        <div class="testimonial-card__quote-icon" aria-hidden="true">
          <img src="./assets/images/icon.png" alt="Quote icon" width="28" height="22" />
        </div>
        <p class="testimonial-card__quote">
          ${t.quote}
        </p>
        <div class="testimonial-card__rating">
          <div class="star-rating" aria-label="${t.rating} stars out of 5">
            ${renderStars(t.rating)}
          </div>
        </div>
        <div class="testimonial-card__author">
          <h4 class="testimonial-card__name">${t.name}</h4>
          <span class="testimonial-card__position">${t.position}</span>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  // Render dots
  if (dotsEl) {
    dotsEl.innerHTML = data
      .map(
        (_, i) => `
      <button
        class="testimonials__dot ${i === 0 ? 'active' : ''}"
        data-index="${i}"
        aria-label="Go to testimonial ${i + 1}"
      ></button>
    `
      )
      .join('');

    dotsEl.querySelectorAll('.testimonials__dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        goToSlide(parseInt(dot.dataset.index));
        resetAutoPlay();
      });
    });
  }
}

function renderStars(count) {
  let stars = '';
  for (let i = 1; i <= count; i++) {
    stars += `<img src="./assets/images/icon star.png" alt="Star" class="star-rating__img" width="18" height="18" />`;
  }
  return stars;
}

function initTestimonialSlider() {
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialsNext');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevBtn.classList.add('active');
      if (nextBtn) nextBtn.classList.remove('active');
      goToSlide((currentSlide - 1 + testimonials.length) % testimonials.length);
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextBtn.classList.add('active');
      if (prevBtn) prevBtn.classList.remove('active');
      goToSlide((currentSlide + 1) % testimonials.length);
      resetAutoPlay();
    });
  }

  startAutoPlay();
}

function goToSlide(index) {
  currentSlide = index;
  const slider = document.getElementById('testimonialsSlider');
  if (slider) {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  // Update dots
  document.querySelectorAll('.testimonials__dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function startAutoPlay() {
  sliderInterval = setInterval(() => {
    goToSlide((currentSlide + 1) % testimonials.length);
  }, 5000);
}

function resetAutoPlay() {
  if (sliderInterval) {
    clearInterval(sliderInterval);
    startAutoPlay();
  }
}

/* ==========================================
   BLOGS
   ========================================== */

async function loadBlogs() {
  const container = document.getElementById('blogGrid');
  if (!container) return;

  const blogs = await fetchData('blogs');

  if (!blogs.length) {
    container.innerHTML = '<p>No blog posts found.</p>';
    return;
  }

  renderBlogs(blogs, container);
}

function renderBlogs(blogs, container) {
  container.innerHTML = blogs
    .map(
      (blog) => `
    <article class="blog-card fade-in-up">
      <div class="blog-card__image-wrapper">
        <img src="${blog.image}" alt="${blog.title}" class="blog-card__image" loading="lazy" onerror="this.parentElement.style.backgroundColor='#c4c4c4'" />
      </div>
      <div class="blog-card__content">
        <h3 class="blog-card__title">${blog.title}</h3>
        
        <div class="blog-card__tag">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="#FF5A3C" stroke-width="1.5">
            <path d="M1 1H11V13L6 9.5L1 13V1Z"/>
          </svg>
          <span>${blog.category || 'Rentals'}</span>
        </div>

        <p class="blog-card__desc">${blog.description}</p>

        <div class="blog-card__footer">
          <div class="blog-card__meta-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#999999" stroke-width="1.4">
              <rect x="1.5" y="2.5" width="11" height="10" rx="1.5"/>
              <line x1="1.5" y1="5.5" x2="12.5" y2="5.5"/>
              <line x1="4.5" y1="1" x2="4.5" y2="3"/>
              <line x1="9.5" y1="1" x2="9.5" y2="3"/>
            </svg>
            <span>${blog.date || '3 years ago'}</span>
          </div>

          <div class="blog-card__meta-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#999999" stroke-width="1.4">
              <path d="M7 7A3 3 0 1 0 7 1a3 3 0 0 0 0 6zM2 13c0-2.76 2.24-5 5-5s5 2.24 5 5"/>
            </svg>
            <span>By <strong class="blog-card__author-name">Mike Hesson</strong></span>
          </div>
        </div>
      </div>
    </article>
  `
    )
    .join('');
}

/* ==========================================
   CONTACT FORM VALIDATION
   ========================================== */

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (name && email && message) {
      alert('Thank you, ' + name + '! Your message has been sent successfully.');
      form.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  });
}

function validateContactForm(form) {
  const fields = form.querySelectorAll('.form-group__input[required]');
  let isValid = true;

  fields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  const errorEl = field.parentElement.querySelector('.form-group__error');
  let isValid = true;
  let errorMsg = '';

  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMsg = 'This field is required.';
  } else if (type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      isValid = false;
      errorMsg = 'Please enter a valid email address.';
    }
  } else if (type === 'tel' && value) {
    const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
    if (!phoneRegex.test(value)) {
      isValid = false;
      errorMsg = 'Please enter a valid phone number.';
    }
  }

  field.classList.toggle('form-group__input--error', !isValid);
  if (errorEl) {
    errorEl.textContent = errorMsg;
    errorEl.classList.toggle('visible', !isValid);
  }

  return isValid;
}

function handleFormSuccess(form, successMsg) {
  form.reset();
  // Remove all error states
  form.querySelectorAll('.form-group__input--error').forEach((el) => {
    el.classList.remove('form-group__input--error');
  });
  form.querySelectorAll('.form-group__error.visible').forEach((el) => {
    el.classList.remove('visible');
  });

  if (successMsg) {
    successMsg.classList.add('visible');
    setTimeout(() => successMsg.classList.remove('visible'), 5000);
  }
}

/* ==========================================
   COUNTER ANIMATION (Statistics)
   ========================================== */

function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(el) {
  const target = parseInt(el.dataset.counter, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const step = (target / duration) * 16;
  let current = 0;

  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current) + suffix;

    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    }
  }, 16);
}

/* ==========================================
   SCROLL-TRIGGERED ANIMATIONS
   ========================================== */

function observeElements() {
  const elements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger delay based on element position in parent
          const siblings = Array.from(entry.target.parentElement.children);
          const index = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ==========================================
   SCROLL TO TOP
   ========================================== */

function initScrollTop() {
  const btn = document.getElementById('scrollTopBtn');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================
   ACTIVE NAV LINK (on scroll)
   ========================================== */

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ==========================================
   SUBSCRIBE FORM (Projects section)
   ========================================== */

function initSubscribeForm() {
  const form = document.getElementById('subscribeForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(emailInput.value.trim())) {
        emailInput.value = '';
        // Provide user feedback
        const btn = form.querySelector('.btn');
        if (btn) {
          const original = btn.textContent;
          btn.textContent = 'Subscribed!';
          btn.disabled = true;
          setTimeout(() => {
            btn.textContent = original;
            btn.disabled = false;
          }, 3000);
        }
      }
    }
  });
}

/* ==========================================
   FOOTER NEWSLETTER FORM
   ========================================== */

function initFooterNewsletter() {
  const form = document.getElementById('footerNewsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (input && input.value.trim()) {
      input.value = '';
      const btn = form.querySelector('.btn');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Done!';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 3000);
      }
    }
  });
}

/* ==========================================
   INIT — Entry point
   ========================================== */

async function init() {
  // UI initializations (sync)
  initMobileMenu();
  initHeaderScroll();
  initScrollTop();
  initActiveNav();
  initSubscribeForm();
  initFooterNewsletter();
  initCounterAnimation();

  // Data loading (async, parallel)
  await Promise.all([
    loadProperties(),
    loadServices(),
    loadTestimonials(),
    loadBlogs(),
  ]);

  // After data loaded
  initPropertyTabs();
  initContactForm();
  observeElements();
}

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', init);
