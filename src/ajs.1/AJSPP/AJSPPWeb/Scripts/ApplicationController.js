var app = angular.module('app', []);

app.controller('ApplicationController', function ($scope) {
   

   
});

app.directive("pnpPeoplePicker", function () {
    return {
        template: "User: {{User}} <br> <input type='text' ng-model='User' >"
    };
});
