"use strict";

// Holds a reference to an IndieDelegate from the linter package. Used for displaying syntax errors
var indieDelegate = null;

module.exports = {
  set: function set(newIndieDelegate) {
    indieDelegate = newIndieDelegate;
  },
  get: function get() {
    return indieDelegate;
  }
};