/**
 * Miles Slide Deck — navigation, fragments, speaker notes, syntax highlighting
 */
(function () {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.slide'));
  const progress = document.querySelector('.progress');
  const counter = document.querySelector('.slide-counter');
  let current = 0;
  let notesWindow = null;

  // ── Fragments ──────────────────────────────────

  function fragmentsOf(slide) {
    return Array.from(slide.querySelectorAll('.fragment'));
  }

  function visibleFragments(slide) {
    return fragmentsOf(slide).filter(f => f.classList.contains('visible'));
  }

  function hiddenFragments(slide) {
    return fragmentsOf(slide).filter(f => !f.classList.contains('visible'));
  }

  // ── Navigation ─────────────────────────────────

  function showSlide(index) {
    current = Math.max(0, Math.min(index, slides.length - 1));

    slides.forEach((s, i) => {
      s.classList.toggle('active', i === current);
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

    history.replaceState(null, '', '#' + (current + 1));
    updateNotes();
  }

  function navigate(index) {
    if (document.startViewTransition) {
      document.startViewTransition(function () { showSlide(index); });
    } else {
      showSlide(index);
    }
  }

  function next() {
    const hidden = hiddenFragments(slides[current]);
    if (hidden.length > 0) {
      hidden[0].classList.add('visible');
      return;
    }
    navigate(current + 1);
  }

  function prev() {
    const visible = visibleFragments(slides[current]);
    if (visible.length > 0) {
      visible[visible.length - 1].classList.remove('visible');
      return;
    }
    navigate(current - 1);
  }

  // ── Speaker Notes ──────────────────────────────

  function getNotesHTML(slide) {
    const aside = slide.querySelector('aside.notes');
    return aside ? aside.innerHTML : '<em>No notes for this slide.</em>';
  }

  function openNotesWindow() {
    if (notesWindow && !notesWindow.closed) {
      notesWindow.focus();
      updateNotes();
      return;
    }
    notesWindow = window.open('', 'speaker-notes', 'width=500,height=400');
    const doc = notesWindow.document;
    doc.write(`<!DOCTYPE html>
<html><head><title>Speaker Notes</title>
<style>
  body { font-family: 'DM Sans', system-ui, sans-serif; padding: 24px;
         background: #1a1a1a; color: #fbf0e5; line-height: 1.6; margin: 0; }
  .top-bar { display: flex; justify-content: space-between; align-items: center;
             padding: 16px 24px; border-bottom: 1px solid rgba(255,255,255,0.1); }
  h2 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;
       color: #ffd9a1; margin: 0; }
  #timer { font-family: 'DM Mono', monospace; font-size: 1.4rem; color: #78e8db; }
  #notes { font-size: 1.1rem; padding: 24px; }
  .timer-controls { display: flex; gap: 8px; align-items: center; }
  .timer-btn { background: none; border: 1px solid rgba(255,255,255,0.2);
               color: #fbf0e5; border-radius: 4px; padding: 4px 10px;
               cursor: pointer; font-size: 0.75rem; font-family: 'DM Sans', system-ui, sans-serif; }
  .timer-btn:hover { border-color: rgba(255,255,255,0.5); }
</style>
</head><body>
<div class="top-bar">
  <h2 id="heading">Slide 1 / ${slides.length}</h2>
  <div class="timer-controls">
    <span id="timer">00:00:00</span>
    <button class="timer-btn" id="resetBtn">Reset</button>
  </div>
</div>
<div id="notes"></div>
<script>
  var startTime = Date.now();
  var timerEl = document.getElementById('timer');
  function pad(n) { return n < 10 ? '0' + n : n; }
  function tick() {
    var elapsed = Math.floor((Date.now() - startTime) / 1000);
    var h = Math.floor(elapsed / 3600);
    var m = Math.floor((elapsed % 3600) / 60);
    var s = elapsed % 60;
    timerEl.textContent = pad(h) + ':' + pad(m) + ':' + pad(s);
  }
  setInterval(tick, 1000);
  document.getElementById('resetBtn').addEventListener('click', function() {
    startTime = Date.now();
    tick();
  });
</script>
</body></html>`);
    doc.close();
    updateNotes();
  }

  function updateNotes() {
    if (!notesWindow || notesWindow.closed) return;
    const doc = notesWindow.document;
    const heading = doc.getElementById('heading');
    const notes = doc.getElementById('notes');
    if (heading) heading.textContent = 'Slide ' + (current + 1) + ' / ' + slides.length;
    if (notes) notes.innerHTML = getNotesHTML(slides[current]);
  }

  // ── Present Button ──────────────────────────────

  function startPresentation() {
    document.documentElement.requestFullscreen().catch(() => {});
    openNotesWindow();
  }

  (function createPresentButton() {
    const btn = document.createElement('button');
    btn.className = 'present-btn';
    btn.textContent = 'Present';
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      startPresentation();
    });
    document.body.appendChild(btn);
  })();

  // ── Keyboard ───────────────────────────────────

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
        navigate(0);
        break;
      case 'End':
        e.preventDefault();
        navigate(slides.length - 1);
        break;
      case 'f':
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          toggleFullscreen();
        }
        break;
      case 's':
        if (!e.metaKey && !e.ctrlKey) {
          e.preventDefault();
          openNotesWindow();
        }
        break;
    }
  });

  // ── Touch ──────────────────────────────────────

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

  // ── Click ──────────────────────────────────────

  document.addEventListener('click', function (e) {
    if (e.target.closest('a, button')) return;
    const x = e.clientX / window.innerWidth;
    x > 0.5 ? next() : prev();
  });

  // ── Fullscreen ─────────────────────────────────

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  }

  // ── Syntax Highlighting ────────────────────────

  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }

  // ── Init ───────────────────────────────────────

  const hash = parseInt(location.hash.replace('#', ''), 10);
  showSlide(hash > 0 ? hash - 1 : 0);
})();
