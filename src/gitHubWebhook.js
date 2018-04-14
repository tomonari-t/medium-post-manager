require('dotenv').config();
const request = require('request-promise');
const flow = require('promise-control-flow');
const parseMD = require('./parseMD');
const { GITHUB_ACCESS_TOKEN } = process.env;

const _requestGithub = (option) => {
  const defaultOption = {
    headers: {
      Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
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

    _requestGithub(option).then((json) => {
      const res = JSON.parse(json);
      const downloadContentUrl = res.download_url;
      return _requestGithub({ url: downloadContentUrl });
    }).then((content) => {
      resolve(content);
    }).catch((e) => {
      reject(e);
    });
  });
};


const getAddedContent = (webhookObj) => {
  return new Promise((resolve, reject) => {
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
        }).
        catch((e) => {
          reject(e);
        });
      });
    });
    
    // getContent
    flow.parallel(taskList)
      .then((contentList) => {
        resolve(contentList);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

module.exports.getAddedContent = getAddedContent;
