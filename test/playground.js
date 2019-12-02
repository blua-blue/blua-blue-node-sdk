const client = require('../client.js');



client.init('demo','sampleUser1s').then(async ()=>{
    // let articles = await client.getArticleList();

    // console.log(await client.getArticle('sample-article'));
    console.log(await client.getArticle('hacktoberfest-shirt-arrived'));
}).catch(err=>{
    console.log(err);
});
