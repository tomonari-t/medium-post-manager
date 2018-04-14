const isStartMDBody = string => /#+\s\S+/.test(string);
const getTag = (string) => {
  const regResult = string.match(/-\s(.+)/);
  if (regResult !== null) {
    return regResult[1];
  }
  return '';
};

const parseMD = (mdString) => {
  const mdLines = mdString.trim().split('\n');
  console.log(mdLines);
  let tags = [];
  let tagsEndIndex;
  for (let i = 0; i < mdLines.length; i += 1) {
    const text = mdLines[i];
    if (isStartMDBody(text)) {
      tagsEndIndex = i;
      break;
    }

    tags.push(getTag(text));
  }
  mdLines.splice(0, tagsEndIndex);
  console.log(tags);
  tags = tags.filter(tag => (tag.length !== 0));
  const content = mdLines.join('\n');
  const parsedVal = {
    tags,
    content: `${content}\n`,
  };
  return parsedVal;
};

module.exports = parseMD;
