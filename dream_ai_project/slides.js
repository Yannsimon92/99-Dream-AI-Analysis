let current = 0;
    const total = 8;
    const track = document.getElementById('track');
    const counter = document.getElementById('counter');
    const dotsContainer = document.getElementById('dots');
    const hint = document.getElementById('hint');
    const slides = document.querySelectorAll('.slide');

    // Create dots
    for (let i = 0; i < total; i++) {
      const d = document.createElement('div');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(d);
    }

    function goTo(n) {
      if (n < 0) n = 0;
      if (n >= total) n = total - 1;
      current = n;

      track.style.transform = 'translateX(-' + (current * 100) + 'vw)';

      // Update counter
      const num = String(current + 1).padStart(2, '0');
      counter.textContent = num + ' / 08';

      // Update dots
      document.querySelectorAll('.dot').forEach((d, i) => {
        d.className = 'dot' + (i === current ? ' active' : '');
      });

      // Update active slide for animations
      slides.forEach((s, i) => {
        if (i === current) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });

      // Hide hint after first navigation
      hint.style.opacity = '0';
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goTo(current + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(current - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(total - 1);
      }
    });

    // Touch navigation
    let touchStartX = 0;
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
    document.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) goTo(current + 1);
        else goTo(current - 1);
      }
    });

    // Hide hint after 5 seconds
    setTimeout(() => { hint.style.opacity = '0'; }, 5000);