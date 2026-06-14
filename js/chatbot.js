(function () {
  const toggle = document.getElementById('chatbot-toggle');
  const panel = document.getElementById('chatbot-panel');
  const closeBtn = document.getElementById('chatbot-close');
  const body = document.getElementById('chatbot-body');
  const input = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');

  function open() {
    panel.classList.add('open');
    toggle.style.display = 'none';
    body.scrollTop = body.scrollHeight;
  }

  function close() {
    panel.classList.remove('open');
    toggle.style.display = 'flex';
  }

  toggle.addEventListener('click', open);
  closeBtn.addEventListener('click', close);

  function extractText(selector) {
    var el = document.querySelector(selector);
    return el ? el.textContent.trim().replace(/\s+/g, ' ') : '';
  }

  function extractAllText(selector) {
    var els = document.querySelectorAll(selector);
    var texts = [];
    els.forEach(function (el) { texts.push(el.textContent.trim().replace(/\s+/g, ' ')); });
    return texts;
  }

  var knowledge = {
    siteName: extractText('title'),
    tagline: extractText('.hero-content h1'),
    heroDesc: extractText('.hero-content p'),
    about: extractText('.about-text p'),
    services: extractAllText('.service-card h3').map(function (h, i) {
      var descs = extractAllText('.service-card p');
      return h + ': ' + (descs[i] || '');
    }),
    portfolioItems: extractAllText('.portfolio-item h3'),
    testimonials: extractAllText('.testimonial-text'),
    testimonialAuthors: extractAllText('.testimonial-name'),
    blogPosts: extractAllText('.blog-card h3'),
    blogDescs: extractAllText('.blog-card p'),
    contactDesc: extractText('#contact .section-title'),
    navLinks: extractAllText('.nav-link'),
    logo: extractText('.logo'),
    footer: extractText('.footer p')
  };

  var sections = [
    { name: 'home', keywords: ['home', 'hero', 'top', 'tagline', 'landing'], content: 'Hero section: "' + knowledge.tagline + '" — ' + knowledge.heroDesc },
    { name: 'about this site', keywords: ['this website', 'your website', 'about this site', 'about this website', 'tell me about this', 'know about this', 'what is this', 'what is this site', 'what is this website', 'this site about', 'this site'], content: '<strong>' + knowledge.siteName + '</strong> is a graphic design and web development agency. ' + (knowledge.tagline ? '"' + knowledge.tagline + '"' : '') + ' ' + knowledge.heroDesc + '<br><br>We offer: <strong>Graphic Design</strong> (logos, branding, social media graphics, flyers), <strong>Web Development</strong> (responsive sites, e-commerce, custom apps), and <strong>Web App Development</strong>. Founded by <strong>Emmanuel Wiafe</strong>.' },
    { name: 'founder', keywords: ['founder', 'emmanuel', 'wiafe', 'who founded', 'who own', 'who run', 'who started', 'who created', 'who made', 'who built', 'who developed', 'created this', 'built this', 'developed this', 'who is behind', 'owner'], content: 'The company was founded by <strong>Emmanuel Wiafe</strong>.' },
    { name: 'about', keywords: ['about', 'story', 'background', 'mission', 'company', 'agency'], content: knowledge.about },
    { name: 'services', keywords: ['service', 'offer', 'provide', 'what do', 'what does', 'you offer', 'you provide'], content: 'We provide graphic design (logos, branding, social media graphics, print/flyers), web development (responsive sites, e-commerce, custom apps), and web app development (modern and responsive).' },
    { name: 'graphic design', keywords: ['graphic', 'design', 'logo', 'brand', 'identity', 'paint', 'visual'], content: knowledge.services[0] || 'Graphic design services including logo design, branding, social media graphics, and print materials.' },
    { name: 'web development', keywords: ['web', 'website', 'development', 'e-commerce', 'ecommerce', 'shop', 'online store'], content: knowledge.services[1] || 'Web development services including responsive websites, e-commerce platforms, and custom web applications.' },
    { name: 'web app', keywords: ['web app', 'web application', 'web apps', 'web applications', 'app', 'application', 'custom app', 'responsive', 'web development', 'web dev'], content: knowledge.services[2] || 'Web app development: modern and responsive applications built for performance, usability, and scale.' },
    { name: 'portfolio', keywords: ['portfolio', 'project', 'work', 'past', 'previous', 'example', 'showcase', 'sample', 'samples'], content: 'E-Commerce Site, Brand Refresh, SmartFace Register (a facial-recognition + GPS attendance system for schools/universities), and a flyers/graphic design gallery (business, event, election, birthday categories).' },
    { name: 'testimonials', keywords: ['testimonial', 'review', 'client', 'say', 'feedback', 'recommend', 'rating', 'clients say'], content: 'Sarah Mensah (Bloom Cosmetics) — site doubled their traffic; James Osei (QuickCart) — praised the web app; Ama Serwaa (Luxe Beauty) — praised branding/identity work.' },
    { name: 'blog', keywords: ['blog', 'article', 'post', 'news', 'latest', 'trend', 'read'], content: 'Our latest blog posts: ' + knowledge.blogPosts.map(function (t, i) { return t + ' — ' + (knowledge.blogDescs[i] || ''); }).join(' | ') },
    { name: 'flyers', keywords: ['flyer', 'flyers', 'gallery', 'graphic design samples', 'design samples'], content: 'The "Flyers" portfolio item links to flyers.html, a filterable gallery (Business, Event, Election, Birthday categories) with dozens of real client flyers.' },
    { name: 'contact', keywords: ['contact', 'reach', 'email', 'phone', 'call', 'message', 'form', 'get in touch', 'quote'], content: 'Use the on-site contact form (name, email, service type, project details), the floating WhatsApp button, or social media (TikTok, Facebook, Snapchat, Instagram, LinkedIn).' },
    { name: 'pricing', keywords: ['price', 'cost', 'pricing', 'how much', 'rate', 'fee', 'charge', 'budget', 'afford'], content: 'Pricing is quote-based and depends on project scope — contact via form or WhatsApp for a tailored quote.' },
    { name: 'timeline', keywords: ['timeline', 'time', 'how long', 'how long does', 'how long will', 'duration', 'when', 'delivery', 'deadline', 'turnaround', 'take', 'weeks', 'months'], content: 'Simple websites: 1–2 weeks. Full web apps: 2–6 weeks. Exact timeline given after consultation.' },
    { name: 'navigation', keywords: ['navigate', 'menu', 'section', 'page', 'link', 'nav'], content: 'This is a single-page site. Use the navigation bar at the top to jump to sections: ' + knowledge.navLinks.join(', ') + '.' },
    { name: 'footer', keywords: ['footer', 'bottom', 'copyright', 'rights'], content: knowledge.footer },
    { name: 'experience', keywords: ['experience', 'how experienced', 'team', 'background', 'years'], content: 'The team has <strong>5+ years of experience</strong>, with <strong>50+ projects completed</strong> and <strong>30+ clients</strong> worked with.' },
    { name: 'technologies', keywords: ['technology', 'technologies', 'tech', 'tech stack', 'stack', 'tools', 'programming', 'language', 'framework', 'photoshop'], content: 'Frontend — HTML5, CSS3, JavaScript, React, Angular, Vue.js. Backend — Node.js, Python, PHP, Java, databases, APIs. DevOps/tools — Docker, Git, Linux, AWS, GitHub, CLI. Design — Photoshop (80% proficiency).' },
    { name: 'chatbot', keywords: ['chatbot', 'ai assistant', 'ai', 'assistant', 'bot', 'already'], content: 'Yes — a simple keyword-based JS assistant (bottom-right "AI Assistant" button) that answers questions about services, portfolio, testimonials, pricing, and contact by matching keywords to predefined content.' },
  ];

  var greetings = [
    { keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy'], reply: 'Hello! Welcome to ' + knowledge.siteName + '. I\'m your AI assistant. Ask me about services, portfolio, pricing, timelines, or anything on this site!' },
    { keywords: ['thank', 'thanks', 'appreciate', 'grateful'], reply: 'You\'re welcome! 😊 Feel free to ask anything else. I\'m here to help!' },
    { keywords: ['how are you', 'how do you do', 'how are you doing', 'how you doing', "how's it going", 'how is it going', 'you doing', 'how do you feel', 'how are things', "what's up"], reply: 'I\'m doing well, thanks for asking! How can I help you today?' },
    { keywords: ['bye', 'goodbye', 'see you', 'later', 'farewell'], reply: 'Goodbye! Thanks for visiting ' + knowledge.siteName + '. Come back anytime!' },
    { keywords: ['ok', 'okay'], reply: 'Sure.' },
  ];

  function getBestSection(msg) {
    var lower = msg.toLowerCase();
    var best = null;
    var bestScore = 0;

    for (var i = 0; i < sections.length; i++) {
      var score = 0;
      for (var k = 0; k < sections[i].keywords.length; k++) {
        if (lower.includes(sections[i].keywords[k])) {
          score++;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        best = sections[i];
      }
    }
    return bestScore > 0 ? best : null;
  }

  function getReply(msg) {
    var lower = msg.toLowerCase();

    for (var g = 0; g < greetings.length; g++) {
      for (var kg = 0; kg < greetings[g].keywords.length; kg++) {
        var word = greetings[g].keywords[kg];
        var regex = new RegExp('\\b' + word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
        if (regex.test(lower)) {
          return greetings[g].reply;
        }
      }
    }

    var section = getBestSection(msg);
    if (section) {
      return section.content;
    }

    if (lower.includes('what') || lower.includes('tell') || lower.includes('about')) {
      return 'I can tell you about our services, founder, experience, technologies, portfolio, pricing, timelines, client testimonials, flyer samples, contact info, and more. Just ask!';
    }

    return 'I\'m not sure I understand. Try asking about our services, founder, experience, technologies, portfolio, pricing, timelines, client testimonials, flyer samples, or contact info.';
  }

  function addMessage(text, type) {
    var div = document.createElement('div');
    div.className = 'chatbot-msg ' + type;
    div.innerHTML = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function handleSend() {
    var text = input.value.trim();
    if (!text) return;

    addMessage(escapeHtml(text), 'user');
    input.value = '';
    sendBtn.disabled = true;

    setTimeout(function () {
      var reply = getReply(text);
      addMessage(reply, 'bot');
      sendBtn.disabled = false;
    }, 400);
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  sendBtn.addEventListener('click', handleSend);

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  });

  /* ── Web Speech API (Voice Input) ── */
  var micBtn = document.getElementById('chatbot-mic');
  var recognition = null;
  var isListening = false;

  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (micBtn && SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function (e) {
      var transcript = e.results[0][0].transcript;
      input.value = '';
      addMessage(escapeHtml(transcript), 'user');
      sendBtn.disabled = true;
      setTimeout(function () {
        var reply = getReply(transcript);
        addMessage(reply, 'bot');
        sendBtn.disabled = false;
      }, 400);
      stopListening();
    };

    recognition.onerror = function () {
      stopListening();
    };

    recognition.onend = function () {
      stopListening();
    };

    function startListening() {
      if (isListening) return;
      isListening = true;
      micBtn.classList.add('listening');
      micBtn.innerHTML = '<i class="fas fa-circle"></i>';
      try { recognition.start(); } catch (e) { stopListening(); }
    }

    function stopListening() {
      isListening = false;
      micBtn.classList.remove('listening');
      micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
      try { recognition.stop(); } catch (e) {}
    }

    micBtn.addEventListener('click', function () {
      if (isListening) { stopListening(); return; }
      startListening();
    });
  } else if (micBtn) {
    micBtn.style.display = 'none';
  }
})();
