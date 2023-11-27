// Визначте функцію для плавного переходу
function scrollToSection(sectionId) {
  document.querySelector(sectionId).scrollIntoView({
    behavior: 'smooth',
  });
}

// Навігація по якорям
document.querySelector('ul').addEventListener('click', function (event) {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    var sectionId = event.target.getAttribute('href');
    scrollToSection(sectionId);
  }
});
