
var https = require('https');
var fs = require('fs');

var options = {
   hostname: 'qlik-sense',
   port: 4242,
   path: '/qrs/notification/changes?xrfkey=abcdefghijklmno1&since=2018-07-15T19:00:00Z&types=executionResult',
   method: 'GET',  

   headers: {
      'x-qlik-xrfkey' : 'abcdefghijklmno1',
      'X-Qlik-User' : 'UserDirectory= Internal; UserId= sa_repository '
   },
   key: fs.readFileSync("C:\\Certificate\\client_key.pem"),
   cert: fs.readFileSync("C:\\Certificate\\client.pem"),
   ca: fs.readFileSync("C:\\Certificate\\root.pem")
};
setInterval(function () {
                        console.log('boo')
   
                  https.get(options, function(res) {
                       
                        console.log("QRS Api");
                              res.on("data", function(chunk) {
                              
                                    console.log("BODY: " + chunk);  
                              });                              
                  }).on('error', function(e) {
                        console.log("Got error: " + e.message);
                  });

},1000000 );


