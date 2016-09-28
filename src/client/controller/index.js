import angular from "angular";
module.exports = angular.module("list.main", [])
    .controller('mainCtrl', ['$scope', 'todoService', function ($scope, todoService) {
    $scope.editMode = false;
    function getNotes() {
        todoService.getAllNotes().then((data) => {
            $scope.allNotes = [];
            $scope.allNotes = data.data;
            console.log($scope.allNotes);
        })
    }

    $scope.note = {
        title: '',
        noteBody: '',
        id: '',
        _id: ''
    };

    getNotes();
    $scope.send = function () {
        if ($scope.note._id === "" || $scope.note._id === undefined) {
            todoService.sendData($scope.note).then(() => {
                $scope.note = {};
                getNotes();
            });

        }
        else {
            todoService.editNote($scope.note).then(() => {
                $scope.editMode = false;
                $scope.note = {};
                getNotes();
            });
        }

    };
    $scope.edit = function (id) {
        $scope.editMode = true;
        console.log($scope.allNotes[0]);
        for (var i = 0; i < $scope.allNotes.length; i++) {
            if (id == $scope.allNotes[i].id) {
                $scope.note = {
                    title: $scope.allNotes[i].title,
                    noteBody: $scope.allNotes[i].noteBody,
                    id: $scope.allNotes[i].id,
                    _id: $scope.allNotes[i]._id
                }
            }
        }

    };
    $scope.delete = function (id) {
        console.log('delete');
        for (var i = 0; i < $scope.allNotes.length; i++) {
            if (id == $scope.allNotes[i].id) {
                console.log($scope.allNotes[i], 'element for delete');
                todoService.deleteNote($scope.allNotes[i]).then(() => {
                    getNotes();
                });

            }
        }
    }

}])
    .service('todoService', ['$http', function ($http) {
        this.sendData = function (data) {
            console.log(data);
            return $http.post('http://localhost:3000/add', data);
        };
        this.getAllNotes = function () {
            return $http.get('http://localhost:3000/allNotes');
        };
        this.editNote = function (data) {
            return $http.post('http://localhost:3000/edit', data).then((res) => {
                console.log(res);
            });
        };
        this.deleteNote = function (data) {
            return $http.post('http://localhost:3000/delete', data);
        }
    }]);

