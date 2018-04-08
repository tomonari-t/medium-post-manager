require('dotenv').config();
const Client = require('medium-sdk').MediumClient;
const contentFormat = require('medium-sdk').PostContentFormat;
const publishStatus = require('medium-sdk').PostPublishStatus;

const MEDIUM_ACCESS_TOKEN = process.env.MEDIUM_ACCESS_TOKEN;

class MediumPublisher {
    constructor(client) {
        this._client = client;
        this._userId = null;
        this._postParam = null;
        this._title = null;
        this._contentMD = null;
        this._tags = null;
        this._isPublish = null;
    }

    publish(title, contentMD, tags, isPublish) {
        this._title = title;
        this._contentMD = contentMD;
        this._tags = tags;
        this._isPublish = isPublish;
        return new Promise((resolve, reject) => {
            this._getUserId()
                .then(() => this._postMedium())
                .then((post) => {
                    resolve(post)
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                });
        });
    }

    _postMedium() {
        this._postParam = {
            userId: this._userId,
            title: this._title,
            contentFormat: contentFormat.MARKDOWN,
            content: this._contentMD,
            tags: this._tags ? this._tags : [],
            publishStatus: this._isPublish ? publishStatus.PUBLIC : publishStatus.DRAFT
        };
        return new Promise((resolve, reject) => {
            this._client.createPost(this._postParam, (err, post) => {
                if (err) reject(err);
                resolve(post);
            });
        });
    }

    _getUserId() {
        return new Promise((resolve, reject) => {
            this._client.getUser((err, user) => {
                if (err) reject(err);
                this._userId = user.id;
                resolve();
            });
        });
    }
}

const client = new Client({
    clientId: 'damy', // Because SDK have to enter some key
    clientSecret: 'damy' // Because SDK have to enter some key
}).setAccessToken(MEDIUM_ACCESS_TOKEN);

const tet = new MediumPublisher(client);
tet.publish(
    'test2', '### ew', [], false
);

module.exports = MediumPublisher;
