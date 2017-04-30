/*global describe, it, beforeEach, inject, expect*/
describe('Calculator Controller', function() {

    // Load the module containing the app, only 'ng' is loaded by default.
    beforeEach(module('calculatorApp'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $controller = _$controller_;
    }));

    describe('$scope.initialize', function() {
        it('should initialize the scope variables', function() {
            var $scope = {};
            var controller = $controller('CalculatorCtrl', { $scope: $scope });
            $scope.initialize();
            expect($scope.operators.length).toEqual(0);
        });
    });
});
