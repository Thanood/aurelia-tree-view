'use strict';

System.register(['./constants'], function (_export, _context) {
  "use strict";

  var constants;
  return {
    setters: [function (_constants) {
      constants = _constants.constants;
    }],
    execute: function () {
      function fireEvent(element, name) {
        var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        var event = new CustomEvent(name, {
          detail: data,
          bubbles: true
        });
        element.dispatchEvent(event);

        return event;
      }

      _export('fireEvent', fireEvent);

      function fireTreeViewEvent(element, name) {
        var data = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

        return fireEvent(element, '' + constants.eventPrefix + name, data);
      }

      _export('fireTreeViewEvent', fireTreeViewEvent);
    }
  };
});