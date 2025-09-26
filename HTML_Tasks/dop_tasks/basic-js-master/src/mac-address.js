
/**
 * The MAC-48 address is six groups of two hexadecimal digits (0 to 9 or A to F),
 * separated by hyphens.
 *
 * Your task is to check by given string inputString
 * whether it's a MAC-48 address or not.
 *
 * @param {Number} inputString
 * @return {Boolean}
 *
 * @example
 * For 00-1B-63-84-45-E6, the output should be true.
 *
 */
function isMAC48Address(n) {
  const parts = n.split("-");
  if (parts.length !== 6) return false;
  for (let part of parts) {
    if (part.length !== 2) return false;
    for (let char of part) {
      const isDigit = char >= '0' && char <= '9';  
      const isChar = char >= 'a' && char <= 'z'; 
      const isChar_ = char >= 'A' && char <= 'Z';
      if (!isDigit && !isChar && !isChar_) {
        return false;
      }
    }
  }
  return true;
}

console.log(isMAC48Address("00-1B-63-84-45-E6"))
console.log(isMAC48Address("00-Not-Ma-c-29-45"))
