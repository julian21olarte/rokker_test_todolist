var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = process.env.PORT || '3000';
var cors = require('cors');

var mongoose = require('mongoose');
mongoose.connect('mongodb://julian21olarte:julian21olarte@ds245347.mlab.com:45347/rokker_labs_todolist', { useMongoClient: true })
.then( () => {
  console.log('Conexion a DB correcta...');
})
.catch(err => console.log(err));
mongoose.Promise = global.Promise;

var task = require('./routes/task.routes');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//cors
//app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(cors({credentials: true, origin: '*'}));


//ROUTES
app.use('/task', task);



//server
var server = app.listen(port, () => {
  console.log("Server listening on " + port)
});
app.stop = function () {
  server.close();
}

module.exports = app;
