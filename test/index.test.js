const fs = require('fs');
const test = require('eater/runner').test;
const assert = require('power-assert');
const sinon = require(`sinon`);

const mockDataAddModify = JSON.parse(fs.readFileSync(__dirname + '/data/mock-add-modify.json'));
const mockDataModify = JSON.parse(fs.readFileSync(__dirname + '/data/mock-modify.json'));

test('getModifiedFileList should return only added file name', () => {
    const getAddedFileList = require('../index').getAddedFileList;

    const val = getAddedFileList(mockDataAddModify.commits);
    assert(val.length === 2);

    const val2 = getAddedFileList(mockDataModify.commits);
    assert(val2.length === 0);
});

test('getAddedFileList should return onlly modified file name', () => {
    const getModifiedFileList = require('../index').getModifiedFileList;

    const val = getModifiedFileList(mockDataAddModify.commits);
    assert(val.length === 1);

    const val2 = getModifiedFileList(mockDataModify.commits);
    assert(val2.length === 1);
});

test('postMedium should response 200', () => {
    const postMedium = require('../index').postMedium;
    const req = {
        body: mockDataAddModify
    };
    const res = {
        send: sinon.stub()
    };
    postMedium(req, res);
    assert(res.send.calledOnce);
});

test('postMedium should set env variable', () => {
    const postMedium = require('../index').postMedium;
    const req = {
        body: mockDataAddModify
    };
    const res = {
        send: sinon.stub()
    };
    postMedium(req, res);

    assert(process.env.MEDUIUM_API_KEY === 'hoooo');
});
