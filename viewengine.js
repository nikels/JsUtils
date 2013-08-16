define(function (){

  function compile(template){
    return Handlebars.compile(template);
  }

  function render(compiled, data){
    return compiled(data);
  }

  function build(template, data){
    var compiled = compile(template);
    return render(compiled, data);
  }

  function safe(name, data){
    return new Handlebars.SafeString(template(name, data));
  }

  function template(name, data){
    return Handlebars.templates[name](data);
  }

  function registerPartial(name, temp){
    Handlebars.registerPartial(name, Handlebars.templates[temp]);
  }

  function layout(view, data){ 
    var content = template(view.layout.name, data);
    view.setElement(content);
    view.options.parent[view.layout.placement||'html'](view.$el);
  }

  return {
    safe: safe
    , build: build
    , layout: layout
    , render: render
    , compile: compile
    , template: template
    , partial: registerPartial
  };

});
