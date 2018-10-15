import React from 'react'
import Layout from '../components/layout'

const AboutPage = (props) => {
  const players = props.data.allTeamData.edges;

  return (
    <Layout>
    <div>
    {players.map((player, i) => {
      const playerData = player.node;
      return (
        <div key={i}>
        <p>Name: {playerData.name}</p>
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

export default AboutPage

export const query = graphql`
query TeamDataQuery {
  allTeamData {
    edges {
      node {
        name
        position
        dateOfBirth
        shirtNumber
      }
    }
  }
}
`;