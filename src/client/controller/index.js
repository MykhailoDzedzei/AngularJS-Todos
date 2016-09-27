import angular from "angular";
module.exports = angular.module("list.main", [

]).controller('mainCtrl',['$scope', 'todoService', function ($scope, todoService) {
    $scope.name = {
        user: ''
    };

    $scope.send = function () {
        console.log($scope.name);
        todoService.sendData($scope.name);
    }
}])
    .service('todoService', ['$http', function ($http) {
        this.sendData = function (data) {
            console.log(data);
            return $http.post('http://localhost:3000/add', data).then(function(response) {
                console.log('ok');
            });
        }
    }])

