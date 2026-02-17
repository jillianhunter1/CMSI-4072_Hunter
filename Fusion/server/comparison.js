const stopWords = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
  'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers',
  'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
  'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are',
  'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
  'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as',
  'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between',
  'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from',
  'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further',
  'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any',
  'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
  'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can',
  'will', 'just', 'don', 'should', 'now'
]);

function tokenize(text) {
  return text.toLowerCase().split(/\W+/).filter(token => token.length > 0);
}

function findSimilarities(responses) {
  const { chatGPT, claude, gemini } = responses;

  const tokenizedChatGPT = new Set(tokenize(chatGPT).filter(token => !stopWords.has(token)));
  const tokenizedClaude = new Set(tokenize(claude).filter(token => !stopWords.has(token)));
  const tokenizedGemini = new Set(tokenize(gemini).filter(token => !stopWords.has(token)));

  const commonTokens = [...tokenizedChatGPT].filter(token =>
    tokenizedClaude.has(token) && tokenizedGemini.has(token)
  );

  return commonTokens.join(' ');
}

module.exports = { findSimilarities };
