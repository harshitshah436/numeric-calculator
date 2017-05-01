/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular = require('angular');

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

            var sum = calculatorService.calculate($scope.numbers, $scope.operators);

            $scope.result = sum;
            $scope.numbers = [];
            $scope.operations = [];
            $scope.txt = $scope.result;
            $scope.currentNumber = $scope.result;
        };

        $scope.addToCurrentNumber = function(num) {
            if (num == 'x!') {
                var number = $scope.currentNumber;
                $scope.currentNumber = calculatorService.getFactorial(parseInt(number));
                addNumber();
                $scope.txt += num.replace("x", "");
            } else if(num == '1/x') {
            	var number = $scope.currentNumber;
            	$scope.currentNumber = 1/number;
            	addNumber();
            	var str = $scope.txt;
            	str = str.substring(0, str.lastIndexOf(number));
                $scope.txt = str + num.replace("x", number.toString());
            }else {
            	$scope.txt += num;
            	$scope.currentNumber += num;
            }
        };

        function addNumber() {
        	var number = $scope.currentNumber;
        	if(number) {
        		$scope.numbers.push(parseInt($scope.currentNumber));
            $scope.currentNumber = '';
            $scope.insertOperator = true;
        	}
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
        };

        $scope.clearPreviousNumber = function (char) {
        	$scope.currentNumber = '';
        	$scope.txt += char;
        };

        // $scope.allClear = function() {
        // 	$scope.initialize();
        // };

        $scope.quitCalculator = function() {
        	window.close();
        };

        $scope.initialize();
    });
