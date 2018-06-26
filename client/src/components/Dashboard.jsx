import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_TEAM_NAME_FROM_LOCAL_STATE } from '../apollo/localQueries';
import ArticleCarousel from './ArticleCarousel.jsx';


class Dashboard extends Component {
  render() {
    return(
      <div> 
        <ArticleCarousel />
        <Query query={GET_TEAM_NAME_FROM_LOCAL_STATE}>
          {({ data, client }) => {
            return (
              <h1 onClick={() =>  {
                client.writeData({ data: { teamName: data.teamName + 1 } })
              }}
              >{data.teamName}</h1>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default withRouter(Dashboard);