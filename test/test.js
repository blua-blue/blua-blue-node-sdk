const assert = require('assert');
const Client = require('../client.js');

let validInstance;
const u = 'demo';
const p = 'sampleUser1';

describe('Client', function() {
    describe('#init() - OK', function() {
        it('should return a valid authentication', async function() {
            await assert.doesNotReject(Client.init(u,p), 'Authentication failed');
        });
    });
    describe('#getArticle() - slug', function(){
        it('should return an object with matching slugs', async function () {
            let slug = 'sample-article', article = await Client.getArticle(slug);
            assert.equal(article.slug, slug);
        })
    });
    describe('#getArticle() - rerun for cache', function(){
        it('should return an object with matching slugs', async function () {
            let slug = 'sample-article', article = await Client.getArticle(slug);
            assert.equal(article.slug, slug);
        })
    });
    describe('#findInCache() - slug', function(){
        it('should return an object with matching slugs', async function () {
            let slug = 'sample-article', article = await Client.findInCache('slug', slug);
            assert.equal(article.slug, slug);
        })
    });
    describe('#findInCache() - slug', function(){
        it('should fail retrieving an unknow article', async function () {
            let slug = 'sample-article-unknown-slug', article = await Client.findInCache('slug', slug);
            assert.equal(false, article);
        })
    });
    describe('#getArticleList()', function(){
        it('should return an object with matching slugs', async function () {
            let articles = await Client.getArticleList();
            assert(Array.isArray(articles));
            assert.equal(Client.cache.length, articles.length);
        })
    });

});