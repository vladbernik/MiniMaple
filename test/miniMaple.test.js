import { miniMaple } from '../src/miniMaple.js';
describe('miniMaple', () => {
  describe('extractCoeffVariablePower', () => {
    it('should extract coefficients, variables, and powers from a valid polynomial', () => {
      const expression = '2x^3 + 5y^2 - 4z';
      const result = miniMaple.extractCoeffVariablePower(expression);
      expect(result).toEqual([
        { coefficient: 2, variable: 'x', power: 3 },
        { coefficient: 5, variable: 'y', power: 2 },
        { coefficient: -4, variable: 'z', power: 1 },
      ]);
    });
    it('should handle coefficient with a positive value when not specified', () => {
      const expression = 'x';
      const result = miniMaple.extractCoeffVariablePower(expression);
      expect(result[0].coefficient).toBe(1);
    });
    it('should handle coefficient with a negative value when not specified', () => {
      const expression = '-x';
      const result = miniMaple.extractCoeffVariablePower(expression);
      expect(result[0].coefficient).toBe(-1);
    });

    it('should throw an error for invalid expressions', () => {
      const expression = '2x^3+5y^2-4z$';
      expect(() => miniMaple.extractCoeffVariablePower(expression)).toThrowError('Invalid operations in the polynomial');
    });
  });
  describe('miniMaple', () => {
    describe('extractCoeffVariablePower', () => {
      it('should throw an error for invalid matches', () => {
        const expression = '';
        const result = () => miniMaple.extractCoeffVariablePower(expression);
        expect(result).toThrowError('Invalid matches');
      });
    });
  });
  describe('differentiatePolynomial', () => {
    it('should differentiate a polynomial correctly', () => {
      const polynomial = [
        { coefficient: 2, variable: 'x', power: 3 },
        { coefficient: 5, variable: 'y', power: 2 },
        { coefficient: -4, variable: 'z', power: 1 },
      ];
      const diffVariable = 'x';
      const result = miniMaple.differentiatePolynomial(polynomial, diffVariable);
      expect(result).toEqual([
        { coefficient: 6, variable: 'x', power: 2 }
      ]);
    });
    it('should handle differentiation with power 0', () => {
      const polynomial = [{ coefficient: 2, variable: 'x', power: 0 }];
      const diffVariable = 'x';
      const result = miniMaple.differentiatePolynomial(polynomial, diffVariable);
      expect(result).toEqual([{ coefficient: 2, variable: 'x', power: 0 }]);
    });
    it('should return 0 when empty polynomial', () => {
      const polynomial = [];
      const diffVariable = 'x';
      const result = miniMaple.differentiatePolynomial(polynomial, diffVariable);
      expect(result).toBe(0);
    });
  });

  describe('polynomialToString', () => {
    it('should convert a polynomial to a string', () => {
      const polynomial = [
        { coefficient: 2, variable: 'x', power: 3 },
        //{ coefficient: 5, variable: 'y', power: 2 },
        //{ coefficient: -4, variable: 'z', power: 1 },
      ];
      const result = miniMaple.polynomialToString(polynomial);
      expect(result).toEqual('2x^3');
    });
    
    it('should add "+" before positive coefficient if not the first term', () => {
      const polynomial = [
        { coefficient: 2, variable: 'x', power: 3 },
        { coefficient: 5, variable: 'x', power: 1 },
      ];
      const diffVariable = 'x';
      const rest = miniMaple.differentiatePolynomial(polynomial, diffVariable)
      const result = miniMaple.polynomialToString(rest);
      expect(result).toBe('6x^2+5');
    });
  });
});
