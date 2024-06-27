let displayValue = '0'; // Initial value displayed on calculator screen
let currentOperator = ''; // Variable to store the current operator
let accumulator = 0; // Variable to accumulate calculations

// Function to update the display with user input
function appendToDisplay(value) {
    if (value === '.' && displayValue.includes('.')) {
        return; // Only one decimal point allowed
    }
    
    if (displayValue === '0' && value !== '.') {
        displayValue = value;
    } else {
        displayValue += value;
    }
    
    document.getElementById('display').innerText = displayValue;
}

// Function to clear the display and reset variables
function clearDisplay() {
    displayValue = '0';
    currentOperator = '';
    accumulator = 0;
    document.getElementById('display').innerText = displayValue;
}

// Function to perform calculations based on currentOperator
function calculate() {
    let result;
    const currentValue = parseFloat(displayValue);
    
    if (isNaN(currentValue)) {
        return; // Exit if current value is not a number
    }
    
    switch (currentOperator) {
        case '+':
            result = accumulator + currentValue;
            break;
        case '-':
            result = accumulator - currentValue;
            break;
        case '*':
            result = accumulator * currentValue;
            break;
        case '/':
            if (currentValue === 0) {
                result = 'Error'; // Handle division by zero
            } else {
                result = accumulator / currentValue;
            }
            break;
        default:
            result = currentValue;
            break;
    }
    
    displayValue = result.toString();
    document.getElementById('display').innerText = displayValue;
    accumulator = result; // Set accumulator to result for chaining operations
    currentOperator = ''; // Reset operator
}

// Event listener to handle calculator button clicks
document.querySelectorAll('.calculator button').forEach(button => {
    const buttonText = button.innerText;
    
    if (!isNaN(buttonText) || buttonText === '.') {
        button.addEventListener('click', () => {
            appendToDisplay(buttonText);
        });
    } else if (buttonText === 'C') {
        button.addEventListener('click', clearDisplay);
    } else if (buttonText === '=') {
        button.addEventListener('click', calculate);
    } else {
        button.addEventListener('click', () => {
            if (currentOperator !== '') {
                calculate(); // Automatically perform calculation on chaining operations
            }
            currentOperator = buttonText;
            accumulator = parseFloat(displayValue);
            displayValue = '0'; // Reset display for next input
        });
    }
});
