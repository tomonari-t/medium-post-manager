require('dotenv').config();

const getAddedFileList = (commitList) => {
  let fileList = [];
  commitList.forEach((commit) => {
    fileList = fileList.concat(commit.added);
  });
  return fileList;
};

const getModifiedFileList = (commitList) => {
  let fileList = [];
  commitList.forEach((commit) => {
    fileList = fileList.concat(commit.modified);
  });
  return fileList;
};

exports.postMedium = (req, res) => {
  // const {
  //   commits,
  // } = req.body;
  // parse request => get request source(URL with add or modify type)
  // request medium
  // const addedFileList = getAddedFileList(commits);
  // const modifiedFileList = getModifiedFileList(commits);
  res.send(200);
};
exports.getAddedFileList = getAddedFileList;
exports.getModifiedFileList = getModifiedFileList;
