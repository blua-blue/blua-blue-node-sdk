const client = require('../client.js');



client.init('demo','sampleUser1').then(async ()=>{
    // let articles = await client.getArticleList();

    client.token = client.token + 'e';
    console.log(await client.getArticle('sample-article'));
    // console.log(await client.getArticle('hacktoberfest-shirt-arrived'));
}).catch(err=>{
    console.log(err);
});
