(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($rootScope,$location) {
        var vm = this;
        vm.message = null;
        vm.register = register;

        function init(){

        }init();

        function register() {

        }

    }
})();