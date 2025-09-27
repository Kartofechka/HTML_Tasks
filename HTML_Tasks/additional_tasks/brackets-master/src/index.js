function check(str, bracketsConfig) {
  const stack = [];
  const openBrackets = [];
  const bracketPairs = {};
  for (const [open, close] of bracketsConfig) {
    openBrackets.push(open);
    bracketPairs[close] = open;
  }

  for (const char of str) {
    if (openBrackets.includes(char)) {
      const isSymmetric = bracketPairs[char] === char;
      if (isSymmetric) {
        if (stack[stack.length - 1] === char) {
          stack.pop();
        } else {
          stack.push(char);
        }
      } else {
        stack.push(char);
      }
    } else {
      const expectedOpen = bracketPairs[char];
      if (stack.pop() !== expectedOpen) {
        return false;
      }
    }
  }

  return stack.length === 0;
}


const config1 = [['(', ')']];
const config2 = [
  ['(', ')'],
  ['[', ']'],
];
const config3 = [
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
];
const config4 = [['|', '|']];
const config5 = [
  ['(', ')'],
  ['|', '|'],
];
const config6 = [
  ['1', '2'],
  ['3', '4'],
  ['5', '6'],
  ['7', '7'],
  ['8', '8'],
];
const config7 = [
  ['(', ')'],
  ['[', ']'],
  ['{', '}'],
  ['|', '|'],
];

console.log(check('|()|(||)||', config5))
console.log(check('111115611111111222288888822225577877778775555666677777777776622222', config6))