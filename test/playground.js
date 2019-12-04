const client = require('../client.js');


client.init('demo','sampleUser1').then(async ()=>{
    let articles = await client.getArticleList();

    console.log(await client.findInCache( 'slug','sample-article-5'));
}).catch(err=>{
    console.log(err);
});
