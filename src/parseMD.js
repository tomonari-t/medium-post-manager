const parseMD = (mdString) => {
  let mdLines = mdString.trim().split('\n');
  const tags = [];
  for (let index = 0; index < mdLines.length; index += 1) {
    const text = mdLines[index];
    if (!/-\s\S+/.test(text)) break;

    mdLines = mdLines.slice(index, index + 1);
    // TODO: textをトリム
    tags.push(text);
  }
  const parsedVal = {
    tags,
    content: mdLines.join('\n'),
  };
  return parsedVal;
};

module.exports = parseMD;
