const axios = require('axios');
const crypto = require('crypto');
const KEY = require('./client_secrets.json')['fd_key'];

var API_KEY = {
  headers: { 'X-Auth-Token': KEY}
};

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators;

  const fetchPlayers = () => axios.get(`https://api.football-data.org/v2/teams/100`, API_KEY);
  const fetchStandings = () => axios.get(`https://api.football-data.org/v2/competitions/SA/standings`, API_KEY);
  const fetchMatches = () => axios.get(`https://api.football-data.org/v2/teams/100/matches?status=SCHEDULED&limit=35`, API_KEY);

  const player = await fetchPlayers();
  const team = await fetchStandings();
  const match = await fetchMatches();

/////////// ROSTER
player.data.squad.map((player, i) => {
  const playerNode = {
    id: `${i}`,
    parent: `__SOURCE__`,
    internal: {
      type: `TeamData`,
    },
    children: [],

    name: player.name,
    position: player.position,
    dateOfBirth: player.dateOfBirth,
    shirtNumber: player.shirtNumber,
  }

  const contentDigest = crypto
  .createHash(`md5`)
  .update(JSON.stringify(playerNode))
  .digest(`hex`);
  playerNode.internal.contentDigest = contentDigest;

  createNode(playerNode);
}),

/////////// STANDINGS
team.data.standings.map((team, i) => {

  const standingsNode = {
    id: `${i}`,
    parent: `__SOURCE__`,
    internal: {
      type: `Season`,
    },
    children: [],

    stage: team.stage,
    type: team.type,

    table: team.table.map(data=>{
      return data;
    })
  }

  const contentDigest = crypto
  .createHash(`md5`)
  .update(JSON.stringify(standingsNode))
  .digest(`hex`);
  standingsNode.internal.contentDigest = contentDigest;

  createNode(standingsNode);
});


/////////// MATCHES
/*match.data.matches.map((match, i) => {
  const matchesNode = {
    id: `${i}`,
    parent: `__SOURCE__`,
    internal: {
      type: `Matches`,
    },
    children: [],

    competition: match.name,
    hometeam: match.homeTeam.name,
    awayteam: match.awayTeam.name,
  }

  const contentDigest = crypto
  .createHash(`md5`)
  .update(JSON.stringify(matchesNode))
  .digest(`hex`);
  matchesNode.internal.contentDigest = contentDigest;

  createNode(matchesNode);
});*/
return;
}