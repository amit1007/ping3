var mongoose = require('mongoose');
var DateOnly =require('mongoose-dateonly')(mongoose);

var CreateAlertSchema = new mongoose.Schema({
            _id:Object,
            createalertID : String,
            frmCntAlertID : String,
            frmCntAlertName : String,
            frmCntDelivertTo : String,
            frmCntRecipient : String,
            frmCntMobileUser:{},
            frmCntDataSource:String,
            frmCntApplication : {},
            frmCntMeasures : {},
            frmCntCurrentValue :String,
            frmCntCondition :String,
            condition : String,
            frmCntFunction :String,
            conditionSetValue : String ,
            currenttriggerSetValue  :String,
            frmCntLoopDiamention : {},
            diamentionValue:[],
            filterValue:String,
            frmCntFieldValue:{},
            frmCntTrigger :String,
            frmGrpShedules:{},
            UserID:String,
            trigger : { type: Boolean, default: true } ,
            alertsetTime : { type: Date, default: new Date() }
},{collection : 'tblSetAlerts'});
CreateAlertSchema.set('collection','tblSetAlerts')
var AlertDetails=module.exports = mongoose.model('AlertDetails', CreateAlertSchema);
module.exports.findDim = function(callback)
{
    AlertDetails.findById({},{_id:1},callback);
}
