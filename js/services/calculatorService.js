var angular = require('angular');

angular.module('calculatorApp')
    .service('calculatorService', function() {
        'use strict';

        class MulOperatorCommand {
            constructor(num1, num2) {
                this._num1 = num1;
                this._num2 = num2;
            }
            execute() {
                return this._num1 * this._num2;
            }
        }

        class DivOperatorCommand {
            constructor(num1, num2) {
                this._num1 = num1;
                this._num2 = num2;
            }
            execute() {
                return this._num1 / this._num2;
            }
        }

        class SumOperatorCommand {
            constructor(num1, num2) {
                this._num1 = num1;
                this._num2 = num2;
            }
            execute() {
                return this._num1 + this._num2;
            }
        }

        class SubtractOperatorCommand {
            constructor(num1, num2) {
                this._num1 = num1;
                this._num2 = num2;
            }
            execute() {
                return this._num1 - this._num2;
            }
        }

        class FactorialOperatorCommand {
            constructor(num) {
                this._num = num;
            }
            execute() {
                return _getFactorial(this._num);
            }
        }

        class SelfDivOperatorCommand {
            constructor(num) {
                this._num = num;
            }
            execute() {
                return 1 / this._num;
            }
        }

        class Calculator {
            constructor() {
                this._sum = 0;
                this._commands = [];
            }
            execute(command) {
                this._sum = command.execute();
            }
            storeAndExecute(command) {
                this._commands.push(command);
                this._sum = command.execute();
            }
        }

        this.calculate = function(numbers, operators) {

            var calculator = new Calculator();

            if (operators.length == numbers.length) {
                var op = operators.shift();
                if (op == '-') {
                    var num = numbers.shift();
                    num = _getNumber([num]);
                    numbers.unshift('-' + num);
                }
            }

            if ((operators.length == 0 && numbers.length > 0) || (numbers.length == 1)) {
                return _getNumber(numbers);
            }

            var num1 = _getNumber(numbers);
            var num2 = _getNumber(numbers);
            _createStoreAndExecuteCommand(calculator, num1, num2, numbers, operators);

            while (operators.length > 0) {

                num1 = calculator._sum;
                num2 = _getNumber(numbers);
                _createStoreAndExecuteCommand(calculator, num1, num2, numbers, operators);
            }

            return calculator._sum;
        }

        function _createStoreAndExecuteCommand(calculator, num1, num2, numbers, operators) {
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
                    var num = _undoPreviousCommand(calculator, numbers, operators);
                    if (num) {
                        command = new MulOperatorCommand(num, num2);
                        numbers.push(command.execute());
                    } else {
                        command = new MulOperatorCommand(num1, num2);
                        calculator.storeAndExecute(command);
                    }
                    break;
                case '/':
                    var num = _undoPreviousCommand(calculator, numbers, operators);
                    if (num) {
                        command = new DivOperatorCommand(num, num2);
                        numbers.push(command.execute());
                    } else {
                        command = new DivOperatorCommand(num1, num2);
                        calculator.storeAndExecute(command);
                    }
                    break;
            }
        }

        function _undoPreviousCommand(calculator, numbers, operators) {
            var prevNumber;
            if (calculator._commands.length > 0) {
                var command = calculator._commands.pop();
                switch (command.constructor) {
                    case SumOperatorCommand:
                        operators.push('+');
                        prevNumber = command._num2;
                        command = new SubtractOperatorCommand(calculator._sum, command._num2);
                        calculator.execute(command);
                        break;
                    case SubtractOperatorCommand:
                        operators.push('-');
                        prevNumber = command._num2;
                        command = new SumOperatorCommand(calculator._sum, command._num2);
                        calculator.execute(command);
                        break;
                }
            }
            return prevNumber;
        }

        function _getFactorial(n) {
            if (n == 0 || n == 1) {
                return 1;
            }
            return n * _getFactorial(n - 1);
        };

        function _getNumber(numbers) {
            var number = numbers.shift();
            if (isNaN(number)) {
                if (number.includes('!')) {
                    var num = parseInt(number.replace('!', ''));
                    var command = new FactorialOperatorCommand(num);
                    number = command.execute();
                } else if (number.includes('/')) {
                    var num = parseFloat(number.replace('1/', ''));
                    var command = new SelfDivOperatorCommand(num);
                    number = command.execute();
                } else {
                    number = 0;
                }
            }
            return parseFloat(number);
        }

    });
