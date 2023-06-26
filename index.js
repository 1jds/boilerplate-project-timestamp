// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// timestampendpoint
app.get("/api/:date?", (req, res) => {
  // console.log("Original Request Params:", req.params)
  let dateObjectFromParams

  if(req.params.date === undefined) {
    dateObjectFromParams = new Date();
  } else if(req.params.date.length === 13) {
    const unixParamToNumber = req.params.date * 1;
    dateObjectFromParams = new Date(unixParamToNumber);
  } else {
    dateObjectFromParams = new Date(req.params.date)    
  }

  // console.log("Date Obj from Params:", dateObjectFromParams)
  
  let userDateGMTString = dateObjectFromParams.toUTCString()
  let unixNumberToReturn = dateObjectFromParams.getTime()
  
  if(dateObjectFromParams.toString() === "Invalid Date") {
    res.json({ "error": "Invalid Date" })
  } else {
    res.json({ "unix": unixNumberToReturn, "utc": userDateGMTString })
  }
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
