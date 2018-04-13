const assert = require('power-assert');
const { test } = require('eater/runner');
const parseMD = require('../src/parseMD');

test('parseMD should return tags and content when receive MD string', () => {
  const actual = parseMD(`

# Hooo
## hoge
`);
  assert.deepEqual(actual, {
    tags: [], content: '# Hooo\n## hoge\n',
  });
});


test('parseMD should return tags and content when receive MD string', () => {
  const actual = parseMD(`

- hoge
- hoo
- bar

# Hooo
## hoge
`);
  assert.deepEqual(actual, {
    tags: ['hoge', 'hoo', 'bar'], content: '# Hooo\n## hoge\n',
  });
});

