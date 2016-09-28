import angular from "angular";
import todoService from './service/todoService';
import todoController from './controller/todoController';
module.exports = angular.module("list.main", [])
    .controller("todoController", todoController)
    .service('todoService', todoService);

