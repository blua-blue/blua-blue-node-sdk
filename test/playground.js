const client = require('../client.js');


client.init('demo','sampleUser1').then(async ()=>{
    let articles = await client.getArticleList();
    console.log(articles);
}).catch(err=>{
    console.log(err);
});