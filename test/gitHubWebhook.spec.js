const assert = require('power-assert');
const { test } = require('eater/runner');
const fs = require('fs');
const path = require('path');
const {
  getContentUrls,
  getContent,
  getAddedContent,
} = require('../src/gitHubWebhook');
require('dotenv').config();

const webhook = JSON.parse(fs.readFileSync(path.join(__dirname, './data/mock-add-modify.json')));

test('getAddedContent should return content info by webhook', () => {
  getAddedContent(webhook).then((contents) => {
    assert.deepEqual(contents, [
      { title: 'WIP.test3', content: '# WIT test\n', tags: [] },
      { title: 'test2', content: '# test2\n', tags: [] },
    ]);
  });
});

test('getAddedContentsUrl should return added content content\'s url', () => {
  const addedUrlList = getContentUrls(webhook);
  assert.deepEqual(addedUrlList, [
    { title: 'WIP.test3', url: 'https://api.github.com/repos/tomonari-t/posts-medium/contents/WIP.test3.md' },
    { title: 'test2', url: 'https://api.github.com/repos/tomonari-t/posts-medium/contents/test2.md' },
  ]);
});

test('getContent should return content by contents url', () => {
  const contentUrl = 'https://api.github.com/repos/tomonari-t/posts-medium/contents/test2.md';
  getContent(contentUrl).then((content) => {
    assert.equal(content, '# test2');
  });
});
