var tessel = require('tessel');

var servolib = require('servo-pca9685');
var rfidlib = require('rfid-pn532');

var rfid = rfidlib.use(tessel.port['A']);

var servo = servolib.use(tessel.port['C']);

var servo1 = 1; // We have a servo plugged in at position 1

servo.on('ready', function () {

   var card = 0;
   var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).
   servo.configure(servo1, 0.05, 0.12, function () {
      rfid.on('ready',function(){
         console.log('Ready to read RFID Card');
         rfid.on('data',function(data){
            if(card == 0){
               card = data.uid.toString('hex');
            }
            console.log(card);
            if(card == data.uid.toString('hex')){
               return
            } 
            //  Set servo #1 to position pos.
            servo.move(servo1, position);
            position += 1;
            if (position > 1) {
               position = 0; // Reset servo position
            }
            card = data.uid.toString('hex');
      });
   });
  });
});
