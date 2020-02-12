var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.dataArray = [];
// just one "site" with 2 pages, / and about

// use res.render to load up an ejs view file
// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// ShowMeasurements page 
app.get('/ShowMeasurements', function(req, res) {
    res.render('pages/ShowMeasurements', { 
        dataArray: app.dataArray
     });
  });



// MeasureWeight page 
// sending a get with 1 param
// http://localhost:3000/uploadData?id=2&date=1941
app.get('/MeasureWeight', function(req, res) {
    let id = req.param('id');
    if(id != null){
        let newWeight = {
            id: id
        }
    app.dataArray.push(newWeight);
    }
    res.render('pages/MeasureWeight', { 
        dataArray: app.dataArray
     });
  });



// WeightChange page 
app.get('/WeightChange', function(req, res) {

    // clever way to make a real copy, not just a new reference name
    app.duplicateArray = JSON.parse(JSON.stringify( app.dataArray ));

    res.render('pages/WeightChange', { 
        dataArray: app.duplicateArray
     });
  });


//doing this in www bin file to make Azure happy
app.listen(443);  // not setting port number in www.bin, simple to do here
console.log('443 is the magic port');

module.exports = app;
