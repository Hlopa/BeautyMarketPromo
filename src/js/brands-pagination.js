const MAX_ELEMENTS_PER_PAGE = 16;
const BREAKPOINT_TO_ENABLE_PAGINATION = 991;

const brandsList = document.querySelector('.brands__list');
const brandsLogos = brandsList.querySelectorAll('.brands__item');
const pageButtons = document.querySelectorAll('.brands .pagination__page');

let currentPage = 1;
let maxPage = (brandsLogos.length / MAX_ELEMENTS_PER_PAGE) + 1;

function renderPagination() {
  pageButtons.forEach(button => {
    button.classList.remove('pagination__page--active');
  })
  pageButtons[currentPage - 1].classList.add('pagination__page--active');

  if(window.matchMedia(`(max-width: ${BREAKPOINT_TO_ENABLE_PAGINATION}px)`).matches) {
    brandsLogos.forEach((logo, index) => {
      if(index >= ((currentPage - 1) * MAX_ELEMENTS_PER_PAGE) && index < (currentPage * MAX_ELEMENTS_PER_PAGE)) {
        logo.style.display = 'flex';
      } else {
        logo.style.display = 'none';
      }
    });
  } else {
    brandsLogos.forEach((logo) => logo.style.display = 'flex');
  }
}

renderPagination();
window.addEventListener('resize', renderPagination);

document
  .querySelector('.brands .pagination__arrow--left')
  .addEventListener('click', event => {
    event.preventDefault();
    if(currentPage < 2) return;
    currentPage--;

    renderPagination();
  });

document
  .querySelector('.brands .pagination__arrow--right')
  .addEventListener('click', event => {
    event.preventDefault();
    if(currentPage >= maxPage - 1) return;
    currentPage++;

    renderPagination();
  });

document
  .querySelectorAll('.brands .pagination__page')
  .forEach((pageButton, pageIndex) => {
    pageButton.addEventListener('click', event => {
      currentPage = pageIndex + 1;
      renderPagination();

      event.preventDefault();
    });
  });
