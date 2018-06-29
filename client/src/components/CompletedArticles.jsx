import React from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_USER_FROM_DB } from '../apollo/serverQueries.js';
import {GET_USER_INFO} from '../apollo/localQueries.js';




class CompletedArticles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Query query={GET_USER_INFO}>
          {(({data}) => {
            return (
              <Query query={GET_USER_FROM_DB} variables={{ _id: data.userInfo.userId }}>
                {({ loading, error, data }) => {
                  if (loading) return "Loading...";
                  if (error) return `Error! ${error.message}`;
                  var completedArticleInfo = JSON.parse(data.user.completed_articles);
                  var completedArticleKeys = Object.keys(completedArticleInfo);
                  console.log(completedArticleInfo);
                  console.log(completedArticleKeys);
                  return (
                    <div>{completedArticleKeys.map((articleId) => {
                      return (
                        <ul>
                          <li>Article ID: {articleId}</li>
                          <li>Article Stance:{completedArticleInfo[articleId].articleStance}</li>
                          <li>Date Completed: {completedArticleInfo[articleId].completed}</li>
                          <li>Nutritional Value: {completedArticleInfo[articleId].nutritionalValue}</li>
                          <li>Your Stance At Time: {completedArticleInfo[articleId].onboardStance}</li>
                        </ul>
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