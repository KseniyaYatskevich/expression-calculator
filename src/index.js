function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const operators = {
        '+': (y, x) => +x + +y,
        '-': (y, x) => x - y,
        '*': (y, x) => x * y,
        '/': (y, x) => {
            if(y == 0) throw new Error("TypeError: Division by zero.");
            else return x / y},
    };
    const priorityOperators = {
        '+': 0,
        '-': 0,
        '*': 1,
        '/': 1,
    };

    const stack = [];
    const digits = [];  

    const exprArr = expr.replace(/\s+/g, '').match(/[^-+*/()]+|[^]/g);

    function checkedBrackets(exprArr) {
        const openBraket = exprArr.filter(item => item ==='(');
        const closeBraket = exprArr.filter(item => item ===')');
        if (openBraket.length !== closeBraket.length) throw new Error("ExpressionError: Brackets must be paired");
    }

    function count() {
        let lastOperation = stack.pop();
        digits.push(operators[lastOperation](digits.pop(), digits.pop()));
    }   

    function evaluate(exprArr) {
        checkedBrackets(exprArr)
        exprArr.forEach(element => {
            if(/\d/.test(element)) {
                digits.push(element);        
            } else if (priorityOperators[stack[stack.length - 1]] < priorityOperators[element]) {
                stack.push(element);
            } else if (element === '(') {
                stack.push(element);
            } else if (element === ')') {
                while (stack[stack.length-1] !== '(') {
                    count();
                }
                stack.pop();
            } else {
                while (priorityOperators[element] <= priorityOperators[stack[stack.length - 1]]) {
                    count();
                }
            stack.push(element);
            }           
        });

        while (stack.length > 0) {
            count();
        }
        
        return digits.pop();
    }
    
    return evaluate(exprArr);   
}

module.exports = {
    expressionCalculator
}
