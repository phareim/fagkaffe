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

  // Track which slide indices have visible fragments so we only clear those
  var dirtySlides = new Set();

  function showSlide(index) {
    current = Math.max(0, Math.min(index, slides.length - 1));

    // Reset fragments only on slides that actually have visible ones
    dirtySlides.forEach(function (idx) {
      if (idx !== current) {
        fragmentsOf(slides[idx]).forEach(function (f) { f.classList.remove('visible'); });
        dirtySlides.delete(idx);
      }
    });

    slides.forEach(function (s, i) {
      s.classList.toggle('active', i === current);
    });

    if (progress) {
      var pct = slides.length > 1 ? (current / (slides.length - 1)) * 100 : 100;
      progress.style.width = pct + '%';
    }

    if (counter) {
      counter.textContent = (current + 1) + ' / ' + slides.length;
    }

    history.replaceState(null, '', '#' + (current + 1));
    updateNotes();
  }

  function next() {
    var hidden = hiddenFragments(slides[current]);
    if (hidden.length > 0) {
      hidden[0].classList.add('visible');
      dirtySlides.add(current);
      return;
    }
    showSlide(current + 1);
  }

  function prev() {
    var visible = visibleFragments(slides[current]);
    if (visible.length > 0) {
      visible[visible.length - 1].classList.remove('visible');
      if (visibleFragments(slides[current]).length === 0) {
        dirtySlides.delete(current);
      }
      return;
    }
    showSlide(current - 1);
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

  // ── Scaling ────────────────────────────────────

  function scaleSlides() {
    var scale = Math.min(
      window.innerWidth / 1280,
      window.innerHeight / 720
    );
    document.documentElement.style.setProperty('--slide-scale', scale);
  }

  var _rafScale;
  window.addEventListener('resize', function () {
    cancelAnimationFrame(_rafScale);
    _rafScale = requestAnimationFrame(scaleSlides);
  });
  scaleSlides();

  // ── Syntax Highlighting ────────────────────────

  if (typeof hljs !== 'undefined') {
    hljs.highlightAll();
  }

  // ── Poll Slides ────────────────────────────────

  // Derive presentation slug from the HTML filename (e.g. "ai-agile" from "ai-agile.html")
  const PRESENTATION_SLUG = location.pathname.split('/').pop().replace(/\.html?$/, '') || 'unknown';
  const POLL_BASE_URL = location.origin;

  let pollInterval = null;
  const pollUUIDs = new Map(); // slug → uuid (cached after first register call)

  function getPollSlug(slide) {
    return slide.dataset.poll || null;
  }

  function injectPollUI(slide, slug) {
    const inner = slide.querySelector('.slide-inner');
    if (!inner || inner.querySelector('.poll-widget')) return;

    const pollUrl = `${POLL_BASE_URL}/poll?p=${encodeURIComponent(PRESENTATION_SLUG)}`;

    const widget = document.createElement('div');
    widget.className = 'poll-widget';
    widget.innerHTML = `
      <div class="poll-qr-col">
        <div class="poll-qr-box" id="poll-qr-${slug}"></div>
        <p class="poll-qr-url">${POLL_BASE_URL.replace(/^https?:\/\//, '')}/poll</p>
      </div>
      <div class="poll-results-col">
        <p class="poll-results-label">Live resultater</p>
        <div class="poll-bars" id="poll-bars-${slug}">
          <p class="poll-loading">Venter på stemmer...</p>
        </div>
        <p class="poll-total" id="poll-total-${slug}">0 stemmer</p>
      </div>
    `;
    inner.appendChild(widget);

    if (typeof QRCode !== 'undefined') {
      try {
        new QRCode(document.getElementById(`poll-qr-${slug}`), {
          text: pollUrl,
          width: 180,
          height: 180,
          colorDark: '#ffffff',
          colorLight: '#004047',
          correctLevel: QRCode.CorrectLevel.M,
        });
      } catch (e) { /* ignore */ }
    }
  }

  async function fetchAndRenderResults(uuid, slug) {
    const barsEl = document.getElementById(`poll-bars-${slug}`);
    const totalEl = document.getElementById(`poll-total-${slug}`);
    if (!barsEl) return;

    try {
      const res = await fetch(`/api/results?poll_id=${encodeURIComponent(uuid)}`);
      if (!res.ok) return;
      const data = await res.json();

      const { options, total, breakdown } = data;
      if (!options || options.length === 0) return;

      totalEl.textContent = total === 1 ? '1 stemme' : `${total} stemmer`;

      barsEl.innerHTML = options.map(opt => {
        const count = breakdown[opt] || 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return `
          <div class="poll-bar-row">
            <span class="poll-bar-label">${escHtml(opt)}</span>
            <div class="poll-bar-track">
              <div class="poll-bar-fill" style="width:${pct}%"></div>
            </div>
            <span class="poll-bar-pct">${pct}%</span>
            <span class="poll-bar-count">${count}</span>
          </div>`;
      }).join('');
    } catch (e) { /* network error — silently ignore */ }
  }

  function escHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function startPollRefresh(uuid, slug) {
    stopPollRefresh();
    fetchAndRenderResults(uuid, slug);
    pollInterval = setInterval(() => fetchAndRenderResults(uuid, slug), 3000);
  }

  function stopPollRefresh() {
    if (pollInterval) {
      clearInterval(pollInterval);
      pollInterval = null;
    }
  }

  async function registerAndStartPoll(slide, slug) {
    injectPollUI(slide, slug);

    // Use cached UUID on revisit — skip re-registration
    if (pollUUIDs.has(slug)) {
      startPollRefresh(pollUUIDs.get(slug), slug);
      return;
    }

    // Read question from the first h2 inside slide-inner
    const inner = slide.querySelector('.slide-inner');
    const h2 = inner && inner.querySelector('h2');
    const question = h2 ? h2.textContent.trim() : slug;

    // Parse options from data-poll-options attribute
    let options;
    try {
      options = JSON.parse(slide.dataset.pollOptions || '[]');
    } catch (e) {
      options = [];
    }

    if (options.length < 2) return;

    try {
      const res = await fetch('/api/polls/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ presentation: PRESENTATION_SLUG, slug, question, options }),
      });
      if (!res.ok) return;
      const poll = await res.json();
      if (!poll || !poll.id) return;
      pollUUIDs.set(slug, poll.id);
      startPollRefresh(poll.id, slug);
    } catch (e) { /* network error — silently ignore */ }
  }

  // Patch showSlide to handle poll activation/deactivation
  (function patchShowSlide() {
    const origShowSlide = showSlide;
    showSlide = function (index) {
      origShowSlide(index);
      stopPollRefresh();
      const slide = slides[current];
      const slug = getPollSlug(slide);
      if (slug) {
        registerAndStartPoll(slide, slug);
      }
    };
  })();

  // ── Init ───────────────────────────────────────

  const hash = parseInt(location.hash.replace('#', ''), 10);
  showSlide(hash > 0 ? hash - 1 : 0);
})();
