import 'angular';
import masonry from 'masonry-layout';
import list from './controller';
module.exports = angular.module('list', [
    list.name
]);

RouteConfig.$inject = ['$routeProvider', '$locationProvider'];
function RouteConfig($routeProvider, $locationProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}