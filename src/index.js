function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    console.log(expr)
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

    const exprArr = expr.replace(/\s+/g, '').match(/[^-+*/()]+|[^]/g);
    console.log(exprArr)

    let evaluate = (exprArr) => {
        let stack = [];
        let digits = []
        let exitStr = '';


    exprArr.forEach(element => {
        if(/\d/.test(element)) {
            digits.push(element);        
        } else if (priorityOperators[stack[stack.length - 1]] < priorityOperators[element]) {
            stack.push(element);
        } else {
            while (priorityOperators[element] <= priorityOperators[stack[stack.length - 1]]) {
                let lastOperation = stack.pop();
                digits.push(operators[lastOperation](digits.pop(), digits.pop()));
            }
        stack.push(element);
        }
        console.log(digits)
    });

        while (stack.length > 0) {
            let lastOperation = stack.pop();
            
           
            digits.push(operators[lastOperation](digits.pop(), digits.pop()));
        }
        
        console.log(digits, 4)
        console.log(stack, 5)
        return digits.pop();
    }
    
    return evaluate(exprArr);
    
}

module.exports = {
    expressionCalculator
}
