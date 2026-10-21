/**
 * Web7 Tech Solutions - Client Script
 * Theme: Glow Designer Luxury Editorial Aesthetic (https://glowdesigner.com/)
 * Features:
 *  1. Glow Designer signature splash loader fade-out
 *  2. Mobile drawer navigation & touch-friendly interactions
 *  3. Interactive Cost & Quote Estimator (with live WhatsApp formatting to 8921399907)
 *  4. Online Requirement Submission Form & Direct WhatsApp Link
 *  5. Dynamic Portfolio Filtering (Touch horizontal scrolling)
 *  6. Live Interactive Previews (Wedding / Birthday Invite & Hospital Billing System)
 *  7. Copy to clipboard with toast notification
 */

document.addEventListener('DOMContentLoaded', () => {
  initSplashLoader();
  initNavbar();
  initCalculator();
  initPortfolioFilter();
  initRequirementForm();
  initModals();
  initCopyWhatsApp();
});

/* ===================================================================
   1. SIGNATURE GLOW DESIGNER SPLASH LOADER
   =================================================================== */
function initSplashLoader() {
  const splash = document.getElementById('splashLoader');
  if (!splash) return;

  // Let the signature progress bar animate briefly then fade out smoothly
  const dismissSplash = () => {
    splash.classList.add('loaded');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 850);
  };

  // Wait for window load or fallback after 900ms
  if (document.readyState === 'complete') {
    setTimeout(dismissSplash, 600);
  } else {
    window.addEventListener('load', () => {
      setTimeout(dismissSplash, 600);
    });
    // Fallback safeguard
    setTimeout(dismissSplash, 1500);
  }
}

/* ===================================================================
   2. NAVBAR & MOBILE DRAWER BEHAVIOR
   =================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightCurrentSection();
  });

  const openDrawer = () => {
    if (navMenu) {
      navMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeDrawer = () => {
    if (navMenu) {
      navMenu.classList.remove('open');
      document.body.style.overflow = 'auto';
    }
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDrawer();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('open') && !navMenu.contains(e.target) && e.target !== toggleBtn) {
      closeDrawer();
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 130;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  }
}

/* ===================================================================
   3. INTERACTIVE PRICE & QUOTE ESTIMATOR (BUDGET FRIENDLY)
   =================================================================== */
function initCalculator() {
  const typeButtons = document.querySelectorAll('.calc-type-btn');
  const addonCheckboxes = document.querySelectorAll('.calc-addon-check');
  const timelineSelect = document.getElementById('calcTimeline');
  const priceDisplay = document.getElementById('calcEstimatedPrice');
  const summaryType = document.getElementById('summaryType');
  const summaryAddons = document.getElementById('summaryAddons');
  const summaryTimeline = document.getElementById('summaryTimeline');
  const whatsappQuoteBtn = document.getElementById('btnSendWhatsappQuote');

  let basePrice = 999;
  let currentTypeName = 'Digital Event & Invitation Website';

  // Base pricing tiers (in INR - Budget Friendly)
  const pricingTiers = {
    'invitation': { name: 'Digital Event / Marriage / Birthday Invite', price: 999 },
    'business': { name: 'Startup & Small Business Website', price: 4999 },
    'ecommerce': { name: 'E-Commerce & Fashion Store', price: 7999 },
    'hospital': { name: 'Hospital / Clinic Appointment & Billing System', price: 9999 },
    'custom': { name: 'Full-Stack MERN / Python / Java Web App', price: 13999 }
  };

  // Type selection
  typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      typeButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const typeKey = btn.getAttribute('data-type');
      if (pricingTiers[typeKey]) {
        basePrice = pricingTiers[typeKey].price;
        currentTypeName = pricingTiers[typeKey].name;
      }
      calculateTotal();
    });
  });

  // Addon changes
  addonCheckboxes.forEach(chk => {
    chk.addEventListener('change', () => {
      chk.closest('.addon-checkbox-label').classList.toggle('checked', chk.checked);
      calculateTotal();
    });
  });

  if (timelineSelect) {
    timelineSelect.addEventListener('change', calculateTotal);
  }

  function calculateTotal() {
    let total = basePrice;
    let selectedAddonNames = [];

    addonCheckboxes.forEach(chk => {
      if (chk.checked) {
        total += parseInt(chk.value, 10);
        selectedAddonNames.push(chk.getAttribute('data-addon-name'));
      }
    });

    let timelineText = timelineSelect ? timelineSelect.options[timelineSelect.selectedIndex].text : 'Standard (3-5 Days)';
    if (timelineSelect && timelineSelect.value === 'rush') {
      total += 1200; // Priority turnaround
    }

    // Format Indian Rupees currency
    const formattedPrice = '₹' + total.toLocaleString('en-IN');
    if (priceDisplay) {
      priceDisplay.textContent = formattedPrice;
    }

    if (summaryType) summaryType.textContent = currentTypeName;
    if (summaryAddons) {
      summaryAddons.textContent = selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'Standard Inclusions';
    }
    if (summaryTimeline) summaryTimeline.textContent = timelineText;

    // Build WhatsApp URL with clean formatted text
    if (whatsappQuoteBtn) {
      const msgLines = [
        `*🌟 Web7 Tech Solutions — Website Requirement & Quote Request*`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `*Project Category:* ${currentTypeName}`,
        `*Estimated Budget:* ${formattedPrice}`,
        `*Selected Add-ons:* ${selectedAddonNames.length > 0 ? selectedAddonNames.join(', ') : 'Standard Inclusions'}`,
        `*Target Timeline:* ${timelineText}`,
        `━━━━━━━━━━━━━━━━━━━━━━━━━`,
        `Hi Sanju, I checked your price estimator on web7techsolutions.com and I want to start this project. Please share next steps!`
      ];

      const encodedMsg = encodeURIComponent(msgLines.join('\n'));
      whatsappQuoteBtn.href = `https://wa.me/918921399907?text=${encodedMsg}`;
    }
  }

  // Initial calculation
  calculateTotal();
}

