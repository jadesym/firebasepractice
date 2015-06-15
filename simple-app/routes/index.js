var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var myFirebaseRef = new Firebase("https://intense-inferno-6719.firebaseio.com/");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
