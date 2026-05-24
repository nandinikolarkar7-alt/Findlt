// Get the display element
const display = document.getElementById('display');

// Append number to display
function appendNumber(num) {
    if (display.value === '0' && num !== '.') {
        display.value = num;
    } else if (num === '.' && display.value.includes('.')) {
        return; // Prevent multiple decimal points
    } else {
        display.value += num;
    }
}

// Append operator to display
function appendOperator(operator) {
    if (display.value === '') {
        return; // Don't allow operator as first input
    }
    
    // Prevent consecutive operators
    const lastChar = display.value[display.value.length - 1];
    if (['+', '-', '×', '÷', '%'].includes(lastChar)) {
        return;
    }
    
    display.value += operator;
}

// Calculate the result
function calculate() {
    try {
        // Replace display symbols with JavaScript operators
        let expression = display.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/−/g, '-');
        
        // Validate expression
        if (expression === '' || /[+\-*/%.]\s*$/.test(expression)) {
            return;
        }
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Display result, rounded to avoid floating-point errors
        display.value = Math.round(result * 100000000) / 100000000;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '0';
        }, 1500);
    }
}

// Clear the display
function clearDisplay() {
    display.value = '0';
}

// Delete last character
function deleteLast() {
    if (display.value === '0') {
        return;
    }
    
    if (display.value.length === 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

// Support keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (/[0-9.]/.test(key)) {
        appendNumber(key);
    } else if (key === '+') {
        appendOperator('+');
    } else if (key === '-') {
        appendOperator('−');
    } else if (key === '*') {
        appendOperator('×');
    } else if (key === '/') {
        event.preventDefault();
        appendOperator('÷');
    } else if (key === '%') {
        appendOperator('%');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    } else if (key === 'c' || key === 'C') {
        clearDisplay();
    }
});

// Initialize display
window.addEventListener('load', function() {
    display.value = '0';
});
