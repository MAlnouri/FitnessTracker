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
    let date = req.param('date');
    if(id != null){
        let aMovie = {
            id: id,
            date: date
        }
    app.dataArray.push(aMovie);
    }
    res.render('pages/MeasureWeight', { 
        dataArray: app.dataArray
     });
  });



// WeightChange page 
app.get('/WeightChange', function(req, res) {

    // clever way to make a real copy, not just a new reference name
    app.duplicateArray = JSON.parse(JSON.stringify( app.dataArray ));

    // Sort the new array with the custom function
    // that sorts alphabetically by the  key
    app.duplicateArray.sort(dynamicSort("date"));


    res.render('pages/WeightChange', { 
        dataArray: app.duplicateArray
     });
  });


  /**
   *  https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
 * Function to sort alphabetically an array of objects by some specific key.
 * 
 * @param {String} property Key of the object to sort.
 */
function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }

    return function (a,b) {
        if(sortOrder == -1){
            return b[property].localeCompare(a[property]);
        }else{
            return a[property].localeCompare(b[property]);
        }        
    }
}


// doing this in www bin file to make Azure happy
//app.listen(443);  // not setting port number in www.bin, simple to do here
//console.log('443 is the magic port');

module.exports = app;
