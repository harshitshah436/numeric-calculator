/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular = require('angular');

angular.module('calculatorApp')
    .controller('CalculatorCtrl', function CalculatorCtrl($scope) {
        'use strict';

        $scope.initialize = function() {
            $scope.txt = '';
            $scope.numbers = [];
            $scope.operators = [];
            $scope.insertOperator = true;
            $scope.insertNumber = false;
            $scope.currentNumber = '';
        };

        $scope.calculate = function() {

            if ($scope.currentNumber) {
                addNumber();
            }

            var sum = 0;

            while ($scope.operators.length > 0) {
                var right = $scope.numbers.pop();
                if (isNaN(right)) {
                    right = 0;
                }
                var left = $scope.numbers.pop();
                if (isNaN(left)) {
                    left = 0;
                }

                var op = $scope.operators.pop();
                sum += calc(left, right, op);

            }

            $scope.result = sum;
            $scope.numbers = [];
            $scope.operations = [];
            $scope.txt = $scope.result;
            $scope.currentNumber = $scope.result;
        };

        $scope.addToCurrentNumber = function(num) {
            if (num == 'x!') {
                var number = getFactorial(parseInt($scope.currentNumber));
                console.log("factorial of " + $scope.currentNumber + " : " + number);
                $scope.currentNumber = '';
                addNumber();
            }
            $scope.txt += num;
            $scope.currentNumber += num;
        };

        function getFactorial(n) {
            if (n == 0 || n == 1) {
                return 1;
            }
            return n * getFactorial(n - 1);
        };

        function addNumber() {
            console.log("Adding Number: " + $scope.currentNumber);
            $scope.numbers.push(parseInt($scope.currentNumber));
            $scope.currentNumber = '';
            $scope.insertOperator = true;
        };

        $scope.addOperator = function(operator) {
            addNumber();
            console.log("adding operator" + operator);
            console.log("insert Oparator flag" + $scope.insertOperator);
            $scope.txt += operator;
            if ($scope.insertOperator) {
                $scope.operators.push(operator);
            } else {
                $scope.operators.pop();
                $scope.operators.push(operator);
            }
            $scope.insertOperator = false;

        }

        function calc(lhs, rhs, op) {
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

        $scope.initialize();
    });
