document.querySelectorAll('.navbar-collapse a').forEach(link => link.addEventListener('click', () => {
  const menu = document.querySelector('.navbar-collapse');
  if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
}));

// Use Bootstrap's API so hover and click share the same accessible state.
const desktopHover = window.matchMedia('(min-width: 992px) and (hover: hover) and (pointer: fine)');
document.querySelectorAll('.navbar .dropdown').forEach(dropdown => {
  const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
  let closeTimer;
  dropdown.addEventListener('mouseenter', () => {
    clearTimeout(closeTimer);
    if (desktopHover.matches) bootstrap.Dropdown.getOrCreateInstance(toggle).show();
  });
  dropdown.addEventListener('mouseleave', () => {
    if (!desktopHover.matches) return;
    // Allow the pointer to cross the small gap below the toggle.
    closeTimer = setTimeout(() => bootstrap.Dropdown.getOrCreateInstance(toggle).hide(), 150);
  });
});

// Service pages retain their page-level navigation state while scrolling.
if (!document.body.classList.contains('service-detail-page')) {
  const sections = [...document.querySelectorAll('header[id], main section[id]')];
  const navLinks = [...document.querySelectorAll('.navbar-nav .nav-link')];
  const updateActiveNavigation = () => {
    const current = sections.filter(section => section.offsetTop <= window.scrollY + 180).at(-1)?.id;
    navLinks.forEach(link => {
      const target = link.id === 'servicesDropdown' ? '#services' : link.getAttribute('href');
      link.classList.toggle('active', target === `#${current}`);
    });
  };
  window.addEventListener('scroll', updateActiveNavigation, { passive: true });
  updateActiveNavigation();
}

// Keep the estimate experience consistent on every page without duplicating modal markup.
const estimateTriggers = [...document.querySelectorAll('[data-estimate-trigger]')];

