function reverse(n) {
  if (n < 0){
    n *= -1;
  }
  let Num = String(n)
    .split('')
    .reverse()
    .join('');
  return Number(Num);
};

console.log(reverse(-192))