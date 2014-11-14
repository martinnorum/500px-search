var Handlebars = require("handlebars");module.exports = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<body>\n    <h1>Min f;rste template</h1>\n    <p>\n        <form action=\"action_page.php\">\n            First name:\n            <br>\n            <input type=\"text\" name=\"firstname\" value=\""
    + escapeExpression(((helper = (helper = helpers.firstName || (depth0 != null ? depth0.firstName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"firstName","hash":{},"data":data}) : helper)))
    + "\">\n            <br>Last name:\n            <br>\n            <input type=\"text\" name=\"lastname\" value=\""
    + escapeExpression(((helper = (helper = helpers.lastName || (depth0 != null ? depth0.lastName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"lastName","hash":{},"data":data}) : helper)))
    + "\">\n            <br>\n            <br>\n            <input type=\"submit\" value=\"Submit\">\n        </form>\n</body>\n";
},"useData":true});