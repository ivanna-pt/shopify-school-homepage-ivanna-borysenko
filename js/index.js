const currentYear = new Date().getFullYear();
document.getElementById('copyrightYear').innerText = currentYear;

function setupAccordion(containerSelector, itemSelector, contentSelector) {
  const accordions = document.querySelectorAll(containerSelector);
  accordions.forEach(accordion => {
    const items = accordion.querySelectorAll(itemSelector);
    items.forEach(item => {
      const content = accordion.querySelector(contentSelector);
      item.addEventListener('click', () => {
        document.querySelectorAll(itemSelector).forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.closest(containerSelector).classList.remove('open');
            const otherContent = otherItem.closest(containerSelector).querySelector(contentSelector);
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });

        toggleAccordion(accordion, content);
      });
    });
  });
}

function toggleAccordion(header, content) {
  const isOpen = header.classList.contains('open');

  header.classList.toggle('open', !isOpen);
  content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
}

setupAccordion('.footer-menu', '.footer-nav-title', '.footer-nav-list');
setupAccordion('.question-item', '.question-title', '.answer-text');