var angular = require('angular');

angular.module('calculatorApp')
    .controller('CalculatorCtrl', function CalculatorCtrl($scope, calculatorService) {
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

            $scope.result = calculatorService.calculate($scope.numbers, $scope.operators);

            $scope.numbers = [];
            $scope.operations = [];
            $scope.txt = $scope.result;
            $scope.currentNumber = $scope.result;
        };

        $scope.addToCurrentNumber = function(num) {
            if (num == 'x!') {
                $scope.currentNumber = $scope.currentNumber + "!";
                addNumber();
                $scope.txt += num.replace("x", "");
            } else if (num == '1/x') {
                var number = $scope.currentNumber;
                $scope.currentNumber = "1/" + $scope.currentNumber;
                addNumber();
                var str = $scope.txt;
                str = str.substring(0, str.lastIndexOf(number));
                $scope.txt = str + num.replace("x", number.toString());
            } else {
                $scope.txt += num;
                $scope.currentNumber += num;
            }
        };

        function addNumber() {
            var number = $scope.currentNumber;
            if (number) {
                $scope.numbers.push($scope.currentNumber);
                $scope.currentNumber = '';
                $scope.insertOperator = true;
            }
        };

        $scope.addOperator = function(operator) {
            addNumber();
            $scope.txt += operator;
            if ($scope.insertOperator) {
                $scope.operators.push(operator);
            } else {
                $scope.operators.pop();
                $scope.operators.push(operator);
            }
            $scope.insertOperator = false;
        };

        $scope.clearPreviousNumber = function(char) {
            $scope.currentNumber = '';
            $scope.txt += char;
        };

        $scope.quitCalculator = function() {
            window.close();
        };

        $scope.initialize();
    });