if (estimateTriggers.length) {
  const estimateModalMarkup = `
    <div class="modal fade estimate-modal" id="estimateModal" tabindex="-1" aria-labelledby="estimateModalLabel" aria-describedby="estimateModalDescription" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <p class="eyebrow mb-1">FREE, NO-OBLIGATION ESTIMATE</p>
              <h2 class="modal-title" id="estimateModalLabel">Tell Us About Your Space</h2>
              <p id="estimateModalDescription" class="mb-0">Share a few details and our team will follow up with your personalized estimate.</p>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close estimate form"></button>
          </div>
          <div class="modal-body">
            <form id="estimateForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
              <fieldset class="estimate-type-fieldset mb-4">
                <legend>What type of cleaning do you need?<span aria-hidden="true">*</span></legend>
                <div class="estimate-type-options">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="cleaning_type" id="cleaningTypeResidential" value="Residential" required>
                    <label class="form-check-label" for="cleaningTypeResidential">Residential</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="cleaning_type" id="cleaningTypeCommercial" value="Commercial" required>
                    <label class="form-check-label" for="cleaningTypeCommercial">Commercial</label>
                  </div>
                </div>
                <div class="invalid-feedback">Choose residential or commercial cleaning.</div>
              </fieldset>

              <div class="row g-3">
                <div class="col-12 col-sm-6">
                  <label class="form-label" for="estimateName">Name</label>
                  <input class="form-control" id="estimateName" name="name" type="text" autocomplete="name" pattern="[A-Za-zÀ-ÖØ-öø-ÿ'’ -]+" required>
                  <div class="invalid-feedback">Enter a valid name without numbers.</div>
                </div>
                <div class="col-12 col-sm-6">
                  <label class="form-label" for="estimateEmail">Email</label>
                  <input class="form-control" id="estimateEmail" name="email" type="email" autocomplete="email" inputmode="email" required>
                  <div class="invalid-feedback">Enter a valid email address.</div>
                </div>
                <div class="col-12">
                  <label class="form-label" for="estimatePhone">Phone</label>
                  <input class="form-control" id="estimatePhone" name="phone" type="tel" autocomplete="tel" inputmode="numeric" pattern="[0-9]{7,15}" minlength="7" maxlength="15" required>
                  <div class="invalid-feedback">Enter 7–15 numbers only.</div>
                </div>
                <div class="col-12">
                  <label class="form-label" for="estimateAddress">Address</label>
                  <input class="form-control" id="estimateAddress" name="address" type="text" autocomplete="street-address" required>
                  <div class="invalid-feedback">Enter the property address.</div>
                </div>
                <div class="col-12">
                  <label class="form-label" for="estimateService">Service</label>
                  <select class="form-select" id="estimateService" name="service" required>
                    <option value="" selected disabled>Select a service</option>
                    <option value="Standard Cleaning">Standard Cleaning</option>
                    <option value="Deep Cleaning">Deep Cleaning</option>
                    <option value="Move-In / Move-Out Cleaning">Move-In / Move-Out Cleaning</option>
                    <option value="Pressure Washing">Pressure Washing</option>
                    <option value="Soft Washing">Soft Washing</option>
                  </select>
                  <div class="invalid-feedback">Select a service.</div>
                </div>
                <div class="col-12 property-fields" hidden>
                  <div class="row g-3">
                    <div class="col-6 residential-only">
                      <label class="form-label" for="estimateBedrooms">Bedrooms</label>
                      <input class="form-control" id="estimateBedrooms" name="bedrooms" type="number" inputmode="numeric" min="0" step="1">
                      <div class="invalid-feedback">Enter the number of bedrooms.</div>
                    </div>
                    <div class="col-6 residential-only">
                      <label class="form-label" for="estimateBathrooms">Bathrooms</label>
                      <input class="form-control" id="estimateBathrooms" name="bathrooms" type="number" inputmode="decimal" min="0" step="0.5">
                      <div class="invalid-feedback">Enter the number of bathrooms.</div>
                    </div>
                    <div class="col-12 square-footage-field">
                      <label class="form-label" for="estimateSquareFootage">Approximate square footage</label>
                      <select class="form-select" id="estimateSquareFootage" name="square_footage">
                        <option value="" selected disabled>Select a range</option>
                        <option value="0–1,000 sq ft">0–1,000 sq ft</option>
                        <option value="1,000–3,000 sq ft">1,000–3,000 sq ft</option>
                        <option value="3,000–5,000 sq ft">3,000–5,000 sq ft</option>
                      </select>
                      <div class="invalid-feedback">Select the approximate square footage.</div>
                    </div>
                  </div>
                </div>
              </div>

              <input type="hidden" name="source_page" id="estimateSourcePage">
              <div class="estimate-honeypot" aria-hidden="true">
                <label for="estimateCompanyWebsite">Leave this field empty</label>
                <input id="estimateCompanyWebsite" name="_gotcha" type="text" tabindex="-1" autocomplete="off">
              </div>
              <div class="estimate-form-error alert alert-danger mt-3 mb-0" role="alert" tabindex="-1" hidden></div>
              <button class="btn btn-teal w-100 mt-4 estimate-submit" type="submit">REQUEST MY FREE ESTIMATE</button>
            </form>

            <div class="estimate-success text-center" role="status" tabindex="-1" hidden>
              <span class="estimate-success-icon" aria-hidden="true"><i class="bi bi-check2"></i></span>
              <h3>Mahalo!</h3>
              <p>We received your request and will be in touch soon with your personalized estimate.</p>
              <button class="btn btn-outline-teal" type="button" data-bs-dismiss="modal">CLOSE</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  document.body.insertAdjacentHTML('beforeend', estimateModalMarkup);

  const modalElement = document.getElementById('estimateModal');
  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
  const form = document.getElementById('estimateForm');
  const formError = form.querySelector('.estimate-form-error');
  const submitButton = form.querySelector('.estimate-submit');
  const successPanel = modalElement.querySelector('.estimate-success');
  const propertyFields = form.querySelector('.property-fields');
  const residentialFields = [...form.querySelectorAll('.residential-only')];
  const bedrooms = form.elements.bedrooms;
  const bathrooms = form.elements.bathrooms;
  const squareFootage = form.elements.square_footage;
  const nameField = form.elements.name;
  const phoneField = form.elements.phone;
  const sourcePage = form.elements.source_page;
  let isSubmitting = false;

  const updatePropertyFields = () => {
    const cleaningType = form.elements.cleaning_type.value;
    const isResidential = cleaningType === 'Residential';
    const hasType = Boolean(cleaningType);

    propertyFields.hidden = !hasType;
    residentialFields.forEach(field => { field.hidden = !isResidential; });
    bedrooms.required = isResidential;
    bathrooms.required = isResidential;
    squareFootage.required = hasType;

    if (!isResidential) {
      bedrooms.value = '';
      bathrooms.value = '';
      bedrooms.classList.remove('is-invalid');
      bathrooms.classList.remove('is-invalid');
    }
  };

  const resetEstimateForm = () => {
    form.reset();
    form.classList.remove('was-validated');
    form.hidden = false;
    successPanel.hidden = true;
    formError.hidden = true;
    formError.textContent = '';
    submitButton.disabled = false;
    submitButton.textContent = 'REQUEST MY FREE ESTIMATE';
    isSubmitting = false;
    sourcePage.value = `${document.title} — ${window.location.href}`;
    updatePropertyFields();
  };

  [...form.elements.cleaning_type].forEach(input => input.addEventListener('change', updatePropertyFields));
  nameField.addEventListener('input', () => {
    nameField.value = nameField.value.replace(/[0-9]/g, '');
  });
  phoneField.addEventListener('input', () => {
    phoneField.value = phoneField.value.replace(/\D/g, '').slice(0, 15);
  });

  estimateTriggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      modal.show(trigger);
    });
  });

  modalElement.addEventListener('show.bs.modal', resetEstimateForm);

  form.addEventListener('submit', async event => {
    event.preventDefault();
    event.stopPropagation();

    if (isSubmitting) return;
    form.classList.add('was-validated');
    if (!form.checkValidity()) {
      form.querySelector(':invalid')?.focus();
      return;
    }

    isSubmitting = true;
    submitButton.disabled = true;
    submitButton.textContent = 'SENDING…';
    formError.hidden = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Formspree rejected the request.');

      form.hidden = true;
      successPanel.hidden = false;
      successPanel.focus();
    } catch (error) {
      formError.textContent = 'We couldn’t send your request. Please check your connection and try again, or call (808) 444-3231.';
      formError.hidden = false;
      formError.focus();
      submitButton.disabled = false;
      submitButton.textContent = 'TRY AGAIN';
      isSubmitting = false;
    }
  });
}
