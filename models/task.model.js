'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
  name: {type: String, required: true},
  dueDate: {type: Date, required: true},
  priority: {type: Number, required: true, min: 1, max: 5},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});
module.exports = mongoose.model('task', taskSchema);