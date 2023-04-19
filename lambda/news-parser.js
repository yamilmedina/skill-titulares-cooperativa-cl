const { XMLParser } = import('fast-xml-parser');
const axios = import('axios');

const parser = new XMLParser();
// eslint-disable-next-line func-names
const fetchNewsFromCooperativa = function () {
  return new Promise((resolve, reject) => {
    axios.get('https://www.cooperativa.cl/noticias/site/tax/port/all/rss____1.xml')
      .then((result) => {
        const jsonObj = parser.parse(result.data);
        const processedNews = jsonObj.rss.channel.item
          .filter((it) => it.description !== '')
          .map((it) => ({
            title: it.title,
            description: it.description,
            time: it.prontus_horap,
            date: it.pubDate,
            link: it.link,
          }));
        resolve(processedNews);
      }).catch((err) => reject(err));
  });
};

export default { fetchNewsFromCooperativa };
