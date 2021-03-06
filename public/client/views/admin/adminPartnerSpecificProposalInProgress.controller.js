(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("AdminPartnerSpecificInProgressController",AdminPartnerSpecificInProgressController);



    function AdminPartnerSpecificInProgressController($rootScope,$routeParams,OrgInfoService,FormService) {
        var vm = this;
        vm.aid = $routeParams.aid;
        vm.pid = $routeParams.pid;
        vm.pApplications=[];
        vm.partners=[];

        function init(){
            FormService.getAllOrganizationIdApplicationInProgress()
                .then(
                    function (response) {
                        var organizationIds=[];
                        var userIds=[];
                        for(var a in response.data) {
                            if(!(organizationIds.indexOf(response.data[a].orgId)>-1))
                            {
                                organizationIds.push(response.data[a].orgId)
                            }
                        }

                        for(var b in organizationIds) {
                            OrgInfoService.getOrgById(organizationIds[b])
                                .then(function (resposnse) {
                                    vm.partners.push(resposnse.data)
                                }, function (err) {
                                    console.log(err)
                                })
                        }
                    },
                    function (err) {
                        console.log(err)
                    }
                )


            FormService.getSpecificOrganizationInProgress(vm.pid)
                .then(
                    function (response) {
                        vm.pApplications=response.data;
                        console.log(vm.pApplications)
                    }
                )


        }init();


    }
})();