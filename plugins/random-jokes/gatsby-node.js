const axios = require('axios');
const crypto = require('crypto');

const API_URI =
'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten';

exports.sourceNodes = async ({boundActionCreators}) => {
  const {createNode} = boundActionCreators;
  const jokeResult = await axios.get(API_URI);
  for (const singleJoke of jokeResult.data) {
    await createNode({
      children: [],
      id: singleJoke.id.toString(),
      setup: singleJoke.setup,
      punchline: singleJoke.punchline,
      parent: null,
      internal: {
        type: 'singleJoke',
        contentDigest: crypto
        .createHash(`md5`)
        .update(JSON.stringify(singleJoke))
        .digest(`hex`),
      },
    });
  }
};