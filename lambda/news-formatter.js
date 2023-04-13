const TTS_PAUSE_HEADLINE = '<break time="1s"/>';
const TTS_PAUSE_BETWEEN_ARTICLE = '<break time="2s"/>';
const DATE_FORMAT_OPTIONS = { weekday: 'long', month: 'long', day: 'numeric' };
const LIMIT_NEWS = 8000;
const TODAY = { date: new Date().toDateString() }

const formatNewsForTTS = function (news) {
    let lastProcessedDateOrToday = new Date(news[0]?.date ?? TODAY.date).toLocaleDateString('es-CL', DATE_FORMAT_OPTIONS);
    let finalTTS = 'El '.concat(lastProcessedDateOrToday);

    return finalTTS + news.reduce((accumulator, currentArticle) => {
        if ((accumulator + currentArticle).length > LIMIT_NEWS) return accumulator;
        else return accumulator + formatNewArticle(currentArticle);
    }, '');
}

function formatNewArticle(article) {
    return TTS_PAUSE_HEADLINE
        .concat(article.title)
        .concat(TTS_PAUSE_HEADLINE)
        .concat(article.description)
        .concat(TTS_PAUSE_BETWEEN_ARTICLE);
}

module.exports = { formatNewsForTTS }
