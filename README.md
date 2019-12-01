# blua.blue nodeJS SDK

[![Build Status](https://travis-ci.com/blua-blue/blua-blue-node-sdk.svg?branch=master)](https://travis-ci.com/blua-blue/blua-blue-node-sdk)
[![Maintainability](https://api.codeclimate.com/v1/badges/7458956afd25f9e76de7/maintainability)](https://codeclimate.com/github/blua-blue/blua-blue-node-sdk/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7458956afd25f9e76de7/test_coverage)](https://codeclimate.com/github/blua-blue/blua-blue-node-sdk/test_coverage)

Easily integrate your [blua.blue](https://blua.blue) content into your nodeJS application.

## Installation

`npm i blua-blue-node-sdk`

## Usage

```javascript
const client = require('blua-blue-node-sdk');

let articles = [], article = {};

client.init('user-name', 'password').then(async () => {
    // a particular article
    article = await client.getArticle('my-article');
    // my articles
    articles = await client.getArticleList();
});

```

## init()

### parameters
- string: userName
- string: password
- string: api-base-uri (optional, needed for self-hosted instances)

Returns a promise resolving _true_ or rejecting _false_. Successful authentication results in setting 
- currentUser
- token (JWT)

```javascript
const client = require('blua-blue-node-sdk');

client.init('user-name', 'password').then(() => {
    console.log(client.currentUser);
});
``` 

## getArticle()

### parameter
- string: slugOrId

Returns an article object. Accepts the UUID or the unique article-slug of an article. 

## getArticleList()

### parameter
- object: condition (optional)

Returns articles met by the condition object. The condition defaults to all articles by current user.
Please see the blua.blue API specs to see possible conditions.