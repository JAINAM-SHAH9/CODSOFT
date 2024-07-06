let display = document.getElementById('display');
let buttons = document.querySelectorAll('button');
let operator = '';
let num1 = '';
let num2 = '';
let resultDisplayed = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        let buttonText = button.textContent;

        if (buttonText === 'AC') {
            display.value = '0';
            operator = '';
            num1 = '';
            num2 = '';
            resultDisplayed = false;
        } else if (buttonText === '=' && operator !== '') {
            num2 = display.value;
            let result = calculate(num1, operator, num2);
            display.value = result;
            operator = '';
            num1 = '';
            num2 = '';
            resultDisplayed = true;
        } else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {
            if (operator !== '') {
                num2 = display.value;
                let result = calculate(num1, operator, num2);
                display.value = result;
                num1 = result;
            } else {
                num1 = display.value;
            }
            operator = buttonText;
            display.value = operator;
            resultDisplayed = false;
        } else if (buttonText === '+/-') {
            display.value = parseFloat(display.value) * -1;
        } else if (buttonText === '%') {
            display.value = parseFloat(display.value) / 100;
        } else if (buttonText === '.') {
            if (!display.value.includes('.')) {
                display.value += buttonText;
            }
        } else {
            if (resultDisplayed) {
                display.value = buttonText;
                resultDisplayed = false;
            } else {
                if (display.value === '0' || display.value === operator) {
                    display.value = buttonText;
                } else {
                    display.value += buttonText;
                }
            }
        }
    });
});

function calculate(num1, operator, num2) {
    let result = 0;

    switch (operator) {
        case '+':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case '-':
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case '*':
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case '/':
            result = parseFloat(num1) / parseFloat(num2);
            break;
    }

    // Check if result is an integer or a decimal
    if (result % 1 === 0) {
        return result.toString(); // return integer as string
    } else {
        return result.toFixed(2); // return decimal with 2 places
    }
}