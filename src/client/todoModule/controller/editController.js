"use strict"
export default ['$scope','$uibModalInstance' ,function($scope, $uibModalInstance){
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

    $scope.edit = (id) => {
        $scope.editMode = true;
        //find todoNote by id
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

    $scope.ok = () => {
        $uibModalInstance.close();
    };
    $scope.cancel = () => {
        $uibModalInstance.dismiss("cancel");
    };

    
}
]