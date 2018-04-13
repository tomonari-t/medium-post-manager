const assert = require('power-assert');
const { test } = require('eater/runner');
const fs = require('fs');
const path = require('path');
const { getContentUrls, getContent } = require('../src/gitHubWebhook');
require('dotenv').config();

test('getAddedContentsUrl should return added content content\'s url', () => {
  const webhook = JSON.parse(fs.readFileSync(path.join(__dirname, './data/mock-add-modify.json')));
  const addedUrlList = getContentUrls(webhook);
  assert.deepEqual(addedUrlList, [
    'https://api.github.com/repos/tomonari-t/posts-medium/contents/WIP.test3.md',
    'https://api.github.com/repos/tomonari-t/posts-medium/contents/test2.md',
  ]);
});

test('getContent should return content by contents url', () => {
  const contentUrl = 'https://api.github.com/repos/tomonari-t/posts-medium/contents/test2.md';
  getContent(contentUrl).then((content) => {
    assert.equal(content, '# test2');
  });
});
