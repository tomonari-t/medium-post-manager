require('dotenv').config();
const flow = require('promise-control-flow');
const { getAddedContent } = require('./src/gitHubWebhook');
const MediumPublisher = require('./src/MediumPublisher');

exports.postMedium = (req, res) => {
  getAddedContent(req.body)
    .then((contentList) => {

      if (!contentList) {
        res.send(200);
        return;
      }

      const postTaskList = contentList.map((content) => {
        const client = new MediumPublisher();
        return () => client.publish(content.title, content.content, content.tags, true);
      });
      flow.parallel(postTaskList)
        .then(() => {
          res.send(200);
        }).catch((e) => {
          console.error(e);
          res.send(500);
        });
    }).catch((e) => {
      console.error(e);
      res.send(500);
    });
};
