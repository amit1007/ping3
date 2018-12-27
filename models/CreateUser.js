var mongoose = require('mongoose');
var mydate = require('current-date');

var CreateUser = new mongoose.Schema({
    PingUserID: String,
    PingUserName: String,
    PingUserDirectory : String,
    PingUserAccess : String, 
    PingMemberID : String, 
    PingGroupID : String, 
    PingRole : String, 
    InsertBy : String, 
    InsertDate :{ type: Date, default: mydate }, 
    UpdateBy : String, 
    UpdateDate :{ type: Date, default: mydate }  
}, { collection: 'PingUsers' });
CreateUser.set('collection', 'PingUsers');

module.exports = mongoose.model('CreateUser', CreateUser);