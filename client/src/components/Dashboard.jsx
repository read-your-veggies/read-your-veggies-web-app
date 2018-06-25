import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_ARTICLES_FROM_SERVER, GET_ONE_FULL_ARTICLE } from '../apollo/serverQueries';
import { GET_TEAM_NAME_FROM_LOCAL_STATE } from '../apollo/localQueries';
import ArticleCard from './ArticleCard.jsx';

class Dashboard extends Component {
  render() {
    return(
      <div> 
        {/* <h1>Doctor's Orders</h1>   */}

        <Query query={GET_ARTICLES_FROM_SERVER}>
          {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
              <div className="grid">
                {data.articles.map((article) => (
                  <ArticleCard article={article}/>
                ))}
              </div>
            );
          }}
        </Query>

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