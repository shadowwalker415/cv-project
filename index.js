'strict mode';

// Implementing smooth scroll functionality on nav links

const navSmoothScroll = function (className) {
  if (!typeof className === 'string') return;
  // Selecting main nav element
  const mainNav = document.querySelector(`.${className}`);

  mainNav.addEventListener('click', event => {
    // preventing the default link behavior on click
    event.preventDefault();

    // edge case check
    if (!event.target.classList.contains('link-item')) return;

    // getting the target element
    const navLink = event.target;

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
    btn.addEventListener('click', event => {
      event.preventDefault();
    })
  );
};

// Accordtion functionality with event delegation
const displayAccordionText = function (className) {
  if (!typeof className === 'string') return;
  const accordionContainer = document.querySelector(`.${className}`);
  accordionContainer.addEventListener('click', event => {
    // Edge case check
    if (!event.target.classList.contains('accordion-icon')) return;
    const accordionBtn = event.target.parentElement;
    const accordionText = accordionBtn.parentElement.nextElementSibling;
    if (accordionBtn.classList.contains('open-accordion')) {
      accordionBtn.classList.remove('open-accordion');
      accordionBtn.classList.add('close-accordion');
      accordionText.classList.remove('open-textbox');
      accordionText.classList.add('close-textbox');
    } else {
      accordionBtn.classList.remove('close-accordion');
      accordionBtn.classList.add('open-accordion');
      accordionText.classList.remove('close-textbox');
      accordionText.classList.add('open-textbox');
    }
  });
};

// Sticky Nav functionality
const stickyNav = function (elClassName, parent) {
  // Where elClassName argument will be  class hero-section
  // And parent will be the body tag
  if (!typeof elClassName === 'string') return 'elClassName must be string';
  const observedEl = document.querySelector(`.${elClassName}`);
  // The . is not used for selecting the parent because the body element is
  // is not a class selector.
  const parentEl = document.querySelector(`${parent}`);
  if (!observedEl && !parentEl) return;

  // Implementing the callback for the intersection observer
  const obsever = new IntersectionObserver(
    entry => {
      [currentEntry] = entry;
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
  heroBtnContainer.addEventListener('click', event => {
    if (!event.target.classList.contains(`${btnClassName}`)) return;
    const targetBtn = event.target;
    const targetHref = targetBtn.attributes[0].value.slice(1);
    const sectionEl = document.getElementById(`${targetHref}`);
    sectionEl.scrollIntoView({
      behavior: 'smooth',
    });
  });
};

// URL check helper function for the checkProjectLink function
const checkUrl = function (url) {
  const baseUrl = `${url}`;
  const newUrl = new URL(baseUrl);
  const validUrl = newUrl.href;
  console.log(validUrl);
  return validUrl;
};

// Implementing link url  check
const checkProjectLink = function (className, validUrl) {
  if (!typeof className === 'string') return;
  const cardsContainer = document.querySelector(`.${className}`);
  if (!cardsContainer) return;
  console.log(cardsContainer);
  const bodyEl = cardsContainer.offsetParent;
  cardsContainer.addEventListener('click', event => {
    if (!event.target.classList.contains('link-btn')) return;
    const cardBtn = event.target;
    if (validUrl === cardBtn.href) {
      window.open(`${cardBtn.href}`, 'newTab');
    }
  });
};

// Implementing mobile navigation functionality
const displayMobileNav = function (btnCl, openNav) {
  if (!typeof className === 'string') return;
  const mobileNavBtn = document.querySelector(`.${btnCl}`);
  if (!mobileNavBtn) return;
  mobileNavBtn.addEventListener('click', event => {
    const mobileBtn = event.currentTarget;
    const header = mobileBtn.parentElement;
    header.classList.toggle(`${openNav}`);
  });
};

heroBtnScroll('hero-btn-container', 'link-btn');
stickyNav('hero-section', 'body');
navSmoothScroll('main-nav');
preventLinkDefault('link-btn');
displayAccordionText('accordion');
displayMobileNav('mobile-nav-btn', 'open-nav');
checkProjectLink(
  'cards-container',
  checkUrl('https://github.com/shadowwalker415?tab=repositories')
);
