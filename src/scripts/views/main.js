var View = require('ampersand-view');


module.exports = View.extend({
    template: require('../templates/main.js'),
    initialize: function () {
    },
    render: function (){
    	// main renderer
        // this.el = template();
        console.log(this.model.fullName);
        this.renderWithTemplate(this.model);

        return this;
    }

});