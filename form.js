/*global define $*/
define(function(){
  "use strict";

  function serialize(form) {

    var o = {},
      a = form.serializeArray();

    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  }

  function deserialize(element, data) {
    var splits = decodeURIComponent(data).split('&'),
      i = 0,
      split = null,
      key = null,
      value = null,
      splitParts = null;

    var kv = {};
    while(splits[i++]){
      split = splits[i];
      splitParts = split.split('=');
      key = splitParts[0] || '';
      value = (splitParts[1] || '').replace(/\+/g, ' ');

      if (key !== ''){
        if( key in kv ){
          if( $.type(kv[key]) !== 'array' ){
            kv[key] = [kv[key]];
          }

          kv[key].push(value);
        }else{
          kv[key] = value;
        }
      }
    }

    for( key in kv ){
      value = kv[key];

      $('input[type="radio"][name="'+ key +'"][value="'+ value +'"]', element).attr('checked', 'checked');
      $('input[type="checkbox"][name="'+ key +'"],input[type="text"][name="'+ key +'"],input[type="password"][name="'+ key +'"],input[type="hidden"][name="'+ key +'"],textarea[name="'+ key +'"]', element).val(value);
      $('select[name="'+ key +'"]').find('option[value="'+ value +'"]').attr('selected', 'selected');
    }
  }

  function populate(element, data){

    for( var key in data ){
      var value = data[key];

      $('input[type="radio"][name="'+ key +'"][value="'+ value +'"]', element).attr('checked', 'checked');
      $('input[type="checkbox"][name="'+ key +'"],input[type="text"][name="'+ key +'"],input[type="password"][name="'+ key +'"],input[type="hidden"][name="'+ key +'"],textarea[name="'+ key +'"]', element).val(value);
      $('select[name="'+ key +'"]').find('option[value="'+ value +'"]').attr('selected', 'selected');
    }
  }

  function cleanSafe(element) {
    $('input[type="checkbox"],input[type="radio"]', element).removeAttr('checked');
    $('select,input[type="text"],input[type="password"],textarea', element).val('');
  }

  function cleanEverything(element) {
    $('input[type="checkbox"],input[type="radio"]', element).removeAttr('checked');
    $('select,input[type!="submit"],textarea', element).val('');
   }

  return {
    clean: cleanSafe
    , wipe: cleanEverything
    , populate: populate
    , serialize: serialize
    , deserialize: deserialize
  };
});
