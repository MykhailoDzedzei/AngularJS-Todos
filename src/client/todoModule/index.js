"use strict";

import angular from "angular";
import ngAnimate from 'angular-animate';
import 'angular-aria';
import ngMaterial from 'angular-material';
import todoService from './service/todoService';
import uiRoute from 'angular-ui-router';
import todoController from './controller/todoController';
import registerController from './controller/registerController';
import uiBootstrap from 'angular-ui-bootstrap';
module.exports = angular.module("list.main", [
    uiRoute,
    ngAnimate,
    ngMaterial,
    uiBootstrap
])
    .controller("todoController", todoController)
    .controller("registerController", registerController)
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
        }).state('register', {
            url:'/register',
            templateUrl:"./todoModule/view/register.html",
            controller:'registerController'
            
        });
        $urlRouterProvider.otherwise('/');

        
    });

