const TTS_PAUSE_HEADLINE = '<break time="1s"/>';
const TTS_PAUSE_BETWEEN_ARTICLE = '<break time="3s"/>';
const DATE_FORMAT_OPTIONS = { weekday: 'long', month: 'long', day: 'numeric' };

const formatNewsForTTS = function (news) {
    return news
        .map(article => {
            "El ".concat(new Date(article.date).toLocaleDateString('es-CL', DATE_FORMAT_OPTIONS))
                .concat(TTS_PAUSE_HEADLINE)
                .concat(article.title)
                .concat(TTS_PAUSE_HEADLINE)
                .concat(article.description);
        })
        .join(TTS_PAUSE_BETWEEN_ARTICLE);
}

module.exports = { formatNewsForTTS }