/* ===================================================================
   4. PORTFOLIO FILTERING (TOUCH & DESKTOP)
   =================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ===================================================================
   5. INTERACTIVE REQUIREMENT FORM (DIRECT WHATSAPP & LOCAL STORAGE)
   =================================================================== */
function initRequirementForm() {
  const form = document.getElementById('projectRequirementForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('reqClientName')?.value.trim() || 'Client';
    const phone = document.getElementById('reqClientPhone')?.value.trim() || 'Not provided';
    const business = document.getElementById('reqBusinessName')?.value.trim() || 'Startup / Individual';
    const type = document.getElementById('reqProjectType')?.value || 'Website Development';
    const budget = document.getElementById('reqBudgetRange')?.value || 'Affordable Budget';
    const message = document.getElementById('reqMessage')?.value.trim() || 'Looking for an affordable, high-quality website.';

    // Construct formatted WhatsApp message
    const lines = [
      `*🌟 New Project Requirement — Web7 Tech Solutions*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `*Client Name:* ${name}`,
      `*Phone / WhatsApp:* ${phone}`,
      `*Business / Entity:* ${business}`,
      `*Service Required:* ${type}`,
      `*Preferred Budget:* ${budget}`,
      `*Project Brief:*`,
      `${message}`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `Sent via Web7 Tech Solutions Website`
    ];

    const encoded = encodeURIComponent(lines.join('\n'));
    const whatsappUrl = `https://wa.me/918921399907?text=${encoded}`;

    // Show toast notice
    showToast(`Opening WhatsApp with your project requirements...`);

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 500);

    // Save lead in localStorage for persistence
    try {
      const submissions = JSON.parse(localStorage.getItem('web7_inquiries') || '[]');
      submissions.push({ name, phone, business, type, budget, message, date: new Date().toISOString() });
      localStorage.setItem('web7_inquiries', JSON.stringify(submissions));
    } catch (err) {
      console.log('Local storage save skipped');
    }
  });
}

/* ===================================================================
   6. INTERACTIVE LIVE DEMO MODALS (GLOW LUXURY AESTHETIC)
   =================================================================== */
