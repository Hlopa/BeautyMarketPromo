import SmoothScroll from 'smooth-scroll';
import $ from 'jquery';

setTimeout(function () {
  const calculateOffset = () => {
    return $('.navbar').innerHeight();
  };

  const SCROLL_LINK = 'a[href*="#"]';
  let scroll = new SmoothScroll(SCROLL_LINK, {
    speed: 400,
    speedAsDuration: true,
    offset: calculateOffset(),
  });

  $(window).on('resize', (e) => {
    scroll.destroy();
    scroll = new SmoothScroll(SCROLL_LINK, {
      speed: 400,
      speedAsDuration: true,
      offset: calculateOffset(),
    });
  });
}, 1000);
export default scroll;
