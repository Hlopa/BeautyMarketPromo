HTMLElement.prototype.index = function(element) {
  return [...element.parentNode.children].indexOf(element)
}

HTMLElement.prototype.siblings = function(element) {
  return Array.from(element.parentNode.children).filter(el => el !== element);
}

/**
 * Plural forms for russian words
 * @param  {Integer} count quantity for word
 * @param  {Array} words Array of words. Example: ['депутат', 'депутата', 'депутатов'], ['коментарий', 'коментария', 'комментариев']
 * @return {String} plural form for word
 */
export function pluralize(count, words) {
  var cases = [2, 0, 1, 1, 1, 2];
  return words[ (count % 100 > 4 && count % 100 < 20) ? 2 : cases[ Math.min(count % 10, 5)] ];
}
