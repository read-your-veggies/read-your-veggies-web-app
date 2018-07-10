import React from 'react';
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { GET_ONE_FULL_ARTICLE, GET_COMPLETED_ARTICLES } from '../apollo/serverQueries.js';
import {GET_USER_INFO} from '../apollo/localQueries.js';
import Panel from 'react-bootstrap/lib/Panel';
import Loading from './Loading.jsx';
import Error from './Error.jsx';
import {AreaChart} from 'react-easy-chart';

class CompletedArticles extends React.Component {
  constructor(props) {
    super(props);

    this.generateChartData = this.generateChartData.bind(this);
  }

  generateChartData(data) {
    const days = {
      6: 0,
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
      0: 0,
    }
    const now = Date.now();
    for (var id in data) {
      let daysElapsed = Math.round((now - data[id].completed) / 86400000);
      if (daysElapsed < 6) {
        console.log('daysElapsed is', daysElapsed);
        days[Math.abs(daysElapsed - 6)]++;
      } 
    }
    console.log('days is', days);
    var result = [];
    for (var day in days) {
      result.push({
        x: day,
        y: days[day],
      })
    }
    console.log('result is', result);
    return result;

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
                  const completedArticleInfo = JSON.parse(data.user.completed_articles);
                  console.log('completedarticleinfo is', completedArticleInfo);
                  const completedArticleKeys = Object.keys(completedArticleInfo);
                  const chartData = this.generateChartData(completedArticleInfo);
                  completedArticleKeys.reverse();
                  return (
                    <div className="completed-articles-container">
                      <h3 className="completed-articles-header">You've read {completedArticleKeys.length} articles this week. Good job!</h3>
                      <AreaChart
                        //axes
                        areaColors={['green']}
                        height={150}
                        width={650}
                        axesLabels={{x: 'Day', y: 'Articles Read'}}
                        data={[chartData]}
                      />
                      {completedArticleKeys.map((articleId) => {
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
                                <Panel.Heading>
                                  <p className="completed-article-carrots">{'🥕'.repeat(completedArticleInfo[articleId].nutritionalValue)}</p>
                                </Panel.Heading>
                                <Panel.Body className="completed-article-body">
                                  <div className="completed-article-image-container">
                                    <img className="completed-article-image" src={article.image} />
                                  </div>
                                  <a href={article.url} target="_blank"><h3 className="completed-article-title">{article.title.slice(0, 45)}...</h3></a>
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