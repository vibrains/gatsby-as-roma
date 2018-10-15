const axios = require('axios');
const crypto = require('crypto');
const KEY = require('./client_secrets.json')['fd_key'];

var API_KEY = {
  headers: { 'X-Auth-Token': KEY}
};


const API_URI = ('https://api.football-data.org/v2/competitions/SA/standings', API_KEY);

exports.sourceNodes = async ({boundActionCreators}) => {
  const {createNode} = boundActionCreators;
  const answerResult = await axios.get(API_URI);
  for (const singleAnswer of answerResult.data) {
    await createNode({
      children: [],
      id: singleAnswer.id.toString(),
      setup: singleAnswer.setup,
      punchline: singleAnswer.punchline,
      parent: null,
      internal: {
        type: 'singleAnswer',
        contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(singleAnswer))
        .digest(`hex`),
      },
    });
  }

console.log(singleAnswer);

};