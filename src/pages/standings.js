import React from 'react'
import Layout from '../components/layout'

const StandingsPage = (props) => {
  const players = props.data.allSeason.edges;

  return (
    <Layout>
    <div>
    {players.map((player, i) => {
      const playerData = player.node;
      return (
        <div key={i}>
        <p>Name: {playerData.table.name}</p>
        <p>{playerData.position}</p>
        <p>{playerData.dateOfBirth}</p>
        <p>{playerData.shirtNumber}</p>
        <hr/>
        </div>
        )
    })}
    </div>
    </Layout>
    );
};

export default StandingsPage

export const query = graphql`
query SeasonQuery {
  allSeason {
    edges {
      node {
        table {
          won
          draw
          lost
          team {
            name
            crestUrl
          }
        }
      }
    }
  }
}
`;