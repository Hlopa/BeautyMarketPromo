import $ from 'jquery';

document
  .querySelectorAll('.calculator input[type="range"]')
  .forEach(input => {
    input.addEventListener('input', event => {
      const applyResultTo = event.target.getAttribute('data-apply-result-to');
      if(!applyResultTo) return;

      document.querySelector(applyResultTo).value = event.target.value;
      renderSalary(getSalary());
    });
  })

document
  .querySelectorAll('.calculator input.range-holder')
  .forEach(input => {
    input.addEventListener('input', event => {
      const inputMin = parseInt(input.getAttribute('min'));
      const inputMax = parseInt(input.getAttribute('max'));

      if(isNaN(parseInt(event.data, 10)) && event.inputType !== 'deleteContentBackward')
        return input.value = input.value.slice(0, -1);

      if(input.value > inputMax || input.value < inputMin)
        return input.value = input.value.slice(0, -1);

      if(!input.value)
        input.value = 0;

      input.value = parseInt(input.value);
      input.parentNode.querySelector('input[type="range"]').value = input.value;

      renderSalary(getSalary());
    });
  });

function getSalary() {
  const entriesSalary = [];

  document
    .querySelectorAll('.calculator__entry')
    .forEach(entry => {
      let salary = null;

      entry
        .querySelectorAll('input:not([type="range"])')
        .forEach(input => {
          let inputValue = parseInt(input.value, 10);

          if(input.hasAttribute('data-percentage'))
            inputValue = inputValue / 100;

          salary = salary !== null ? salary * inputValue : inputValue;
        });

      entriesSalary.push(salary);
    });

  return entriesSalary.reduce((prev, curr) => prev + curr, 0);
}

function renderSalary(monthlySalary) {
  const monthlySalaryElement = document.querySelector('#calculator-monthly');
  const yearlySalaryElement = document.querySelector('#calculator-yearly');

  monthlySalaryElement.innerText = monthlySalary.toLocaleString() + ' ₽';
  yearlySalaryElement.innerText = (monthlySalary * 12).toLocaleString() + ' ₽';
}

renderSalary(getSalary());
