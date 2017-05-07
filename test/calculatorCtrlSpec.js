/**
 * Unit tests for calculator controller.
 * 
 * @file calculatorCtrlSpec.js
 * @memberOf App
 * @author Harshit
 */

describe('CalculatorController', function() {

    var $controller, $scope, mockCalculatorService, controller;
    
    beforeEach(module('calculatorApp'));

    beforeEach(inject(function($rootScope, _$controller_, calculatorService, _$window_) {
        $scope = $rootScope.$new();
        $controller = _$controller_;
        mockCalculatorService = calculatorService;
        spyOn(mockCalculatorService, 'calculate').and.callThrough();
        controller = $controller('CalculatorCtrl', {
            $scope: $scope,
            calculatorService: mockCalculatorService,
            $window: _$window_
        });
    }));

    describe('$scope.initialize()', function() {

        it('should be defined', function() {
            expect($scope.initialize).toBeDefined();
        });

        it('should have initialized all scope variables', function() {
            $scope.initialize();
            expect($scope.userInput).toBeFalsy();
            expect($scope.numbers.length).toEqual(0);
            expect($scope.operators.length).toEqual(0);
            expect($scope.insertOperator).toBe(true);
            expect($scope.previousNumber).toEqual('');
            expect($scope.result).toBeNull();
        });
    });

    describe('$scope.calculate()', function() {

        it('should be defined', function() {
            expect($scope.calculate).toBeDefined();
        });

        it('should have calculated the result', function() {
            $scope.numbers = [2, 3, 5];
            $scope.operators = ['+', '+'];

            $scope.calculate();

            expect($scope.result).toEqual(10);
            expect($scope.numbers.length).toEqual(0);
            expect($scope.operators.length).toEqual(0);
            expect($scope.previousNumber).toEqual($scope.result);
        });
    });

    describe('$scope.addToPreviousNumber()', function() {

        it('should be defined', function() {
            expect($scope.addToPreviousNumber).toBeDefined();
        });

        it('should have formatted x! to a proper text and have added to a numbers array', function() {
            $scope.previousNumber = 5;
            var num = 'x!';

            $scope.addToPreviousNumber(num);

            expect($scope.numbers[0]).toEqual('5!');
            expect($scope.userInput).toBeTruthy();
        });

        it('should have formatted 1/x to a proper text and have added to a numbers array', function() {
            $scope.previousNumber = 5;
            var num = '1/x';

            $scope.addToPreviousNumber(num);

            expect($scope.numbers[0]).toEqual('1/5');
            expect($scope.userInput).toBeTruthy();
        });

        it('should have handled number greater than 0-9', function() {
            // '32' entered by key '3' and '2'.
            var num = '3';
            $scope.addToPreviousNumber(num);
            var num = '2';
            $scope.addToPreviousNumber(num);

            expect($scope.userInput).toEqual('32');
            expect($scope.previousNumber).toEqual('32');
        });
    });

    describe('$scope.addOperator()', function() {

        it('should be defined', function() {
            expect($scope.addOperator).toBeDefined();
        });

        it('should have added an operator into the operators array', function() {
            $scope.addOperator('+');
            expect($scope.operators.length).toBeGreaterThan(0);
            expect($scope.operators[0]).toEqual('+');
        });
        it('should have added last operator while trying to enter more than 1 operators', function() {
            $scope.addOperator('+');
            $scope.addOperator('-');
            $scope.addOperator('*');
            $scope.addOperator('/');

            expect($scope.operators.length).toBeGreaterThan(0);
            expect($scope.operators.length).toEqual(1);
            expect($scope.operators[0]).toEqual('/');
        });
    });

    describe('$scope.clearPreviousNumber()', function() {

        it('should be defined', function() {
            expect($scope.clearPreviousNumber).toBeDefined();
        });

        it('should have cleared previous number', function() {
            $scope.previousNumber = '5';

            $scope.clearPreviousNumber('C');
            expect($scope.previousNumber).toBeFalsy();
            expect($scope.userInput).toContain('C');
        });
    });

    describe('$scope.quitCalculator()', function() {

        it('should be defined', function() {
            expect($scope.quitCalculator).toBeDefined();
        });

        it('should have quit the application', inject(function($window) {
            spyOn($window, 'close').and.callFake(function() {
                return true;
            });
            $scope.quitCalculator();
            expect($window.close).toHaveBeenCalled();
        }));
    });
});
