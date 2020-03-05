function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    console.log(expr)
    const operators = {
        '+': (x, y) => +x + +y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => {
            if(y===0) return new Error();
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
        // let exitStr = '';
        exprArr.forEach(element => {
            if(/\d/.test(element)) {
                if(stack.length !== 0) {
                    stack.push(operators[stack.pop()](digits.pop(), element));
                } else digits.push(element);
            }
             else {
                
                stack.push(element);
                // exitStr='';
            } 
        });
        console.log(digits, 4)
        console.log(stack, 5)
        return stack.pop();
    }

    // console.log(stack, 1);
    return evaluate(exprArr);
    // for(let i=0; i<exprArr.length; i++) {
    //     if(/\d/.test(exprArr[i])) {
    //         console.log(exprArr[i],1)
    //         digits.push(Number(exprArr[i]));            
    //     }
    // // }
    // console.log(digits)
    
    // let evaluate = (expr) => {
    //     let stack = [];
        
    //     expr.split('').forEach((token) => {
    //         if (token in operators) {
    //             let [y, x] = [stack.pop(), stack.pop()];
    //             stack.push(operators[token](x, y));
    //         } else {
    //             stack.push(parseFloat(token));
    //         }
    //     });
    
    //     console.log(stack.pop());
    //     return stack.pop();
    // };
    // return evaluate;
    
}

module.exports = {
    expressionCalculator
}