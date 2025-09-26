const { NotImplementedError } = require('../lib');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  const digits = String(n).split('');
  let max = 0;
  for (let i = 0; i < digits.length; i++) {
    const tempDigits = digits.slice();
    tempDigits.splice(i, 1);
    const number = parseInt(tempDigits.join(''), 10);
    if (number > max) {
      max = number;
    }
  }
  return max;
}

module.exports = {
  deleteDigit
};

