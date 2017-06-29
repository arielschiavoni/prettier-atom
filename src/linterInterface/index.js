// @flow
// Holds a reference to an IndieDelegate from the linter package. Used for displaying syntax errors
// See: http://steelbrain.me/linter/types/indie-linter-v2.html

let indieDelegate: ?Linter$IndieDelegate = null;

module.exports = {
  set: (newIndieDelegate: ?Linter$IndieDelegate) => {
    indieDelegate = newIndieDelegate;
  },
  get: () => indieDelegate,
};
