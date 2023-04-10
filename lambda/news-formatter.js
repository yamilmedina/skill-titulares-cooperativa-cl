const TTS_PAUSE_HEADLINE = '<break time="1s"/>';
const TTS_PAUSE_BETWEEN_ARTICLE = '<break time="3s"/>';
const DATE_FORMAT_OPTIONS = { weekday: 'long', month: 'long', day: 'numeric' };

const formatNewsForTTS = function (news) {
    return news
        .map(article => {
            "El " + new Date(article.pubDate).toLocaleDateString('es-CL', options)
                + TTS_PAUSE_HEADLINE
                + article.title
                + TTS_PAUSE_HEADLINE
                + article.description;
        })
        .join(TTS_PAUSE_BETWEEN_ARTICLE);
}

module.exports = { formatNewsForTTS }