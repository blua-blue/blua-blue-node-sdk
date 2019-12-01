const assert = require('assert');
const Client = require('../client.js');

let validInstance;
const u = 'demo';
const p = 'sampleUser1';

describe('Client', function() {
    describe('#init() - OK', function() {
        it('should return a valid authentication', async function() {
            validInstance = await Client.init(u,p);
            assert(validInstance, 'Authentication failed');
        });
    });
    describe('#getArticle() - slug', function(){
        it('should return an object with matching slugs', async function () {

            let slug = 'sample-article', article = await Client.getArticle(slug);
            assert.equal(article.slug, slug);
        })
    });
    describe('#getArticleList()', function(){
        it('should return an object with matching slugs', async function () {

            let articles = await Client.getArticleList();
            assert(Array.isArray(articles));
        })
    });
    describe('#init() - Fail', function() {
        it('should return a valid authentication', async function() {
            assert.rejects(Client.init('demo1','sampleUser1'));
        });
    });

});