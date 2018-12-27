var mongoose = require('mongoose');
var express = require('express');
var mydate = require('current-date');

var historyAlertSchema = new mongoose.Schema({
    alertID : String,
    alertname : String,         
    AppicationName : String,          
    Measures : String,
    triggeredHistory:[],
    PreviousValue :String,
    CurrentValue:{},
    triggeredTime:{ type: Date, default: new Date() },
    LogginUserID:String,
},{collection : 'tblhistoryAlert'});
historyAlertSchema.set('collection','tblhistoryAlert')

module.exports = mongoose.model('histroyAlert', historyAlertSchema);