/**
 * Performs actual operations. It also uses command pattern to perform 
 * operations for given calculations.
 * 
 * @file calculatorService.js
 * @member CalculatorService
 * @memberOf App
 * @type {angular.Service}
 * @author Harshit
 */

var angular = require('angular');

angular.module('calculatorApp')
    .service('calculatorService', function() {
        'use strict';

        /**
         * This class executes and returns multiplication of given two numbers.
         * 
         * @class MulOperatorCommand
         * @memberOf CalculatorService
         */
        class MulOperatorCommand {
            /** @constructs */
            constructor(num1, num2) {
                this._num1 = num1;
                this._num2 = num2;
            }
            execute() {
                return this._num1 * this._num2;
            }
        }

        /**
         * This class executes and returns division of given two numbers.
         * 
         * @class DivOperatorCommand
         * @memberOf CalculatorService
         */
        class DivOperatorCommand {
            /** @constructs */
            constructor(num1, num2) {
                this._num1 = num1;
                this._num2 = num2;
            }
            execute() {
                return this._num1 / this._num2;
            }
        }

        /**
         * This class executes and returns summation of given two numbers.
         * 
         * @class SumOperatorCommand
         * @memberOf CalculatorService
         */
        class SumOperatorCommand {
            /** @constructs */
            constructor(num1, num2) {
                this._num1 = num1;
                this._num2 = num2;
            }
            execute() {
                return this._num1 + this._num2;
            }
        }

        /**
         * This class executes and returns subtraction of given two numbers.
         * 
         * @class SubtractOperatorCommand
         * @memberOf CalculatorService
         */
        class SubtractOperatorCommand {
            /** @constructs */
            constructor(num1, num2) {
                this._num1 = num1;
                this._num2 = num2;
            }
            execute() {
                return this._num1 - this._num2;
            }
        }

        /**
         * This class executes and returns a factorial of a given number.
         * 
         * @class FactorialOperatorCommand
         * @memberOf CalculatorService
         */
        class FactorialOperatorCommand {
            /** @constructs */
            constructor(num) {
                this._num = num;
            }
            execute() {
                return _getFactorial(this._num);
            }
        }

        /**
         * This class executes and returns a multiplicative inverse of a given 
         * number.
         * 
         * @class MulInverseOperatorCommand
         * @memberOf CalculatorService
         */
        class MulInverseOperatorCommand {
            /** @constructs */
            constructor(num) {
                this._num = num;
            }
            execute() {
                return 1 / this._num;
            }
        }

        /**
         * The main class of command pattern. It stores operator commands and 
         * execute them to get the result.
         * 
         * @class Calculator
         * @memberOf CalculatorService
         */
        class Calculator {
            /** @constructs */
            constructor() {
                this._result = 0;
                this._commands = [];
            }
            execute(command) {
                this._result = command.execute();
            }
            storeAndExecute(command) {
                this._commands.push(command);
                this._result = command.execute();
            }
        }

        /**
         * Creates commands, stores them to get executed previous commands and 
         * executes commands.
         *
         * @function calculate
         * @memberOf CalculatorService
         * @param  {array} numbers   array of entered numbers
         * @param  {array} operators array of operators
         * @return {number}          returns the result of all calculation.
         */
        this.calculate = function(numbers, operators) {

            var calculator = new Calculator();

            // Handle first negative number and remove the operator accordingly
            if (operators.length == numbers.length) {
                var op = operators.shift();
                if (op == '-') {
                    var num = numbers.shift();
                    num = _getNumber([num]);
                    numbers.unshift('-' + num);
                }
            }

            if (operators.length == 0) {
                return _getNumber(numbers);
            }

            var num1 = _getNumber(numbers);
            var num2 = _getNumber(numbers);
            _createStoreAndExecuteTheCommand(calculator, num1, num2, numbers, operators);

            while (operators.length > 0) {
                num1 = calculator._result;
                num2 = _getNumber(numbers);
                _createStoreAndExecuteTheCommand(calculator, num1, num2, numbers, operators);
            }

            return calculator._result;
        };

        /**
         * Returns factorial of a given number.
         *
         * @function _getNumber
         * @memberOf CalculatorService
         * @param  {array} numbers string array of numbers
         * @return {number}   	   first number from an array.
         */
        function _getNumber(numbers) {
            var number = numbers.shift();
            if (isNaN(number)) {
                if (number.includes('!')) {
                    var num = parseInt(number.replace('!', ''));
                    var command = new FactorialOperatorCommand(num);
                    number = command.execute();
                } else if (number.includes('/')) {
                    var num = parseFloat(number.replace('1/', ''));
                    var command = new MulInverseOperatorCommand(num);
                    number = command.execute();
                } else {
                    number = 0;
                }
            }
            return parseFloat(number);
        }

        /**
         * Creates a command from a first operator for a given two numbers. 
         * Store the command and execute it using calculator class object.
         *
         * @function _createStoreAndExecuteTheCommand
         * @memberOf CalculatorService
         * @param  {object} calculator object of a calculator class
         * @param  {number} num1   	 first number
         * @param  {number} num2     second number
         * @param  {array} numbers   array of numbers
         * @param  {array} operators array of operators
         */
        function _createStoreAndExecuteTheCommand(calculator, num1, num2, numbers, operators) {
            var op = operators.shift();

            var command;
            switch (op) {
                case '+':
                    command = new SumOperatorCommand(num1, num2);
                    calculator.storeAndExecute(command);
                    break;
                case '-':
                    command = new SubtractOperatorCommand(num1, num2);
                    calculator.storeAndExecute(command);
                    break;
                case '*':
                    var num = _undoLastExecutedCommand(calculator, numbers, operators);
                    if (num) {
                        command = new MulOperatorCommand(num, num2);
                        numbers.unshift(command.execute()); //insert at 0 index
                    } else {
                        command = new MulOperatorCommand(num1, num2);
                        calculator.storeAndExecute(command);
                    }
                    break;
                case '/':
                    var num = _undoLastExecutedCommand(calculator, numbers, operators);
                    if (num) {
                        command = new DivOperatorCommand(num, num2);
                        numbers.unshift(command.execute()); //insert at 0 index
                    } else {
                        command = new DivOperatorCommand(num1, num2);
                        calculator.storeAndExecute(command);
                    }
                    break;
            }
        }

        /**
         * This function undoes last executed command using stored commands 
         * from calculator object and update stored result respectively. It 
         * only undoes if last command is 'sum' or 'subtract'.
         *
         * @function _undoLastExecutedCommand
         * @memberOf CalculatorService
         * @param  {object} calculator object of a calculator class
         * @param  {array} numbers     array of numbers
         * @param  {array} operators   array of operators
         * @return {number}            previous number
         */
        function _undoLastExecutedCommand(calculator, numbers, operators) {
            var prevNumber;
            if (calculator._commands.length > 0) {
                var command = calculator._commands.pop();
                switch (command.constructor) {
                    case SumOperatorCommand:
                        operators.unshift('+');
                        prevNumber = command._num2;
                        command = new SubtractOperatorCommand(calculator._result, command._num2);
                        calculator.execute(command);
                        break;
                    case SubtractOperatorCommand:
                        operators.unshift('-');
                        prevNumber = command._num2;
                        command = new SumOperatorCommand(calculator._result, command._num2);
                        calculator.execute(command);
                        break;
                }
            }
            return prevNumber;
        }

        /**
         * Returns factorial of a given number.
         *
         * @function _getFactorial
         * @memberOf CalculatorService
         * @param  {number} n given number
         * @return {number}   factorial of n.
         */
        function _getFactorial(n) {
            if (n == 0 || n == 1) {
                return 1;
            }
            return n * _getFactorial(n - 1);
        }

    });
