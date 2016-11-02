"use strict";

import angular from "angular";
import todoService from './service/todoService';
import uiRoute from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import todoController from './controller/todoController';
import editController from './controller/editController';
import uiBootstrap from 'angular-ui-bootstrap';
module.exports = angular.module("list.main", [
    uiRoute,
    ngAnimate,
    uiBootstrap
])
    .controller("todoController", todoController)
    .controller("editController", editController)
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

        
    });

