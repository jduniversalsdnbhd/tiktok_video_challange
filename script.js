(function(){
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  function updateProgressBar() {
    const doc = document.documentElement;
    const scrollTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = pct + "%";
  }

  // Throttle using requestAnimationFrame for smooth updates
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgressBar();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateProgressBar);
  document.addEventListener('DOMContentLoaded', updateProgressBar);
  window.addEventListener('load', updateProgressBar);

  // initial set
  updateProgressBar();
})();

/* Countdown timer to competition start (2025-11-08 00:00 local) */
(function(){
  // target date (YYYY, M-1, D, h, m, s) - local time
  // Competition runs from 8th Nov to 23rd Nov 2025 — countdown should decrement until the end date.
  // Use end of day on 23rd Nov so the countdown shows the full last day: 2025-11-23 23:59:59
  const target = new Date(2025, 10, 23, 23, 59, 59); // Nov is month 10 (0-based)

  const elDays = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMins = document.getElementById('cd-mins');
  const elSecs = document.getElementById('cd-secs');
  if (!elDays || !elHours || !elMins || !elSecs) return;

  function pad(n){ return String(n).padStart(2,'0'); }

  function update() {
    const now = new Date();
    let diff = Math.max(0, Math.floor((target - now) / 1000));

    const days = Math.floor(diff / 86400);
    diff -= days * 86400;
    const hours = Math.floor(diff / 3600);
    diff -= hours * 3600;
    const mins = Math.floor(diff / 60);
    const secs = diff - mins * 60;

    // animate if value changed
    animateIfChanged(elDays, String(days));
    animateIfChanged(elHours, pad(hours));
    animateIfChanged(elMins, pad(mins));
    animateIfChanged(elSecs, pad(secs));

    if (target - now <= 0) {
      // reached target - optionally do something
      clearInterval(interval);
    }
  }

  function animateIfChanged(el, value){
    if (el.textContent !== value) {
      el.textContent = value;
      el.classList.add('pop');
      setTimeout(()=> el.classList.remove('pop'), 260);
    }
  }

  // initial update
  update();
  const interval = setInterval(update, 1000);
})();

/* Floating symbols generator: create decorative symbols on page enter */
(function(){
  const symbols = ['#','@','$','?','*','!','+','x'];
  const container = document.getElementById('floating-icons');
  if (!container) return;

  const count = 20; // number of symbols
  const vw = () => Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = () => Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'symbol';
    el.setAttribute('aria-hidden', 'true');
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];

    // random position, slightly inset so symbols aren't clipped
    const left = Math.random() * 100; // percent
    const top = Math.random() * 100; // percent
    el.style.left = left + 'vw';
    el.style.top = top + 'vh';

    // random size & float duration
    const size = 18 + Math.floor(Math.random() * 36); // 18..54px
    el.style.setProperty('--size', size + 'px');
    const dur = 8 + Math.random() * 12; // 8..20s
    el.style.setProperty('--dur', dur + 's');

    // stagger start so they don't all move in sync
    const delay = Math.random() * -10; // negative so some start mid-animation
    el.style.animationDelay = delay + 's';

    container.appendChild(el);
  }

  // regenerate on resize to keep positions reasonable
  window.addEventListener('resize', () => {
    // remove existing and recreate a few large screens only
    // keep it lightweight: do nothing for small resizes
  });
})();
