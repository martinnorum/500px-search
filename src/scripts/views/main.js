var View = require('ampersand-view');
var template = require('../templates/main.js');


module.exports = View.extend({
    template: template,
    initialize: function () {
    },
    render: function (){
    	// main renderer
        this.renderWithTemplate({me: me});

        return this;
    }

});