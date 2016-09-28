"use strict";

import angular from "angular";
import todoService from './service/todoService';
import ngRoute from "angular-route";
import todoController from './controller/todoController';
module.exports = angular.module("list.main", [
    ngRoute
])
    .controller("todoController", todoController)
    .service('todoService', todoService)
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "todoModule/view/todoTemplate.html",
                controller: todoController
            });
    });

