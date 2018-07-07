import React from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_ONE_FULL_ARTICLE, GET_COMPLETED_ARTICLES } from '../apollo/serverQueries.js';
import {GET_USER_INFO} from '../apollo/localQueries.js';
import Panel from 'react-bootstrap/lib/Panel';
import Loading from './Loading.jsx';
import Error from './Error.jsx';

class CompletedArticles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Query query={GET_USER_INFO}>
          {(({data}) => {
            return (
              <Query query={GET_COMPLETED_ARTICLES} variables={{ _id: data.userInfo.userId }}>
                {({ loading, error, data }) => {
                  if (loading) return <Loading />;
                  if (error) {
                    console.log(`Error! ${error.message}`);
                    return <Error />
                  }
                  var completedArticleInfo = JSON.parse(data.user.completed_articles);
                  var completedArticleKeys = Object.keys(completedArticleInfo);
                  completedArticleKeys.reverse();
                  return (
                    <div className="completed-articles-container">{completedArticleKeys.map((articleId) => {
                      return (
                        <Query query={GET_ONE_FULL_ARTICLE} variables={{_id: articleId}}>
                          {({ loading, error, data }) => {
                            if (loading) return <Loading />;
                            if (error) {
                              console.log(`Error! ${error.message}`);
                              return <Error />
                            }
                            var article = data.article;
                            return (
                              <Panel className="completed-article">
                                <Panel.Heading className="completed-article-title">
                                  <a href={article.url}>{article.title}</a>
                                </Panel.Heading>
                                <Panel.Body>
                                  <p>Nutrition for you: {completedArticleInfo[articleId].nutritionalValue}</p>
                                  <img src={article.image} />                             
                                </Panel.Body>
                              </Panel>
                            )
                          }}
                        </Query>                       
                      );
                    })}
                    </div>
                  );
                }}
              </Query>
            );
          }
          )}
        </Query>
    );
  }
}

export default withRouter(CompletedArticles);