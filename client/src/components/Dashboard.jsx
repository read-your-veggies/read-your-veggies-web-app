import React, { Component } from 'react';
import { Route, withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { GET_ARTICLES_FROM_SERVER } from '../apollo/serverQueries';
import { GET_TEAM_NAME_FROM_LOCAL_STATE } from '../apollo/localQueries';
import { DELETE_ARTICLE } from '../apollo/resolvers';
import Panel from 'react-bootstrap/lib/Panel';


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

class Dashboard extends Component {
  render() {
    return(
      <div>
        
          <h1>Doctor's Orders</h1>
        
        <Mutation mutation={DELETE_ARTICLE} update={updateCache}>
        { (deleteArticle) => {
          return (
            <Query query={GET_ARTICLES_FROM_SERVER}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;

              return (
                <div className="grid">
                  {data.articles.map((article) => (
                    <Panel className="article" onClick={() => deleteArticle({ variables: { _id: article._id } })}>
                        <Panel.Heading className='title'>
                          <Panel.Title>{article.title}</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body className='subtitle'>{article.description}</Panel.Body>
                    </Panel>
                  ))}
                </div>
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

export default withRouter(Dashboard);