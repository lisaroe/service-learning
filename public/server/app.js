module.exports = function(app){

    var userModel = require("./models/user/user.model.js")(app);
    var partnerOrgInfoModel = require("./models/partnerOrgInfo/partnerOrgInfo.model.js")(app);
    var applicationInfoModel=require("./models/applicationInfo/applicationInfo.model")(app);
    var orgInfoModel = require("./models/organizationInfo/orgInfo.model")(app);
    var formModel = require("./models/forms/form.model.js")(app);


    require("./services/user.service.server.js")(app,userModel);
    require("./services/partnerOrgInfo.service.server.js")(app,partnerOrgInfoModel);
    require("./services/applicationInfo.service.server.js")(app,applicationInfoModel);
    require("./services/form.service.server.js")(app,formModel);


    require("./services/user.service.server.js")(app,userModel);
    require("./services/partnerOrgInfo.service.server.js")(app,partnerOrgInfoModel);
    require("./services/orgInfo.service.server.js")(app,orgInfoModel);


};