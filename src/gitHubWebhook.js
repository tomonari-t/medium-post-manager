const request = require('request-promise');
const flow = require('promise-control-flow');
const parseMD = require('./parseMD');

const requestGithub = (option) => {
  const defaultOption = {
    headers: {
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
      'User-Agent': 'posts-medium',
      'Content-Type': 'application/json',
    },
  };
  option = Object.assign(defaultOption, option);
  return request(option);
};

const getContentUrls = (webhooqRequestBody) => {
  let addedFileList = [];
  webhooqRequestBody.commits.forEach((commit) => {
    addedFileList = addedFileList.concat(commit.added);
  });

  const contentsUrl = webhooqRequestBody.repository.contents_url;
  const addedUrlList = addedFileList.map((file) => {
    return {
      title: file.match(/(.*).md/)[1],
      url: contentsUrl.replace(/\{\+path\}/, file)
    };
  });
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


const getAddedContent = (webhookObj) => {
  return new Promise((resolve) => {
    const contentInfoList = getContentUrls(webhookObj);
    const taskList = [];
    contentInfoList.forEach((contentInfo) => {
      taskList.push(() => {
        return getContent(contentInfo.url)
        .then((content) => {
          const parsedContent = parseMD(content);
          return {
            title: contentInfo.title,
            content: parsedContent.content,
            tags: parsedContent.tags,
          };
        });
      });
    });
    
    // getContent
    flow.parallel(taskList)
      .then((contentList) => {
        resolve(contentList);
      });
  });
};

module.exports.getContentUrls = getContentUrls;
module.exports.getContent = getContent;
module.exports.getAddedContent = getAddedContent;
