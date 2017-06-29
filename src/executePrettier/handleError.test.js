jest.mock('../editorInterface');

const { getCurrentFilePath } = require('../editorInterface');
const linterInterface = require('../linterInterface');
const handleError = require('./handleError');

const buildFakeError = () => {
  const error = new Error('fake error');
  error.loc = { start: { line: 1, column: 1 } };

  return error;
};

it('sets an error message in the indie-linter', () => {
  const error = buildFakeError();
  const fakeFilePath = '/fake/file/path.js';
  getCurrentFilePath.mockImplementation(() => fakeFilePath);
  const editor = null;
  const mockLinter = { setMessages: jest.fn() };
  linterInterface.set(mockLinter);

  handleError(editor, error);

  const expectedMessages = [
    {
      location: {
        file: fakeFilePath,
        position: {
          start: { row: 1, column: 1 },
          end: { row: 1, column: 1 },
        },
      },
      excerpt: 'Syntax Error',
      severity: 'error',
    },
  ];

  expect(mockLinter.setMessages).toHaveBeenCalledWith(fakeFilePath, expectedMessages);
});
