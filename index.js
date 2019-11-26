const superagent = require('superagent');
let chapters = [];
const cheerio = require('cheerio');

let getChapters = (res) => {
    console.log('callback');
    chapters = [];
    let $ = cheerio.load(res.text);
    $('div.chapter-list:last a').each((idx, ele) => {
        let chapter = $(ele).attr('href');
        chapters.push(chapter);
    });
    return chapters;
};

let getContent = (url) => {
    let result;
    superagent.get(url).end((err, res) => {
        if (err) {
            console.log('getContent' + err);
        } else {
            let $ = cheerio.load(res);
            result = {
                title: $('body > div.container > h1').text().trim(),
                content: $('#ChapterView > div.bd > div > p').text().trim()
            }
        }
    });
    return result;
};


superagent.get('http://www.lsjxs2.xyz/10/10967_' + '1'+'/').end((err, res) => {
        console.log(123);
        chapters.push(getChapters(res)) ;
});


results = chapters.forEach(x => getContent(x));
str = results.join('\n');
var fs = require('fs');
fs.writeFile('result.txt', str, function (err) {
    if (err) {
        return console.log(err)
    }
});