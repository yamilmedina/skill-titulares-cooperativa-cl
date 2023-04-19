const TTS_PAUSE_HEADLINE = '<break time="1s"/>';
const TTS_PAUSE_BETWEEN_ARTICLE = '<break time="2s"/>';
const DATE_FORMAT_OPTIONS = { weekday: 'long', month: 'long', day: 'numeric' };
const LIMIT_NEWS = 8000;
const TODAY = { date: new Date().toDateString() };

function formatNewArticle(article) {
  return TTS_PAUSE_HEADLINE
    .concat(article.title)
    .concat(TTS_PAUSE_HEADLINE)
    .concat(article.description)
    .concat(TTS_PAUSE_BETWEEN_ARTICLE);
}

// eslint-disable-next-line func-names
const formatNewsForTTS = function (news) {
  const lastProcessedDateOrToday = new Date(news[0]?.date ?? TODAY.date).toLocaleDateString('es-CL', DATE_FORMAT_OPTIONS);
  const finalTTS = 'El '.concat(lastProcessedDateOrToday);

  return finalTTS + news.reduce((accumulator, currentArticle) => {
    if ((accumulator + currentArticle).length > LIMIT_NEWS) return accumulator;
    return accumulator + formatNewArticle(currentArticle);
  }, '');
};

module.exports = { formatNewsForTTS };
