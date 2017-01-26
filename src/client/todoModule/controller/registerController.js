"use strict";
export default class registerController {
    constructor($scope, todoService, $mdToast) {

        $scope.user = {
            name: '',
            password: '',
            confirmPassword: '',
            email: ''
        };

        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };
        let error ;
        $scope.toastPosition = angular.extend({},last);

        $scope.getToastPosition = function() {
            sanitizePosition();

            return Object.keys($scope.toastPosition)
                .filter(function(pos) { return $scope.toastPosition[pos]; })
                .join(' ');
        };

        function sanitizePosition() {
            var current = $scope.toastPosition;

            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;

            last = angular.extend({},current);
        }

        $scope.showSimpleToast = function() {
            var pinTo = $scope.getToastPosition();

            $mdToast.show(
                $mdToast.simple()
                    .textContent(error)
                    .position(pinTo )
                    .hideDelay(3000)
            );
        };
        
        
        
        
        
        $scope.register = () => {

            todoService.register($scope.user).then((data)=> {
                error = `You did it ${data.data.name}`;
                $scope.showSimpleToast();

            }, () => {
                error = 'Ops something wrong! Check all your inputs.';
                $scope.showSimpleToast();
            })

        }
    }
}