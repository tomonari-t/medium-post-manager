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
    const body = req.body;
    const commits = req.body.commits;
    let addedFileList = getAddedFileList(commits);
    let modifiedFileList = getModifiedFileList(commits);
    res.send(200);
};
exports.getAddedFileList = getAddedFileList;
exports.getModifiedFileList = getModifiedFileList;
