(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService, PartnerOrgInfoService,OrgInfoService) {

        var vm = this;
        vm.registerPartner = registerPartner;
        vm.registerFaculty = registerFaculty;
        vm.authenticateAdmin = 'false';

        function init(){
            OrgInfoService.getAllOrg()
                .then(function(allOrg){
                    vm.OrgsInfo = allOrg.data;
                })
        }init();

        function registerPartner(partner) {

            vm.message = null;

            if(!partner.orgId){
                vm.message = "Please select an organization";
                return;
            }

            if(!partner.firstName){
                vm.message = "Please enter a first name";
                return;
            }
            if(!partner.lastName){
                vm.message = "Please enter a last name";
                return;
            }

            if(!partner.username){
                vm.message = "Please enter an email address";
                return;
            }

            if(!partner.password){
                vm.message = "Please enter a password";
                return;
            }


            var newPartner = {
                "firstName":partner.firstName,
                "lastName":partner.lastName,
                "username":partner.username,
                "password":partner.password,
                "role":"PARTNER",
                "status":"Approved"
            };

            if(partner.orgId === "0" && partner.username === "admin@test.com"){
                newPartner.role="ADMIN";
            }

            UserService.register(newPartner)
                .then(function(user){
                        if(user)
                        {
                            $rootScope.currentUser = user.data;
                            $rootScope.currentUser.orgId = partner.orgId;
                            console.log("user data"+user);
                            for (var h = 0 ; h < vm.OrgsInfo.length ; h ++) {
                                if (partner.orgId === vm.OrgsInfo[h]._id) {
                                    partner.orgName = vm.OrgsInfo[h].name;
                                }
                            }
                            if($rootScope.currentUser.role === "PARTNER"){
                                var info = {
                                    userId : user.data._id,
                                    orgId : partner.orgId,
                                    userName : user.data.username,
                                    orgName : partner.orgName
                                };

                                PartnerOrgInfoService.addUserOrgInfo(info)
                                    .then(function(response){
                                        console.log("after add User Org", +response);
                                        $location.url("/partner");
                                    }, function(err){
                                        console.log(err);
                                    });
                            }
                            else if($rootScope.currentUser.role === "ADMIN")
                                $location.url("/admin");
                        }else
                            vm.message = "email id already exists";
                    },function(err){
                        vm.message = err.data;
                        console.log(err);
                    }
                );
        }


        function registerFaculty(faculty) {

            vm.message = null;

            if(!faculty.firstName){
                vm.message = "Please enter a first name";
                return;
            }
            if(!faculty.lastName){
                vm.message = "Please enter a last name";
                return;
            }

            if(!faculty.username ){
                vm.message = "Please enter your northeastern email id";
                return;
            }

            if(!faculty.password){
                vm.message = "Please enter a password";
                return;
            }

            var newFaculty = {
                "firstName":faculty.firstName,
                "lastName":faculty.lastName,
                "username":faculty.username,
                "password":faculty.password,
                "role":"FACULTY",
                "status":"NoStatus"
            };

            UserService.register(newFaculty)
                .then(function(user){
                        console.log("returned from registering faculty",user);
                        $rootScope.currentUser = user.data;
                        $location.url("/login?message=Request for approval has been sent to ADMIN successfully...");
                        vm.message = "Request for approval has been sent to ADMIN successfully...";
                    },function(err){
                        console.log(err);
                    }
                );
        }




    }
})();