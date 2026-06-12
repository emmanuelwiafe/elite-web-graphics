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

  (function () {
    var slides = document.querySelectorAll('.hero-slide');
    var current = 0;
    var total = slides.length;

    function nextSlide() {
      slides[current].classList.remove('active');
      current = (current + 1) % total;
      slides[current].classList.add('active');
    }

    setInterval(nextSlide, 5000);
  })();

  /* ── Random Motivational Quote ── */
  (function () {
    var quotes = [
      { text: 'Design is not just what it looks like and feels like. Design is how it works.', author: 'Steve Jobs' },
      { text: 'The best way to predict the future is to create it.', author: 'Peter Drucker' },
      { text: 'Your website is the center of your digital ecosystem, like a new store opening day — 24/7/365.', author: 'John M. key' },
      { text: 'Good web design is about communication, not decoration.', author: 'Andy Budd' },
      { text: 'It doesn\'t matter how many times you fail. You only have to be right once.', author: 'Mark Cuban' },
      { text: 'Brands are built on what people say about you when you\'re not in the room.', author: 'Jeff Bezos' },
      { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
      { text: 'Creativity is intelligence having fun.', author: 'Albert Einstein' },
      { text: 'Opportunities don\'t happen. You create them.', author: 'Chris Grosser' },
      { text: 'Make it simple, but significant.', author: 'Don Draper' },
      { text: 'Digital design is like painting, except the paint never dries.', author: 'Neville Brody' },
      { text: 'A user interface is like a joke. If you have to explain it, it\'s not that good.', author: 'Martin LeBlanc' },
    ];

    var btn = document.getElementById('quoteBtn');
    if (!btn) return;

    var overlay, card, blockquote, authorEl;

    function buildPopup() {
      overlay = document.createElement('div');
      overlay.className = 'quote-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');

      card = document.createElement('div');
      card.className = 'quote-card';

      var icon = document.createElement('i');
      icon.className = 'fas fa-quote-left';

      blockquote = document.createElement('blockquote');
      authorEl = document.createElement('p');
      authorEl.className = 'quote-author';

      card.appendChild(icon);
      card.appendChild(blockquote);
      card.appendChild(authorEl);
      overlay.appendChild(card);
      document.body.appendChild(overlay);

      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) hideQuote();
      });
    }

    function showQuote() {
      var q = quotes[Math.floor(Math.random() * quotes.length)];
      blockquote.textContent = '\u201C' + q.text + '\u201D';
      authorEl.textContent = '\u2014 ' + q.author;
      overlay.classList.add('active');

      setTimeout(hideQuote, 6000);
    }

    function hideQuote() {
      overlay.classList.remove('active');
    }

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (!overlay) buildPopup();
      showQuote();
    });
  })();
})();
