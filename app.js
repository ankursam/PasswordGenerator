/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();


var bodyParser = require('body-parser')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies

var formidable = require("formidable");
var util = require('util');


// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
var path    = require("path");

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It resolves to project folder.
});


app.get('/generate',function(req,res){

  //processAllFieldsOfTheForm
  var form = new formidable.IncomingForm();

  var flag = 0;
  if(typeof req.query.choice1 !='undefined' && req.query.choice1.length != 0)
  {
    flag=flag+1;
  }
  if(typeof req.query.choice2 !='undefined' && req.query.choice2.length != 0)
  {
    flag=flag+2;
  }
  if(typeof req.query.choice3 !='undefined' && req.query.choice3.length != 0)
  {
    flag=flag+4;
  }

  console.log(flag);

  var numberofchars = Math.floor(Math.random()*8+16);

  var password = [];

  //if flag = 1 then only numbers
  if(flag == 1 )
  {
    for(var i=0; i < numberofchars ; i++)
    {
      var charactervalue=String.fromCharCode(Math.random()*9+49);
      password[i] = charactervalue;
    }
  }

  //if flag = 2 then only alphabets
  if(flag == 2 )
  {
    for(var i=0; i < numberofchars ; i++)
    {
      var upperlower = (Math.floor(Math.random()*2));
      if(upperlower == 0)
      {
        var charactervalue=String.fromCharCode(Math.random()*26+65);
        password[i] = charactervalue;
      }
      else {
        var charactervalue=String.fromCharCode(Math.random()*26+97);
        password[i] = charactervalue;
      }
    }
  }

  //if flag = 3 then numbers and alphabets
  if(flag == 3 )
  {
    for(var i=0; i < numberofchars ; i++)
    {
      var cas = (Math.floor(Math.random()*3));
      if(cas == 0)
      {
        var charactervalue=String.fromCharCode(Math.random()*26+65);
        password[i] = charactervalue;
      }
      else if(cas == 1) {
        var charactervalue=String.fromCharCode(Math.random()*26+97);
        password[i] = charactervalue;
      }
      else {
        var charactervalue=String.fromCharCode(Math.random()*9+49);
        password[i] = charactervalue;
      }
    }
  }

  //if flag = 4 then only specialchars
  if(flag == 4 )
  {
    for(var i=0; i < numberofchars ; i++)
    {
      var cas = (Math.floor(Math.random()*4));
      if(cas == 0)
      {
        var charactervalue=String.fromCharCode(Math.random()*15+33);
        password[i] = charactervalue;
      }
      else if(cas == 1) {
        var charactervalue=String.fromCharCode(Math.random()*7+58);
        password[i] = charactervalue;
      }
      else if(cas == 2){
        var charactervalue=String.fromCharCode(Math.random()*6+91);
        password[i] = charactervalue;
      }
      else {
        var charactervalue=String.fromCharCode(Math.random()*4+123);
        password[i] = charactervalue;
      }
    }
  }

  //if flag = 5 then special chars and numbers
  if(flag == 5 )
  {
    for(var i=0; i < numberofchars ; i++)
    {
      var choice = (Math.floor(Math.random()*2));

      if(choice == 0)
      {
        var charactervalue=String.fromCharCode(Math.random()*9+49);
        password[i] = charactervalue;
      }

      else {
        var cas = (Math.floor(Math.random()*4));
        if(cas == 0)
        {
          var charactervalue=String.fromCharCode(Math.random()*15+33);
          password[i] = charactervalue;
        }
        else if(cas == 1) {
          var charactervalue=String.fromCharCode(Math.random()*7+58);
          password[i] = charactervalue;
        }
        else if(cas == 2){
          var charactervalue=String.fromCharCode(Math.random()*6+91);
          password[i] = charactervalue;
        }
        else {
          var charactervalue=String.fromCharCode(Math.random()*4+123);
          password[i] = charactervalue;
        }
      }
    }
  }

  //if flag = 6 then special chars and alphabets
  if(flag == 6 )
  {
    for(var i=0; i < numberofchars ; i++)
    {
      var choice = (Math.floor(Math.random()*2));

      if(choice == 0)
      {
        var cas = (Math.floor(Math.random()*4));
        if(cas == 0)
        {
          var charactervalue=String.fromCharCode(Math.random()*15+33);
          password[i] = charactervalue;
        }
        else if(cas == 1) {
          var charactervalue=String.fromCharCode(Math.random()*7+58);
          password[i] = charactervalue;
        }
        else if(cas == 2){
          var charactervalue=String.fromCharCode(Math.random()*6+91);
          password[i] = charactervalue;
        }
        else {
          var charactervalue=String.fromCharCode(Math.random()*4+123);
          password[i] = charactervalue;
        }
      }

      else {
        var cas = (Math.floor(Math.random()*2));
        if(cas == 0)
        {
          var charactervalue=String.fromCharCode(Math.random()*26+65);
          password[i] = charactervalue;
        }
        else{
          var charactervalue=String.fromCharCode(Math.random()*26+97);
          password[i] = charactervalue;
        }
      }
    }
  }

  //if flag = 7 then no restriction on password use
  if(flag == 7)
  {
    for(var i=0; i < numberofchars ; i++)
    {
      var charactervalue=String.fromCharCode(Math.random()*93+34);
      password[i] = charactervalue;
    }
  }

  var out = password.join("");
  //console.log(password);
  res.render('generate',{ msg : out, choice1 : req.query.choice1, choice2 : req.query.choice2, choice3 : req.query.choice3});
});


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
