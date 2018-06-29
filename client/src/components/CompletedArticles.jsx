import React from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_USER_FROM_DB, GET_ONE_FULL_ARTICLE } from '../apollo/serverQueries.js';
import {GET_USER_INFO} from '../apollo/localQueries.js';
import Panel from 'react-bootstrap/lib/Panel';


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
                  console.log(completedArticleInfo);
                  var completedArticleKeys = Object.keys(completedArticleInfo);
                  return (
                    <div className="completed-articles-container">{completedArticleKeys.map((articleId) => {
                      return (
                        <p></p>
                        // <Query
                        //   query={GET_ONE_FULL_ARTICLE}
                        //   variables={{ _id: articleId.articleId }}
                        // >
                        //   {({ loading, error, data }) => {
                        //     if (loading) return "Loading...";
                        //     if (error) return `Error! ${error.message}`;
                        //     return (
                        //       <Panel className="completed-article">
                        //         <Panel.Heading>
                        //         </Panel.Heading>
                        //         <Panel.Body>
                        //           <p>Article Stance:{completedArticleInfo[articleId].articleStance}</p>
                        //           <p>Date Completed: {completedArticleInfo[articleId].completed}</p>
                        //           <p>Nutritional Value: {completedArticleInfo[articleId].nutritionalValue}</p>
                        //           <p>Your Stance At Time: {completedArticleInfo[articleId].onboardStance}</p>
                        //         </Panel.Body>
                        //       </Panel>
                        //     );
                        //   }}
                         //</Query>        
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