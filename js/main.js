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
  const locationInput = document.getElementById('location');
  const phoneInput = document.getElementById('phone');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const locationError = document.getElementById('location-error');
  const phoneError = document.getElementById('phone-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  function validateName() {
    const value = nameInput.value.trim();
    if (!value) {
      nameError.textContent = 'Full name is required.';
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

  function validateLocation() {
    const value = locationInput.value.trim();
    if (!value) {
      locationError.textContent = 'Location is required.';
      locationInput.closest('.form-group').classList.add('error');
      return false;
    }
    if (value.length < 2) {
      locationError.textContent = 'Please enter a valid location.';
      locationInput.closest('.form-group').classList.add('error');
      return false;
    }
    locationError.textContent = '';
    locationInput.closest('.form-group').classList.remove('error');
    return true;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    if (!value) {
      phoneError.textContent = 'Mobile number is required.';
      phoneInput.closest('.form-group').classList.add('error');
      return false;
    }
    const phonePattern = /^\+?[\d\s\-()]{7,20}$/;
    if (!phonePattern.test(value)) {
      phoneError.textContent = 'Please enter a valid phone number.';
      phoneInput.closest('.form-group').classList.add('error');
      return false;
    }
    phoneError.textContent = '';
    phoneInput.closest('.form-group').classList.remove('error');
    return true;
  }

  function validateSubject() {
    const value = subjectInput.value;
    if (!value) {
      subjectError.textContent = 'Please select a service.';
      subjectInput.closest('.form-group').classList.add('error');
      return false;
    }
    subjectError.textContent = '';
    subjectInput.closest('.form-group').classList.remove('error');
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (!value) {
      messageError.textContent = 'Message is required.';
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
  locationInput.addEventListener('blur', validateLocation);
  phoneInput.addEventListener('blur', validatePhone);
  subjectInput.addEventListener('change', validateSubject);
  messageInput.addEventListener('blur', validateMessage);

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isLocationValid = validateLocation();
    const isPhoneValid = validatePhone();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    if (isNameValid && isLocationValid && isPhoneValid && isSubjectValid && isMessageValid) {
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending...';

      var params = {
        name: nameInput.value.trim(),
        location: locationInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: phoneInput.value.trim(),
        subject: subjectInput.value.trim(),
        service: subjectInput.value,
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
          var xhr = new XMLHttpRequest();
          xhr.open('POST', 'send-mail.php', true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.onload = function () {
            if (xhr.status === 200) {
              alert('Thank you! Your message has been sent. We will get back to you shortly.');
              form.reset();
              document.querySelectorAll('.form-group').forEach(function (group) {
                group.classList.remove('error');
              });
              document.querySelectorAll('.error-msg').forEach(function (msg) {
                msg.textContent = '';
              });
            } else {
              alert('Failed to send message. Please try again later.');
            }
          };
          xhr.onerror = function () {
            alert('Failed to send message. Please try again later.');
          };
          xhr.send('name=' + encodeURIComponent(params.name) + '&location=' + encodeURIComponent(params.location) + '&phone=' + encodeURIComponent(params.phone) + '&subject=' + encodeURIComponent(params.subject) + '&message=' + encodeURIComponent(params.message));
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

  /* ── Walking Character ── */
  (function () {
    var walker = document.getElementById('bottomWalker');
    var bubble = document.querySelector('#bottomWalker .walker-bubble');
    if (!walker || !bubble) return;

    var sectionEls = document.querySelectorAll('#home, #about, #services, #skills, #portfolio, #testimonials, #blog, #contact');

    var messages = {
      home: '👋 Hey there! Welcome!',
      about: 'That\'s me — Emmanuel Wiafe!',
      skills: 'Ooh, look at all these React projects!',
      services: 'We build awesome digital products!',
      portfolio: 'Check out my latest work!',
      testimonials: 'Happy clients all around!',
      blog: 'Fresh content, go read it!',
      contact: 'Let\'s work together!',
    };

    var lastSection = '';
    var sections = [];

    function updateSections() {
      sections = [];
      sectionEls.forEach(function (el) {
        var r = el.getBoundingClientRect();
        sections.push({ id: el.id, left: r.left, right: r.right, top: r.top, bottom: r.bottom });
      });
    }

    function getX(el) {
      var m = getComputedStyle(el).transform;
      var match = m.match(/matrix\([^,]+,[^,]+,[^,]+,[^,]+,\s*([^,]+)/);
      return match ? parseFloat(match[1]) : 0;
    }

    function tick() {
      updateSections();
      var x = getX(walker);
      var vh = window.innerHeight;
      var current = 'home';

      for (var i = 0; i < sections.length; i++) {
        var s = sections[i];
        if (x >= s.left && x <= s.right && s.top < vh - 20 && s.bottom > vh - 80) {
          current = s.id;
          break;
        }
      }

      if (current !== lastSection) {
        bubble.textContent = messages[current] || 'Hello!';
        lastSection = current;
      }

      requestAnimationFrame(tick);
    }

    tick();
  })();

  // ===== Dark Mode Toggle =====
  var savedTheme = localStorage.getItem('site-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('site-theme', next);
    });
  }
})();
