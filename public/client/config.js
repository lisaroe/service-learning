(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .config(Configure);


    function Configure($routeProvider,$locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider

            .when("/login", {
                templateUrl: "client/views/login/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })

            .when("/register", {
                templateUrl: "client/views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .when("/forgotpassword", {
            templateUrl: "client/views/forgotpwd/forgotpwd.view.html",
            controller: "ForgotPwdController",
            controllerAs: "model"
            })

            .when("/newOrg",{
                templateUrl: "client/views/register/orgRegister.view.html",
                controller: "OrgRegisterController",
                controllerAs: "model"
            })

            .when("/OrgNotYetApproved",{
                templateUrl: "client/views/404/orgNotYetApproved.view.html"
            })

            .when("/OrgRejected",{
                templateUrl: "client/views/404/orgRejected.view.html"
            })

            .when("/form", {
                templateUrl: "client/views/admin/forms/forms.view.html",
                controller:"FormController",
                controllerAs:"model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })

            .when("/field", {
                templateUrl:"client/views/admin/forms/fields.view.html",
                controller:"FieldController",
                controllerAs:"model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })

            .when("/form/:formId/field",{
                templateUrl: "client/views/admin/forms/fields.view.html",
                controller: "FieldController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })


            //admin start
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })

            //start admin partner proposals
            // .when("/admin/:aid/adminPartnerAllProposals", {
            //     templateUrl: "client/views/admin/adminPartnerAllProposals.view.html",
            //     controller: "AdminController",
            //     controllerAs: "model"
            // })

            .when("/admin/:aid/adminPartnerList", {
                templateUrl: "client/views/admin/partnerList.view.html",
                controller: "PartnerListController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })

            .when("/admin/:aid/adminPartnerList/:pid", {
                templateUrl: "client/views/admin/adminPartnerSpecificProposal.view.html",
                controller: "AdminPartnerSpecificController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })

            .when("/admin/:aid/adminPartnerList/:pid/proposal/:prid", {
                templateUrl: "client/views/admin/adminPartnerSpecificProposalView.view.html",
                controller: "AdminPartnerSpecificProposalViewController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })

            .when("/admin/:aid/adminPartnerListInProgress", {
                templateUrl: "client/views/admin/partnerListInProgress.view.html",
                controller: "PartnerListInProgressController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })

            .when("/admin/:aid/adminPartnerListInProgress/:pid", {
                templateUrl: "client/views/admin/adminPartnerSpecificProposalInProgress.view.html",
                controller: "AdminPartnerSpecificInProgressController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })

            .when("/admin/:aid/adminPartnerListInProgress/:pid/proposal/:prid", {
                templateUrl: "client/views/admin/adminPartnerSpecificProposalViewInProgress.view.html",
                controller: "AdminPartnerSpecificProposalViewInProgressController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })



            // end admin partner proposals


            .when("/try", {
                templateUrl: "client/views/admin/try.view.html",
                controller: "TryController",
                controllerAs: "model"
            })


            //admin end
            .when("/partner", {
                templateUrl: "client/views/partner/partner.view.html",
                controller: "PartnerController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })

            //faculty start
            .when("/faculty/:fid", {
                templateUrl: "client/views/faculty/faculty.view.html",
                controller: "FacultyController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })
            .when("/faculty/:fid/facultyProfile", {
                templateUrl: "client/views/faculty/faculty.view.html",
                controller: "FacultyController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })
            .when("/faculty/:fid/facultySuggestedJobs", {
                templateUrl: "client/views/faculty/facultySuggestedJobs.view.html",
                controller: "FacultyController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })
            .when("/faculty/:fid/facultyAcceptedJobs", {
                templateUrl: "client/views/faculty/facultyAcceptedJobs.view.html",
                controller: "FacultyController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })
            .when("/faculty/:fid/facultyRejectedJobs", {
                templateUrl: "client/views/faculty/facultyRejectedJobs.view.html",
                controller: "FacultyController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })
            .when("/faculty/:fid/facultyAllJobs", {
                templateUrl: "client/views/faculty/facultyAllJobs.view.html",
                controller: "FacultyController",
                controllerAs: "model",
                resolve:{
                    loggedin:checkloggedIn
                }
            })
            .when("/passwordChange", {
                templateUrl: "client/views/passwordChange/passwordChange.view.html",
                controller: "PasswordChangeController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "login"
            });
    }

    var checkloggedIn = function($q, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        console.log("in check logged in ");

        $http.get('/api/loggedIn').then(function(user)
        {
            console.log("in check logged in 1");

            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user.data !== '0')
            {
                $rootScope.currentUser = user.data;
                console.log("in check logged in 2" +user.data);
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
        });
        return deferred.promise;
    };

})();
