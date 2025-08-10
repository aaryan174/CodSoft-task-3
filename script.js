class Calculator {
    constructor() {
        this.expression = "";
        this.currentOperand = "0";
        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        // Number buttons
        document.querySelectorAll('.btn[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.dataset.number);
            });
        });

        // Operator buttons
        document.querySelectorAll('.btn[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                const action = button.dataset.action;
                switch(action) {
                    case 'add': this.appendOperator('+'); break;
                    case 'subtract': this.appendOperator('-'); break;
                    case 'multiply': this.appendOperator('*'); break;
                    case 'divide': this.appendOperator('/'); break;
                    case 'equals': this.compute(); break;
                    case 'clear': this.clear(); break;
                    case 'delete': this.delete(); break;
                    case 'percent': this.percentage(); break;
                }
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    appendNumber(number) {
        if (this.currentOperand === "0" && number !== ".") {
            this.currentOperand = number;
        } else {
            if (number === "." && this.currentOperand.includes(".")) return;
            this.currentOperand += number;
        }
        this.updateDisplay();
    }

    appendOperator(operator) {
        this.expression += this.currentOperand + operator;
        this.currentOperand = "0";
        this.updateDisplay();
    }

    compute() {
        try {
            let fullExp = this.expression + this.currentOperand;
            let result = Function(`"use strict"; return (${fullExp})`)();
            this.currentOperand = this.formatNumber(result);
            this.expression = "";
            this.updateDisplay();
        } catch {
            this.currentOperand = "Error";
            this.updateDisplay();
        }
    }

    clear() {
        this.currentOperand = "0";
        this.expression = "";
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand.length > 1) {
            this.currentOperand = this.currentOperand.slice(0, -1);
        } else {
            this.currentOperand = "0";
        }
        this.updateDisplay();
    }

    percentage() {
        let value = parseFloat(this.currentOperand);
        if (!isNaN(value)) {
            this.currentOperand = this.formatNumber(value / 100);
            this.updateDisplay();
        }
    }

    formatNumber(number) {
        return Number(number.toFixed(10)).toString();
    }

    updateDisplay() {
        document.getElementById('current-operand').textContent = this.currentOperand;
        document.getElementById('previous-operand').textContent = this.expression;
    }

    handleKeyboard(e) {
        if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
            this.appendNumber(e.key);
        } else if (e.key === "+") {
            this.appendOperator("+");
        } else if (e.key === "-") {
            this.appendOperator("-");
        } else if (e.key === "*") {
            this.appendOperator("*");
        } else if (e.key === "/") {
            this.appendOperator("/");
        } else if (e.key === "Enter" || e.key === "=") {
            e.preventDefault();
            this.compute();
        } else if (e.key === "Escape") {
            this.clear();
        } else if (e.key === "Backspace") {
            this.delete();
        } else if (e.key === "%") {
            this.percentage();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
