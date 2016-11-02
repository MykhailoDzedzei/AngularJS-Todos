"use strict";
import editController from './editController';
export default ['$scope', 'todoService','$uibModal', function ($scope, todoService, $uibModal) {
    $scope.editMode = false;
    const getNotes = () => {
        todoService.getAllNotes().then((data) => {
            $scope.allNotes = [];
            $scope.allNotes = data.data;
        })
    };
    $scope.editFunc = () => {

        const deleteInstance = $uibModal.open({
            animation: true,
            templateUrl: "todoModule/view/editNotes.html",
            controller: editController
        });
        // deleteInstance.result.then(() => {
        //     ProfileService.deleteAccount();
        //     $scope.logOutClick($scope.user._id);
        //     $location.path("/");
        // });
    };
    var e = angular.element(document.getElementById("somes"));
    function sendAnimation() {

        e.addClass('animated bounceOutRight');
        e.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            e.removeClass('animated bounceOutRight');
        });
    }

    getNotes();
    $scope.send = () => {
        sendAnimation();
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
    
    $scope.delete = (id) => {
        for (let i = 0; i < $scope.allNotes.length; i++) {
            if (id == $scope.allNotes[i].id) {
                todoService.deleteNote($scope.allNotes[i]).then(() => {
                    getNotes();
                });

            }
        }
    }
}];