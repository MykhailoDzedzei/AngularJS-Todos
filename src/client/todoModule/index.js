"use strict";

import angular from "angular";
import todoService from './service/todoService';
import ngRoute from "angular-route";
import uiRoute from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import todoController from './controller/todoController';
module.exports = angular.module("list.main", [
    uiRoute,
    ngAnimate
])
    .controller("todoController", todoController)
    .service('todoService', todoService)
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('/', {
            url:'/',
            templateUrl:"./todoModule/view/todoTemplate.html",
            controller:'todoController'
        }).state('notes', {
            url:'/notes',
            templateUrl:"./todoModule/view/notesTemplate.html",
            controller:'todoController'
        });
        $urlRouterProvider.otherwise('/');




        // $routeProvider
        //     .when("/", {
        //         templateUrl: "todoModule/view/todoTemplate.html",
        //         controller: todoController
        //     });
    });

