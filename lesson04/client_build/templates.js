this["App"] = this["App"] || {};
this["App"]["templates"] = this["App"]["templates"] || {};
this["App"]["templates"]["bar"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "#";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"bar\">\n    "
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.progress : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>\n";
},"useData":true});
this["App"]["templates"]["resource"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"resource\">"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + ": "
    + alias3(((helper = (helper = helpers.value || (depth0 != null ? depth0.value : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"value","hash":{},"data":data}) : helper)))
    + "</div>";
},"useData":true});
this["App"]["templates"]["tune-controls"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"tune-controls\">\n    <div class=\"button tune-controls__dec\">-</div>\n    <div class=\"button tune-controls__inc\">+</div>\n</div>\n";
},"useData":true});
this["App"]["templates"]["game"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"game\">\n    <div class=\"game__user-wealth\">\n    </div>\n\n    <div class=\"game__god-gift-form\">\n    </div>\n</div>";
},"useData":true});
this["App"]["templates"]["gift-tunner"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"gift-tunner\">\n    <div class=\"gift-tunner__name\"></div>\n    <div class=\"gift-tunner__bar\"></div>\n    <div class=\"gift-tunner__controls\"></div>\n</div>\n";
},"useData":true});
this["App"]["templates"]["god-gift-form"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"god-gift-form\">\n    <h2>Send gift to the God Ra</h2>\n\n    <div class=\"god-gift-form__gold-tunner\">\n    </div>\n\n    <div class=\"god-gift-form__copper-tunner\">\n    </div>\n\n    <div class=\"god-gift-form__some-tunner\">\n    </div>\n\n    <div class=\"god-gift-form__hate\">\n    </div>\n\n    <div class=\"god-gift-form__send button\">\n        Send \n    </div>\n</div>\n";
},"useData":true});
this["App"]["templates"]["god-hate-indicator"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"god-hate-indicator\">\n    <div class=\"god-hate-indicator__label\">God hate:</div>\n    <div class=\"god-hate-indicator__bar\">\n    </div>\n</div>\n";
},"useData":true});
this["App"]["templates"]["user-wealth"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div class=\"user-wealth\">\n    <div>Wealth:</div>\n    <div class=\"user-wealth__gold\"></div>\n    <div class=\"user-wealth__copper\"></div>\n    <div class=\"user-wealth__some\"></div>\n</div>";
},"useData":true});