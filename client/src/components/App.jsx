import React, { Component } from 'react';
import { Route, withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_ARTICLES_FROM_SERVER } from '../apollo/serverQueries';
import { GET_TEAM_NAME_FROM_LOCAL_STATE } from '../apollo/localQueries';
import axios from 'axios';


class App extends Component {
  render() {
    return(
      <div>
      <Query query={GET_ARTICLES_FROM_SERVER}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <ul>{data.articles.map((article) => (
              <div className ='article-stream-card'>
                <li className = 'article-stream-card-title'>{article.title}</li>
                <li className = 'article-stream-card-desc'>{article.description}</li>
              </div>
            ))}</ul>
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

export default withRouter(App);