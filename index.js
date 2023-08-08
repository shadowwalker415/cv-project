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
const preventLinkDefault = function (className) {
  if (!typeof className === 'string') return;
  const btnLinks = document.querySelectorAll(`.${className}`);
  if (!btnLinks) return;
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

// Sticky Nav functionality
const stickyNav = function (elClassName, parent) {
  // Where elClassName argument will be  class hero-section
  // And parent will be the body tag
  console.log(typeof elClassName);
  if (!typeof elClassName === 'string') return 'elClassName must be string';
  const observedEl = document.querySelector(`.${elClassName}`);
  const parentEl = document.querySelector(`${parent}`);
  if (!observedEl && !parentEl) return;

  // Implementing the callback for the intersection observer
  const obsever = new IntersectionObserver(
    entry => {
      [currentEntry] = entry;
      // console.log(currentEntry);
      if (currentEntry.isIntersecting === false) {
        parentEl.classList.add('sticky');
      } else {
        parentEl.classList.remove('sticky');
      }
    },
    {
      root: null,
      rootMargin: '-8px',
    }
  );

  // calling the observer
  obsever.observe(observedEl);
};

// Implementing smooth scroll on both hero btns with event delegation
const heroBtnScroll = function (parentClass, btnClassName) {
  //Where parentClass should be the class name of the parent container
  // btnClass name should be the class name of the bnt links

  if (!typeof parentClass === 'string' && !typeof btnClassName === 'string')
    return;
  const heroBtnContainer = document.querySelector(`.${parentClass}`);
  if (!heroBtnContainer) return;
  heroBtnContainer.addEventListener('click', e => {
    if (!e.target.classList.contains(`${btnClassName}`)) return;
    // console.log(e.target);
    const targetBtn = e.target;
    const targetHref = targetBtn.attributes[0].value.slice(1);
    const sectionEl = document.getElementById(`${targetHref}`);
    sectionEl.scrollIntoView({
      behavior: 'smooth',
    });
  });
};

heroBtnScroll('btn-container', 'link-btn');
stickyNav('hero-section', 'body');
navSmoothScroll();
preventLinkDefault('link-btn');
displayAccordionText();
