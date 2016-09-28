"use strict";

import 'angular';
import list from './todoModule/index';
import route from 'angular-route';

module.exports = angular.module('list', [
    route,
    list.name
]);

RouteConfig.$inject = ['$routeProvider', '$locationProvider'];
function RouteConfig($routeProvider, $locationProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}