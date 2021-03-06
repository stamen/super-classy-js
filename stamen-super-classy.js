'use strict';

(function(window, $){

  window.STMN = window.STMN || {};

  //
  // Stamen Super Classy JS. This is not a framework!
  //
  // This is just a couple tools to help write plain old javascript
  //
  // To use this, include this file and add this line to the top of your classes:
  // `StamenBase.apply( this, arguments );`
  //

  function StamenBase() {

    var listeners = {};

    //
    // Subscribes a function to an event called by fire
    //
    this.on = function on(type, callback, data, once) {
      if (!listeners[type]) {
        listeners[type] = [];
      }

      listeners[type].push(arguments);
    }

    //
    // Just like on but it unsubscribes after one fire
    //
    this.once = function once(type, callback, data) {
      return this.on.apply(this, [
          arguments[0],
          arguments[1],
          arguments[2],
          true
      ]);
    }

    //
    // Fire an event and run all subscribers
    //
    this.fire = function fire(type, data) {
      if(listeners[type]) {
        listeners[type].forEach(function(listener) {
          listener[1]({
            listener : listener[2],
            caller   : data
          });
        });

        listeners[type] = listeners[type].filter(function(p) {return !p[3];});
      }
    }

    //
    // Mustache like template parsing. Just one bracket... like this: {hi}
    //
    this.processTemplate = function processTemplate(template, data) {

      Object.keys(data).forEach(function(key) {

        template = template.split('{' + key + '}').join(data[key]);

      });

      return template;

    }

    //
    // Gets an element by selector. Uses JQuery if available.
    //
    this.get = function get(selector, root) {
      if ($) {
        return ((root) ? $(root).find(selector) : $(selector)).get();
      } else {
        return ((root) ? root : document).querySelectorAll(selector);
      }
    }

    return this;
  }

  STMN.StamenBase = StamenBase;

}(window));