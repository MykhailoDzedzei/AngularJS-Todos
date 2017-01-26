"use strict";
export default ['$scope', 'todoService', function ($scope, todoService) {
    $scope.editMode = false;
    $scope.isCollapsed = true;
    $scope.isCollapsedHorizontal = false;
    const getNotes = () => {
        todoService.getAllNotes().then((data) => {
            $scope.allNotes = [];
            $scope.allNotes = data.data;
        })
    };
        
    $scope.editFunc = (id, status) => {
        if(status != undefined) {
            $scope.isCollapsed = true;
            $scope.editMode = false;
        }else {
            $scope.isCollapsed = false;
            $scope.editMode = true;
        }

        //find todoNote by id
        for (let i = 0; i < $scope.allNotes.length; i++) {
            if (id == $scope.allNotes[i]._id) {
                $scope.note = {
                    title: $scope.allNotes[i].title,
                    noteBody: $scope.allNotes[i].noteBody,
                    status: $scope.allNotes[i].status,
                    _id: $scope.allNotes[i]._id
                }
            }
        }

    };
  $scope.change = (id) => {

      $scope.editFunc(id, '');
      $scope.saveChanges()
  };
    $scope.saveChanges = () => {
        todoService.editNote($scope.note).then(() => {
            $scope.editMode = false;
            $scope.note = {};
            getNotes();
            $scope.isCollapsed = true;
        });
    };

    let e = angular.element(document.getElementById("task_form"));

    const sendAnimation =  () => {

        e.addClass('animated bounceOutRight');
        e.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            e.removeClass('animated bounceOutRight');
        });
    }

    getNotes();
    $scope.send = () => {
        sendAnimation();
        todoService.sendData($scope.note).then(() => {
            $scope.note = {};
            getNotes();
        });
    };
    $scope.delete = (id) => {
        for (let i = 0; i < $scope.allNotes.length; i++) {
            if (id == $scope.allNotes[i]._id) {
                todoService.deleteNote($scope.allNotes[i]).then(() => {
                    getNotes();
                });

            }
        }
    }
}];