
var mongoose = require('mongoose');


var MobileUserSchema = new mongoose.Schema({
    Email : String,
    token : String       
   
  },{collection : 'login'});
  MobileUserSchema.set('collection','login')

  var Test = module.exports =mongoose.model('api1', MobileUserSchema);;
  
  // the schema is useless so far
  // we need to create a model using it
//   var Test = module.exports = mongoose.model('myPingSystem', MobileUserSchema);
  
module.exports.CreateHistory = function(callback){
     
    Test.find({},{Email:1,token:1},callback);
  }

 