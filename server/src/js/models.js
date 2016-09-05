var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  var config = wagner.invoke(function(Config){return Config});
  mongoose.connect('mongodb://'+config.host+"/"+config.db);

  wagner.factory('db', function() {
    return mongoose;
  });

  var Tarifa =
    mongoose.model('Tarifa', require('../schema/tarifa'), 'tarifas');
  var User =
    mongoose.model('User', require('../schema/user'), 'users');

  var models = {
    Tarifa: Tarifa,
    User: User
  };

  // To ensure DRY-ness, register factories in a loop
  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  //wagner.factory('Product', require('./product'));

  return models;
};
