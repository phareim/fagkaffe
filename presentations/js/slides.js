/**
 * Miles Slide Deck — minimal keyboard/touch/click navigation
 */
(function () {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.slide'));
  const progress = document.querySelector('.progress');
  const counter = document.querySelector('.slide-counter');
  let current = 0;

  function fragmentsOf(slide) {
    return Array.from(slide.querySelectorAll('.fragment'));
  }

  function visibleFragments(slide) {
    return fragmentsOf(slide).filter(f => f.classList.contains('visible'));
  }

  function hiddenFragments(slide) {
    return fragmentsOf(slide).filter(f => !f.classList.contains('visible'));
  }

  function showSlide(index) {
    current = Math.max(0, Math.min(index, slides.length - 1));

    slides.forEach((s, i) => {
      s.classList.toggle('active', i === current);
      // Reset fragments on non-active slides
      if (i !== current) {
        fragmentsOf(s).forEach(f => f.classList.remove('visible'));
      }
    });

    if (progress) {
      const pct = slides.length > 1 ? (current / (slides.length - 1)) * 100 : 100;
      progress.style.width = pct + '%';
    }

    if (counter) {
      counter.textContent = (current + 1) + ' / ' + slides.length;
    }

    // Update URL hash without scrolling
    history.replaceState(null, '', '#' + (current + 1));
  }

  function next() {
    // If current slide has hidden fragments, reveal next one
    const hidden = hiddenFragments(slides[current]);
    if (hidden.length > 0) {
      hidden[0].classList.add('visible');
      return;
    }
    showSlide(current + 1);
  }

  function prev() {
    // If current slide has visible fragments, hide last one
    const visible = visibleFragments(slides[current]);
    if (visible.length > 0) {
      visible[visible.length - 1].classList.remove('visible');
      return;
    }
    showSlide(current - 1);
  }

  // Keyboard navigation
  document.addEventListener('keydown', function (e) {
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        next();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        prev();
        break;
      case 'Home':
        e.preventDefault();
        showSlide(0);
        break;
      case 'End':
        e.preventDefault();
        showSlide(slides.length - 1);
        break;
      case 'f':
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          toggleFullscreen();
        }
        break;
    }
  });

  // Touch support
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  });

  document.addEventListener('touchend', function (e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
    }
  });

  // Click to advance (right half) / go back (left half)
  document.addEventListener('click', function (e) {
    // Ignore clicks on links and buttons
    if (e.target.closest('a, button')) return;
    const x = e.clientX / window.innerWidth;
    x > 0.5 ? next() : prev();
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  }

  // Init from hash
  const hash = parseInt(location.hash.replace('#', ''), 10);
  showSlide(hash > 0 ? hash - 1 : 0);
})();
