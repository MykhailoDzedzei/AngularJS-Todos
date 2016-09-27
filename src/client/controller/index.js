import angular from "angular";
module.exports = angular.module("list.main", []).controller('mainCtrl', ['$scope', 'todoService', function ($scope, todoService) {

    $scope.users = [{name:23},{name:23},{name:23}];

    function getNotes() {
        todoService.getAllNotes().then((data) => {
            $scope.allNotes = [];
            $scope.allNotes = data.data;
            $scope.users.push();
            console.log($scope.allNotes);
        })
    }

    $scope.note = {
        title: '',
        noteBody: ''
    };

    getNotes();
    $scope.send = function () {
        todoService.sendData($scope.note).then(() => {
            getNotes();
        });
    }
    $scope.edit = function (ide) {
        for(let i = 0; $scope.allNotes.length; i++) {
            if(ide == $scope.allNotes[i].id) {
                $scope.note = {
                    title: $scope.allNotes.title,
                    noteBody: $scope.allNotes.noteBody
                }
            }
        }
        
    }
    $scope.delete = function (id) {

    }
}])
    .service('todoService', ['$http', function ($http) {
        this.sendData = function (data) {
            console.log(data);
            return $http.post('http://localhost:3000/add', data);
        };
        this.getAllNotes = function () {
            return $http.get('http://localhost:3000/allNotes');
        }
        this.editNote = function (data) {
            return $http.post('http://localhost:3000/edit',data);
        }
        this.deleteNote = function () {
            return $http.get('http://localhost:3000/delete');
        }
    }])

