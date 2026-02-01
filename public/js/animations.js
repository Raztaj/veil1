document.addEventListener('DOMContentLoaded', () => {
  const bodyEl = document.body;

  // Page Load Animation
  window.addEventListener('load', () => {
    bodyEl.classList.add('loaded');
  });

  // Fallback for page load if window.load takes too long
  setTimeout(() => {
    if (!bodyEl.classList.contains('loaded')) {
      bodyEl.classList.add('loaded');
    }
  }, 2000);

  // Handle bfcache (back button issue)
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      bodyEl.classList.remove('unloading');
      if (!bodyEl.classList.contains('loaded')) {
        bodyEl.classList.add('loaded');
      }
    }
  });

  // Page Transition Handling
  const internalLinks = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Respect modifier keys (Ctrl, Shift, Meta) or middle-clicks
      if (e.ctrlKey || e.shiftKey || e.metaKey || e.button !== 0) {
        return;
      }

      // Only handle links that are on the same domain and not the language toggle
      if (href && !href.startsWith('#') && link.id !== 'lang-toggle') {
        e.preventDefault();
        bodyEl.classList.add('unloading');
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      }
    });
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, we can stop observing this element
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
});
