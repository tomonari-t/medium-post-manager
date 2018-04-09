const fs = require('fs');
const assert = require('power-assert');
const {
  test,
} = require('eater/runner');
const {
  postMedium,
} = require('../index');
const {
  getAddedFileList,
} = require('../index');
const {
  getModifiedFileList,
} = require('../index');

const sinon = require('sinon');
const MediumPublisher = require('../src/medium');

const mockDataAddModify = JSON.parse(fs.readFileSync(`${__dirname}/data/mock-add-modify.json`));
const mockDataModify = JSON.parse(fs.readFileSync(`${__dirname}/data/mock-modify.json`));

test('getModifiedFileList should return only added file name', () => {
  const val = getAddedFileList(mockDataAddModify.commits);
  assert(val.length === 2);

  const val2 = getAddedFileList(mockDataModify.commits);
  assert(val2.length === 0);
});

test('getAddedFileList should return onlly modified file name', () => {
  const val = getModifiedFileList(mockDataAddModify.commits);
  assert(val.length === 1);

  const val2 = getModifiedFileList(mockDataModify.commits);
  assert(val2.length === 1);
});

test('postMedium should response 200', () => {
  const req = {
    body: mockDataAddModify,
  };
  const res = {
    send: sinon.stub(),
  };
  postMedium(req, res);
  assert(res.send.calledOnce);
});
