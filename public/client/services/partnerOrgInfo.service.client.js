(function() {
    angular.module("ServiceLearningApp")
        .factory("PartnerOrgInfoService", PartnerOrgInfoService);


    function PartnerOrgInfoService($http){

        var model = {
            addUserOrgInfo:addUserOrgInfo,
            getUserOrgId:getUserOrgId,
            getPartnerId:getPartnerId
        };

        return model;

        function addUserOrgInfo(info) {
            return  $http.post("/api/userOrgInfo",info);
        }

        function getUserOrgId(userId) {
            console.log('Method :: getUserOrgId :: userId '+userId);
            return $http.get("/api/getUserOrgId/"+userId);
        }
        
        function getPartnerId(userId) {
            return $http.get("/api/getOrgId/"+userId);
        }
    }
})();
