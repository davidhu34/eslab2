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

	db.tessel.find({}, function(err, doc){
		if(!err)
			res.json(doc);
	});
});

router.post('/tessel/accelerometer', function(req, res) {
	res.send(req.body);
	console.log(req.body);
	req.body.data.map(function(d){
		var data = {
			type: 'accelerometer',
			data: d,
			timestamp: Date.now()
		};
		db.tessel.insert(data);
	});
});

router.post('/tessel/climate', function(req, res) {
	res.send(req.body);
	req.body.data.map(function(d){
		var pair = [];
		pair.push(d.t);
		pair.push(d.h);
		var data = {
			type: 'climate',
			data: pair,
			timestamp: Date.now()
		};
		db.tessel.insert(data);
	});
});
router.post('/tessel/ambient', function(req, res) {
	res.send(req.body);
	req.body.data.map(function(d){
		var pair = [];
		pair.push(d.l);
		pair.push(d.n);
		var data = {
			type: 'ambient',
			data: pair,
			timestamp: Date.now()
		};
		db.tessel.insert(data);
	});
});
router.post('/tessel/gps', function(req, res) {
	res.send(req.body);
	req.body.data.map(function(d){
		var pair = [];
		pair.push(d.lon);
		pair.push(d.lat);
		var data = {
			type: 'gps',
			data: pair,
			timestamp: Date.now()
		};
		db.tessel.insert(data);
	});
});

router.io = io;
module.exports = router;
