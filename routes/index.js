var express = require('express');
var router = express.Router();
var io = require('socket.io')();
var chart = require('react-chartjs');
var sanitizeHtml = require('sanitize-html');

var db = require('../db');

router.get('/', function(req, res) {
  res.render('index');
});

router.get('/data', function(req, res) {
  res.json({
    xyz: [
      [1, 2, 3],
      [1, 2, 4],
      [1, 2, 7]
    ]
  });
});

router.get('/tessel/accelerometer', function(req, res) {

});

router.post('/tessel/climate', function(req, res) {

});

router.post('/tessel/ambient', function(req, res) {

});
router.post('/tessel/gps', function(req, res) {

});

router.io = io;
module.exports = router;