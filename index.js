const getAddedFileList = (commitList) => {
    let fileList = [];
    commitList.forEach(commit => {
        fileList = fileList.concat(commit.added);
    });
    return fileList;
};

const getModifiedFileList = (commitList) => {
    let fileList = [];
    commitList.forEach(commit => {
        fileList = fileList.concat(commit.modified);
    });
    return fileList;
};

exports.postMedium = (req, res) => {
    require('dotenv').config();
    const body = req.body;
    const commits = req.body.commits;
    // parse request => get request source(URL with add or modify type)
    // request medium
    let addedFileList = getAddedFileList(commits);
    let modifiedFileList = getModifiedFileList(commits);
    res.send(200);
};
exports.getAddedFileList = getAddedFileList;
exports.getModifiedFileList = getModifiedFileList;
