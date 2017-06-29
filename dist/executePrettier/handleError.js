'use strict';

var _ = require('lodash/fp');

var _require = require('../editorInterface'),
    getCurrentFilePath = _require.getCurrentFilePath;

var _require2 = require('../linterInterface'),
    getLinter = _require2.get;

var createLinterArgs = function createLinterArgs(editor, error) {
  return {
    error: error,
    // $$FlowFixMe: this should always be here since we won't format a non-existent file
    filePath: getCurrentFilePath(editor),
    // $$FlowFixMe: this should always be here since the editor is activated
    linter: getLinter()
  };
};

var setErrorMessageInLinter = function setErrorMessageInLinter(_ref) {
  var error = _ref.error,
      filePath = _ref.filePath,
      linter = _ref.linter;
  return linter.setMessages(filePath, [{
    location: {
      file: filePath,
      position: {
        start: { row: error.loc.start.line, column: error.loc.start.column },
        end: { row: error.loc.start.line, column: error.loc.start.column }
      }
    },
    excerpt: 'Syntax Error',
    severity: 'error'
  }]);
};

var handleError = _.flow(createLinterArgs, setErrorMessageInLinter, _.stubFalse);

module.exports = handleError;