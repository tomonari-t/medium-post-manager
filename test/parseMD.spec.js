const assert = require('power-assert');
const { test } = require('eater/runner');
const parseMD = require('../src/parseMD');

test('parseMM should return tags and content when receive MD string', () => {
  const actual = parseMD('- hoge - hoo - bar #* ');
  assert.deepEqual(actual, { tags: ['hoge', 'hoo', 'bar'], content: '#*' });
});