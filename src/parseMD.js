const parseMD = (mdString) => {
  const mdLines = mdString.trim().split('\n');
  const tags = [];
  for (let index = 0; index < mdLines.length; index += 1) {
    const text = mdLines[index];
    if (/-\s\S+/.test(text)) {
      mdLines.splice(index, 1);
      tags.push(text.trim());
    }
  const parsedVal = {
    tags,
    content: mdLines.join('\n'),
  };

  return parsedVal;
};

module.exports = parseMD;
