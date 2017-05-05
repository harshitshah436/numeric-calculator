/*global angular */

/**
 * The main Calculator app module
 *
 * @type {angular.Module}
 */

var angular = require('angular');
require('angular-route');
require('../dist/templateCachePartials');

angular.module('calculatorApp', ['ngRoute','appPartials'])
	.config(function ($routeProvider) {
		'use strict';

		var routeConfig = {
			controller: 'CalculatorCtrl',
			templateUrl: '/partials/home.html'
		};

		$routeProvider
			.when('/', routeConfig)
			.otherwise({
				redirectTo: '/'
			});
	});

require('calculatorCtrl');
require('calculatorService');