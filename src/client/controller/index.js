import angular from "angular";
module.exports = angular.module("list.main", [

]).controller('mainCtrl',['$scope', 'todoService', function ($scope, todoService) {
    $scope.note = {
        title: '',
        noteBody:''
    };

    $scope.send = function () {
        console.log($scope.note);
        todoService.sendData($scope.note);
    }
}])
    .service('todoService', ['$http', function ($http) {
        this.sendData = function (data) {
            console.log(data);
            return $http.post('http://localhost:3000/add', data).then(function(response) {
                console.log(response);
            });
        }
    }])

