/**
 * Unit tests for calculator service.
 * 
 * @file calculatorServiceSpec.js
 * @memberOf App
 * @author Harshit
 */

describe('CalculatorService', function() {

    var calculatorService;

    beforeEach(module('calculatorApp'));

    beforeEach(inject(function(_calculatorService_) {
        calculatorService = _calculatorService_;
    }));

    describe('calculate()', function() {
    	var numbers, operators;

    	beforeEach(function() {
    		numbers = [];
    		operators = [];
    	});

        it('should be defined', function() {
            expect(calculatorService.calculate).toBeDefined();
        });

        it('should have return 0 if no numbers and operators are provided', function() {
            var result = calculatorService.calculate(numbers, operators);
            expect(result).toEqual(0);
        });

        it('should have exucuted SumOperatorCommand using command pattern', function() {
        	numbers = ['3', '5'];
    		operators = ['+'];
            var result = calculatorService.calculate(numbers, operators);
            expect(result).toEqual(8);
        });

        it('should have exucuted SubtractOperatorCommand using command pattern', function() {
        	numbers = ['3', '5'];
    		operators = ['-'];
            var result = calculatorService.calculate(numbers, operators);
            expect(result).toEqual(-2);
        });

        it('should have exucuted MulOperatorCommand using command pattern', function() {
        	numbers = ['3', '5'];
    		operators = ['*'];
            var result = calculatorService.calculate(numbers, operators);
            expect(result).toEqual(15);
        });

        it('should have exucuted DivOperatorCommand using command pattern', function() {
        	numbers = ['6', '3'];
    		operators = ['/'];
            var result = calculatorService.calculate(numbers, operators);
            expect(result).toEqual(2);
        });

        it('should have exucuted FactorialOperatorCommand using command pattern', function() {
        	var numbers = ['5!'];
            var result = calculatorService.calculate(numbers, operators);
            expect(result).toEqual(120);
        });

        it('should have exucuted MulInverseOperatorCommand using command pattern', function() {
        	numbers = ['1/5'];
            var result = calculatorService.calculate(numbers, operators);
            expect(result).toEqual(0.2);
        });

        it('should have exucuted multiplication/division prior to summation/subtraction', function() {
        	numbers = ['6', '3', '6', '2', '4', '10', '8'];
    		operators = ['+', '-', '/', '+', '*', '/'];
            var result = calculatorService.calculate(numbers, operators);
            expect(result).toEqual(11);
        });

        it('should have undone last exucuted operation', function() {
        	numbers = ['2', '6', '3'];
    		operators = ['+', '/'];
            var result = calculatorService.calculate(numbers, operators);
            expect(result).toEqual(4);
            expect(result).not.toEqual(8/3);
        });
    });
})
