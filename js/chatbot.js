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
    about: extractText('#about .section-desc'),
    services: extractAllText('.service-card h3').map(function (h, i) {
      var descs = extractAllText('.service-card p');
      return h + ': ' + (descs[i] || '');
    }),
    portfolioItems: extractAllText('.portfolio-item h3'),
    testimonials: extractAllText('.testimonial p'),
    testimonialAuthors: extractAllText('.testimonial cite'),
    blogPosts: extractAllText('.blog-card h3'),
    blogDescs: extractAllText('.blog-card p'),
    contactDesc: extractText('#contact .section-title'),
    navLinks: extractAllText('.nav-link'),
    logo: extractText('.logo'),
    footer: extractText('.footer p')
  };

  var sections = [
    { name: 'home', keywords: ['home', 'hero', 'top', 'tagline', 'landing'], content: 'Hero section: "' + knowledge.tagline + '" — ' + knowledge.heroDesc },
    { name: 'founder', keywords: ['founder', 'emmanuel', 'wiafe', 'who founded', 'who own', 'who run', 'who started', 'who created', 'who is behind', 'owner'], content: 'The founder of Elite Web &amp; Graphics is <strong>Emmanuel Wiafe</strong>. He is passionate about creating memorable brand experiences that help businesses stand out in today\'s digital world.' },
    { name: 'about', keywords: ['about', 'story', 'background', 'mission', 'company', 'agency'], content: knowledge.about },
    { name: 'services overview', keywords: ['service', 'offer', 'do', 'provide', 'what do'], content: 'We offer: ' + knowledge.services.join('; ') + '.' },
    { name: 'graphic design', keywords: ['graphic', 'design', 'logo', 'brand', 'identity', 'paint', 'visual'], content: knowledge.services[0] || 'Graphic design services including logo design, branding, social media graphics, and print materials.' },
    { name: 'web development', keywords: ['web', 'website', 'site', 'development', 'e-commerce', 'ecommerce', 'shop', 'online store'], content: knowledge.services[1] || 'Web development services including responsive websites, e-commerce platforms, and custom web applications.' },
    { name: 'mobile app', keywords: ['mobile', 'app', 'application', 'android', 'ios', 'iphone', 'phone app', 'native', 'cross-platform'], content: knowledge.services[2] || 'Mobile app development: native and cross-platform applications built for performance, usability, and scale.' },
    { name: 'portfolio', keywords: ['portfolio', 'project', 'work', 'past', 'previous', 'example', 'showcase', 'sample'], content: 'Our portfolio includes projects like: ' + knowledge.portfolioItems.join(', ') + '.' },
    { name: 'testimonials', keywords: ['testimonial', 'review', 'client', 'say', 'feedback', 'recommend', 'rating'], content: 'Client testimonials: ' + knowledge.testimonials.map(function (t, i) { return '"' + t + '" — ' + (knowledge.testimonialAuthors[i] || ''); }).join(' ') },
    { name: 'blog', keywords: ['blog', 'article', 'post', 'news', 'latest', 'trend', 'read'], content: 'Our latest blog posts: ' + knowledge.blogPosts.map(function (t, i) { return t + ' — ' + (knowledge.blogDescs[i] || ''); }).join(' | ') },
    { name: 'contact', keywords: ['contact', 'reach', 'email', 'phone', 'call', 'message', 'form', 'get in touch', 'quote'], content: 'You can reach us through the contact form on this page. Fill in your name, email, select a service, and provide project details. We also have a WhatsApp chat button at the bottom-right corner.' },
    { name: 'pricing', keywords: ['price', 'cost', 'pricing', 'how much', 'rate', 'fee', 'charge', 'budget', 'afford'], content: 'Pricing depends on your project scope. Please use the contact form or WhatsApp to tell us about your project, and we will provide a tailored quote.' },
    { name: 'timeline', keywords: ['timeline', 'time', 'how long', 'duration', 'when', 'delivery', 'deadline', 'turnaround'], content: 'Timelines vary by project. A simple website may take 1-2 weeks, while a full mobile app can take 4-8 weeks. We will give you a clear timeline during our consultation.' },
    { name: 'navigation', keywords: ['navigate', 'menu', 'section', 'page', 'link', 'nav'], content: 'This is a single-page site. Use the navigation bar at the top to jump to sections: ' + knowledge.navLinks.join(', ') + '.' },
    { name: 'footer', keywords: ['footer', 'bottom', 'copyright', 'rights'], content: knowledge.footer },
  ];

  var greetings = [
    { keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy'], reply: 'Hello! Welcome to ' + knowledge.siteName + '. I\'m your AI assistant. Ask me anything about our services, portfolio, or anything on this site!' },
    { keywords: ['thank', 'thanks', 'appreciate', 'grateful'], reply: 'You\'re welcome! 😊 Feel free to ask anything else. I\'m here to help!' },
    { keywords: ['bye', 'goodbye', 'see you', 'later', 'farewell'], reply: 'Goodbye! Thanks for visiting ' + knowledge.siteName + '. Come back anytime!' },
    { keywords: ['help', 'what can you', 'what do you'], reply: 'I can answer questions about anything on this website — our services, portfolio, testimonials, blog posts, pricing, contact info, and more. Just ask!' },
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
        if (lower.includes(greetings[g].keywords[kg])) {
          return greetings[g].reply;
        }
      }
    }

    var section = getBestSection(msg);
    if (section) {
      var reply = 'Here\'s what I found about <strong>' + section.name + '</strong>:<br>' + section.content;
      if (section.name === 'contact') {
        reply += '<br><br>💬 Or tap the green WhatsApp button to chat with us directly!';
      }
      return reply;
    }

    if (lower.includes('what') || lower.includes('tell') || lower.includes('about')) {
      return 'I can tell you about: <strong>' + sections.map(function (s) { return s.name; }).join('</strong>, <strong>') + '</strong>. Just ask!';
    }

    return 'I\'m not sure I understand. Try asking about: <strong>' + sections.map(function (s) { return s.name; }).join('</strong>, <strong>') + '</strong>.';
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
})();