function initModals() {
  const modalOverlay = document.getElementById('demoModalOverlay');
  const modalContentBox = document.getElementById('modalDynamicContent');
  const closeBtn = document.getElementById('modalCloseBtn');
  const demoTriggerBtns = document.querySelectorAll('.btn-open-demo');

  if (!modalOverlay || !modalContentBox) return;

  demoTriggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const demoType = btn.getAttribute('data-demo');
      loadDemoContent(demoType);
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function loadDemoContent(type) {
    if (type === 'wedding-invite') {
      modalContentBox.innerHTML = `
        <div style="text-align: center; padding: 1rem 0;">
          <span class="badge-pill onyx" style="margin-bottom: 1rem;"><i class="fas fa-heart" style="color: #C5A862;"></i> Live Interactive Invitation Demo</span>
          <h3 style="font-size: 2.2rem; font-family: 'Playfair Display', Georgia, serif; color: #171411; margin-bottom: 0.35rem;">Alexander &amp; Julianna</h3>
          <p style="color: #7e756f; margin-bottom: 1.5rem; font-style: italic;">"Save The Date — Join Us to Celebrate Our Wedding"</p>
          
          <div style="background: #171411; border: 1px solid #C5A862; border-radius: 14px; padding: 1.75rem 1rem; margin-bottom: 1.5rem; color: #fff;">
            <div style="font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.15em; color: #C5A862; margin-bottom: 1rem; font-weight: 700;">Ceremony Countdown</div>
            <div style="display: flex; justify-content: center; gap: 0.75rem; font-family: 'Space Grotesk', monospace;">
              <div style="background: rgba(255,255,255,0.06); padding: 0.6rem 0.9rem; border-radius: 8px; min-width: 65px;"><span style="font-size: 1.8rem; font-weight: 800; color: #fff;">124</span><br><small style="color: #958f8a; font-size: 0.68rem;">DAYS</small></div>
              <div style="background: rgba(255,255,255,0.06); padding: 0.6rem 0.9rem; border-radius: 8px; min-width: 65px;"><span style="font-size: 1.8rem; font-weight: 800; color: #fff;">08</span><br><small style="color: #958f8a; font-size: 0.68rem;">HOURS</small></div>
              <div style="background: rgba(255,255,255,0.06); padding: 0.6rem 0.9rem; border-radius: 8px; min-width: 65px;"><span style="font-size: 1.8rem; font-weight: 800; color: #fff;">42</span><br><small style="color: #958f8a; font-size: 0.68rem;">MINS</small></div>
              <div style="background: rgba(255,255,255,0.06); padding: 0.6rem 0.9rem; border-radius: 8px; min-width: 65px;"><span style="font-size: 1.8rem; font-weight: 800; color: #C5A862;">19</span><br><small style="color: #958f8a; font-size: 0.68rem;">SECS</small></div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; text-align: left;">
            <div style="background: #FAF6F0; padding: 1.15rem; border-radius: 10px; border: 1px solid #E8DFD8;">
              <h5 style="color: #171411; font-family: 'Libre Caslon Text', serif; font-size: 1rem; margin-bottom: 0.3rem;"><i class="fas fa-church" style="color: #C5A862; margin-right: 0.5rem;"></i>Holy Matrimony</h5>
              <p style="font-size: 0.82rem; color: #6b635b;">St. Mary's Cathedral &bull; 10:30 AM</p>
            </div>
            <div style="background: #FAF6F0; padding: 1.15rem; border-radius: 10px; border: 1px solid #E8DFD8;">
              <h5 style="color: #171411; font-family: 'Libre Caslon Text', serif; font-size: 1rem; margin-bottom: 0.3rem;"><i class="fas fa-glass-cheers" style="color: #C5A862; margin-right: 0.5rem;"></i>Grand Reception</h5>
              <p style="font-size: 0.82rem; color: #6b635b;">Royal Orchid Palace &bull; 06:00 PM</p>
            </div>
          </div>

          <p style="font-size: 0.88rem; color: #6b635b; margin-bottom: 1.5rem; line-height: 1.6;">
            Includes: Interactive guest RSVP via WhatsApp, Google Maps venue navigation, background music player, and mobile-friendly photo gallery.
          </p>

          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="https://wa.me/918921399907?text=Hi%20Sanju,%20I%20loved%20the%20Digital%20Invitation%20Demo.%20I%20want%20to%20create%20an%20invitation%20website%20for%20my%20event!" target="_blank" class="btn btn-whatsapp">
              <i class="fab fa-whatsapp"></i> Get Your Invitation Website (Starts ₹999)
            </a>
          </div>
        </div>
      `;
    } else if (type === 'hospital-billing') {
      modalContentBox.innerHTML = `
        <div style="padding: 1rem 0;">
          <span class="badge-pill onyx" style="margin-bottom: 1rem;"><i class="fas fa-hospital" style="color: #C5A862;"></i> Healthcare &amp; Billing Demo</span>
          <h3 style="font-size: 1.85rem; font-family: 'Playfair Display', Georgia, serif; color: #171411; margin-bottom: 0.5rem;">Clinic &amp; Hospital Management Solution</h3>
          <p style="color: #6b635b; margin-bottom: 1.5rem; font-size: 0.92rem;">
            A complete solution for dental clinics, multi-specialty hospitals, and doctors with patient slot scheduling, records, and GST compliant billing.
          </p>

          <div style="background: #171411; color: #fff; border: 1px solid rgba(197, 168, 98, 0.35); border-radius: 14px; padding: 1.5rem; margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.75rem;">
              <span style="font-weight: 700; color: #C5A862;"><i class="fas fa-file-invoice-dollar" style="margin-right: 0.5rem;"></i> Sample Patient Invoice</span>
              <span style="font-size: 0.72rem; background: #22c55e; color: #000; padding: 2px 8px; border-radius: 10px; font-weight: 800;">ACTIVE SYSTEM</span>
            </div>
            
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 0.75rem; font-size: 0.85rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem; color: #958f8a;">
              <div>Procedure / Treatment</div>
              <div>Qty</div>
              <div>Amount</div>
            </div>
            
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 0.75rem; font-size: 0.85rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <div>Consultation &amp; Scaling</div>
              <div>1</div>
              <div>₹1,200.00</div>
            </div>
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 0.75rem; font-size: 0.85rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <div>Digital X-Ray (OPG)</div>
              <div>1</div>
              <div>₹650.00</div>
            </div>
            
            <div style="display: flex; justify-content: space-between; padding-top: 0.85rem; font-size: 1.15rem; font-weight: 800; color: #C5A862;">
              <span>Total Payable (GST Incl):</span>
              <span>₹1,850.00</span>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="background: #FAF6F0; padding: 1.15rem; border-radius: 10px; border: 1px solid #E8DFD8;">
              <h5 style="color: #171411; font-size: 0.92rem; margin-bottom: 0.3rem;"><i class="fas fa-calendar-check" style="color: #C5A862; margin-right: 0.4rem;"></i> Online Appointments</h5>
              <p style="font-size: 0.8rem; color: #6b635b;">Patients pick doctor, slot &amp; receive instant SMS / WhatsApp alert.</p>
            </div>
            <div style="background: #FAF6F0; padding: 1.15rem; border-radius: 10px; border: 1px solid #E8DFD8;">
              <h5 style="color: #171411; font-size: 0.92rem; margin-bottom: 0.3rem;"><i class="fas fa-lock" style="color: #C5A862; margin-right: 0.4rem;"></i> Secure Patient Data</h5>
              <p style="font-size: 0.8rem; color: #6b635b;">Encrypted records, prescription downloads, and billing history.</p>
            </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <a href="https://manjalydentalclinic.vercel.app/" target="_blank" class="btn btn-outline">
              <i class="fas fa-external-link-alt"></i> View Live Manjaly Dental Website
            </a>
            <a href="https://wa.me/918921399907?text=Hi%20Sanju,%20I%20am%20interested%20in%20a%20Hospital/Clinic%20Appointment%20and%20Billing%20website%20for%20our%20facility." target="_blank" class="btn btn-whatsapp">
              <i class="fab fa-whatsapp"></i> Discuss Healthcare Web Solution
            </a>
          </div>
        </div>
      `;
    }
  }
}

/* ===================================================================
   7. COPY WHATSAPP NUMBER TO CLIPBOARD
   =================================================================== */
function initCopyWhatsApp() {
  const copyBtns = document.querySelectorAll('.btn-copy-phone');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '8921399907';
      navigator.clipboard.writeText(phone).then(() => {
        showToast('WhatsApp number (+91 8921399907) copied to clipboard!');
      }).catch(() => {
        showToast('WhatsApp: +91 8921399907');
      });
    });
  });
}

/* Toast helper */
function showToast(text) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color: #C5A862;"></i> <span>${text}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}
