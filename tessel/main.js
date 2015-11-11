var tessel = require('tessel');
var http = require('http');
var accel = require('accel-mma84').use(tessel.port['A']);
var climate = require('climate-si7020').use(tessel.port['B']);
var gps = require('gps-a2235h').use(tessel.port['C']);
var ambient = require('ambient-attx4').use(tessel.port['D']);

var host = '140.112.174.137',
    port = '4007';

var options = {
   hostname: host,
   port: port,
   method: 'POST'
}

accel.on('ready',function() {
   var accel_ret = [];
   setInterval(function(){
      accel.getAcceleration( function(err,xyz){
         accel_ret.push(xyz);
      });
      if(accel_ret.length>=10){
         postData('/tessel/accelerometer',{data:accel_ret});
         accel_ret = [];
      }
   },100);
});

accel.on('error', function(err){
     console.log("got this error", err);
});
climate.on('ready', function(){
   var climate_ret = [];
   setInterval(function(){
      climate.readTemperature('c',function(err,temp){
         climate.readHumidity(function(err,hum){
            climate_ret.push({t:temp.toFixed(4),h:hum.toFixed(4)});
            if(climate_ret.length>=10){
               postData('/tessel/climate',{data:climate_ret});
               climate_ret = [];
            }
         });
      });
   },100);
});

climate.on('error', function(err){
     console.log("got this error", err);
});
gps.on('ready',function(){
   console.log('gps ready');
   var gps_ret = [];
   gps.on('coordinates',function(coords){
      console.log(coords);
      gps_ret.push(coords);
      if(gps_ret.length>=10){
         postData('/tessel/gps',{data:gps_ret});
         gps_ret = [];
      }
   });
});
gps.on('error', function(err){
     console.log("got this error", err);
});
ambient.on('ready', function(){
   var ambient_ret = [];
   setInterval(function(){
      ambient.getLightLevel(function(err,ldata){
         ambient.getSoundLevel(function(err,sdata){
            ambient_ret.push({l:ldata.toFixed(8),n:sdata.toFixed(8)});
            if(ambient_ret.length>=10){
               postData('/tessel/ambient',{data:ambient_ret});
               ambient_ret = [];
            }
         });
      });
   },100);
});
ambient.on('error', function (err) {
     console.log(err)
});

function postData(path,data){
   jsondata = JSON.stringify(data);
   options.path = path;
   options.headers = {
   'Content-Type': 'application/json',
   'Content-Length': jsondata.length
   };
   var req = http.request(options, function(res){
      res.on('data', function(chunk){
         console.log('BODY: '+chunk);
      });
      res.on('end', function(){
         console.log("END");
      });
   });
   req.on('error',function(e){
      console.log(e.message);
   });
   console.log(jsondata);
   req.write(jsondata);
   req.end();
}
