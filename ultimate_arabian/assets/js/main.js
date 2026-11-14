document.addEventListener('DOMContentLoaded', () => {
  // Hide the branded loader after the page has loaded, with a fallback for slow external assets.
  const preloader = document.getElementById('site-preloader');
  if (preloader) {
    let dismissed = false;
    const dismissPreloader = () => {
      if (dismissed) return;
      dismissed = true;
      preloader.classList.add('is-hidden');
      window.setTimeout(() => preloader.remove(), 650);
    };
    if (document.readyState === 'complete') {
      window.setTimeout(dismissPreloader, 250);
    } else {
      window.addEventListener('load', dismissPreloader, { once: true });
    }
    window.setTimeout(dismissPreloader, 2800);
  }

  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  const current = location.pathname.split('/').pop() || 'index.html';
  const nav = [
    ['index.html', 'Home'],
    ['about.html', 'About'],
    ['services.html', 'Services'],
    ['blog.html', 'Blog'],
    ['contact.html', 'Contact']
  ];

  const serviceItems = [
    ['#energy-solutions', 'Energy solutions', 'bi-lightning-charge'],
    ['#technical-services', 'Technical services', 'bi-tools'],
    ['#project-support', 'Project support', 'bi-diagram-3'],
    ['#supply-coordination', 'Supply coordination', 'bi-box-seam'],
    ['#consultation', 'Consultation', 'bi-clipboard-check'],
    ['#customer-support', 'Customer support', 'bi-headset']
  ];

  if (header) {
    header.innerHTML = `
      <nav class="navbar navbar-expand-lg sticky-top" aria-label="Main navigation">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" href="index.html" aria-label="Ultimate Arabian Energies home">
            <img src="assets/logo.jpeg" alt="Ultimate Arabian Energies logo">
            <span class="brand-name">ULTIMATE ARABIAN<br>ENERGIES</span>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNav">
            <ul class="navbar-nav ms-auto align-items-lg-center">
              <li class="nav-item"><a class="nav-link ${current === 'index.html' ? 'active' : ''}" href="index.html">Home</a></li>
              <li class="nav-item"><a class="nav-link ${current === 'about.html' ? 'active' : ''}" href="about.html">About</a></li>
              <li class="nav-item dropdown services-nav-item">
                <a class="nav-link dropdown-toggle ${current === 'services.html' ? 'active' : ''}" href="services.html" id="servicesMenu" role="button" data-bs-toggle="dropdown" aria-expanded="false">Services</a>
                <div class="dropdown-menu services-mega-menu" aria-labelledby="servicesMenu">
                  <div class="services-menu-heading"><span>OUR SERVICES</span><a href="services.html">Explore all services <i class="bi bi-arrow-up-right"></i></a></div>
                  <div class="services-menu-grid">
                    ${serviceItems.map(([anchor, label, icon]) => `<a class="services-menu-link" href="services.html${anchor}"><span class="services-menu-icon"><i class="bi ${icon}" aria-hidden="true"></i></span><span>${label}</span><i class="bi bi-chevron-right services-menu-chevron" aria-hidden="true"></i></a>`).join('')}
                  </div>
                </div>
              </li>
              <li class="nav-item"><a class="nav-link ${current === 'blog.html' ? 'active' : ''}" href="blog.html">Blog</a></li>
              <li class="nav-item"><a class="nav-link ${current === 'contact.html' ? 'active' : ''}" href="contact.html">Contact</a></li>
              <li class="nav-item ms-lg-2"><button class="btn btn-brand btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#enquiryModal">Request an enquiry <i class="bi bi-arrow-up-right"></i></button></li>
            </ul>
          </div>
        </div>
      </nav>`;
  }

  if (footer) {
    footer.innerHTML = `
      <footer>
        <div class="container">
          <div class="row g-4">
            <div class="col-lg-5">
              <div class="footer-brand"><img src="assets/logo.jpeg" alt="">ULTIMATE ARABIAN ENERGIES</div>
              <p class="footer-copy">Practical energy solutions and dependable project support in the Kingdom of Saudi Arabia.</p>
            </div>
            <div class="col-6 col-lg-3">
              <div class="footer-title">QUICK LINKS</div>
              <div class="footer-links">${nav.map(([url, label]) => `<a href="${url}">${label}</a>`).join('')}</div>
            </div>
            <div class="col-6 col-lg-4">
              <div class="footer-title">CONTACT</div>
              <div class="footer-links">
                <a href="mailto:sales@ultimateae.com">sales@ultimateae.com</a>
                <a href="tel:+966539491585">+966 53 949 1585</a>
                <a href="tel:+966536345262">+966 53 634 5262</a>
                <span class="footer-contact">Al Jubail, Kingdom of Saudi Arabia</span>
                <a href="https://www.ultimateae.com" target="_blank" rel="noopener">www.ultimateae.com</a>
              </div>
            </div>
          </div>
          <div class="copyright d-flex flex-column flex-md-row justify-content-between gap-2">
            <span>© ${new Date().getFullYear()} Ultimate Arabian Energies Company. All rights reserved.</span>
            <span>ENAB3078 · Al Rawdah District, Al Jubail</span>
          </div>
        </div>
      </footer>`;
  }

  // Shared enquiry popup available from every page.
  if (!document.getElementById('enquiryModal')) {
    const modal = document.createElement('div');
    modal.innerHTML = `
      <div class="modal fade enquiry-modal" id="enquiryModal" tabindex="-1" aria-labelledby="enquiryModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <div><span class="modal-kicker">ULTIMATE ARABIAN ENERGIES</span><h2 class="modal-title" id="enquiryModalTitle">Tell us how we can help.</h2><p class="modal-subtitle">Share a few details and prepare an enquiry for our team.</p></div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close enquiry form"></button>
            </div>
            <div class="modal-body">
              <form id="popupEnquiryForm">
                <div class="row g-3">
                  <div class="col-md-6"><label class="form-label" for="popupName">Full name <span>*</span></label><input class="form-control" id="popupName" name="name" autocomplete="name" required maxlength="100" placeholder="Your full name"></div>
                  <div class="col-md-6"><label class="form-label" for="popupEmail">Email address <span>*</span></label><input class="form-control" id="popupEmail" name="email" type="email" autocomplete="email" required maxlength="150" placeholder="name@company.com"></div>
                  <div class="col-md-6"><label class="form-label" for="popupPhone">Phone number</label><input class="form-control" id="popupPhone" name="phone" type="tel" autocomplete="tel" maxlength="40" placeholder="+966 ..."></div>
                  <div class="col-md-6"><label class="form-label" for="popupService">Service of interest</label><select class="form-select" id="popupService" name="service"><option value="">Choose a service</option><option>Energy solutions</option><option>Technical services</option><option>Project support</option><option>Supply coordination</option><option>Consultation</option><option>Customer support</option><option>General enquiry</option></select></div>
                  <div class="col-12"><label class="form-label" for="popupMessage">How can we assist? <span>*</span></label><textarea class="form-control" id="popupMessage" name="message" rows="4" required maxlength="3000" placeholder="Briefly describe your requirements..."></textarea></div>
                  <div class="col-12 d-flex flex-column flex-sm-row align-items-sm-center gap-3"><button class="btn btn-brand btn-lg" type="submit">Prepare enquiry <i class="bi bi-arrow-up-right"></i></button><span class="popup-form-note"><i class="bi bi-lock"></i> Your details are not stored on this website.</span></div>
                </div>
                <p class="popup-form-note mt-3 mb-0">Submitting opens your device's email application with the enquiry details addressed to sales@ultimateae.com.</p>
                <p id="popupFormStatus" class="visually-hidden" role="status" aria-live="polite"></p>
              </form>
            </div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(modal.firstElementChild);
  }

  const popupForm = document.getElementById('popupEnquiryForm');
  if (popupForm) {
    popupForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!popupForm.reportValidity()) return;
      const name = document.getElementById('popupName').value.trim();
      const email = document.getElementById('popupEmail').value.trim();
      const phone = document.getElementById('popupPhone').value.trim();
      const service = document.getElementById('popupService').value;
      const message = document.getElementById('popupMessage').value.trim();
      const subject = service ? `Website enquiry - ${service}` : 'Website enquiry - Ultimate Arabian Energies';
      const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nService: ${service || 'Not specified'}\n\nMessage:\n${message}`;
      const status = document.getElementById('popupFormStatus');
      if (status) status.textContent = 'Opening your email application with the enquiry details.';
      window.location.href = `mailto:sales@ultimateae.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }


  if (!document.querySelector('.floating-actions')) {
    const actions = document.createElement('div');
    actions.className = 'floating-actions';
    actions.innerHTML = `
      <button class="float-btn float-enquire" type="button" data-bs-toggle="modal" data-bs-target="#enquiryModal" aria-label="Open enquiry form"><i class="bi bi-chat-square-text-fill"></i></button>
      <a class="float-btn float-call" href="tel:+966539491585" aria-label="Call Ultimate Arabian Energies"><i class="bi bi-telephone-fill"></i></a>
      <a class="float-btn float-wa" href="https://wa.me/966539491585" target="_blank" rel="noopener" aria-label="Chat on WhatsApp"><i class="bi bi-whatsapp"></i></a>`;
    document.body.appendChild(actions);
  }

  if (!document.querySelector('.back-top')) {
    const topButton = document.createElement('button');
    topButton.className = 'back-top';
    topButton.type = 'button';
    topButton.setAttribute('aria-label', 'Back to top');
    topButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
    topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(topButton);
    window.addEventListener('scroll', () => topButton.classList.toggle('show', window.scrollY > 350));
  }

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const phoneField = document.getElementById('phone');
      const phone = phoneField ? phoneField.value.trim() : '';
      const message = document.getElementById('message').value.trim();
      const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\n${message}`;
      window.location.href = `mailto:sales@ultimateae.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
});