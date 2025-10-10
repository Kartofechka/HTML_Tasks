const output = document.querySelector('#monitor .output p');
const buttons = document.querySelectorAll('#numbers button');

let expression = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === '⌫') {
      expression = expression.slice(0, -1);
      output.textContent = expression;
    }
    else if (value === 'C') {
      expression = '';
      output.textContent = '00000000';
    } else if (value === '=') {
      try {
        if (expression === '0^0'){
            expression = "Meow!";
            output.textContent = expression;
        }
        else {
        expression = expression.replace(/(\d+)\^(\d+)/g, (_, base, exp) => `Math.pow(${base},${exp})`);
        expression = expression.replace(/√(\d+(\.\d+)?)/g, (_, num) => `Math.sqrt(${num})`);
        expression = expression.replace(/(\d+(?:\.\d+)?)(\s*[-+]\s*)(\d+(?:\.\d+)?)%/g,(_, base, operator, percent) => `${base}${operator}(${base}*${percent}/100)`);
        expression = expression.replace(/(\d+(\.\d+)?)%/g, (_, num) => `(${num}/100)`);
        const result = Function('"use strict"; return (' + expression + ')')();
        output.textContent = result;
        expression = result.toString();
        }
    }
        catch (err) {
            output.textContent = 'Ошибка';
            expression = '';
            }
    } else {
      expression += value;
      output.textContent = expression;
    }
  });
});
