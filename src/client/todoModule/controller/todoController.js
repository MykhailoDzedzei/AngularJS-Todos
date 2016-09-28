export default ['$scope', 'todoService', function ($scope, todoService) {
    $scope.editMode = false;
    const getNotes = () => {
        todoService.getAllNotes().then((data) => {
            $scope.allNotes = [];
            $scope.allNotes = data.data;
        })
    };

    $scope.note = {
        title: '',
        noteBody: '',
        id: '',
        _id: ''
    };

    getNotes();
    $scope.send = () => {
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
    $scope.edit = (id) => {
        $scope.editMode = true;
        for (let i = 0; i < $scope.allNotes.length; i++) {
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