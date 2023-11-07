class miniMaple {
  static extractCoeffVariablePower(expression) {
    const invalidOperators = expression.match(/[^+\-\*\^0-9a-zA-Z\s]/);
      if (invalidOperators) {
        throw new Error("Invalid operations in the polynomial");
      }
      
    const terms = expression.split(/(?=[+-])/);
  
    const regex = /([+-]?(?:\d*(?:\.\d+)?)|(?:\w+))\*?(\w+)(?:\^(\d+))?/;
    
    const monomials = terms.map(term => {
      const cleanedTerm = term.replace(/\s/g, '');  
  
      const matches = cleanedTerm.match(regex);
        if (!matches) {
          throw new Error("Invalid matches");
        } 
          
        let coefficient = parseInt(matches[1]); 
        if (isNaN(coefficient)) {
          coefficient = parseInt(matches[1] === '-' ? -1 : 1);
        }
        const variable = matches[2];
        const power = parseInt(matches[3]) || 1; 
        return {
        coefficient,
        variable,
        power,
      };
    });
  
    return monomials;
  }
  static differentiatePolynomial(polynomial, diffVariable) {
    let derivative = [];
    let nonMatchingTermsCount = 0; 
  
    for (let i = 0; i < polynomial.length; i++) {
      let term = polynomial[i];
      let coefficient = term.coefficient;
      let variable = term.variable;
      let power = term.power;
  
      if (diffVariable && variable.includes(diffVariable)) {
        if (power > 1) {
          coefficient *= power;
          power -= 1;
        } else {
          derivative.push({ coefficient: term.coefficient, variable, power: 0 });
          continue; 
        }
        derivative.push({ coefficient, variable, power });
      } else {
        nonMatchingTermsCount++;
      }
    }
    if (nonMatchingTermsCount === polynomial.length) {
      return 0; 
    }
    return derivative;
  }
  
  
  static polynomialToString(polynomial) {
    let polynomialStr = '';
    for (let i = 0; i < polynomial.length; i++) {
      let term = polynomial[i];
      let coefficient = term.coefficient;
      let variable = term.variable;
      let power = term.power;
  
      if (coefficient !== 0) {
        if (i > 0 && coefficient > 0) {
          polynomialStr += '+';
        }
  
        if (coefficient !== 1 || power === 0) {
          polynomialStr +=  coefficient;
        }
  
        if (power > 0) {
          polynomialStr += variable;
          if (power > 1) {
            polynomialStr += '^' + power;
          }
        } 
    }
    
    }
    return polynomialStr;
  }
}
export {miniMaple};

// Пример использования


// Пример использования
// const expression1 = "In)";
// const expression2 = "5*x^6+5*x^2";
// const poly = miniMaple.extractCoeffVariablePower(expression2)
// console.log(poly); 
// const diffVariable = 'x';

// const derivative = miniMaple.differentiatePolynomial(poly, diffVariable);
// console.log(derivative);
// console.log(miniMaple.polynomialToString(derivative));
