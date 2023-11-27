document.addEventListener('DOMContentLoaded', function () {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const scrollIcon = scrollTopBtn.querySelector('.scroll-icon');
  const pageHeroSection = document.querySelector('.page-header');

  let isScrollIconAnimating = false;

  window.addEventListener('scroll', function () {
    if (!isScrollIconAnimating) {
      const scrollOffset = pageHeroSection.offsetHeight; // Высота секции .page-hero
      const currentScroll =
        window.scrollY || document.documentElement.scrollTop;

      if (currentScroll > scrollOffset) {
        scrollTopBtn.style.display = 'block';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    }
  });

  scrollTopBtn.addEventListener('click', function () {
    if (!isScrollIconAnimating) {
      isScrollIconAnimating = true;

      scrollToTop(500); // Время анимации прокрутки в миллисекундах (здесь 500 мс)

      // Добавляем класс для анимации иконки
      scrollTopBtn.classList.add('scroll-icon-active');

      // Слушаем событие окончания анимации и возвращаем иконку в центр
      scrollIcon.addEventListener(
        'animationend',
        function animationEndHandler() {
          // Убираем класс после окончания анимации
          scrollTopBtn.classList.remove('scroll-icon-active');

          // Возвращаем иконку в центр
          scrollIcon.style.transform = 'translateY(0)';

          // Убираем флаг анимации
          isScrollIconAnimating = false;

          // Убираем обработчик события, чтобы избежать множественных вызовов
          scrollIcon.removeEventListener('animationend', animationEndHandler);
        }
      );
    }
  });

  // Добавляем обработчики для возвращения иконки в центр при наведении и фокусе
  scrollTopBtn.addEventListener('mouseenter', function () {
    if (!isScrollIconAnimating) {
      scrollIcon.style.transform = 'translateY(0)';
    }
  });

  scrollTopBtn.addEventListener('focus', function () {
    if (!isScrollIconAnimating) {
      scrollIcon.style.transform = 'translateY(0)';
    }
  });

  function scrollToTop(duration) {
    const start = window.pageYOffset;
    const startTime =
      'now' in window.performance ? performance.now() : new Date().getTime();

    function scroll() {
      const currentTime =
        'now' in window.performance ? performance.now() : new Date().getTime();
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, start, -start, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(scroll);
      }
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(scroll);
  }
});
