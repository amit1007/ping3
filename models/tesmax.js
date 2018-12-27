var mongoose = require('mongoose');
var alerts = require('../models/createAlertSchema.js');
  x();
function x(){
    alerts.find({"frmCntAlertID":"ping3"},function (err, products) {
        if (err) return next(err);
        console.log('Max Count DB',products);
        res.json(products.length);
      });
}

 