const isMDList = text => /-\s\S+/.test(text);

const parseMD = (mdString) => {
  const mdLines = mdString.trim().split('\n');
  const tags = [];
  mdLines.forEach((text, index) => {
    let isBreak = false;
    if (!isMDList(text)) {
      isBreak = true;
    }

    if (!isBreak) {
      mdLines.splice(index, 1);
      tags.push(text.trim());
    }
  });
  const parsedVal = {
    tags,
    content: mdLines.join('\n'),
  };
  return parsedVal;
};

module.exports = parseMD;
