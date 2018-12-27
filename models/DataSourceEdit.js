var mongoose = require('mongoose');

var DataSourceEditSchema = new mongoose.Schema({
    dataSourceId : String,
    sourcename:String,
    userdirectory:String,
    hostname:String,
    connect:String,
    type:String,
    IsActive:{type:Boolean,default:true}

}, { collection: 'DataSourceEdit' });


DataSourceEditSchema.set('collection', 'DataSourceEdit');


var DataSourceEdit = module.exports = mongoose.model('DataSourceEdit' , DataSourceEditSchema);

module.exports.InsertData = function(Req_body,callback){

    console.log('Model....file.........................')
    console.log(Req_body)
 DataSourceEdit.create(Req_body,callback)
}

// module.exports.findData = function(callback){
//     DataSourceEdit.find()
// }