# Medium Post Manager

## What

When you add and push your .md, publish your post with tags.

Cause of Medium's API, now **only support to create post**.

Expamle:

```
- tag1
- tag2

# Header 1

hoooo

## Header 2

bazzzz

```

When you push above `expamle post.md`, at Mesium publise below.

---

title: example post

tags: tag1, tag2

<h1>Header 1</h1>

<p>hoooo</p>

<h2>Header 2</h2>

<p>bazzzz</p>

---

## Set-up

You need `GCP project`, because we se Cloud Functoins.

#### 1. Create your posts repository
#### 2. Clone this repository
#### 3. Get your Medium and GitHub Accesskey and write down it `.env` file
Create `.env` and put it top this directory.

// `.env`
```
MEDIUM_ACCESS_TOKEN=xxxxx
GITHUB_ACCESS_TOKEN=yyyyy
```

#### 4. `% npm run deploy`
#### 5. Set webhook your repository to kick your Cloud Function

## Usage

Only you push your repository.

### tags

First your `.md`'s lists are tags at Medium.