function towelSort(matrix) {
  const result = [];
  for (let i = 0; i < matrix.length; i++) {
    row = i % 2 === 0 ? matrix[i] : matrix[i].slice().reverse();
    result.push(...row);
  }
  return result;
}

console.log(towelSort([[1, 2, 4], [5, 6, 7, 8], [9, 12],]))