(function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true' ? false : true;
    navMenu.classList.toggle('active');
    this.setAttribute('aria-expanded', expanded);
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', function (e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  const form = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const serviceInput = document.getElementById('service');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const serviceError = document.getElementById('service-error');
  const messageError = document.getElementById('message-error');

  function validateName() {
    const value = nameInput.value.trim();
    if (!value) {
      nameError.textContent = 'Name is required.';
      nameInput.closest('.form-group').classList.add('error');
      return false;
    }
    if (value.length < 2) {
      nameError.textContent = 'Name must be at least 2 characters.';
      nameInput.closest('.form-group').classList.add('error');
      return false;
    }
    nameError.textContent = '';
    nameInput.closest('.form-group').classList.remove('error');
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      emailError.textContent = 'Email is required.';
      emailInput.closest('.form-group').classList.add('error');
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      emailError.textContent = 'Please enter a valid email address.';
      emailInput.closest('.form-group').classList.add('error');
      return false;
    }
    emailError.textContent = '';
    emailInput.closest('.form-group').classList.remove('error');
    return true;
  }

  function validateService() {
    const value = serviceInput.value;
    if (!value) {
      serviceError.textContent = 'Please select a service.';
      serviceInput.closest('.form-group').classList.add('error');
      return false;
    }
    serviceError.textContent = '';
    serviceInput.closest('.form-group').classList.remove('error');
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (!value) {
      messageError.textContent = 'Project details are required.';
      messageInput.closest('.form-group').classList.add('error');
      return false;
    }
    if (value.length < 10) {
      messageError.textContent = 'Please provide at least 10 characters.';
      messageInput.closest('.form-group').classList.add('error');
      return false;
    }
    messageError.textContent = '';
    messageInput.closest('.form-group').classList.remove('error');
    return true;
  }

  nameInput.addEventListener('blur', validateName);
  emailInput.addEventListener('blur', validateEmail);
  serviceInput.addEventListener('change', validateService);
  messageInput.addEventListener('blur', validateMessage);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isServiceValid = validateService();
    const isMessageValid = validateMessage();

    if (isNameValid && isEmailValid && isServiceValid && isMessageValid) {
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';

      var params = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        service: serviceInput.value,
        message: messageInput.value.trim(),
      };

      emailjs.send('service_hjj4ma9', 'template_17pr2cx', params)
        .then(function () {
          alert('Thank you! Your message has been sent. We will get back to you shortly.');
          form.reset();
          document.querySelectorAll('.form-group').forEach(function (group) {
            group.classList.remove('error');
          });
          document.querySelectorAll('.error-msg').forEach(function (msg) {
            msg.textContent = '';
          });
        })
        .catch(function (err) {
          console.error('EmailJS error:', err);
          alert('Failed to send message. Please try again later.');
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = 'Send Message';
        });
    }
  });

  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      portfolioItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  const skillIcons = document.querySelectorAll('.skill-icon');
  const strengthFills = document.querySelectorAll('.strength-fill');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  skillIcons.forEach(function (icon) {
    observer.observe(icon);
  });

  const strengthObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        strengthObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  strengthFills.forEach(function (fill) {
    strengthObserver.observe(fill);
  });
})();
