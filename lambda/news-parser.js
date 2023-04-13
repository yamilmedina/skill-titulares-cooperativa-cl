const { XMLParser } = require('fast-xml-parser');
const axios = require('axios');

const parser = new XMLParser();
const fetchNewsFromCooperativa = function () {
    return new Promise((resolve, reject) => {
        axios.get('https://www.cooperativa.cl/noticias/site/tax/port/all/rss____1.xml')
            .then(result => {
                let jsonObj = parser.parse(result.data);
                let processedNews = jsonObj.rss.channel.item
                    .filter(it => it.description !== '')
                    .map(it => ({
                        title: it.title,
                        description: it.description,
                        time: it.prontus_horap,
                        date: it.pubDate,
                        link: it.link
                    }));
                resolve(processedNews);
            }).catch(err => reject(err));
    })
}

module.exports = { fetchNewsFromCooperativa }
