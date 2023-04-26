const { XMLParser } = require('fast-xml-parser');
const axios = require('axios');
const jsonNormalize = require('json-normalize');
const short = require('short-uuid');

// yyyy-MM-dd’T’HH:mm:ss'.0Z'
const parser = new XMLParser();

function parseNewsToAlexaBrief() {
  axios.get('https://www.cooperativa.cl/noticias/site/tax/port/all/rss____1.xml')
    .then((result) => {
      const jsonObj = parser.parse(result.data);
      const processedNews = jsonObj.rss.channel.item
        .filter((it) => it.description !== '')
        .map((it) => ({
          uid: short.uuid(),
          titleText: it.title,
          mainText: it.prontus_audio1 === undefined ? it.description : '',
          updateDate: new Date(it.pubDate).toISOString(),
          redirectionUrl: it.link,
          streamUrl: it.prontus_audio1 !== undefined ? `https://media.cooperativa.cl${it.prontus_audio1}` : undefined,
        }));
      jsonNormalize.stringify(processedNews, (err, results) => { console.log(results); });
    }).catch((err) => console.log(err));
}

parseNewsToAlexaBrief();
