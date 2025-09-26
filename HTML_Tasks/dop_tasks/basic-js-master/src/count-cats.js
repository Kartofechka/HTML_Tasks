const { NotImplementedError } = require('../lib');

/**
 * Given matrix where you have to find cats by ears "^^"
 *
 * @param {Array<Array>} matrix
 * @return {Number} count of cats found
 *
 * @example
 * countCats([
 *  [0, 1, '^^'],
 *  [0, '^^', 2],
 *  ['^^', 1, 2]
 * ]) => 3`
 *
 */
function countCats(matrix) {
  // Remove line below and write your code here
  let catsCounter = 0;
  for (let i = 0; i < matrix.length; i += 1){
    for ( let k = 0; k < matrix[i].length; k += 1){
      if (matrix[i][k] == '^^'){
        catsCounter += 1;}}}
  return catsCounter;
}

module.exports = {
  countCats
};
