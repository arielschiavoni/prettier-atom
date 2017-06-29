// @flow
const _ = require('lodash/fp');
const { getCurrentFilePath } = require('../editorInterface');
const { get: getLinter } = require('../linterInterface');

type LinterArgs = {
  error: Prettier$SyntaxError,
  filePath: string,
  linter: Linter$IndieDelegate,
};

const createLinterArgs = (editor: TextEditor, error: Prettier$SyntaxError): LinterArgs => ({
  error,
  // $$FlowFixMe: this should always be here since we won't format a non-existent file
  filePath: getCurrentFilePath(editor),
  // $$FlowFixMe: this should always be here since the editor is activated
  linter: getLinter(),
});

const setErrorMessageInLinter = ({ error, filePath, linter }: LinterArgs) =>
  linter.setMessages(filePath, [
    {
      location: {
        file: filePath,
        position: {
          start: { row: error.loc.start.line, column: error.loc.start.column },
          end: { row: error.loc.start.line, column: error.loc.start.column },
        },
      },
      excerpt: 'Syntax Error',
      severity: 'error',
    },
  ]);

const handleError: (editor: TextEditor, error: Error) => false = _.flow(
  createLinterArgs,
  setErrorMessageInLinter,
  _.stubFalse,
);

module.exports = handleError;
