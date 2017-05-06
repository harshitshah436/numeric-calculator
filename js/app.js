/**
 * The main Calculator app module.
 * 
 * @file app.js
 * @member App
 * @type {angular.Module}
 * @author Harshit
 */

var angular = require('angular');
require('angular-route');
require('../dist/templateCachePartials');

angular.module('calculatorApp', ['ngRoute', 'appPartials'])
    .config(function($routeProvider) {
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
