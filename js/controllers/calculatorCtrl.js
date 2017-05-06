/**
 * Controls caclulator inputs and binds data between model and view.
 * 
 * @file calculatorCtrl.js
 * @member CalculatorCtrl
 * @memberOf App
 * @type {angular.Controller}
 * @author Harshit
 */

var angular = require('angular');

angular.module('calculatorApp')
    .controller('CalculatorCtrl', function CalculatorCtrl($scope, calculatorService) {
        'use strict';

        /**
         * Initialize/clear all $scope/model variables.
         *
         * @function initialize
         * @memberOf CalculatorCtrl
         */
        $scope.initialize = function() {
            $scope.userInput = '';
            $scope.numbers = [];
            $scope.operators = [];
            $scope.insertOperator = true;
            $scope.insertNumber = false;
            $scope.currentNumber = '';
            $scope.result = null;
        };

        /**
         * Calculates the entered operations and shows result.
         *
         * @function calculate
         * @memberOf CalculatorCtrl

         */
        $scope.calculate = function() {

            if ($scope.currentNumber) {
                addNumber();
            }

            if ($scope.numbers.length == 0 && $scope.operators.length == 0) {
                return;
            }

            $scope.result = calculatorService.calculate($scope.numbers, $scope.operators);

            // reset arrays and store resulted sum, user input.
            $scope.numbers = [];
            $scope.operations = [];
            $scope.currentNumber = $scope.result;
            if (!($scope.userInput.lastIndexOf(")") == $scope.userInput.length - 1)) {
                $scope.userInput = "(" + $scope.userInput + ")";
            }
        };

        /**
         * Formats current input string and adds into a string to display to 
         * the user. It also handles when a number greater than 10 is entered 
         * because each time user presses a key this function will be called.
         *
         * @function addToCurrentNumber
         * @memberOf CalculatorCtrl
         * @param {string} num pressed key by a user
         */
        $scope.addToCurrentNumber = function(num) {
            if (num == "x!") { // change 'x!' to '5!' if 5 & x! entered
                $scope.currentNumber = $scope.currentNumber + "!";
                addNumber();
                $scope.userInput += num.replace("x", "");
            } else if (num == "1/x") { // change '1/x' to '1/2' if 2 & 1/x entered
                var number = $scope.currentNumber;
                $scope.currentNumber = "1/" + $scope.currentNumber;
                addNumber();
                var str = $scope.userInput;
                str = str.substring(0, str.lastIndexOf(number));
                $scope.userInput = str + num.replace("x", number.toString());
            } else { // handles greater than 0-9 numbers
                $scope.userInput += num;
                $scope.currentNumber += num;
            }
        };

        /**
         * Add current number to numbers array.
         * 
         * @function addNumber
         * @memberOf CalculatorCtrl
         */
        function addNumber() {
            var number = $scope.currentNumber;
            if (number) {
                $scope.numbers.push(number);
                $scope.currentNumber = '';
                $scope.insertOperator = true;
            }
        }

        /**
         * Add entered operator to operators array. It only adds a first 
         * operator if more than one operator entered in a sequence.
         *
         * @function addOperator
         * @memberOf CalculatorCtrl
         * @param {string} operator entered operator by a user
         */
        $scope.addOperator = function(operator) {
            addNumber();
            $scope.userInput += operator;
            if ($scope.insertOperator) {
                $scope.operators.push(operator);
            } else {
                $scope.operators.pop();
                $scope.operators.push(operator);
            }
            $scope.insertOperator = false;
        };

        /**
         * Clears previous entered number.
         *
         * @function clearPreviousNumber
         * @memberOf CalculatorCtrl
         * @param  {string} char "C" pressed
         */
        $scope.clearPreviousNumber = function(char) {
            $scope.currentNumber = '';
            $scope.userInput += char;
        };

        /**
         * Quit the app/browser window.
         *
         * @function quitCalculator
         * @memberOf CalculatorCtrl
         */
        $scope.quitCalculator = function() {
            window.close();
        };

        $scope.initialize();
    });
