const request = require('request-promise');

const requestGithub = (option) => {
  const defaultOption = {
    headers: {
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      'User-Agent': 'posts-medium',
      'Content-Type': 'application/json',
    },
  };
  option = Object.assign(option, defaultOption);
  return request(option);
};

const getContentUrls = (webhooqRequestBody) => {
  let addedFileList = [];
  webhooqRequestBody.commits.forEach((commit) => {
    addedFileList = addedFileList.concat(commit.added);
  });

  const contentsUrl = webhooqRequestBody.repository.contents_url;
  const addedUrlList = addedFileList.map(file => contentsUrl.replace(/\{\+path\}/, file));
  return addedUrlList;
};

const getContent = (contentUrl) => {
  return new Promise((resolve, reject) => {
    const option = {
      url: contentUrl,
      method: 'GET',
    };
    requestGithub(option).then((json) => {
      const res = JSON.parse(json);
      const downloadContentUrl = res.download_url;
      return requestGithub({url: downloadContentUrl });
    }).then((content) => {
      resolve(content);
    }).catch((e) => {
      reject(e);
    });
  });
};

module.exports.getContentUrls = getContentUrls;
module.exports.getContent = getContent;
