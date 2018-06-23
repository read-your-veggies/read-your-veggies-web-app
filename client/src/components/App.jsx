import React, { Component } from 'react';
import { Route, withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { GET_ARTICLES_FROM_SERVER } from '../apollo/serverQueries';
import { GET_TEAM_NAME_FROM_LOCAL_STATE } from '../apollo/localQueries';
import { DELETE_ARTICLE } from '../apollo/resolvers';
import axios from 'axios';

const updateCache = (cache, { data: { deleteArticle} }) => {
  console.log(cache, deleteArticle);
  const { articles } = cache.readQuery({ query: GET_ARTICLES_FROM_SERVER });

  cache.writeQuery({
    query: GET_ARTICLES_FROM_SERVER,
    data: {
      articles: articles.filter(article => article._id !== deleteArticle._id)
    }
  });
};

class App extends Component {
  render() {
    return(
      <div>
        <a className="button">Button</a>
        <Mutation mutation={DELETE_ARTICLE} update={updateCache}>
        { (deleteArticle) => {
          return (
            <Query query={GET_ARTICLES_FROM_SERVER}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;

              return (
                <ul>{data.articles.map((article) => (
                  <div onClick={() => deleteArticle({ variables: { _id: article._id } })} className ='article-stream-card'>
                    <li className = 'article-stream-card-title'>{article.title}</li>
                    <li className = 'article-stream-card-desc'>{article.description}</li>
                  </div>
                ))}</ul>
              );
            }}
          </Query>

          )}}
        </Mutation>
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