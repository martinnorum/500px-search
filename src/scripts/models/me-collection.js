// Me Collection - me-collection.js
var AmpCollection = require('ampersand-rest-collection');
var Me = require('./me');


module.exports = AmpCollection.extend({
    model: Me,
    url: '/api/me'
});