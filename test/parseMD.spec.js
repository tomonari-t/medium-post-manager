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
- GitHub
- Google Cloud Functions

# Header
`);
  assert.deepEqual(actual, {
    tags: ['GitHub', 'Google Cloud Functions'], content: `# Header
`,
  });
});

