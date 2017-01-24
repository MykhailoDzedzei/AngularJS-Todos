"use strict";
export default ['$scope', 'todoService', function ($scope, todoService) {
    $scope.editMode = false;


    $scope.isCollapsed = true;
    $scope.isCollapsedHorizontal = false;


    const getNotes = () => {
        todoService.getAllNotes().then((data) => {
            console.log(data)
            $scope.allNotes = [];
            $scope.allNotes = data.data;
        })
    };

    $scope.editFunc = (id) => {
        $scope.isCollapsed = false;

        $scope.editMode = true;
        //find todoNote by id
        for (let i = 0; i < $scope.allNotes.length; i++) {
            if (id == $scope.allNotes[i].id) {
                $scope.note = {
                    title: $scope.allNotes[i].title,
                    noteBody: $scope.allNotes[i].noteBody,
                    id: $scope.allNotes[i].id,
                    status: $scope.allNotes[i].status,
                    _id: $scope.allNotes[i]._id
                }
            }
        }


    };
    
    $scope.saveChanges = () => {
        todoService.editNote($scope.note).then(() => {
            $scope.editMode = false;
            $scope.note = {};
            getNotes();
            $scope.isCollapsed = true;
        });
    }

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