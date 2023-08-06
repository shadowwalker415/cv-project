'strict mode';

// Implementing smooth scroll on nav links

const navSmoothScroll = function () {
  // Selecting main nav element
  const mainNav = document.querySelector('.main-nav');

  // Implementing event delegation on the main nav element
  mainNav.addEventListener('click', e => {
    // preventing the default link behavior on click
    e.preventDefault();

    // edge case check
    if (!e.target.classList.contains('link-item')) return;

    // getting the target element
    const navLink = e.target;

    const navLinkHref = navLink.attributes[0].value.slice(1);
    const scrollToElement = document.getElementById(`${navLinkHref}`);
    scrollToElement.scrollIntoView({ behavior: 'smooth' });
  });
};

// Preventing default link behaviour on click for card link btns and hero link btns
const preventingDefault = function () {
  const btnLinks = document.querySelectorAll('.link-btn');
  btnLinks.forEach(btn =>
    btn.addEventListener('click', e => {
      e.preventDefault();
    })
  );
};

// Accordtion functionality with event delegation
const displayAccordionText = function () {
  const accordionContainer = document.querySelector('.accordion');
  accordionContainer.addEventListener('click', e => {
    // Edge case check
    if (!e.target.classList.contains('accordion-icon')) return;
    const accordionBtn = e.target.parentElement;
    const accordionText = accordionBtn.parentElement.nextElementSibling;
    if (accordionBtn.classList.contains('open-accordion')) {
      accordionBtn.classList.remove('open-accordion');
      accordionBtn.classList.add('close-accordion');
      accordionText.classList.remove('open');
      accordionText.classList.add('closed');
    } else {
      accordionBtn.classList.remove('close-accordion');
      accordionBtn.classList.add('open-accordion');
      accordionText.classList.remove('closed');
      accordionText.classList.add('open');
    }
  });
};

navSmoothScroll();
preventingDefault();
displayAccordionText();
