/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular = require('angular');

angular.module('calculatorApp')
	.service('calculatorService', function () {
		'use strict';

		this.calculate = function(numbers, operators) {
			var sum = 0;

			while (operators.length > 0) {
                var right = numbers.pop();
                if (isNaN(right)) {
                    right = 0;
                }
                var left = numbers.pop();
                if (isNaN(left)) {
                    left = 0;
                }

                var op = operators.pop();
                sum += _calc(left, right, op);

            }
            return sum;
		}

		this.getFactorial = function (n) {
            if (n == 0 || n == 1) {
                return 1;
            }
            return n * this.getFactorial(n - 1);
        };

		function _calc(lhs, rhs, op) {
            console.log("Calculation: " + lhs + " " + op + rhs);
            var result = 0;
            switch (op) {
                case '+':
                    result = lhs + rhs;
                    break;
                case '-':
                    result = lhs - rhs;
                    break;
                case '*':
                    result = lhs * rhs;
                    break;
                case '/':
                    result = lhs / rhs;
                    break;


            }
            return result;
        }
	});
