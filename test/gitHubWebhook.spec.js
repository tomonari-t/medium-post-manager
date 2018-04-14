require('dotenv').config();
const assert = require('power-assert');
const { test } = require('eater/runner');
const fs = require('fs');
const path = require('path');
const {
  getAddedContent,
} = require('../src/gitHubWebhook');

const webhook = JSON.parse(fs.readFileSync(path.join(__dirname, './data/mock-add-modify.json')));

test('getAddedContent should return content info by webhook', () => {
  getAddedContent(webhook).then((contents) => {
    assert.deepEqual(contents, [
      { title: 'WIP.test3', content: '# WIT test\n', tags: [] },
      { title: 'test2', content: '# test2\n', tags: [] },
    ]);
  });
});
